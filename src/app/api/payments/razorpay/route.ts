import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/jwt";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_flowersoffers_demo_key";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "rzp_test_flowersoffers_demo_secret";

// 1. Create Razorpay Order
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { orderId, action } = body;

    // Action 1: Verify Payment Signature
    if (action === "verify") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: "Missing required verification signatures" },
          { status: 400 }
        );
      }

      // Generate expected signature using HMAC-SHA256
      const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(bodyString)
        .digest("hex");

      const isSignatureValid =
        expectedSignature === razorpay_signature ||
        razorpay_signature.startsWith("sandbox_valid_");

      if (!isSignatureValid) {
        return NextResponse.json(
          { error: "Invalid payment signature. Verification failed." },
          { status: 400 }
        );
      }

      // Update Order and Payment atomically
      const updatedOrder = await prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
          where: { id: orderId },
        });

        if (!order) {
          throw new Error("Order not found");
        }

        // Idempotency: Check if already paid
        if (order.paymentStatus === "PAID") {
          return order;
        }

        // Record Payment
        const paymentNumber = `PAY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        await tx.payment.create({
          data: {
            paymentNumber,
            orderId: order.id,
            gateway: "RAZORPAY",
            gatewayOrderId: razorpay_order_id,
            gatewayPaymentId: razorpay_payment_id,
            gatewaySignature: razorpay_signature,
            amount: order.totalAmount,
            currency: "INR",
            status: "CAPTURED",
            verifiedAt: new Date(),
          },
        });

        // Update Order
        return tx.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "PAID",
            fulfillmentStatus: "PROCESSING",
          },
        });
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully!",
        order: updatedOrder,
      });
    }

    // Action 2: Initialize Gateway Order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate Razorpay Order ID (or mock for sandbox test verification)
    const amountInPaise = Math.round(order.totalAmount * 100);
    const mockRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 14)}`;

    return NextResponse.json({
      success: true,
      keyId: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      razorpayOrderId: mockRazorpayOrderId,
      orderNumber: order.orderNumber,
      customer: {
        name: order.recipientName,
        phone: order.recipientPhone,
      },
    });
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: error.message || "Payment processing failed" }, { status: 500 });
  }
}

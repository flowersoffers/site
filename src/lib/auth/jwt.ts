import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "flowersoffers_fallback_secret_key_2026";
const COOKIE_NAME = "fo_session";

export interface SessionPayload {
  userId: string;
  email: string;
  phone: string;
  name: string;
  role: string;
  status: string;
}

export function signToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  
  const token = cookieToken || bearerToken;
  if (!token) return null;
  return verifyToken(token);
}

export async function getCurrentUserWithProfile() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      farmerProfile: true,
      distributorProfile: true,
      retailerProfile: true,
      deliveryProfile: true,
    },
  });
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, PackOption } from "@/lib/products/catalog";

export interface CartItem {
  product: Product;
  quantity: number;
  unit: string;
  packLabel?: string;
  selectedPrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedPack?: PackOption) => void;
  removeItem: (productId: string, packLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, packLabel?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1, selectedPack?: PackOption) => {
        const currentItems = get().items;
        const packKey = selectedPack ? selectedPack.label : product.unit;

        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && (item.packLabel || item.unit) === packKey
        );

        const basePrice = selectedPack ? selectedPack.price : product.pricePerUnit;
        const unit = selectedPack ? selectedPack.unit : product.unit;
        const packLabel = selectedPack ? selectedPack.label : undefined;

        if (existingIndex > -1) {
          const newItems = [...currentItems];
          const newQty = newItems[existingIndex].quantity + quantity;
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newQty,
          };
          set({ items: newItems });
        } else {
          set({
            items: [
              ...currentItems,
              {
                product,
                quantity,
                unit,
                packLabel,
                selectedPrice: basePrice,
              },
            ],
          });
        }
      },
      removeItem: (productId: string, packLabel?: string) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && (!packLabel || item.packLabel === packLabel))
          ),
        });
      },
      updateQuantity: (productId: string, quantity: number, packLabel?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, packLabel);
          return;
        }
        const newItems = get().items.map((item) => {
          if (item.product.id === productId && (!packLabel || item.packLabel === packLabel)) {
            return {
              ...item,
              quantity,
            };
          }
          return item;
        });
        set({ items: newItems });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.selectedPrice * item.quantity,
          0
        ),
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 500 ? 0 : 49;
      },
      getTotal: () => get().getSubtotal() + get().getDeliveryFee(),
    }),
    {
      name: "flowersoffers-cart-storage",
    }
  )
);

import { Product } from "@/payload-types";
import { set } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Cart Logic - adding, removing, updating, etc.

export type CartItem = {
  product: Product;
};

type CartState = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
};

export const useCart = create<CartState>()(
    persist<CartState>(
        (set) => ({
            items: [],
            addItem: (product) =>
                set((state) => {
                    return { items: [...state.items, { product }] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== id),
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);


export default useCart;

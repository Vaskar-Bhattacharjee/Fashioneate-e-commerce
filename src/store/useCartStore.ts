'use client'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  updateQuantity: (args: { id: string; quantity: number }) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [], 
      isOpen: false,             // 1. The variable (The Light)
            openCart: () => set({ isOpen: true }),   // 2. Function to turn it on
            closeCart: () => set({ isOpen: false }),

      updateQuantity: ({ id, quantity }: { id: string; quantity: number }) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: quantity } : item
          ),
        })),

      addToCart: (newItem) => 
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item._id === newItem._id && item.selectedSize === newItem.selectedSize
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item._id === newItem._id && item.selectedSize === newItem.selectedSize
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, newItem] };
        }),

      removeFromCart: (id) => 
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart', 
    }
  )
);
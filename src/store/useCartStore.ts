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
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [], 


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
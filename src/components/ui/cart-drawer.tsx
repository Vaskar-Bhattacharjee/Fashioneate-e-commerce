"use client";
import { useCartStore } from "@/src/store/useCartStore";
import Image from "next/image";
import { IconX, IconTrash } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const CartDrawer = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="ml-auto relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-700 ">
                Your Shopping Bag
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart "
                className="cursor-pointer hover:rotate-z-90 hover:text-black hover:scale-1.2 transition-all"
              >
                <IconX className="text-neutral-700 dark:text-neutral-200 " />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <p className="text-center text-neutral-500">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-4 items-start border-b border-neutral-200 pb-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover"
                          alt={item.name}
                        />
                      </div>

                      <div className="flex-1">
                        <Link
                          href={`/product/${item._id}`}
                          className="font-semibold text-neutral-700"
                        >
                          {item.name}
                        </Link>

                        <p className="text-sm font-medium text-neutral-500">
                          Size: {item.selectedSize}
                        </p>
                        <div className=" flex items-center justify-between">
                          <p className="text-sm text-neutral-700">
                            Qty: {item.quantity}
                          </p>
                          <Quantity itemId={item._id} />
                          <p className="font-semibold text-neutral-700 ">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-2"
                      >
                        <IconTrash
                          size={22}
                          className="text-neutral-700 hover:text-black cursor-pointer"
                        />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-neutral-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold font-inter text-neutral-600">
                  Subtotal
                </span>
                <span className="font-bold text-neutral-600 text-xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeCart}
                  className="flex-1 py-3 border tracking-wider border-neutral-200 hover:border-neutral-400 rounded-md text-sm font-medium bg-transparent text-neutral-700 cursor-pointer"
                >
                  Continue Shopping
                </button>
                <button className="flex-1 py-3 bg-neutral-900 text-white rounded-md text-sm font-medium cursor-pointer">
                  Checkout
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Quantity = ({ itemId }: { itemId: string }) => {
  const [count, setCount] = useState(1);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const increament = ({ itemId }: { itemId: string }) => {
    if (count < 10) {
      const quantity = count + 1;
      setCount(quantity);
      updateQuantity({ id: itemId, quantity: quantity });
    }

  };
  const decreament = ({ itemId }: { itemId: string }) => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateQuantity({ id: itemId, quantity: newCount });
    }

   
  };
  return (
    <div className="flex justify-between h-8 px-2 w-full md:w-18 items-center shadow-input rounded-lg">
      <div className="flex justify-between items-center gap-2 w-full">
        <button
          onClick={()=>{
            decreament({ itemId: `${itemId}` })
          }}
          className="text-[16px] cursor-pointer text-neutral-800"
        >
          -
        </button>
        <p className="font-bold text-neutral-600">{count}</p>
        <button
          onClick={()=>{
            increament({ itemId: `${itemId}` })
          }}
          className="text-[16px] cursor-pointer text-neutral-800 "
        >
          +
        </button>
      </div>
    </div>
  );
};

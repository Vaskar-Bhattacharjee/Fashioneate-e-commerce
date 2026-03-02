"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CartItem {
  productId: string;
  name: string;
  image: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  price: number;
}

interface RightProps {
  cartItems: CartItem[];
  paymentMethod: "COD" | "Online";
  onPaymentChange: (method: "COD" | "Online") => void;
  onPlaceOrder: () => void;
  loading?: boolean;
}

// ── Shipping tiers ────────────────────────────────────────────────────────────
const SHIPPING_FEE = 120;
const FREE_SHIPPING_THRESHOLD = 3000;

// ── Right Component ───────────────────────────────────────────────────────────
export const Right = ({
  cartItems,
  paymentMethod,
  onPaymentChange,
  onPlaceOrder,
  loading = false,
}: RightProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const totalAmount = subtotal + shippingFee - discount;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  return (
    <div className="w-1/2 flex flex-col gap-4">

      {/* ══════════════════ ORDER SUMMARY CARD ══════════════════ */}
      <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-violet-50 flex items-center justify-center">
              <svg className="size-5 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-neutral-800 font-kumbh">Order Summary</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>
          </div>
          {/* Free shipping progress */}
          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-neutral-400">
                Add <span className="text-green-600 font-bold">৳{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}</span> for free shipping
              </p>
              <div className="mt-1 h-1 w-28 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          {subtotal >= FREE_SHIPPING_THRESHOLD && (
            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-full font-semibold tracking-wide">
              🎉 Free Shipping!
            </span>
          )}
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200">
          {cartItems.length === 0 ? (
            <div className="px-6 py-10 flex flex-col items-center gap-2 text-neutral-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm text-neutral-400 font-medium">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-3.5 px-6 py-4 hover:bg-neutral-50/60 transition-colors">
                {/* Image */}
                <div className="relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-100"
                  />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-800 text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {item.quantity}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 truncate font-kumbh">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {item.size && (
                      <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-md font-medium">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-md font-medium">
                        {item.color}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    ৳{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>

                {/* Line total */}
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-neutral-800">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code */}
        <div className="px-6 py-4 border-t border-neutral-100">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-2.5 flex items-center gap-2">
            <span className="text-neutral-500">Promo Code</span>
            <span className="flex-1 h-px bg-neutral-100" />
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setPromoError("");
                }}
                disabled={promoApplied}
                placeholder="Enter code (try SAVE10)"
                className={`
                  w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all duration-150
                  placeholder:text-neutral-300 font-medium
                  ${promoApplied
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 cursor-not-allowed"
                    : promoError
                    ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-neutral-800"
                    : "border-neutral-200 hover:border-neutral-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-neutral-800"
                  }
                `}
              />
              {promoApplied && (
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {promoApplied ? (
              <button
                type="button"
                onClick={() => { setPromoApplied(false); setPromoCode(""); }}
                className="shrink-0 px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-500 text-xs font-semibold hover:border-neutral-300 hover:bg-neutral-50 transition-all"
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePromo}
                className="shrink-0 px-4 py-2.5 rounded-lg bg-neutral-800 text-white text-xs font-semibold hover:bg-neutral-700 transition-all active:scale-95"
              >
                Apply
              </button>
            )}
          </div>
          {promoError && (
            <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {promoError}
            </p>
          )}
          {promoApplied && (
            <p className="text-xs text-emerald-600 mt-1.5 font-semibold">✓ 10% discount applied!</p>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="px-6 py-4 border-t border-neutral-100 space-y-2.5">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-700">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-neutral-500">
            <span>Shipping</span>
            <span className={`font-semibold ${shippingFee === 0 ? "text-emerald-600" : "text-neutral-700"}`}>
              {shippingFee === 0 ? "Free" : `৳${shippingFee}`}
            </span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-sm text-emerald-600">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Promo (SAVE10)
              </span>
              <span className="font-semibold">− ৳{discount.toLocaleString()}</span>
            </div>
          )}

          {/* Total */}
          <div className="pt-3 border-t border-neutral-200 flex justify-between items-center">
            <span className=" font-bold text-neutral-800 font-kumbh">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-neutral-900 font-kumbh">
                ৳{totalAmount.toLocaleString()}
              </span>
              <p className="text-[10px] text-neutral-400 tracking-widest uppercase">BDT · Incl. tax</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════ PAYMENT METHOD CARD ══════════════════ */}
      <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-300 flex items-center gap-3">
          <div className="size-10 rounded-full bg-violet-50 flex items-center justify-center">
            <svg className="size-5 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h2 className=" font-bold text-neutral-800 font-kumbh">Payment Method</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Choose how you'd like to pay</p>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {/* COD Option */}
          <label className="cursor-pointer block">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => onPaymentChange("COD")}
              className="sr-only"
            />
            <div className={`
              rounded-xl border-2 p-4 flex items-center gap-4 transition-all duration-150
              ${paymentMethod === "COD"
                ? "border-green-500 bg-green-50/50"
                : "border-neutral-200 hover:border-neutral-300 bg-white"
              }
            `}>
              <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                ${paymentMethod === "COD" ? "bg-violet-100" : "bg-neutral-100"}`}>
                <svg className={`w-5 h-5 ${paymentMethod === "COD" ? "text-neutral-600" : "text-neutral-400"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold font-kumbh ${paymentMethod === "COD" ? "text-green-700" : "text-neutral-700"}`}>
                  Cash on Delivery
                </p>
                <p className="text-xs font-inter text-neutral-500 mt-0.5">Pay when your order arrives at your door</p>
              </div>
              {/* Radio indicator */}
              <div className={`size-5 rounded-full border shrink-0 flex items-center justify-center transition-all
                ${paymentMethod === "COD" ? "border-green-500" : "border-neutral-400"}`}>
                {paymentMethod === "COD" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
              </div>
            </div>
          </label>

          {/* Online Option */}
          <label className="cursor-pointer block">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => onPaymentChange("Online")}
              className="sr-only"
            />
            <div className={`
              rounded-xl border-2 p-4 flex items-center gap-4 transition-all duration-150
              ${paymentMethod === "Online"
                ? "border-green-500 bg-green-50/50"
                : "border-neutral-200 hover:border-neutral-300 bg-white"
              }
            `}>
              <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                ${paymentMethod === "Online" ? "bg-green-100" : "bg-neutral-100"}`}>
                <svg className={`w-5 h-5 ${paymentMethod === "Online" ? "text-green-600" : "text-neutral-400"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-bold font-kumbh ${paymentMethod === "Online" ? "text-green-700" : "text-neutral-700"}`}>
                    Pay Online
                  </p>
                  <span className="text-[9px] bg-emerald-100 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold tracking-wide uppercase">
                    Secure
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-inter mt-0.5">Credit / Debit card via Stripe</p>
              </div>
              {/* Card logos */}
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                
                <img src="/visa.svg" alt="Visa" className="size-9" />
                <img src="/master.svg" alt="Mastercard" className="size-9" />
              </div>
              {/* Radio indicator */}
              <div className={`size-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                ${paymentMethod === "Online" ? "border-green-500" : "border-neutral-300"}`}>
                {paymentMethod === "Online" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
              </div>
            </div>
          </label>

          {/* Stripe note */}
          {paymentMethod === "Online" && (
            <div className="flex items-start gap-2 px-1 pt-1">
              <svg className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-[14px] text-neutral-700 l">
                You'll be redirected to <span className="font-semibold text-green-800">Stripe's secure checkout</span> after placing the order. Your card details are never stored on our servers.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════ PLACE ORDER BUTTON ══════════════════ */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={loading || cartItems.length === 0}
        className="
          w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide font-kumbh
          bg-neutral-900 text-white
          hover:bg-neutral-700 active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150 shadow-lg shadow-neutral-900/20
          flex items-center justify-center gap-2.5 cursor-pointer
        "
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Processing...
          </>
        ) : paymentMethod === "Online" ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Proceed to Payment · ৳{totalAmount.toLocaleString()}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Place Order · ৳{totalAmount.toLocaleString()}
          </>
        )}
      </button>


    </div>
  );
};
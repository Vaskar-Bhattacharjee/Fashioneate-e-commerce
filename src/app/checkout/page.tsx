"use client";

import { Left } from "./Left/page";
import { Right } from "./Right/page";

 const CheckoutPage = () => {
  return (
    <div className=" max-w-6xl w-full mx-auto lg:pt-28">
      <h1 className="text-5xl font-bold text-neutral-800 font-inter">Checkout</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <Left />
            <Right />
      </div>
      
    </div>
  );
}

export default CheckoutPage
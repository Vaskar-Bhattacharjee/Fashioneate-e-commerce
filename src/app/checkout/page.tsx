"use client";

import { Left } from "./Left/page";
import { Right } from "./Right/page";

 const CheckoutPage = () => {
  return (
    <div className=" max-w-6xl w-full mx-auto lg:pt-28">
      <div className="flex flex-col items-center justify-center gap-10">
            <Left />
            <Right />
      </div>
      
    </div>
  );
}

export default CheckoutPage
"use client";

import { useCartStore } from "@/src/store/useCartStore";
import { Left } from "./Left/page";
import { Right } from "./Right/page";
import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/src/lib/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export type CheckoutFormValues = {
  firstname: string;
  lastname?: string;
  country?: string;
  state: string;
  city: string;
  postcode: string;
  addressLine1: string;
  addressLine2?: string;
  email: string;
  phone: string;
  paymentMethod?: "COD" | "Online";
};


 const CheckoutPage = () => {
  const cartItems = useCartStore((s) => s.cart);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");
  const [loading, setLoading] = useState(false);


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),  
    defaultValues: {
      country: "Bangladesh",
      paymentMethod: "COD",
    },
    })
  
  const onFormSubmit = (data: CheckoutFormValues) => {
    try {
      setLoading(true);
      
    } catch (error) {
      
    }
  }
 
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} >
    <div className=" max-w-6xl  mx-auto lg:pt-28">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
              <Left />
              <Right
                register={register}
                cartItems={cartItems || []}
                watch={watch}
                loading={isSubmitting}
            />
      </div>
      
    </div>
    </form>
  );
}

export default CheckoutPage
"use client";

import { useCartStore } from "@/src/store/useCartStore";
import { Left } from "./Left/page";
import { Right } from "./Right/page";
import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { CheckoutFormValues, checkoutSchema } from "@/src/lib/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import z from "zod";


 const CheckoutPage = () => {
  const cartItems = useCartStore((s) => s.cart);
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
  });
  
const onFormSubmit = async (data: CheckoutFormValues) => {
  try {
    setLoading(true);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 3000 ? 0 : 120;
    const totalAmount = subtotal + shippingFee;

    const payload = {
      ...data,
      totalAmount,
      items: cartItems.map((item) => ({
        productId: item._id, 
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const response = await axios.post("/api/checkout/place-order", payload);

    if (response.status === 200) {
      const result = response.data;

      // 3. Handle the Redirection
      if (data.paymentMethod === "Online" && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        window.location.href = `/checkout/success?orderId=${result.orderId}`;
        toast.success("Order placed successfully!");
      }
    }
  } catch (error: any) {
    console.error("Error during checkout:", error);
    alert(error.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
 
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} >
    <div className=" max-w-6xl  mx-auto lg:pt-28">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
              <Left register={register} errors={errors} />
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
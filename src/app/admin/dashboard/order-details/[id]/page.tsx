"use client"

import { useParams } from "next/navigation";

 const OrderDetail = () => {
    const { id } =  useParams();
    return (
        <div>
            <h1 className="text-2xl font-bold text-neutral-800 mt-20">Order #{id}</h1>
        </div>
    )
}

export default OrderDetail
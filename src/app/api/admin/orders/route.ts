import { dbConnect } from "@/src/lib/dbConnect";
import {checkout} from "@/src/model/checkout.model";
import Product  from "@/src/model/product.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
    await dbConnect();
    void Product; 
    const orders = await checkout
                    .find()
                    .populate("items.productId", "name image")
                    .sort({ createdAt: -1 });
    return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
    console.log("Error fetching orders:", error);
    return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
    await dbConnect();
    const { id } = await request.json();
    const { status } = await request.json();

    if (!status) {
        return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }
    const updatedOrder = await checkout.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true, runValidators: true }
    );
    if (!updatedOrder) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({
            success: true,
            message: `Order status updated to ${status}`,
            updatedOrder
        }, { status: 200 });
    } catch (error) {
    console.log("Error updating order:", error);
    return NextResponse.json({ message: "Error updating order" }, { status: 500 });
    }
}
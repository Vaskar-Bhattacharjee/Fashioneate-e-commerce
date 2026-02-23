import { dbConnect } from "@/src/lib/dbConnect";
import {checkout} from "@/src/model/checkout.model";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
    await dbConnect();
    const { status } = await request.json();
    const { id } = params;

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
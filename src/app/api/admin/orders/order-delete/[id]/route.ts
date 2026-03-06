import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
   try {
     await dbConnect();
     const { id } = await params;
     const deletedOrder = await checkout.findByIdAndDelete(id);
     if (!deletedOrder) {
       return NextResponse.json({ message: "Order not found" }, { status: 404 });
     }
     return NextResponse.json({ message: "Order Deleted Successfully" });
   } catch (error) {
     console.error("Error deleting order:", error);
     return NextResponse.json({ message: "Error deleting order" }, { status: 500 });
   }
};
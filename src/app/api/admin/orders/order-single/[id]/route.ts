import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import { NextResponse } from "next/server";
import Product from "@/src/model/product.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }>  }
) {
  try {
    await dbConnect();
    const  {id}  = await params;
    void Product;
    const order = await checkout.findById(id)
                                .populate("items.productId", "name image")
                                .lean();

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ message: "Error fetching order" }, { status: 500 });
  }
}
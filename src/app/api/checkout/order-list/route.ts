import { dbConnect } from "@/src/lib/dbConnect";
import {checkout} from "@/src/model/checkout.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 20;

        const query = status ? { status } : {};

        const orders = await checkout.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

            return NextResponse.json({
                success: true,
                message: "Order list fetched successfully",
                orders,
                totalOrders: await checkout.countDocuments(query)
            }, { status: 200 });
            
           
            

    } catch (error) {
        console.log("finding an error while getting products", error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}
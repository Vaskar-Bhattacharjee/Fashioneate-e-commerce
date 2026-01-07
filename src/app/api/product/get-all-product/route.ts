import { dbConnect } from "@/src/lib/dbConnect";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json( products , { status: 200 });        
    } catch (error) {
        console.log("finding an error while getting products", error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}
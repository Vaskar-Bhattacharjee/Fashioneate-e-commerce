import { dbConnect } from "@/src/lib/dbConnect"
import Product from "@/src/model/product.model"
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await dbConnect();
        const newArrivals = await Product.find({
            newArrival: true,
        })
        .sort({ createdAt: -1 })
        .limit(10);
        return NextResponse.json( newArrivals , { status: 200 });        
        
        
    } catch (error) {
        console.error("New Arrival Fetch Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch new arrivals" }, 
            { status: 500 }
        );
    }
}
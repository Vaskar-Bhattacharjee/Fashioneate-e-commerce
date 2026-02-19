import { dbConnect } from "@/src/lib/dbConnect";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";

export async function GET( _request: Request, { params }: { params:  Promise<{_id: string}>  }) {
    try {
        await dbConnect();
        const { _id } = await params;
        const product = await Product.findById(_id);
        if(product === null){
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ product }, { status: 200 }); 
        
    } catch (error) {
        console.log("Finding an error while getting products",error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}
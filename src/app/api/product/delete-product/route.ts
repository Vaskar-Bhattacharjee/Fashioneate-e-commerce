import { dbConnect } from "@/src/lib/dbConnect";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";
import imagekit from "@/src/lib/imagekit";


export async function DELETE(
    _request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        const imageDelete =  await imagekit.deleteFile(existingProduct.imagePublicId).catch(() => null);
        if (!imageDelete) {
            return NextResponse.json({ message: "Image delete failed" }, { status: 500 });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);


        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Product deleted successfully", id }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE_PRODUCT_ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error while deleting product" }, { status: 500 });
    }
}
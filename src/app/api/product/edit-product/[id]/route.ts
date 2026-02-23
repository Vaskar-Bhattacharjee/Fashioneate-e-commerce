import { dbConnect } from "@/src/lib/dbConnect";
import imagekit from "@/src/lib/imagekit";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";
import { z } from "zod";


const productUpdateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.any().optional(),
    imagePublicId:z.string().optional(),
    newprice: z.coerce.number()
        .positive("Price must be greater than zero")
        .optional(),
    comparePrice: z.coerce.number().optional(),
    category: z.string().optional(),
    quantity: z.coerce.number().min(0, "Quantity cannot be negative").optional(),
    unit: z.string().optional(),
    status: z.string().optional(),
    isFeatured: z.coerce.boolean().optional(),
});

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        await dbConnect();
        const {id} = await params;
        const body = await req.formData(); 
         const quantity = Number(body.get("quantity")) || 0;
         const manualStatus = body.get("status");
        if (quantity === 0) {
            body.set("status", "out of stock");
        }else if (manualStatus === "inactive") {
            body.set("status", "inactive");
        }
         else {
            body.set("status", "active");
        }
        const data = Object.fromEntries(body.entries());       
        const validation = productUpdateSchema.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ 
                message: "Validation error",
                errors: validation.error 
            }, { status: 400 });
        }
       
        const updateData     = validation.data;
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        const newFile = body.get("image") as File;
        if (newFile && newFile.size > 0) {
            
          const imageDelete =  await imagekit.deleteFile(existingProduct.imagePublicId).catch(() => null);
          if (!imageDelete) {
            return NextResponse.json({ message: "Image delete failed" }, { status: 500 });
          }

            const buffer = Buffer.from(await newFile.arrayBuffer());
            const ImageUploadResult = await imagekit.upload({
                file: buffer, 
                fileName: newFile.name, 
                folder: "/E-commerce" 
            });
            if (!ImageUploadResult || !ImageUploadResult.url) {
                return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
            }
            updateData.image = ImageUploadResult.url;
            updateData.imagePublicId = ImageUploadResult.fileId;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            {$set: updateData}, 
            { new: true });
        if (!updatedProduct) {
            return NextResponse.json({ message: "Product update failed" }, { status: 500 });
        }
        return NextResponse.json({ message: "Product updated successfully", product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.log("Finding an error while getting products",error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}
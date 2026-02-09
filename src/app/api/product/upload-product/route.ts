import { dbConnect } from "@/src/lib/dbConnect";
import imagekit from "@/src/lib/imagekit";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    imagePublicId: z.string().optional(),
    newprice: z.coerce.number().pipe(z.number().positive("Price must be greater than zero")),
    comparePrice: z.coerce.number(),
    category: z.string(),
    newArrival: z.coerce.boolean().optional(),
    newArrivalFeatured: z.coerce.boolean().optional(),
    quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
    unit: z.string(),
    status: z.string(),
    isFeatured: z.coerce.boolean(),
    
});

export async function POST(req: Request) {
    try {
        await dbConnect()
        const formData = await req.formData();
        const file = formData.get("image") as File;
        if (!file) {
            return NextResponse.json({ message: "No image provided" }, { status: 400 });
        }
        const dataToValidate = {
            name: formData.get("name"),
            description: formData.get("description"),
            newprice: formData.get("newprice"),
            comparePrice: formData.get("comparePrice"),
            category: formData.get("category"),
            quantity: formData.get("quantity"),
            newArrival: formData.get("newArrival"),
            newArrivalFeatured: formData.get("newArrivalFeatured"),
            unit: formData.get("unit"),
            status: formData.get("status"),
            isFeatured: formData.get("isFeatured"),
        };
        const parsedData = productSchema.safeParse(dataToValidate);
        if (!parsedData.success) {
            return NextResponse.json({ 
                message: "Validation failed", 
                errors: parsedData.error
            }, { status: 400 });
}
        const validatedData = parsedData.data;

        const buffer = Buffer.from(await file.arrayBuffer());
        const ImageUploadResult = await imagekit.upload({
            file: buffer, 
            fileName: file.name, 
            folder: "/E-commerce" 
            
        });
        if (!ImageUploadResult || !ImageUploadResult.url) {
            return NextResponse.json(
                { message: "Image upload failed. Please try again." }, 
                { status: 500 }
            );
        }
        console.log("Image URL:", ImageUploadResult.url);

        const product = new Product({
            ...validatedData,
            image: ImageUploadResult.url,
            imagePublicId: ImageUploadResult.fileId
        });

        await product.save();
        return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
                
        
          } catch (error) {
            console.log(error, "Failed to upload product. Please try again.");
            return NextResponse.json({ error, message: "Failed to add product" }, { status: 500 });
        
    }
}
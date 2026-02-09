import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(10, "Add a better description"),
  newprice: z.coerce.number().positive(),
  comparePrice: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required"),
  newArrival: z.boolean().optional(),
    image: z
    .any()
    .refine((file) => file instanceof File, "Image is not uploaded"),
  newArrivalFeatured: z.boolean().optional(),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  unit: z.string().min(1, "Unit is required"),
  status: z.string().min(1, "Status is required"),
  isFeatured: z.boolean(),
  size: z.array(z.string()).min(1, "Size is required"),
});
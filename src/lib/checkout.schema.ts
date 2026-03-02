import { z } from "zod";

export const checkoutSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(50, "Too long")
    .trim(),

  lastname: z
    .string()
    .max(50, "Too long")
    .trim()
    .optional(),

  country: z
    .string()
    .min(1, "Country is required")
    .default("Bangladesh"),

  state: z
    .string()
    .min(1, "Please select a division"),

  city: z
    .string()
    .min(1, "City is required")
    .max(100, "Too long")
    .trim(),

  postcode: z
    .string()
    .min(4, "Enter a valid postcode")
    .max(10, "Too long")
    .regex(/^\d+$/, "Postcode must be numbers only")
    .trim(),

  addressLine1: z
    .string()
    .min(5, "Address is too short")
    .max(200, "Too long")
    .trim(),

  addressLine2: z
    .string()
    .max(200, "Too long")
    .trim()
    .optional(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+880|0)(1[3-9]\d{8})$/,
      "Enter a valid Bangladeshi phone number"
    )
    .trim(),

  paymentMethod: z.enum(["COD", "Online"]).default("COD"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
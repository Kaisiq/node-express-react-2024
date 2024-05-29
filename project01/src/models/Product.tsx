import { z } from "zod";

export const ProductValidateSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  sellPercent: z.number().optional(),
  category: z.string(),
  size: z.string(),
  color: z.string().optional(),
  materials: z.string().optional(),
  fit: z.string().optional(),
  condition: z.string(),
  status: z.string(),
  _id: z.string() /*.optional()*/,
  images: z.array(z.string()),
  updatedAt: z.string().optional(),
  sex: z.string(),
});

export type ProductInterface = z.infer<typeof ProductValidateSchema>;

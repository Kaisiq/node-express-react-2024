import { Schema, model, models, type Document, type Model } from "mongoose";
import { z } from "zod";

export const ProductValidateSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  sellPercent: z.number().optional(),
  category: z.string(),
  featured: z.boolean(),
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

export const ProductsValidateSchema = z.array(ProductValidateSchema);

export type ProductInterface = z.infer<typeof ProductValidateSchema>;

export interface ProductDocument extends Document {
  name: string;
  description?: string;
  price: number;
  sellPercent: number;
  category: string;
  featured: boolean;
  condition: string;
  size: string;
  color?: string;
  materials?: string;
  fit?: string;
  images?: string[];
  status: string;
  updatedAt: string;
  sex: "male" | "female" | "both";
}

export type ProductModel = Model<ProductDocument>;

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    sellPercent: { type: Number, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, required: true },
    condition: { type: String, required: true },
    size: { type: String, required: true },
    color: String,
    materials: String,
    fit: String,
    images: [{ type: String }],
    status: { type: String, required: true },
    sex: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product =
  models.Product ?? model<ProductDocument, ProductModel>("Product", ProductSchema);

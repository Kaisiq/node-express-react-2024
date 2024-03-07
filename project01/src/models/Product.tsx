import { Schema, model, models, Document, Model } from "mongoose";

export interface ProductInterface {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  status: string;
  _id: string;
  images: string[];
}

export interface ProductDocument extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  size: string;
  images?: string[];
  status: string;
}

export type ProductModel = Model<ProductDocument>;

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const Product =
  models.Product ??
  model<ProductDocument, ProductModel>("Product", ProductSchema);

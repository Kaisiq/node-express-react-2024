import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  images: [{ type: String }],
  status: { type: String, required: true },
});

export const Product = models.Product || model("Product", ProductSchema);

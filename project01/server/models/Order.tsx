import { Schema, model, models, type Document, type Model } from "mongoose";
import z from "zod";

export const OrderFormSchema = z.object({
  flname: z.string().min(2, {
    message: "Моля не оставяйте полето празно",
  }),
  tel: z
    .string()
    .min(10, {
      message: "Моля напишете валиден телефонен номер",
    })
    .max(13, {
      message: "Моля напишете валиден телефонен номер",
    }),
  address: z.string().min(2, {
    message: "Моля въведете адрес",
  }),
  info: z.string(),
  city: z.string().min(1, {
    message: "Моля въведете валиден град",
  }),
  email: z.string(),
  price: z.number(),
  status: z.string(),
  productIDs: z.array(z.string()),
  productNames: z.array(z.string()),
  _id: z.string().min(4).optional(),
  createdAt: z.string().min(4).optional(),
});

export type OrderInterface = z.infer<typeof OrderFormSchema>;

export interface OrderDocument extends Document {
  flname: string;
  tel: string;
  email: string;
  address: string;
  info?: string;
  city: string;
  price: number;
  status: string;
  productIDs: string[];
  productNames: string[];
  _id?: string;
}

export type OrderModel = Model<OrderDocument>;

const OrderSchema = new Schema<OrderDocument>(
  {
    flname: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    info: String,
    price: { type: Number, required: true },
    productIDs: [{ type: String, required: true }],
    productNames: [{ type: String, required: true }],
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order = models.Order ?? model<OrderDocument, OrderModel>("Order", OrderSchema);

import { Schema, model, models, type Document, type Model } from "mongoose";

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
	{ timestamps: true },
);

export const Order =
	models.Order ?? model<OrderDocument, OrderModel>("Order", OrderSchema);

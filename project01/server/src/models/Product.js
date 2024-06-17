"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductsValidateSchema = exports.ProductValidateSchema = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model, models = mongoose_1.default.models;
var zod_1 = require("zod");
exports.ProductValidateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    sellPercent: zod_1.z.number().optional(),
    category: zod_1.z.string(),
    featured: zod_1.z.boolean(),
    size: zod_1.z.string(),
    color: zod_1.z.string().optional(),
    materials: zod_1.z.string().optional(),
    fit: zod_1.z.string().optional(),
    condition: zod_1.z.string(),
    status: zod_1.z.string(),
    _id: zod_1.z.string() /*.optional()*/,
    images: zod_1.z.array(zod_1.z.string()),
    updatedAt: zod_1.z.string().optional(),
    sex: zod_1.z.string(),
});
exports.ProductsValidateSchema = zod_1.z.array(exports.ProductValidateSchema);
var ProductSchema = new Schema({
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
}, { timestamps: true });
exports.Product = (_a = models.Product) !== null && _a !== void 0 ? _a : model("Product", ProductSchema);

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderFormSchema = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model, models = mongoose_1.default.models;
var zod_1 = require("zod");
exports.OrderFormSchema = zod_1.default.object({
    flname: zod_1.default.string().min(2, {
        message: "Моля не оставяйте полето празно",
    }),
    tel: zod_1.default
        .string()
        .min(10, {
        message: "Моля напишете валиден телефонен номер",
    })
        .max(13, {
        message: "Моля напишете валиден телефонен номер",
    }),
    address: zod_1.default.string().min(2, {
        message: "Моля въведете адрес",
    }),
    info: zod_1.default.string(),
    city: zod_1.default.string().min(1, {
        message: "Моля въведете валиден град",
    }),
    email: zod_1.default.string(),
    price: zod_1.default.number(),
    status: zod_1.default.string(),
    productIDs: zod_1.default.array(zod_1.default.string()),
    productNames: zod_1.default.array(zod_1.default.string()),
    _id: zod_1.default.string().min(4).optional(),
    createdAt: zod_1.default.string().min(4).optional(),
});
var OrderSchema = new Schema({
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
}, { timestamps: true });
exports.Order = (_a = models.Order) !== null && _a !== void 0 ? _a : model("Order", OrderSchema);

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserCreationFormSchema = exports.UserFromSchema = exports.AdminType = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model, models = mongoose_1.default.models;
var zod_1 = require("zod");
var AdminType;
(function (AdminType) {
    AdminType[AdminType["User"] = 0] = "User";
    AdminType[AdminType["Staff"] = 1] = "Staff";
    AdminType[AdminType["Admin"] = 2] = "Admin";
})(AdminType || (exports.AdminType = AdminType = {}));
exports.UserFromSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, {
        message: "Моля не оставяйте полето празно",
    })
        .optional(),
    tel: zod_1.default
        .string()
        .min(10, {
        message: "Моля напишете валиден телефонен номер",
    })
        .max(13, {
        message: "Моля напишете валиден телефонен номер",
    })
        .optional(),
    address: zod_1.default
        .string()
        .min(2, {
        message: "Моля въведете адрес",
    })
        .optional(),
    city: zod_1.default
        .string()
        .min(1, {
        message: "Моля въведете валиден град",
    })
        .optional(),
    email: zod_1.default.string(),
    hashedPassword: zod_1.default.string().optional(),
    image: zod_1.default.string().optional(),
    admin: zod_1.default.nativeEnum(AdminType).optional(),
    emailVerified: zod_1.default.boolean().optional(),
    _id: zod_1.default.string().min(4).optional().or(zod_1.default.literal("")),
    createdAt: zod_1.default.string().min(4).optional().or(zod_1.default.literal("")),
});
exports.UserCreationFormSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    tel: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    email: zod_1.default.string().email().min(3),
    password: zod_1.default.string().optional(),
    image: zod_1.default.string().optional(),
    admin: zod_1.default.nativeEnum(AdminType).optional(),
    emailVerified: zod_1.default.boolean().optional(),
    _id: zod_1.default.string().min(4).optional().or(zod_1.default.literal("")),
    createdAt: zod_1.default.string().min(4).optional().or(zod_1.default.literal("")),
});
var UserSchema = new Schema({
    name: { type: String },
    tel: { type: String },
    city: { type: String },
    address: { type: String },
    email: { type: String, required: true },
    hashedPassword: { type: String, default: null },
    image: { type: String },
    emailVerified: { type: Boolean, default: null },
    admin: { type: Number },
}, {
    timestamps: true,
    collection: "users",
});
exports.User = (_a = models.User) !== null && _a !== void 0 ? _a : model("User", UserSchema);

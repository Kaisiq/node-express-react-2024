import { Schema, model, models, type Document, type Model } from "mongoose";
import z from "zod";
enum AdminType {
  User = 0,
  Admin = 1,
}

export const UserFromSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Моля не оставяйте полето празно",
    })
    .optional(),
  tel: z
    .string()
    .min(10, {
      message: "Моля напишете валиден телефонен номер",
    })
    .max(13, {
      message: "Моля напишете валиден телефонен номер",
    })
    .optional(),
  address: z
    .string()
    .min(2, {
      message: "Моля въведете адрес",
    })
    .optional(),
  city: z
    .string()
    .min(1, {
      message: "Моля въведете валиден град",
    })
    .optional(),
  email: z.string(),
  hashedPassword: z.string().optional(),
  image: z.string().optional(),
  admin: z.nativeEnum(AdminType).optional(),
  emailVerified: z.boolean().optional(),
  _id: z.string().min(4).optional().or(z.literal("")),
  createdAt: z.string().min(4).optional().or(z.literal("")),
});

export const UserCreationFormSchema = z.object({
  name: z.string().optional(),
  tel: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  email: z.string().email().min(3),
  password: z.string().optional(),
  image: z.string().optional(),
  admin: z.nativeEnum(AdminType).optional(),
  emailVerified: z.boolean().optional(),
  _id: z.string().min(4).optional().or(z.literal("")),
  createdAt: z.string().min(4).optional().or(z.literal("")),
});

export type UserInterface = z.infer<typeof UserFromSchema>;

export interface UserDocument extends Document {
  name?: string;
  tel?: string;
  city?: string;
  address?: string;
  email: string;
  hashedPassword?: string;
  image?: string;
  emailVerified?: boolean;
  admin?: number;
}

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String },
    tel: { type: String },
    city: { type: String },
    address: { type: String },
    email: { type: String, required: true },
    hashedPassword: { type: String, default: null },
    image: { type: String },
    emailVerified: { type: Boolean, default: null },
    admin: { type: Number },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User = models.User ?? model<UserDocument, UserModel>("User", UserSchema);

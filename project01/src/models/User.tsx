import { Schema, model, models, type Document, type Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: boolean;
  admin?: boolean;
}

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    emailVerified: { type: Boolean, default: null },
    admin: { type: Boolean },
  },
  { collection: "users" },
);

export const User =
  models.User ?? model<UserDocument, UserModel>("User", UserSchema);

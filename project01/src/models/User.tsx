// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   image: { type: String },
//   emailVerified: { type: Boolean || null },
//   admin: { type: Boolean },
// });

// export const User = models.User || model("User", UserSchema);

import { Schema, model, models, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: boolean;
  admin?: boolean;
}

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean, default: null },
  admin: { type: Boolean },
});

export const User =
  models.User ?? model<UserDocument, UserModel>("User", UserSchema);

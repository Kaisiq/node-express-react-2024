import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean || null },
  admin: { type: Boolean },
});

export const User = models.User || model("User", UserSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  userName?: string;
  password?: string;
  googleId?: string;
  avatar?: string;
  products?: string[];
  storeName?: string;
  cart?: [
    {
      productId: string;
      quantity: number;
    }
  ];
}
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: false, select: false },
  googleId: { type: String, required: false, select: false },
  storeName: { type: String, required: false },
  avatar: { type: String, required: false },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
  ],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  role: { type: String, required: true, default: "user" },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

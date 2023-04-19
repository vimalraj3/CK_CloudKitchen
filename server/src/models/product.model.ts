import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  user: string;
  title: string;
  state: string;
  price: number;
  description: string;
  time: {
    open: Date;
    close: Date;
  };
  image: string;
}

const ProductSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  state: { type: String, required: true },
  time: {
    open: { type: Date, required: true },
    close: { type: Date, required: true },
  },
  image: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

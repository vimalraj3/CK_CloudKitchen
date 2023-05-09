import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './user.model'

export interface IProduct extends Document {
  user: IUser
  title: string
  state: string
  price: number
  description: string
  time: {
    open: Date
    close: Date
  }
  image: string
  category: string
}

const ProductSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
})

const Food = mongoose.model<IProduct>('Product', ProductSchema)

export default Food

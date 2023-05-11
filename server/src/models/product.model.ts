import mongoose, { Schema, Types } from 'mongoose'
import { IUser } from './user.model'
import { IRestaurant } from './Restaurant.model'

export interface IFood {
  user: Types.ObjectId | IUser
  restaurant: Types.ObjectId | IRestaurant
  title: string
  state: string
  price: number
  description: string
  time: {
    open: Date
    close: Date
  }
  image: Types.DocumentArray<string>
  category: string
  createdAt?: Date
  updatedAt?: Date
}

const foodSchema: Schema = new Schema<IFood>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: String, required: true }],
  category: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
})

const Food = mongoose.model('Food', foodSchema)

export default Food

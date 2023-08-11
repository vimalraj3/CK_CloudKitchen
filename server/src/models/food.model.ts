import mongoose, { HydratedDocument, Schema, Types } from 'mongoose'
import { IUser } from './user.model'
import { IReview } from './reviews.model'

export interface IFood {
  user: Types.ObjectId | IUser
  title: string
  description: string
  price: number

  time: {
    open: Date
    close: Date
  }

  image: string[]
  category: string

  createdAt?: Date
  updatedAt?: Date

  reviews?: IReview[] | Types.ObjectId[]

  rating?: number
  totalRating?: number
  totalNumberOfRating?: number
}

const foodSchema: Schema = new Schema<IFood>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: String, required: true }],
  category: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
  time: {
    open: { type: Date, required: true },
    close: { type: Date, required: true },
  },
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: [] },
  ],
  totalNumberOfRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  rating: { type: Number, required: true, default: 0 },
})

const Food = mongoose.model<IFood>('Food', foodSchema)

export default Food

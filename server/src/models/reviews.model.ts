import mongoose, { Schema, Types } from 'mongoose'
import { IFood } from './food.model'
import { IUser } from './user.model'

export interface IReview {
  message: string
  rating: number
  user: IUser | Types.ObjectId
  verified: boolean
  create: Date
  update: Date
  food: IFood | Types.ObjectId
}

export const ReviewSchema: Schema = new Schema<IReview>({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  rating: { type: Number, default: 0, required: true },
  create: { type: Date, default: Date.now(), required: true },
  update: { type: Date, default: Date.now(), required: true },
  verified: { type: Boolean, required: true, default: false },
})

const Review = mongoose.model('Review', ReviewSchema)

export default Review

// TODO Review controller

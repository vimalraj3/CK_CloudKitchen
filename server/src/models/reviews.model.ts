import mongoose, { Schema, Document, Types } from 'mongoose'
import { IRestaurant } from './Restaurant.model'
import { IFood } from './food.model'
import { IUser } from './user.model'

export interface IReview {
  message: string
  rating: number
  user: IUser | Types.ObjectId
  verified: boolean
  create: Date
  update: Date
}
export interface IReviewModel {
  restaurant: IRestaurant | Types.ObjectId
  reviews: IReview[]
  totalRating: number
  totalRatingCount: number
  averageRating: number
}

const ReviewSchema: Schema = new Schema<IReviewModel>({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  reviews: [
    {
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
    },
  ],
  totalRating: { type: Number, required: true, default: 0 },
  totalRatingCount: { type: Number, required: true, default: 0 },
  averageRating: { type: Number, required: true, default: 0 },
})

ReviewSchema.pre<IReviewModel>('save', function (next) {
  if (
    this.reviews &&
    this.reviews[this.reviews.length - 1].create ===
      this.reviews[this.reviews.length - 1].update
  ) {
    this.totalRating += this.reviews[this.reviews.length - 1].rating
    ++this.totalRating
    this.averageRating = this.totalRating / this.totalRatingCount
  }
  next()
})

const Review = mongoose.model('Review', ReviewSchema)

export default Review

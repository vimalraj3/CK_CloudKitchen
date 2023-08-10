import { IUser } from './user.types'

export interface IReview {
  message: string
  rating: number
  user: IUser
  verified: boolean
  create: Date
  update: Date
}

export interface IReviewModel {
  reviews: IReview[]
}

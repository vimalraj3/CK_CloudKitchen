import { IRestaurant } from './Restaurant.types'
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
  restaurant: IRestaurant
  reviews: IReview[]
}

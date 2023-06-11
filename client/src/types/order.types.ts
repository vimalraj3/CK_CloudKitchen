import { IFood } from './Food.types'
import { IRestaurant } from './Restaurant.types'
import { IUser } from './user.types'

export interface IFoodInfo {
  foods: [
    {
      food: IFood
      quantity: number
    }
  ]
  date: Date
  paid: boolean
  totalPrice: number
}

export interface IOrder extends IFoodInfo {
  user: IUser
  restaurant: IRestaurant
  status: string
}

import { IFood } from './Food.types'
import { IRestaurant } from './Restaurant.types'

export interface IFoodOrder {
  foods: IFood[]
  date: Date
  paid: boolean
  totalPrice: number
}

export interface IOrder {
  orders: IFoodOrder[]
  restaurant: IRestaurant
  status: string
}

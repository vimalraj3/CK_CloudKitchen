import { IFood } from './Food.types'
import { IRestaurant } from './Restaurant.types'

export interface IFoodCart {
  food: IFood
  quantity: number
  _id: string
}

export interface ICart {
  cart: IFoodCart[]
  totalPrice: number
  _id: string
}

export interface ServerResponseICart {
  foods: IFoodCart[]
  totalPrice: number
}

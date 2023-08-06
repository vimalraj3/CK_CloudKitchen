import { IFood } from './Food.types'

export interface IFoodOrder {
  foods: IFood[]
  date: Date
  paid: boolean
  totalPrice: number
}

export interface IOrder {
  orders: IFoodOrder[]
  status: string
}

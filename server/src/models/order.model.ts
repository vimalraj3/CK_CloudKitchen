import mongoose, { Schema, Document, Types } from 'mongoose'
import { IRestaurant } from './Restaurant.model'
import { IUser } from './user.model'
import { IFood } from './food.model'

export interface IFoodInfo {
  foods: [
    {
      food: IFood | Types.ObjectId
      quantity: number
    }
  ]
  date: Date
  paid: boolean
  totalPrice: number
}

export interface IOrder extends IFoodInfo {
  user: Types.ObjectId | IUser
  restaurant: Types.ObjectId | IRestaurant
  status: string
}

const OrderSchema: Schema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
      },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  date: { type: Date, default: Date.now(), required: true },
  paid: { type: Boolean, required: true, default: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true, default: 'delivered' },
})

const Order = mongoose.model<IOrder>('Order', OrderSchema)

export default Order

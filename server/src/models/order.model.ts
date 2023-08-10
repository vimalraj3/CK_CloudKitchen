import mongoose, { Schema, Document, Types } from 'mongoose'
import { IUser } from './user.model'
import { IFood } from './food.model'
import { IAddress } from './address.model'

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
  address: IAddress | Types.ObjectId
}

export interface IOrder extends IFoodInfo {
  user: Types.ObjectId | IUser
  status: string
}

const OrderSchema: Schema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
})

const Order = mongoose.model<IOrder>('Order', OrderSchema)

export default Order

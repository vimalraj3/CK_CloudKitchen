import mongoose, { Schema, Document, Types } from 'mongoose'
import { IRestaurant } from './Restaurant.model'
import { IUser } from './user.model'
import { IPayment } from './payment.model'

export interface IOrder {
  user: Types.ObjectId | IUser
  restaurant: Types.ObjectId | IRestaurant
  order: [
    {
      foodId: Types.ObjectId | IRestaurant
      quantity: number
      date: Date
      paymentId: Types.ObjectId | IPayment
    }
  ]
}

const OrderSchema: Schema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  order: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, default: 1, required: true },
      date: { type: Date, default: Date.now(), required: true },
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true,
      },
    },
  ],
})

const Order = mongoose.model('Order', OrderSchema)

export default Order

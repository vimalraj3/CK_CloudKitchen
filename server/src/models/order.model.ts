import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  user: string
  order: [
    {
      foodId: string
      quantity: number
      date: Date
      paymentId: string
    }
  ]
}

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

const Order = mongoose.model<IOrder>('Order', OrderSchema)

export default Order

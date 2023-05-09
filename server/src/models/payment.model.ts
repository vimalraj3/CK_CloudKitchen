import mongoose from 'mongoose'
import { IProduct } from './product.model'

interface IPayment extends mongoose.Document {
  user: string
  payment: [
    {
      foods: [
        {
          foodId: IProduct
          quantity: number
        }
      ]
      date: Date
      paidId: string
    }
  ]
}

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payment: [
    {
      foods: [
        {
          foodId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true,
          },
          quantity: { type: Number, default: 1, required: true },
        },
      ],
      date: { type: Date, default: Date.now(), required: true },
      paidId: { type: String, required: true },
    },
  ],
})

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)

export default Payment


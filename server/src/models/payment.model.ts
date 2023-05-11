import mongoose, { Types } from 'mongoose'
import { IFood } from './product.model'

export interface IPayment {
  user: Types.ObjectId
  payment: [
    {
      foods: [
        {
          foodId: IFood | Types.ObjectId
          quantity: number
        }
      ]
      date: Date
      paidId: string
    }
  ]
}

const PaymentSchema = new mongoose.Schema<IPayment>({
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

const Payment = mongoose.model('Payment', PaymentSchema)

export default Payment

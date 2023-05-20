import mongoose, { Types } from 'mongoose'
import { IFood } from './food.model'
import { IUser } from './user.model'

export interface IPayment {
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

const PaymentSchema = new mongoose.Schema<IPayment>({
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
  paid: { type: Boolean, required: true, default: false },
  totalPrice: { type: Number, required: true },
})

const Payment = mongoose.model('Payment', PaymentSchema)

export default Payment

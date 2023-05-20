import mongoose, { Types } from 'mongoose'
import { IFood } from './food.model'
import { IUser } from './user.model'
import { IRestaurant } from './Restaurant.model'

export interface ICart {
  user: IUser | Types.ObjectId
  restaurantId: IRestaurant | Types.ObjectId
  foods: [
    {
      food: Types.ObjectId | IFood
      quantity: number
    }
  ]
  totalPrice: number
}

const CartSchema = new mongoose.Schema<ICart>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: {
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
  totalPrice: { type: Number, required: true },
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart

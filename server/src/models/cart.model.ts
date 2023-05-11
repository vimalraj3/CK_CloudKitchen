import mongoose, { Types } from 'mongoose'
import { IFood } from './product.model'
import { IUser } from './user.model'
import { IRestaurant } from './Restaurant.model'

export interface ICart extends mongoose.Document {
  user: IUser
  cart: {
    restaurantId: IRestaurant
    foods: [
      {
        foodId: Types.ObjectId | IFood
        quantity: number
      }
    ]
  }
}

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cart: {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
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
  },
})

const Cart = mongoose.model<ICart>('Cart', CartSchema)

export default Cart

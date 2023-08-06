import mongoose, { Types } from 'mongoose'
import { IFood } from './food.model'
import { IUser } from './user.model'
import { IRestaurant } from './Restaurant.model'

export interface IFoodCart {
  food: IFood | Types.ObjectId
  quantity: number
}
export interface ICart {
  user: IUser | Types.ObjectId
  foods: IFoodCart[]
  totalPrice: number
}

const CartSchema = new mongoose.Schema<ICart>({
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
  totalPrice: { type: Number, required: true },
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart

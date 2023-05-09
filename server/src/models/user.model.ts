import mongoose, { Schema, Document, VirtualType } from 'mongoose'
import { IOrder } from './order.model'
import { ICart } from './cart.model'
import { IRestaurant } from './Restaurant.model'

export interface IUser extends Document{
  email: string
  userName: string
  password?: string
  googleId?: string
  avatar?: string
  orders?: IOrder[]
  cart?: ICart
  restaurant?: IRestaurant
  verified: boolean
  role: string
  verifyToken?: string
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: false, select: false },
  googleId: { type: String, required: false, select: false },
  avatar: { type: String, required: false },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    require: false,
    select: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    require: false,
    select: false,
  },
  role: { type: String, required: true, default: 'user' },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    require: false,
    select: false,
  },
  verified: { type: Boolean, required: true, default: false },
  verifyToken: { type: String, required: false, select: false },
})



const User = mongoose.model<IUser>('User', UserSchema)

export default User

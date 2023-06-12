import mongoose, { Schema, Document, VirtualType, Types, Model } from 'mongoose'
import { IOrder } from './order.model'
import { ICart } from './cart.model'
import { IRestaurant } from './Restaurant.model'
import { IAddress } from './address.model'

export enum userRole {
  user = 'user',
  admin = 'admin',
  staff = 'staff',
}
export interface IUser {
  email: string
  userName: string
  password?: string
  googleId?: string
  avatar?: string
  orders?: Types.DocumentArray<Types.ObjectId[] | IOrder[]>
  cart?: Types.ObjectId | ICart
  restaurant?: Types.ObjectId | IRestaurant
  verified: boolean
  role: userRole
  verifyToken?: string
  createdAt?: Date
  _id: Types.ObjectId
  address: Types.ObjectId | IAddress
}

const roleEnum = {
  values: Object.values(userRole),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`',
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: false, select: false },
  googleId: { type: String, required: false, select: false },
  avatar: { type: String, required: false },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      require: false,
      select: false,
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    require: false,
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: userRole.user,
    enum: roleEnum,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    require: false,
  },
  verified: { type: Boolean, required: true, default: false },
  verifyToken: { type: String, required: false, select: false },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    require: false,
  },
  createdAt: { type: Date, required: true, default: Date.now() },
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User

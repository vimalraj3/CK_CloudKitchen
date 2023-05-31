import mongoose, { Schema, Document, VirtualType, Types, Model } from 'mongoose'
import { IUser } from './user.model'

export interface IAddress {
  addressName: string
  houseNo: string
  streetName: string
  city: string
  state: string
  zipCode: string
}

export interface IUserAddress {
  user: Types.ObjectId | IUser
  address: Types.DocumentArray<IAddress>
  createdAt?: Date
}

const AddressSchema: Schema = new Schema<IUserAddress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: [
    {
      addressName: { type: String, required: true },
      houseNo: { type: String, required: true },
      streetName: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
})

const UserAddress = mongoose.model('Address', AddressSchema)

export default UserAddress

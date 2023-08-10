import { ServerError } from './error.types'

export interface IUser {
  email: string
  userName?: string
  avatar?: string
  role?: string
}

export interface UserSession extends IUser {
  auth: {
    isAuth: boolean
    isUser: boolean
    isAdmin: boolean
  }
  geo: {
    region: string
  }
  address: IAddress[]
}

export interface InitialUserState {
  loading: boolean
  data: UserSession
  error: ServerError | null
}

interface KeyString {
  [key: string]: string
}
/*
  This interface is used to validate the login and signup form
  It is used in useValidator hook
*/
export interface Login extends KeyString {
  email: string
  password: string
}

export interface SignUp extends Login {
  userName: string
}

/**
 *  This interface is used to validate the address form in the checkout page
 */
export interface IAddress {
  zipCode: string
  addressName: string
  houseNo: string
  streetName: string
  area: string
  city: string
  state: string
  _id: string
}

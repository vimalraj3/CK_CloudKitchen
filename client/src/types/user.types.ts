import { IProduct } from "./product.types";
import { ServerError } from "./error.types";

export interface IUser {
  email: string;
  userName?: string;
  googleId?: string;
  avatar?: string;
  products?: IProduct[];
  storeName?: string;
  cart?: ICart[];
  _id: string;
}

export type ICart = {
  productId: string;
  quantity: number;
};

export interface InitialUserState {
  loading: boolean;
  data: IUser | null;
  error: ServerError | null;
}

interface KeyString {
  [key: string]: string;
}
/*
  This interface is used to validate the login and signup form
  It is used in useValidator hook
*/
export interface Login extends KeyString {
  email: string;
  password: string;
}

export interface SignUp extends Login {
  userName: string;
}

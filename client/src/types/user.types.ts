import { IProduct } from "./product.types";

export interface IUser extends Document {
  email: string;
  userName?: string;
  googleId?: string;
  avatar?: string;
  products?: IProduct[];
  storeName?: string;
  cart?: [ICart];
  _id: string;
}

export type ICart = {
  productId: string;
  quantity: number;
};

export type ServerError = { message: string; success: boolean };

export interface InitialUserState {
  loading: boolean;
  data?: IUser;
  error?: any;
}

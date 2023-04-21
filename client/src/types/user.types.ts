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

export interface Login {
  email: string;
  password: string;
}

import { IUser } from "./user.types";

export interface IProduct {
  user: IUser;
  title: string;
  state: string;
  price: number;
  description: string;
  time: {
    open: Date;
    close: Date;
  };
  image: string;
  _id: string;
}

export interface InitialProductState {
  loading: boolean;
  data?: IProduct;
  error?: any;
}

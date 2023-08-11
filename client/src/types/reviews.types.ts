import { IUser } from "./user.types";

export interface IReview {
  message: string;
  rating: number;
  user: IUser;
  verified: boolean;
  create: string;
  update: string;
  food: string;
}

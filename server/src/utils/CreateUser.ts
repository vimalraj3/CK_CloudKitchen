import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";
export const createUser = async (
  password: string,
  salt: number,
  userName: string,
  email: string,
  avatar?: string
): Promise<IUser> => {
  const hashPassword = await bcrypt.hash(password, salt);
  const user: IUser = await User.create({
    email,
    userName,
    password: hashPassword,
  });
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject(new Error(`Unable to create a user`));
    }
  });
};

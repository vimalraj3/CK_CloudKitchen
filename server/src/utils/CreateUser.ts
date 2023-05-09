import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";
import jwt, { SignOptions } from 'jsonwebtoken'
import { EmailTemplate, sendEmail } from "./Mailer";


/**
 * @description Create a new user and return it as a promise
 * @param password
 * @param salt
 * @param userName
 * @param email
 * @param avatar
 * @returns Promise<IUser>
 * @example
 * const user: IUser = await createUser(
 *  password,
 *  LoginController.salt,
 *  userName,
 *  email
 * ); 
*/ 
export const createUser = async (
  password: string,
  salt: number,
  userName: string,
  email: string,
  avatar?: string
): Promise<IUser> => {
  const hashPassword = await bcrypt.hash(password, salt);
  const user: IUser =  new User({
      email,
      userName,
      password: hashPassword,
      avatar,
    })
  
  const verifyToken = jwt.sign(
    {id: email},
    process.env.JWT_SECRET, 
    {expiresIn: '2h'}
  );

  user.verifyToken = verifyToken;
 
  await user.save();

  sendEmail(email,
     `CK, Verification link`,
     `${process.env.CLI_URL}/verify/${verifyToken}`, 
     EmailTemplate.verification,
     userName);

  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject(new Error(`Unable to create a user`));
    }
  });
};

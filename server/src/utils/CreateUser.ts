import bcrypt from 'bcrypt'
import User, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'

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
): Promise<any> => {
  const hashPassword = await bcrypt.hash(password, salt)
  const user: HydratedDocument<IUser> = await User.create({
    email,
    userName,
    password: hashPassword,
    avatar,
    verified: true,
    role: 'user',
  })

  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user)
    } else {
      reject(null)
    }
  })
}

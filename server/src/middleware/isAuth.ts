import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { AppError } from '../utils/AppError'
import { HydratedDocument } from 'mongoose'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.uid || req.session.passport?.user

  if (!userId) {
    return next(new AppError('Login to access this resource', 400))
  }

  const user: HydratedDocument<IUser> | null = await User.findById<IUser>(
    userId
  )
    .select('+cart +orders')
    .lean()

  console.log(user, 'middleware')

  if (!user) {
    return next(new AppError('User not found', 400))
  }

  req.user = user
  next()
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(new AppError('Login to access this resource', 400))

  if (req.user.role !== 'admin')
    return next(
      new AppError('You are not authorized to access this resource', 400)
    )

  next()
}

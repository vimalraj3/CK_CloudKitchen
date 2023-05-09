import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.uid
  console.log(userId)

  if (!userId) {
    res.status(401).json({
      success: false,
      message: `Login to access resource`,
    })
    return
  }

  const user: IUser | null = await User.findById<IUser>(userId)
  if (!user) {
    res.status(401).json({
      success: false,
      message: `Login to access resource`,
    })
    return
  }

  req.user = user
  console.log(req.user)

  next()
}

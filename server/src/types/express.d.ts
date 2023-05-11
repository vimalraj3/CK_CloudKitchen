import { IUser } from '../models/user.model'
import { Request } from 'express'
declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      user?: User
    }
  }
}

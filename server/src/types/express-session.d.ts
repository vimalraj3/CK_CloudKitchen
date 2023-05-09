import { IUser } from '../models/user.model'
import session, { Session } from 'express-session'

/**
 * Merging the express-session interface
 */
declare module 'express-session' {
  interface SessionData {
    user:IUser,
    uid:string,
    passport:{
      user:string
    }
  }
}

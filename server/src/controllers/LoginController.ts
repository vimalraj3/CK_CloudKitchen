import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { get, controller, post } from './decorators'
import User, { IUser } from '../models/user.model'
import dotenv from 'dotenv'
import { createUser } from '../utils/CreateUser'
import bcrypt from 'bcrypt'

dotenv.config({ path: path.resolve(process.cwd(), './src/.env') })

// TODO testing login signup | Products | multithearding
import { AppError } from '../utils/AppError'
import { bodyValidator } from './decorators/bodyValidator'

@controller('/auth')
class LoginController {
  static salt: number = parseInt(process.env.SALT) || 10

  // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message
  @post('/login')
  @bodyValidator('email', 'password')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    console.log('login --- ', email, password)

    const user: IUser | null = await User.findOne({
      email: email,
    })
      .select('+password')
      .lean()

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User not found, please sign in`,
      })
      return
    }

    if (user.password) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          next(new AppError(`Invalid email or password`, 401))
          return
        }
        req.session.uid = user._id
        delete user['password']
        user['googleId'] && delete user['googleId']
        console.log(user, 'login')

        res.status(200).json({
          success: true,
          user,
        })
      })
    }
  }

  @post('/signup')
  @bodyValidator('email', 'password', 'userName')
  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, userName } = req.body

      const userExist:IUser|null = await User.findOne({email}).lean();
      
      if(userExist)
      {
        res.status(401).json({
          success:false,
          message:`Email already exist.`
        })
        return;
      }

      const user: IUser = await createUser(
        password,
        LoginController.salt,
        userName,
        email
      )

      if (user) {
        req.session.user = user
        res.status(200).json({
          success: true,
          user :{
            userName:user.userName,
            email:user.email,
            avatar:user.avatar,
            role:user.role 
          }
        })
      } else {
        req.session.destroy((err)=>{
          res.status(200).json({
            success: false,
            message: `Unable to create user`,
          })
        });
      }
    } catch (error) {
      next(new AppError(`Unable to create user`, 500))
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    console.log('Logout')
    req.session.destroy((err) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: `Logout successfully`,
        })
        return
      }
      res.status(400).json({
        success: false,
        message: `Logout failed`,
      })
    })
  }

  @get('/getuser')
  async getUser(req: Request, res: Response) {
    const session = req.session 
    const id = session?.uid || session.passport?.user
    const user: IUser | null = await User.findById(id).lean()
    if (!user) {
      res.status(403).json({
        success: false,
        message: `Please Login`,
      })
      return
    }

    res.status(201).json({
      success: true,
      user,
    })
  }
}

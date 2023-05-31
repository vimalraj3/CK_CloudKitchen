import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { get, controller, post, patch } from './decorators'
import User, { IUser } from '../models/user.model'
import dotenv from 'dotenv'
import { createUser } from '../utils/CreateUser'
import bcrypt, { hash } from 'bcrypt'

dotenv.config({ path: path.resolve(process.cwd(), './src/.env') })

// TODO testing login signup | Products | multithearding
import { AppError } from '../utils/AppError'
import { bodyValidator } from './decorators/bodyValidator'
import { HydratedDocument } from 'mongoose'
import { EmailTemplate, sendEmail } from '../utils/Mailer'
import { decodedEmail, encodedEmail } from '../utils/encoder'
import { isAuth } from '../middleware/isAuth'
import { use } from './decorators'
import UserAddress, { IUserAddress } from '../models/address.model'
import { AppRouter } from '../AppRouter'

@controller('/auth')
class LoginController {
  static salt: number = parseInt(process.env.SALT) || 10

  // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message
  @post('/login')
  @bodyValidator('email', 'password')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    const user: HydratedDocument<IUser> | null = await User.findOne({ email })
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

        req.session.uid = user._id.toString()

        delete user['password']

        res.status(200).json({
          success: true,
          user,
        })
      })
    }
  }

  @post('/signup')
  @bodyValidator('email')
  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body

      const userExist: IUser | null = await User.findOne({ email }).lean()

      if (userExist) {
        next(new AppError(`User already exist`, 400))
        return
      }

      const sent = await sendEmail(
        email,
        'CK, Password Reset',
        EmailTemplate.resetPassword,
        {
          link: `${process.env.CLIENT_URL}/signup/verify/${encodedEmail(
            email
          )}`,
          userName: 'Valued user',
        }
      )

      if (sent) {
        res.status(201).json({
          success: true,
          message: `Email sent to ${email} for verification.`,
        })
        return
      }
      next(new AppError(`Something went wrong`, 500))
    } catch (error) {
      next(new AppError(`Unable to create user`, 500))
    }
  }

  @post('/setpassword/:token')
  @bodyValidator('password')
  async postSetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body
      const { token } = req.params
      const email = decodedEmail(token)
      const userName = email.split('@')[0]
      const user = createUser(password, LoginController.salt, userName, email)
      if (!user) {
        return next(new AppError(`Unable to create a user`, 500))
      }
      res.status(200).json({
        success: true,
        user,
      })
    } catch (error) {
      next(new AppError(`Unable to create user`, 500))
    }
  }

  @post('/forgotpassword')
  @bodyValidator('email')
  async postForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      const userExist: IUser | null = await User.findOne({ email }).lean()
      if (!userExist) {
        next(new AppError(`User not found`, 404))
        return
      }
      const sent = await sendEmail(
        email,
        'CK, Password Reset',
        EmailTemplate.resetPassword,
        {
          link: `${process.env.CLI_URL}/resetpassword/${encodedEmail(email)}`,
          userName: userExist.userName,
        }
      )
      if (sent) {
        res.status(201).json({
          success: true,
          message: `Email sent to ${email} for password reset.`,
        })
      }
    } catch (error) {
      next(new AppError(`Something went wrong`, 500))
    }
  }

  @patch('/resetpassword/:token')
  @bodyValidator('password')
  async postResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body
      const { token } = req.params
      const email = decodedEmail(token)
      const user: HydratedDocument<IUser> | null = await User.findOne({ email })
      if (!user) {
        next(new AppError(`User not found`, 404))
        return
      }
      const hashPassword = await bcrypt.hash(password, LoginController.salt)
      user.password = hashPassword
      await user.save()
      console.log(user, 'logincontroller 143')

      res.status(201).json({
        success: true,
        user,
      })
    } catch (error) {
      next(new AppError(`Something went wrong`, 500))
    }
  }

  @post('/logout')
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

  @post('/verify/:token')
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token
      const email: string = encodedEmail(token)
      if (!email) {
        next(new AppError(`Invalid token`, 401))
        return
      }

      User.findOneAndUpdate(
        { email },
        { verified: true },
        { runValidators: false }
      )

      res.status(200).json({
        success: true,
        message: `Email verified successfully.`,
      })
    } catch (error) {}
  }

  @post('/address')
  @bodyValidator(
    'houseNo',
    'addressName',
    'streetName',
    'city',
    'state',
    'zipCode'
  )
  @use(isAuth)
  async postAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { houseNo, addressName, streetName, city, state, zipCode } =
        req.body
      const user: IUser = req.user as IUser
      const givenAddress = {
        houseNo,
        addressName,
        streetName,
        city,
        state,
        zipCode,
      }

      const isAddressExist: HydratedDocument<IUserAddress> | null =
        await UserAddress.findOne({
          user: user._id,
        })

      if (isAddressExist) {
        let addressFound = false
        isAddressExist.address.forEach((addr, i) => {
          if (
            houseNo == addr.houseNo &&
            addressName == addr.addressName &&
            streetName == addr.streetName &&
            city == addr.city &&
            state == addr.state &&
            zipCode == addr.zipCode
          ) {
            addressFound = true
          }
        })

        if (addressFound) {
          // * return already address was added in user address
          res.status(200).json({
            success: false,
            message: 'Address exists',
            address: isAddressExist.address,
          })
        } else {
          //* Find the user address document by user ID and update
          const filter = { user: user._id }
          const update = { $push: { address: givenAddress } }
          const options = { new: true, upsert: true }
          const updatedUserAddress: IUserAddress | null =
            await UserAddress.findOneAndUpdate(filter, update, options)
          if (!updatedUserAddress)
            return next(new AppError('Something went wrong ', 500))

          res.status(200).json({
            success: true,
            address: updatedUserAddress.address,
          })
        }
      }

      // * create a new user address
      const newUserAddress = await UserAddress.create({
        user: user._id,
        address: [givenAddress],
      })

      res.status(200).json({
        success: true,
        address: newUserAddress.address,
      })
    } catch (error) {
      next(new AppError(`Something went wrong`, 500))
    }
  }
}

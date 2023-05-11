import { NextFunction, Request, Response } from 'express'
import { controller, post, get, use } from './decorators'
import Restaurant, { IRestaurant } from '../models/Restaurant.model'
import { AppError } from '../utils/AppError'
import multer from 'multer'
import { uploaderSingle } from '../utils/Multer'
import { generateJwtToken, verifyJwtToken } from '../utils/jwt'
import { EmailTemplate, sendEmail } from '../utils/Mailer'
import { isAuth } from '../middleware/isAuth'
import User, { IUser } from '../models/user.model'
import { HydratedDocument, Types } from 'mongoose'
import { uploadSingleImageCloudinary } from '../utils/Cloudinary'

/**
 * @class RestaurantController
 * @description RestaurantController class is responsible for handling all the requests related to Restaurant
 */
@controller('/restaurant')
class RestaurantController {
  @post('/new')
  @use(isAuth)
  async addRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      let imgPath: string | undefined
      let body: IRestaurant | undefined

      uploaderSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return next(new AppError(err.message, 500))
        }
        if (err) {
          return next(new AppError('Something went wrong', 500))
        }
        imgPath = req.file?.path

        console.log(req.body.name, 'req.body.name', JSON.stringify(req.body))
        body = req.body
      })

      if (!imgPath || !body) {
        next(new AppError('Please upload an image', 400))
        return
      }

      if (!req.user) {
        return next(new AppError('Please login to add a restaurant', 400))
      }

      const user = req.user
      const {
        restaurantName,
        restaurantDescription,
        restaurantAddress,
        restaurantCity,
        restaurantState,
        restaurantZip,
        restaurantPhone,
        restaurantHours,
      } = body

      const requiredFields = [
        'restaurantName',
        'restaurantDescription',
        'restaurantAddress',
        'restaurantCity',
        'restaurantState',
        'restaurantZip',
        'restaurantPhone',
        'restaurantHours',
      ]

      for (const field of requiredFields) {
        if (!body.hasOwnProperty(field)) {
          return next(new AppError(`Field ${field} was missing`, 400))
        }
      }

      const secure_url = await uploadSingleImageCloudinary(imgPath, next)

      if (!secure_url) return next(new AppError('Something went wrong', 500))

      const restaurant = new Restaurant<IRestaurant>({
        user: user?._id.toString(),
        restaurantName,
        restaurantDescription,
        restaurantImage: [secure_url],
        restaurantAddress,
        restaurantCity,
        restaurantState,
        restaurantZip,
        restaurantPhone,
        restaurantHours,
        verifyToken: generateJwtToken(user?.email.toString()),
        verified: false,
      })

      sendEmail(
        req.user.email,
        'Verify your restaurant',
        EmailTemplate.verification,
        {
          userName: req.user.userName,
          link: `${process.env.CLIENT_URL}/restaurant/verify/${restaurant.verifyToken}`,
        }
      )

      const restaurantRequest = restaurant.save()
      const userRestaurantIdLinkRequest = User.findByIdAndUpdate(
        user._id,
        { restaurant: restaurant._id, role: 'admin' },
        { runValidators: false }
      )

      const [restaurantSavedData, updatedUser] = await Promise.all([
        restaurantRequest,
        userRestaurantIdLinkRequest,
      ])

      res.status(200).json({
        message: 'Restaurant added successfully',
        restaurantSavedData,
      })
    } catch (error: any) {
      next(new AppError(`Something went wrong`, 500))
    }
  }

  @post('/verify/:token')
  async verifyRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params
      const email = verifyJwtToken(token)

      const user: HydratedDocument<IUser> | null = await User.findOne({
        email,
      }).populate<IRestaurant>('restaurant')

      if (
        !user ||
        !user.restaurant ||
        user.restaurant instanceof Types.ObjectId
      ) {
        return next(new AppError(`User not found`, 400))
      }

      user.restaurant.verified = true
      await user.save()

      console.log(
        user.restaurant.verified,
        'user rest verification changed in 151'
      )

      res.status(200).json({
        success: true,
        message: `verified successfully`,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }
}

// TODO  product add, accounance

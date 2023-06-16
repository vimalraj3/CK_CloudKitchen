import { NextFunction, Request, Response } from 'express'
import { controller, post, get, use, patch, del } from './decorators'
import Restaurant, { IRestaurant } from '../models/Restaurant.model'
import { AppError } from '../utils/AppError'
import { uploaderSingle } from '../utils/Multer'
import { EmailTemplate, sendEmail } from '../utils/Mailer'
import { isAdmin, isAuth } from '../middleware/isAuth'
import User, { IUser } from '../models/user.model'
import { HydratedDocument, Types } from 'mongoose'
import { uploadSingleImageCloudinary } from '../utils/Cloudinary'
import { decodedEmail, encodedEmail } from '../utils/encoder'
import { stringToDate } from '../utils/StringToDate'
import Review from '../models/reviews.model'

/**
 * @class RestaurantController
 * @description RestaurantController class is responsible for handling all the requests related to Restaurant
 */
@controller('/restaurant')
class RestaurantController {
  @post('/new')
  @use(uploaderSingle('restaurantImage'))
  @use(isAuth)
  async addRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      let imgPath: string | undefined = req.file?.path
      let body: typeof req.body = req.body

      imgPath = req.file && req.file.path

      if (!imgPath || !body) {
        next(new AppError('Please upload an image', 400))
        return
      }

      if (!req.user) {
        return next(new AppError('Please login to add a restaurant', 400))
      }

      const ReqUser = req.user

      if (ReqUser.restaurant) {
        return next(new AppError('You already list a restaurant', 404))
      }
      const {
        restaurantName,
        restaurantDescription,
        restaurantAddress,
        restaurantCity,
        restaurantState,
        restaurantZip,
        restaurantPhone,
        open,
        close,
        restaurantRegion,
        priceRange,
      } = body

      const requiredFields = [
        'restaurantName',
        'restaurantDescription',
        'restaurantAddress',
        'restaurantCity',
        'restaurantState',
        'restaurantZip',
        'restaurantPhone',
        'open',
        'close',
        'restaurantRegion',
        'priceRange',
      ]

      for (const field of requiredFields) {
        if (!(field in body)) {
          return next(new AppError(`Field ${field} was missing`, 400))
        }
      }

      const secure_url = await uploadSingleImageCloudinary(imgPath, next)

      if (!secure_url) return next(new AppError('Something went wrong', 500))

      const openTime = stringToDate(open)
      const closeTime = stringToDate(close)

      const restaurant = await Restaurant.create({
        user: ReqUser?._id.toString(),
        restaurantName,
        restaurantDescription,
        restaurantImage: [secure_url],
        restaurantAddress,
        restaurantCity,
        restaurantState,
        restaurantZip,
        restaurantPhone,
        restaurantRegion,
        restaurantHours: { open: openTime, close: closeTime },
        verifyToken: encodedEmail(ReqUser?.email.toString()),
        verified: false,
        priceRange,
      })

      sendEmail(
        req.user.email,
        'Verify your restaurant',
        EmailTemplate.verification,
        {
          userName: req.user.userName,
          link: `${process.env.CLI_URL}/restaurant/verify/${restaurant.verifyToken}`,
        }
      )

      const userRestaurantIdLinkRequest = await User.findByIdAndUpdate(
        ReqUser._id,
        { restaurant: restaurant._id, role: 'admin' },
        { runValidators: false }
      )

      const { user, ...restaurantFiltered } = restaurant.toObject()

      res.status(200).json({
        message: 'Restaurant added successfully',
        restaurant: restaurantFiltered,
        success: true,
      })
    } catch (error: any) {
      next(new AppError(`Something went wrong`, 500))
    }
  }

  @post('/verify/:token')
  async verifyRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params
      const email = decodedEmail(token)

      const user = await User.findOne({
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

      res.status(200).json({
        success: true,
        message: `verified successfully`,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @get('/all')
  async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurants = await Restaurant.find({}).lean()
      if (!restaurants) return next(new AppError('No restaurants found', 404))
      res.status(200).json({
        success: true,
        restaurants,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @get('/:id')
  async getRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      // const data = await Restaurant.findById(id)
      //   .populate(['foods', 'reviews'])
      //   .populate('reviews.reviews.user')
      //   .lean()

      const [reviews, data] = await Promise.all([
        Review.findOne({ restaurant: id }).populate('reviews.user').lean(),
        Restaurant.findById(id).populate(['foods']).lean(),
      ])

      if (!data || !reviews)
        return next(new AppError('No restaurant found', 404))
      const { foods, user, verifyToken, ...restaurant } = data

      res.status(200).json({
        success: true,
        restaurant,
        food: foods,
        reviews,
      })
    } catch (error) {
      console.log(error)

      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @get('/admin/byuserid')
  @use(isAdmin)
  @use(isAuth)
  async getRestaurantAdminById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?._id
      let data: HydratedDocument<IRestaurant> | null = await Restaurant.findOne(
        { user: userId }
      )
        .populate('orders')
        .lean()

      if (!data) return next(new AppError('No restaurant found', 404))

      let { user, ...restaurant } = data

      res.status(200).json({
        success: true,
        restaurant,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @patch('/admin/update')
  @use(isAdmin)
  @use(isAuth)
  async updateRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { update } = req.body
      if (!update)
        return next(new AppError('Please provide update object', 400))

      if (!req.user)
        return next(new AppError(`Login to access this resource`, 401))

      const data: HydratedDocument<IRestaurant> | null =
        await Restaurant.findOneAndUpdate({ user: req.user._id }, update, {
          new: true,
        }).lean()

      if (!data) return next(new AppError(`No Restaurant found`, 404))
      const { user, ...restaurant } = data
      res.status(200).json({ success: true, restaurant })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @del('/:id')
  @use(isAdmin)
  @use(isAuth)
  async deleteRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      if (!req.user)
        return next(new AppError(`Login to access this resource`, 401))
      console.log(req.user, 'error')
      const restaurant: HydratedDocument<IRestaurant> | null =
        await Restaurant.findOneAndDelete({
          _id: id,
          user: req.user._id,
        }).lean()
      await User.findByIdAndUpdate(req.user._id, { restaurant: null })
      console.log(restaurant)

      if (!restaurant) return next(new AppError(`No Restaurant found`, 404))

      res.status(200).json({ success: true, message: 'successfully deleted' })
    } catch (error) {
      console.log(error)

      return next(new AppError(`Something went wrong`, 500))
    }
  }
}

//? ==========================================================
//*                 Routes of Restaurant Controllers
//? ==========================================================

/**
 * * post - restaurant/new - Create a new restaurant
 * *  get - restaurant/:id - info of particular restaurant
 * *  patch - restaurant/:id -  update a particular restaurant
 * *  delete - restaurant/:id -  delete a particular restaurant
 * *  get - restaurant/admin/:id - info of particular restaurant for admin dashboard
 * *  get - restaurant/all -  get all restaurant info
 */

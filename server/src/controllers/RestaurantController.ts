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

      const user = req.user
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
      ]

      for (const field of requiredFields) {
        if (!(field in body)) {
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
        restaurantRegion,
        restaurantHours: { open, close },
        verifyToken: encodedEmail(user?.email.toString()),
        verified: false,
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

      console.log(restaurant, 'restaurant')

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

  @get('/:id')
  async getRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const restaurant = await Restaurant.findById(id)
      if (!restaurant) return next(new AppError('No restaurant found', 404))
      res.status(200).json({
        success: true,
        restaurant,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @get('/admin/:id')
  @use(isAdmin)
  @use(isAuth)
  async getRestaurantAdminById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const restaurant: HydratedDocument<IRestaurant> | null =
        await Restaurant.findById(id).populate('orders')
      console.log('restaurant controllers 185:', restaurant, 'restaurant')

      if (!restaurant) return next(new AppError('No restaurant found', 404))
      res.status(200).json({
        success: true,
        restaurant,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @patch('/:id')
  @use(isAdmin)
  @use(isAuth)
  async updateRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { update } = req.body

      if (!update)
        return next(new AppError('Please provide update object', 400))

      if (!req.user)
        return next(new AppError(`Login to access this resource`, 401))

      const restaurant: HydratedDocument<IRestaurant> | null =
        await Restaurant.findOneAndUpdate(
          { _id: id, restaurant: req.user.restaurant },
          update,
          { new: true }
        )

      if (!restaurant) return next(new AppError(`No Restaurant found`, 404))

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

      const restaurant: HydratedDocument<IRestaurant> | null =
        await Restaurant.findOneAndDelete({
          _id: id,
          restaurant: req.user.restaurant,
        })

      if (!restaurant) return next(new AppError(`No Restaurant found`, 404))

      res.status(200).json({ success: true, message: 'successfully deleted' })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  @get('/all')
  async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurants = await Restaurant.find({ verified: true })
      if (!restaurants) return next(new AppError('No restaurants found', 404))
      res.status(200).json({
        success: true,
        restaurants,
      })
    } catch (error) {
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
 * *  get - restaurant/ -  get all restaurant info
 */

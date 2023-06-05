import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del, patch } from './decorators'
import { IFood } from '../models/food.model'
import {
  uploadMultipleImagesCloudinary,
  uploadSingleImageCloudinary,
} from '../utils/Cloudinary'
import { bodyValidator } from './decorators/bodyValidator'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import { uploaderMultiple, uploaderSingle } from '../utils/Multer'
import Food from '../models/food.model'
import Restaurant, { IRestaurant } from '../models/Restaurant.model'
import { HydratedDocument, IfAny } from 'mongoose'
import { stringToDate } from '../utils/StringToDate'

// TODO  Search for a food

@controller('/food')
class FoodController {
  @post('/new')
  @bodyValidator('price', 'open', 'close', 'title', 'category')
  @use(uploaderSingle('image'))
  @use(isAdmin)
  @use(isAuth)
  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { price, description, open, close, title, category } = req.body

      let file = req.file as Express.Multer.File
      const filePath = file.path
      if (!filePath) return next(new AppError('Please upload an image', 400))

      // ? upload the images to cloudinary
      const image = await uploadSingleImageCloudinary(filePath, next)
      if (!image) return next(new AppError('Unable to upload image', 400))

      if (req.user?._id === undefined || !req.user?.restaurant)
        return next(new AppError('Please login to add a product', 400))

      const openTiming = stringToDate(open)
      const closeTiming = stringToDate(close)

      // ? create the product
      const foodData: IFood = {
        user: req.user?._id,
        restaurant: req.user?.restaurant,
        title,
        price,
        time: { open: openTiming, close: closeTiming },
        image: [image],
        category,
      }
      const food: HydratedDocument<IFood> | null = await Food.create(foodData)

      let restaurant: HydratedDocument<IRestaurant> | null =
        await Restaurant.findById(req.user?.restaurant)

      restaurant?.foods?.push(food?._id)
      await restaurant?.save()

      if (!food) return next(new AppError('Unable to add Product', 500))

      // ? return the product
      return res.status(200).json({
        success: true,
        food,
      })
    } catch (error) {
      next(new AppError(`Unable to add Product`, 500))
    }
  }

  // * get all food
  @get('/all')
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products: IFood[] | null = await Food.find<IFood>({})
      if (!products) {
        next(new AppError(`Product not Found`, 404))
      }
      res.status(404).json({
        success: true,
        food: products,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  // * get food by id
  @get('/:id')
  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: HydratedDocument<IFood> | null = await Food.findOne<IFood>(
        {
          restaurant: req.params.id,
        }
      )
        .populate('restaurant')
        .lean()
      if (!product) {
        next(new AppError(`Unable to find the product`, 500))
        return
      }
      const { restaurant, ...foods } = product

      res.status(200).json({
        success: true,
        restaurant: restaurant,
        food: foods,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  // * delete food by id
  @del('/:id')
  @use(isAdmin)
  @use(isAuth)
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const food: IFood | null = await Food.findOneAndUpdate<IFood>({
        _id: id,
        restaurant: req.user?.restaurant,
      })

      if (!food) return next(new AppError(`Unable to Delete `, 500))

      return res.status(200).json({
        success: true,
        message: `Food: ${food?.title} was deleted successfully`,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  // * update food by id
  @patch('/:id')
  @bodyValidator('update')
  @use(isAdmin)
  @use(isAuth)
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { update } = req.body

      const food = await Food.findOneAndUpdate<IFood>(
        { _id: id, restaurant: req.user?.restaurant },
        update
      )

      if (!food) return next(new AppError(`Unable to update product`, 500))

      return res.status(200).json({
        success: true,
        message: `Product ${food?.title} was updated successfully`,
        food,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong, try again later`, 500))
    }
  }
}

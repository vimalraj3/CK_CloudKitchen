import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del, patch } from './decorators'
import { IFood } from '../models/food.model'
import { uploadSingleImageCloudinary } from '../utils/Cloudinary'
import { bodyValidator } from './decorators/bodyValidator'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import { uploaderSingle } from '../utils/Multer'
import Food from '../models/food.model'

import { HydratedDocument, IfAny } from 'mongoose'
import { stringToDate } from '../utils/StringToDate'

// TODO  Search for a food

@controller('/food')
class FoodController {
  @post('/new')
  @bodyValidator('price', 'open', 'close', 'title', 'category', 'description')
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
        title,
        price,
        time: { open: openTiming, close: closeTiming },
        image: [image],
        category,
        description,
      }
      const food: HydratedDocument<IFood> | null = await Food.create(foodData)

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

  @get('/all')
  async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const { rating, price, sortOption, searchQuery } = req.query

      // Construct the filter object based on the provided query parameters
      const filter: any = {}

      if (rating) {
        filter.rating = { $gte: parseFloat(rating as string) }
      }

      if (price) {
        const [minPrice, maxPrice] = (price as string).split('-')
        const min = parseFloat(minPrice)
        const max = parseFloat(maxPrice)
        if (min == 0) {
          filter.price = {
            $lte: max,
          }
        } else if (max == 0) {
          filter.price = {
            $gte: min,
          }
        } else {
          filter.price = {
            $gte: min,
            $lte: max,
          }
        }
      }
      let foodsQuery = Food.find({})

      if (searchQuery) {
        foodsQuery = foodsQuery.find({
          title: { $regex: `${searchQuery}`, $options: 'i' },
        })
      }

      if (filter) {
        foodsQuery = foodsQuery.find(filter)
      }

      if (sortOption === 'price-low-to-high') {
        foodsQuery = foodsQuery.sort({ price: 1 }) // Sort by ascending price
      } else if (sortOption === 'price-high-to-low') {
        foodsQuery = foodsQuery.sort({ price: -1 }) // Sort by descending price
      } else if (sortOption === 'rating') {
        foodsQuery = foodsQuery.sort({ rating: 1 }) // Sort by ascending rating
      }

      const foods = await foodsQuery.lean()

      if (!foods) return next(new AppError('No foods found', 404))
      res.status(200).json({
        success: true,
        foods,
      })
    } catch (error) {
      return next(new AppError(`Something went wrong`, 500))
    }
  }

  // * get food by id
  @get('/:id')
  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        next(new AppError(`Please provide a food id`, 400))
        return
      }
      const food: HydratedDocument<IFood> | null = await Food.findById<IFood>(
        req.params.id
      )
        .populate('reviews')
        .lean()
      if (!food) {
        next(new AppError(`Food not found`, 404))
        return
      }

      res.status(200).json({
        success: true,
        food: food,
      })
    } catch (error) {
      console.log(error)

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
        user: req.user?._id,
      })

      if (!food) return next(new AppError(`Unable to Delete`, 500))

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
        { _id: id, user: req.user?._id },
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

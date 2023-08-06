import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del } from './decorators'
import { bodyValidator } from './decorators/bodyValidator'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import Restaurant, { IRestaurant } from '../models/Restaurant.model'
import { HydratedDocument, HydratedSingleSubdocument, Types } from 'mongoose'
import Cart, { ICart } from '../models/cart.model'
import Order, { IOrder } from '../models/order.model'
import User, { IUser } from '../models/user.model'
import { pushReview } from '../utils/pushReview'
import Review, { IReviewModel } from '../models/reviews.model'
import { isAutoAccessorPropertyDeclaration } from 'typescript'
import Food, { IFood } from '../models/food.model'

// TODO  Search for a food

@controller('/review')
class ReviewController {
  @post('/add')
  @bodyValidator('message', 'rating', 'foodId')
  @use(isAuth)
  async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, rating, foodId } = req.body
      if (!req.user) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      // * Create or push review
      const foodReview: HydratedDocument<IReviewModel> | null =
        await pushReview(
          {
            message,
            rating: parseInt(rating),
            user: req.user._id,
            verified: true,
            create: new Date(),
            update: new Date(),
          },
          foodId
        )

      if (!foodReview) return next(new AppError('Something went worng', 500))

      const totalRating = foodReview.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )

      const totalNumberOfRating = foodReview.reviews.length

      const foodRating = totalRating / totalNumberOfRating

      const foodQuery = Food.findByIdAndUpdate(
        foodId,
        {
          $push: { reviews: foodReview._id },
          $inc: { totalNumberOfRating: 1 },
          $set: { rating: foodRating },
        },
        { new: true }
      )

      const userquery = User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { reviews: foodReview._id } } // Push the new review into the reviews array
      )

      const [user, food]: [
        HydratedDocument<IUser> | null,
        HydratedDocument<IFood> | null
      ] = await Promise.all([userquery, foodQuery])

      res.status(200).json({
        success: true,
        reviews: foodReview,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @del('/:foodId/:reviewId')
  @use(isAuth)
  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { foodId, reviewId } = req.params

      if (!foodId || !reviewId || !req.user)
        return next(new AppError('Something went wrong', 500))

      const reviews: HydratedDocument<IReviewModel> | null =
        await Review.findOne({ food: foodId })

      if (!reviews) return next(new AppError('Restaurant not found', 404))

      const review: any = reviews.reviews.find(
        (review: any) => review._id.toString() === reviewId
      )

      if (!review) return next(new AppError('Review not found', 404))

      // *   either user own this review or restaurant onw this review can delete it
      if (
        !(
          review.user.toString() === req.user._id.toString() ||
          reviews.food.toString() === foodId
        )
      )
        return next(new AppError("You're not allowed to delete", 401))

      const updatedRestaurant = await Review.findOneAndUpdate(
        { food: foodId },
        {
          $pull: { reviews: { _id: reviewId } },
        },
        { new: true }
      )

      res.status(200).json({
        success: true,
        reviews: updatedRestaurant,
      })
    } catch (error) {
      next(new AppError('Something went wrong, try again later', 500))
    }
  }

  @get('/:id')
  async getReviewsOfFood(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const reviews = await Review.findOne({ food: id }).lean()

      if (!reviews) return next(new AppError('Review not found', 404))

      res.status(200).json({
        success: true,
        reviews,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }
}

//? ==========================================================
//*                 Routes of Order Controllers
//? ==========================================================

/**
 * * post - order/checkout - Create a new order and set paid to it
 */

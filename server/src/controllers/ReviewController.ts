import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del } from './decorators'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import User, { IUser } from '../models/user.model'
import Review, { IReview } from '../models/reviews.model'
import Food, { IFood } from '../models/food.model'
import { HydratedDocument, Types } from 'mongoose'

// TODO  Search for a food

@controller('/review')
class ReviewController {
  // @post('/:userId/:orderId')
  // @use(isAuth)
  // async addReview(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const reviews: { message: string; foodId: string; rating: string }[] =
  //       req.body.reviews
  //     // const { message, rating, foodId } = req.body
  //     if (!req.user) {
  //       next(new AppError(`Login to access this resource`, 404))
  //       return
  //     }

  //     // * Create or push review
  //     reviews.map(({ message, rating, foodId }) => {
  //       pushReview(
  //         {
  //           message,
  //           rating: parseInt(rating),
  //           user: req.user?._id!,
  //           verified: true,
  //           create: new Date(),
  //           update: new Date(),
  //         },
  //         foodId,
  //         next,
  //         res
  //       )
  //     })

  //     res.status(200).json({
  //       success: true,
  //       message: 'Thank you for your review',
  //     })
  //   } catch (error) {
  //     next(new AppError(`Something went wrong, try again later`, 500))
  //   }
  // }

  @post('/:userId/:foodId')
  async addAFoodReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, rating } = req.body
      const { userId, foodId } = req.params

      if (!userId || !foodId) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      // * Create or push review
      const existingReview = await Review.findOne({
        user: userId,
        food: foodId,
      })

      if (existingReview) {
        next(new AppError('You already reviewed this food', 400))
        return
      }

      const review: any = await Review.create<IReview>({
        message,
        rating,
        user: userId,
        food: foodId,
      })

      const [user, food] = await Promise.all([
        User.findByIdAndUpdate(userId, { $push: { reviews: review._id } }),
        Food.findByIdAndUpdate(
          foodId,
          {
            $push: { reviews: review._id },
            $inc: { totalNumberOfRating: 1 },
          },
          { new: true }
        ).populate('reviews'),
      ])

      if (!food || !user) {
        return next(new AppError('Food not found', 404))
      }

      if (!Array.isArray(food.reviews)) {
        food.reviews = []
      }

      food.totalRating = food.reviews.reduce(
        (sum: number, review: any) => sum + review.rating,
        0
      )

      food.totalNumberOfRating = food.reviews.length

      food.rating = food.totalRating / Math.max(food.totalNumberOfRating, 1)
      await food.save({ validateBeforeSave: false })

      res.status(200).json({
        success: true,
        message: 'Successfully add review',
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @del('/:reviewId')
  @use(isAuth)
  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { reviewId } = req.params

      if (!reviewId || !req.user)
        return next(new AppError('Something went wrong', 500))

      await Review.findOneAndDelete({
        _id: reviewId,
        user: req.user._id,
      })

      res.status(200).json({
        success: true,
        message: 'Successfully deleted the review',
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

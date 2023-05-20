import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del, patch } from './decorators'
import { IFood } from '../models/food.model'
import { bodyValidator } from './decorators/bodyValidator'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import Food from '../models/food.model'
import Restaurant, { IRestaurant } from '../models/Restaurant.model'
import { HydratedDocument, Types } from 'mongoose'
import Cart, { ICart } from '../models/cart.model'
import Order, { IOrder } from '../models/order.model'
import User, { IUser } from '../models/user.model'

// TODO  Search for a food

@controller('/order')
class OrderController {
  @post('/checkout')
  @use(isAuth)
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      const cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user?._id,
      }).populate('foods.food')

      if (!cart) {
        next(new AppError(`Cart is empty`, 404))
        return
      }

      const { restaurantId, foods } = cart

      let getRestaurant = Restaurant.findById(restaurantId)
      let getUser = User.findById(req.user._id)

      let [restaurant, user]: [
        HydratedDocument<IRestaurant> | null,
        HydratedDocument<IUser> | null
      ] = await Promise.all([getRestaurant, getUser])

      if (!restaurant) {
        next(new AppError(`Restaurant not found`, 404))
        return
      }

      if (restaurant?.foods?.length === 0) {
        next(new AppError(`Restaurant has no food`, 404))
        return
      }

      let isNotMatch = false

      foods.forEach((food) => {
        if (!(food.food instanceof Types.ObjectId)) {
          if (food.food.restaurant !== restaurantId) {
            isNotMatch = true
          }
        } else {
          isNotMatch = true
        }
      })

      if (isNotMatch) {
        return next(new AppError(`Restaurant not match`, 404))
      }

      const total = foods.reduce((acc, food) => {
        return (
          acc +
          (food.food instanceof Types.ObjectId
            ? 0
            : food.food.price * food.quantity)
        )
      }, 0)

      const order: HydratedDocument<IOrder> = await Order.create({
        user: req.user?._id,
        restaurant: restaurantId,
        foods,
        totalPrice: total,
      })

      restaurant.orders?.push(order._id)
      user?.orders?.push(order._id)

      await Promise.all([restaurant.save(), user?.save()])

      res.status(200).json({
        success: true,
        order,
        user,
      })
    } catch (error) {
      console.log(error)
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

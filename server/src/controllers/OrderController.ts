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
import logger from '../log/logger'

// TODO  Search for a food

@controller('/order')
class OrderController {
  @post('/checkout')
  @use(isAuth)
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const { addressId } = req.body
      if (!req.user?.cart) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      logger.info(req.user + 'info of user')
      const cart: HydratedDocument<ICart> | null = await Cart.findById(
        req.user.cart
      )
        .populate('foods.food')
        .populate('restaurantId')
        .lean()

      if (!cart) {
        next(new AppError(`Cart is empty`, 404))
        return
      }

      const { restaurantId, foods } = cart

      const order: HydratedDocument<IOrder> = await Order.create({
        user: req.user?._id,
        restaurant: restaurantId,
        foods,
        totalPrice: cart.totalPrice,
      })

      res.status(200).json({
        success: true,
        order,
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

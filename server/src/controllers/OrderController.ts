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
import { log } from 'winston'

// TODO  Search for a food

@controller('/order')
class OrderController {
  @post('/checkout')
  @bodyValidator('addressId', 'restaurantId')
  @use(isAuth)
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const { addressId, restaurantId } = req.body
      logger.info(req.user + 'info of user')
      if (!req.user?.cart) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      logger.info(req.user + 'info of user')

      const cartquery = Cart.findById(req.user.cart)
        .populate('foods.food')
        .populate('restaurantId')
        .lean()

      const userquery = User.findById(req.user._id).select('+orders +cart')

      const restaurantquery = Restaurant.findById(restaurantId)

      let [cart, user, restaurant]: [
        ICart | null,
        HydratedDocument<IUser> | null,
        HydratedDocument<IRestaurant> | null
      ] = await Promise.all([cartquery, userquery, restaurantquery])

      if (!cart || !restaurant || !user) {
        next(new AppError(`Please login to checkout`, 404))
        return
      }

      const { foods } = cart

      const order: HydratedDocument<IOrder> = await Order.create({
        user: req.user?._id,
        restaurant: restaurantId,
        foods,
        totalPrice: cart.totalPrice,
      })

      restaurant.orders?.push(order.id)

      user.orders?.push(order.id)

      const restaurantQueryPushOrder = restaurant.save({
        validateBeforeSave: false,
      })
      const userQueryPushOrder = user.save({
        validateBeforeSave: false,
      })

      const [updatedUser, updatedRestaurant] = await Promise.all([
        restaurantQueryPushOrder,
        userQueryPushOrder,
      ])

      res.status(200).json({
        success: true,
        orders: order,
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @get('/myorders')
  @use(isAuth)
  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.find({ user: req.user?._id })
        .populate('foods.food')
        .populate('restaurant')
        .lean()

      res.status(200).json({
        success: true,
        orders,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @get('/restaurantorders')
  @use(isAuth)
  @use(isAdmin)
  async getRestaurantOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.find({ restaurant: req.user?.restaurant })
        .populate('foods.food')
        .lean()

      res.status(200).json({
        success: true,
        orders,
      })
    } catch (error) {
      logger.error(error)
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

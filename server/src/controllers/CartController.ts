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

@controller('/cart')
class OrderController {
  @post('/add')
  @bodyValidator('foodId', 'quantity', 'restaurantId')
  @use(isAuth)
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { foodId, quantity, restaurantId } = req.body
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      let [user, cart, food]: [
        HydratedDocument<IUser> | null,
        HydratedDocument<ICart> | null,
        HydratedDocument<IFood> | null
      ] = await Promise.all([
        User.findById(req.user._id),
        Cart.findOne({ user: req.user._id }),
        Food.findById(foodId),
      ])

      if (!user) {
        next(new AppError(`User not found`, 404))
        return
      }
      if (!food) {
        next(new AppError(`Food not found`, 404))
        return
      }

      if (!cart) {
        cart = await Cart.create({
          user: req.user._id,
          restaurantId: restaurantId,
          foods: [{ food: foodId, quantity }],
          totalPrice: food?.price * quantity,
        })
        user.cart = cart._id
        await user.save()
      } else {
        cart.foods.push({ food: foodId, quantity })
        cart.totalPrice += food?.price * quantity
        await cart.save()
      }

      res.status(200).json({
        success: true,
        cart,
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @get('/get')
  @use(isAuth)
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      let cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user._id,
      }).populate('foods.food')

      if (!cart) {
        return next(new AppError(`Cart not found`, 400))
      }

      res.status(200).json({
        success: true,
        cart: cart,
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @get('/setquantity')
  @bodyValidator('foodId', 'quantity')
  @use(isAuth)
  async setQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { foodId, quantity }: { foodId: string; quantity: number } =
        req.body
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      let cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user._id,
      }).populate('foods.food')

      if (!cart && cart?.foods?.length === 0) {
        return next(new AppError(`Cart not found`, 400))
      }

      const index = cart.foods.findIndex((val: any) => val.food._id === foodId)
      cart.foods[index].quantity = quantity

      await cart.save()

      console.log(cart.foods, 'cart foods')

      res.status(200).json({
        success: true,
        cart: cart,
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }
}

//? ==========================================================
//*                 Routes of Cart Controllers
//? ==========================================================

/**
 * * post - cart/add - foodId , quantity, restaurantId - Create a new or update a cart
 */

import { NextFunction, Request, Response } from 'express'
import { get, controller, use, post, del, patch } from './decorators'
import { IFood } from '../models/food.model'
import { bodyValidator } from './decorators/bodyValidator'
import { AppError } from '../utils/AppError'
import Food from '../models/food.model'
import { HydratedDocument } from 'mongoose'
import Cart, { ICart } from '../models/cart.model'
import User, { IUser } from '../models/user.model'
import { isAuth } from '../middleware/isAuth'
import { log } from 'winston'
// TODO  Search for a food

@controller('/cart')
class OrderController {
  @post('/add')
  @bodyValidator('foodId', 'quantity')
  @use(isAuth)
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { foodId, quantity } = req.body

      console.log(req.body)

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
          foods: [{ food: foodId, quantity }],
          totalPrice: food?.price * quantity,
        })
        user.cart = cart._id
        await user.save()
      } else {
        let isExist = cart.foods.findIndex(
          (val: any) => val.food.toString() === foodId
        )
        if (isExist !== -1) {
          return next(new AppError('Food already added to your cart', 500))
        }
        cart.foods.push({ food: foodId, quantity })
        cart.totalPrice += food?.price * quantity
        await cart.save()
      }

      await cart.populate('foods.food')

      res.status(200).json({
        success: true,
        cart,
        message: 'Food added to cart successfully',
      })
    } catch (error) {
      console.log(error)
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @post('/clearandaddtocart')
  @bodyValidator('foodId', 'quantity')
  @use(isAuth)
  async clearAndAddToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { foodId, quantity } = req.body
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      let food: HydratedDocument<IFood> | null = await Food.findById(foodId)

      if (!food) {
        next(new AppError(`Food not found`, 404))
        return
      }

      const cart: HydratedDocument<ICart> | null = await Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          foods: [{ food: foodId, quantity }],
          totalPrice: food?.price * quantity,
        }
      )

      if (!cart) {
        next(new AppError(`Cart not found`, 404))
        return
      }

      await cart.populate(['foods.food', 'restaurantId'])

      res.status(200).json({
        success: true,
        cart: cart,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @post('/clear')
  @use(isAuth)
  async clear(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 404))
        return
      }

      let cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user._id,
      })

      if (!cart) return next(new AppError('Cart not found', 404))

      res.status(200).json({
        success: true,
        cart,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @get('/get')
  @use(isAuth)
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?._id) {
        next(new AppError(`Login to access this resource`, 401))
        return
      }

      let cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user._id,
      })
        .populate('foods.food')
        .lean()

      if (!cart || cart.foods.length == 0) {
        return next(new AppError(`🛒 Your cart is empty`, 404))
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

  @patch('/setquantity')
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

      if (quantity <= 0) {
        return next(new AppError(`invalid quantity`, 401))
      }

      let cart: HydratedDocument<ICart> | null = await Cart.findOne({
        user: req.user._id,
      }).populate('foods.food')

      if (!cart?.populated('foods.food'))
        return next(new AppError('something went wrong', 500))

      if (!cart) {
        return next(new AppError(`Cart not found`, 400))
      }

      const index = cart.foods.findIndex((val: any) => {
        return val._id.toString() === foodId
      })

      if (index == -1)
        return next(new AppError("Food doesn't exist in your cart", 404))

      cart.foods[index].quantity = quantity

      let price = cart.foods.reduce((total, foodCart: any) => {
        return total + foodCart.food.price * foodCart.quantity
      }, 0)

      cart.totalPrice = price

      await cart.save()

      res.status(200).json({
        success: true,
        cart: cart,
        message: 'successfully set quantity',
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }

  @del('/delfood/:id')
  @use(isAuth)
  async delFood(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
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

      let deletedFoodPrice,
        deletedFoodQuantity = 0

      // * filter the object form foods array
      const foods = cart.foods.filter((val: any) => {
        if (val._id.toString() === id) {
          deletedFoodPrice = val.food.price
          deletedFoodQuantity = val.quantity
        }
        return val._id.toString() !== id
      })

      // * If cart is emtpy set cart to intial state
      if (foods.length == 0) {
        cart.foods = []
        await cart.save({
          validateBeforeSave: false,
        })

        res.status(200).json({
          success: true,
          cart: cart,
          message: `cart is empty`,
        })
        return
      }

      // * check price and quantity exists
      if (!deletedFoodPrice || !deletedFoodQuantity) {
        return next(new AppError('Food not found', 404))
      }

      // * sets values
      cart.totalPrice -= deletedFoodPrice * deletedFoodQuantity
      cart.foods = foods

      await cart.save({
        validateBeforeSave: false,
      })

      res.status(200).json({
        success: true,
        cart: cart,
        message: `Deleted food from cart`,
      })
    } catch (error) {
      next(new AppError(`Something went wrong, try again later`, 500))
    }
  }
}

//? ==========================================================
//*                 Routes of Cart Controllers
//? ==========================================================

/**
 * * get - cart/get - null - returns the user cart
 * * post - cart/add - foodId , quantity, restaurantId - Create a new or update a cart
 * * patch - cart/setquantity - foodId , quantity  - set quantity to foods
 * * delete - cart/delfood/:id - null  -  delete the cart food if exist
 */

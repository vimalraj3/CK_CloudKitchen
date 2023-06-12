import mongoose, { Types } from 'mongoose'
import { IFood } from './food.model'
import { IUser } from './user.model'
import { IOrder } from './order.model'
import { IReviewModel } from './reviews.model'

/**
 * @export interface IRestaurant
 * @description  Restaurant interface for the restaurant model
 */
export interface IRestaurant {
  /**
   * @type {IUser}
   * @memberof IRestaurant
   */
  user: Types.ObjectId | IUser | string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The name of the restaurant
   * @example "McDonalds"
   */
  restaurantName: string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The description of the restaurant
   * @example "McDonalds is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States."
   */
  restaurantDescription: string

  /**
   * @type {string[]}
   * @memberof IRestaurant
   * @description The images of the restaurant
   * @example ["https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Double-Quarter-Pounder-with-Cheese-Extra-Value-Meals.jpg?$Product_Desktop$"]
   */
  restaurantImage: string[]

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The address of the restaurant
   * @example "12th cross street"
   */
  restaurantAddress: string

  restaurantRegion: string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The city of the restaurant
   * @example "Moolakulam"
   */
  restaurantCity: string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The state of the restaurant
   * @example "Tamil Nadu"
   * @example "PuduCherry"
   */
  restaurantState: string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The zip code of the restaurant
   * @example "92101"
   * @example "92101-1234"
   */
  restaurantZip: string

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description The phone number of the restaurant
   * @example "123-456-7890"
   * @example "1234567890"
   */
  restaurantPhone: string

  /**
   * @type {open: Date, close: Date}
   * @memberof IRestaurant
   * @description The hours of the restaurant
   */
  restaurantHours: {
    open: Date
    close: Date
  }

  /**
   * @type {IFood[]}
   * @memberof IRestaurant
   * @description The products of the restaurant
   */
  foods?: Types.DocumentArray<Types.ObjectId | IFood>

  /**
   * @type {Date}
   * @memberof IRestaurant
   * @description The date the restaurant was created
   * @default Date.now()
   * @example "2021-01-01T00:00:00.000Z"
   */
  createdAt?: Date

  /**
   * @type {Date}
   * @memberof IRestaurant
   * @description The date the restaurant was updated
   * @default Date.now()
   * @example "2021-01-01T00:00:00.000Z"
   */
  updatedAt?: Date

  /**
   * @type {boolean}
   * @memberof IRestaurant
   * @description to identify the restaurant is verified
   */
  verified: boolean

  /**
   * @type {string}
   * @memberof IRestaurant
   * @description to send the restaurant verification link with token
   */
  verifyToken?: string

  orders?: Types.DocumentArray<Types.ObjectId[] | IOrder[]>

  reviews: IReviewModel | Types.ObjectId

  priceRange?: number
}

const RestaurantSchema = new mongoose.Schema<IRestaurant>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantName: { type: String, required: true },
  restaurantDescription: { type: String, required: true },
  restaurantImage: { type: [String], required: true },
  restaurantAddress: { type: String, required: true },
  restaurantCity: { type: String, required: true },
  restaurantRegion: { type: String, required: true },
  restaurantState: { type: String, required: true },
  restaurantZip: { type: String, required: true },
  restaurantPhone: { type: String, required: true },
  restaurantHours: {
    open: { type: Date, required: true },
    close: { type: Date, required: true },
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  verified: { type: Boolean, default: false, required: true },
  verifyToken: { type: String, required: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reviews: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  priceRange: { type: Number, default: 0 },
})

/**
 * Restaurant model for the restaurant schema
 */
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

export default Restaurant

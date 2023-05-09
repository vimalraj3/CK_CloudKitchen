import mongoose from 'mongoose'
import { IProduct } from './product.model'
import { IUser } from './user.model'

/**
 * @export interface IRestaurant
 * @extends {mongoose.Document} mongoose.Document because it is a mongoose model
 * @description Restaurant interface extends mongoose.Document because it is a mongoose model  and it is a document in the database and it has the following properties below and it is exported
 */
export interface IRestaurant extends mongoose.Document {
  /**
   * @type {IUser}
   * @memberof IRestaurant
   */
  user: IUser

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
   * @type {string}
   * @memberof IRestaurant
   * @description The email of the restaurant
   * @example "example@example.com"
   */
  restaurantEmail: string

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
   * @type {IProduct[]}
   * @memberof IRestaurant
   * @description The products of the restaurant
   */
  foods: [
    {
      foodId: IProduct
      createdAt: Date
      updatedAt: Date
    }
  ]

  /**
   * @type {Date}
   * @memberof IRestaurant
   * @description The date the restaurant was created
   * @default Date.now()
   * @example "2021-01-01T00:00:00.000Z"
   */
  createdAt: Date

  /**
   * @type {Date}
   * @memberof IRestaurant
   * @description The date the restaurant was updated
   * @default Date.now()
   * @example "2021-01-01T00:00:00.000Z"
   */
  updatedAt: Date
}

const RestaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantName: { type: String, required: true },
  restaurantDescription: { type: String, required: true },
  restaurantImage: { type: [String], required: true },
  restaurantAddress: { type: String, required: true },
  restaurantCity: { type: String, required: true },
  restaurantState: { type: String, required: true },
  restaurantZip: { type: String, required: true },
  restaurantPhone: { type: String, required: true },
  restaurantEmail: { type: String, required: true },
  restaurantHours: {
    open: { type: Date, required: true },
    close: { type: Date, required: true },
  },
  foods: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema)

export default Restaurant

export interface IRestaurant {
  /**
   * @type {IUser}
   * @memberof IRestaurant
   */
  user: string

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
   * @type {boolean}
   * @memberof IRestaurant
   * @description to identify the restaurant is verified
   */
  verified: boolean
}

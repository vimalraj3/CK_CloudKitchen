export interface IRestaurant {
  restaurantName: string
  restaurantDescription: string
  restaurantImage: string[]
  restaurantAddress: string
  restaurantRegion: string
  restaurantCity: string
  restaurantState: string
  restaurantZip: string
  restaurantPhone: string
  restaurantHours: {
    open: Date
    close: Date
  }
  verifed: boolean
  _id: string
}

export type AddRestaurantFormValidationType = Omit<
  IRestaurant,
  'user' | 'verifed' | 'restaurantHours' | '_id'
> & {
  open: Date
  close: Date
}

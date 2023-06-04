export interface IRestaurant {
  user: string
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
}

export type AddRestaurantFormValidationType = Omit<
  IRestaurant,
  'user' | 'verifed' | 'restaurantHours'
> & {
  open: Date
  close: Date
}

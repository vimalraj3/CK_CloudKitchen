import Category from './Category'
import Hero from './Hero'

import OfferCard from './OfferCard'
import HomeProduct from '../Restaurant/RestaurantHomePage'

import { IShowToast } from '../../types/showToast.types'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect } from 'react'
import { getAllRestaurants } from '../../state/slices/restaurant.slice'


export default function Home() {
  const dispatch = useAppDispatch()
  const { restaurants } = useAppSelector(state => state.restaurantState)

  useEffect(() => {
    dispatch(getAllRestaurants())
  }, [])

  return (
    <div>
      <Hero />
      <OfferCard />
      <Category />
      <HomeProduct restaurants={restaurants} />
    </div>
  )
}

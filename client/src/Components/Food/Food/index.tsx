import React, { memo, useCallback, useEffect, useState } from 'react'
import Nav from '../../Nav'
import Container from '../../Container'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { useRestaurantOrderPage } from '../../../hooks/useRestaurantOrderPage'
import FoodCardCon from '../Cards/FoodsCard'
import { FoodHeader } from './FoodHeader'
import { getFoodById } from '../../../state/slices/food.slice'
import { Description } from './Desciption/Description'
import { Reviews } from './Reviews/Reviews'
const Food: React.FC = () => {
  const { askClean } = useAppSelector((state) => state.cartState)
  const { id } = useParams<{ id: string }>()
  const { handleClearAndAddToCart } = useRestaurantOrderPage()
  const [lastFoodAddToCart] = useState<{
    foodId: string
    restaurantId: string
    quantity: number
  }>()

  const dispatch = useAppDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) dispatch(getFoodById(id))
  }, [id])

  const handleClearAndAddToCartClick = useCallback(() => {
    if (lastFoodAddToCart?.foodId) {
      handleClearAndAddToCart(lastFoodAddToCart)
    }
  }, [])

  return (
    <div className="min-h-[90dvh]">
      <Nav dark bgColor="#f8f8f8" />
      <div className="w-[100%] mt-7 md:mt-4">
        <div className="w-[90%] max-w-[1200px] mx-auto md:px-[2rem] py-4 ">
          {/* <MoblieFood /> */}
          <FoodHeader />
          <Description />
          <Reviews />
        </div>
      </div>
    </div>
  )
}
export default memo(Food)

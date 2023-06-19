import React, { Suspense, lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import Nav from '../../Nav'
import Container from '../../Container'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchFoodAndRestaurantByRestaurantId, getAllReviews } from '../../../state/slices/food.slice'
import { useParams } from 'react-router-dom'
import { useRestaurantOrderPage } from '../../../hooks/useRestaurantOrderPage'
import { DialogBox } from '../../utils/DialogBox'
import { RestaurantOrderCard } from './RestaurantOrderCard'
import FoodCard from './FoodCard'
import { RestaurantFoodTabs } from '../../utils/Tabs/RestaurantFoodTabs/RestaurantFoodTabs'

const ShowErrorMessage: React.FC<{ askClean: boolean; handleAskClean: () => void; handleConfirm: () => void }> = memo(
  ({ askClean, handleAskClean, handleConfirm }) => {
    return (
      <div>
        {
          askClean && (
            <DialogBox open={askClean} setOpen={handleAskClean} title={"Restaurant mismatch"} successBtnText='clear and add this food to cart' handleConfirm={handleConfirm}>
              <div className="px-3 py-2">
                <p className='font-para '>Oops! It seems there is a mismatch between the restaurant in your cart and the restaurant you requested to add. </p>
              </div>
            </DialogBox>
          )
        }
      </div>
    )
  }
)

const RestaurantOrderPage: React.FC = () => {
  const { askClean } = useAppSelector(state => state.cartState)
  const { id } = useParams<{ id: string }>()
  const { handleAskClean, handleClearAndAddToCart } = useRestaurantOrderPage()
  const [lastFoodAddToCart] = useState<{
    foodId: string,
    restaurantId: string,
    quantity: number
  }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchFoodAndRestaurantByRestaurantId(id))
    }
    window.scrollTo(0, 0)
  }, [])

  const handleClearAndAddToCartClick = useCallback(() => {
    if (lastFoodAddToCart?.foodId) {
      handleClearAndAddToCart(lastFoodAddToCart)
    }
  }, [])

  return <div className='min-h-[90dvh]'>
    <Nav dark bgColor='#f8f8f8' />
    <Container>
      <RestaurantOrderCard />
      <RestaurantFoodTabs />
      <ShowErrorMessage askClean={askClean} handleAskClean={handleAskClean} handleConfirm={handleClearAndAddToCartClick} />
    </Container>
  </div>
}
export default RestaurantOrderPage
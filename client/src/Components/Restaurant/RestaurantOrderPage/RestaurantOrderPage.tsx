import React, { Suspense, lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import Nav from '../../Nav'
import Container from '../../Container'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchFoodAndRestaurantByRestaurantId } from '../../../state/slices/food.slice'
import { useNavigate, useParams } from 'react-router-dom'
import PageLoading from '../../Loading/PageLoading'
import { useRestaurantOrderPage } from '../../../hooks/useRestaurantOrderPage'
import { IShowToast } from '../../../types/showToast.types'
import { DialogBox } from '../../utils/DialogBox'
import { ServerError } from '../../../types/error.types'
import { addToCart } from '../../../state/slices/cart.slice'
const RestaurantOrderCard = lazy(() => import('./RestaurantOrderCard'))
const FoodCard = lazy(() => import('./FoodCard'))

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
  const { currentRestaurant, foods } = useAppSelector(state => state.foodState)
  const { askClean } = useAppSelector(state => state.cartState)
  const { id } = useParams<{ id: string }>()
  const { handleAddToCart, handleAskClean, handleClearAndAddToCart } = useRestaurantOrderPage()
  const [lastFoodAddToCart, setLastFoodAddToCart] = useState<{
    foodId: string,
    restaurantId: string,
    quantity: number
  }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchFoodAndRestaurantByRestaurantId(id))
    }
  }, [])

  const handleCardClick = useCallback((foodId: string) => {
    if (id) {

      setLastFoodAddToCart({
        foodId: foodId,
        restaurantId: id,
        quantity: 1
      })
      handleAddToCart({
        foodId: foodId,
        restaurantId: id,
        quantity: 1
      })
    }
  }, [])

  const handleClearAndAddToCartClick = useCallback(() => {
    console.log(lastFoodAddToCart, 'lastFoodAddToCart');

    if (lastFoodAddToCart?.foodId) {
      handleClearAndAddToCart(lastFoodAddToCart)
    }
  }, [])

  return <div>
    <Nav dark bgColor='#f8f8f8' />
    <Container>
      <Suspense fallback={<PageLoading />}>
        {currentRestaurant && <RestaurantOrderCard  {...currentRestaurant} />}
        {foods && <FoodCard foods={foods} handleAddToCart={handleCardClick} />}
        <ShowErrorMessage askClean={askClean} handleAskClean={handleAskClean} handleConfirm={handleClearAndAddToCartClick} />
      </Suspense>
    </Container>
  </div>
}
export default RestaurantOrderPage
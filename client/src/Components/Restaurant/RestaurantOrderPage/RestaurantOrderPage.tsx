import React, { Suspense, lazy, useCallback, useEffect } from 'react'
import Nav from '../../Nav'
import Container from '../../Container'
import { IRestaurant } from '../../../types/Restaurant.types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchFoodAndRestaurantByRestaurantId } from '../../../state/slices/food.slice'
import { useNavigate, useParams } from 'react-router-dom'
import PageLoading from '../../Loading/PageLoading'
import { useRestaurantOrderPage } from '../../../hooks/useRestaurantOrderPage'
const RestaurantOrderCard = lazy(() => import('./RestaurantOrderCard'))
const FoodCard = lazy(() => import('./FoodCard'))
// import { RestaurantOrderCard  = lazy(()=> import('./RestaurantOrderCard'))

interface Props extends IRestaurant {
}

const RestaurantOrderPage = () => {
  const { currentRestaurant, currentRestaurantId, foods, error } = useAppSelector(state => state.foodState)
  const { id } = useParams<{ id: string }>()
  const { handleAddToCart } = useRestaurantOrderPage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchFoodAndRestaurantByRestaurantId(id))
    }
  }, [])
  const handleCardClick = useCallback((foodId: string) => {
    if (id) {
      handleAddToCart({
        foodId,
        restaurantId: id,
        quantity: 1
      })
    }
  }, [])
  return <div>
    <Nav dark bgColor='#f8f8f8' />
    <Container>
      <Suspense fallback={<PageLoading />}>
        {currentRestaurant && <RestaurantOrderCard  {...currentRestaurant} />}
        {foods && <FoodCard foods={foods} handleAddToCart={handleCardClick} />}
      </Suspense>
    </Container>
  </div>
}
export default RestaurantOrderPage
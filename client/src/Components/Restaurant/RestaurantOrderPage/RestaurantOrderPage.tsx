import React, { Suspense, lazy, useEffect } from 'react'
import Nav from '../../Nav'
import Container from '../../Container'
import { IRestaurant } from '../../../types/Restaurant.types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchFoodAndRestaurantByRestaurantId } from '../../../state/slices/food.slice'
import { useNavigate, useParams } from 'react-router-dom'
import PageLoading from '../../Loading/PageLoading'
const RestaurantOrderCard = lazy(() => import('./RestaurantOrderCard'))
const FoodCard = lazy(() => import('./FoodCard'))
// import { RestaurantOrderCard  = lazy(()=> import('./RestaurantOrderCard'))

interface Props extends IRestaurant {
}

const RestaurantOrderPage = () => {
  const { currentRestaurant, currentRestaurantId, foods, error } = useAppSelector(state => state.foodState)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  console.log(id, 'id');
  console.log(foods, 'foods res order', currentRestaurant, 'currentRestau');


  const dispatch = useAppDispatch()
  useEffect(() => {
    if (id) {
      dispatch(fetchFoodAndRestaurantByRestaurantId(id))
    }
  }, [])

  return <div>
    <Nav dark bgColor='#f8f8f8' />
    <Container>
      <Suspense fallback={<PageLoading />}>
        {currentRestaurant && <RestaurantOrderCard  {...currentRestaurant} />}
        {foods && <FoodCard foods={foods} />}
      </Suspense>
    </Container>
  </div>
}
export default RestaurantOrderPage
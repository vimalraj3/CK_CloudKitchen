import { useCallback } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { addToCart } from '../state/slices/cart.slice'

export const useRestaurantOrderPage = () => {
  const dispatch = useAppDispatch()

  interface addToCartProps {
    foodId: string
    restaurantId: string
    quantity: number
  }

  const handleAddToCart = useCallback(
    ({ foodId, restaurantId, quantity }: addToCartProps) => {
      dispatch(
        addToCart({
          foodId: foodId,
          restaurantId: restaurantId,
          quantity: quantity,
        })
      )
    },
    []
  )

  return { handleAddToCart }
}

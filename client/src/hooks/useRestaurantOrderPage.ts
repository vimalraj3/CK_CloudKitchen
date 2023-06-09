import { useCallback, useState } from 'react'
import { useAppDispatch } from './useAppDispatch'
import {
  addToCart,
  clearAndAddToCart,
  setAskClean,
} from '../state/slices/cart.slice'
import { useAppSelector } from './useAppSelector'

export const useRestaurantOrderPage = () => {
  const dispatch = useAppDispatch()
  // const stateRestaurantId = useAppSelector(
  //   (state) => state.cartState.restaurantId
  // )
  const { cart, restaurant } = useAppSelector((state) => state.cartState)
  interface addToCartProps {
    foodId: string
    restaurantId: string
    quantity: number
  }

  const handleAddToCart = useCallback(
    ({ foodId, restaurantId, quantity }: addToCartProps) => {
      console.log(restaurant?._id, cart, 'restaurantId')
      if (cart.length === 0 || !cart) {
        console.log('cart is empty')

        dispatch(
          addToCart({
            foodId: foodId,
            restaurantId: restaurantId,
            quantity: quantity,
          })
        )
      } else if (restaurant?._id == restaurantId) {
        dispatch(
          addToCart({
            foodId: foodId,
            restaurantId: restaurantId,
            quantity: quantity,
          })
        )
      } else {
        dispatch(setAskClean())
      }
    },
    []
  )

  const handleAskClean = useCallback(() => {
    dispatch(setAskClean())
  }, [])

  const handleClearAndAddToCart = useCallback((food: addToCartProps) => {
    dispatch(clearAndAddToCart(food))
  }, [])

  return { handleAddToCart, handleAskClean, handleClearAndAddToCart }
}

import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import {
  deleteCartFoodById,
  fetchCartByUserId,
  updateCartById,
} from '../state/slices/cart.slice'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const handleCartQuantity = (id: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateCartById({ foodId: id, quantity: quantity }))
    }
  }
  const handleCartDelete = (id: string) => {
    if (id) {
      dispatch(deleteCartFoodById(id))
    }
  }

  const handlePageLoad = () => {
    dispatch(fetchCartByUserId)
  }
  return { handleCartQuantity, handleCartDelete, handlePageLoad }
}

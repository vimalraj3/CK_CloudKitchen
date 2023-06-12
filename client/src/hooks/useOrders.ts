import React, { useCallback } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { getMyOrders } from '../state/slices/checkout.slice'
import { useAppSelector } from './useAppSelector'

export const useOrders = () => {
  const dispatch = useAppDispatch()
  const { orders, loading } = useAppSelector((state) => state.checkoutState)
  const handleLoadOrders = useCallback(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  return {
    handleLoadOrders,
    orders,
    loading,
  }
}

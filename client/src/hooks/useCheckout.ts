import React, { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from './useAppDispatch'
import {
  placeOrderCheckout,
  setAddressId,
} from '../state/slices/checkout.slice'
import { useAppSelector } from './useAppSelector'

export const useCheckout = () => {
  const { addressId } = useAppSelector((state) => state.checkoutState)

  const dispatch = useAppDispatch()

  const handleSetAddressId = useCallback((selectedAddressId: string) => {
    dispatch(setAddressId(selectedAddressId))
  }, [])

  const handlePlaceOrder = useCallback(() => {}, [addressId, dispatch])

  return {
    handleSetAddressId,
    handlePlaceOrder,
    addressId,
  }
}

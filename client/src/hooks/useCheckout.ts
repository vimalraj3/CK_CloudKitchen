import React, { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { placeOrderCheckout } from '../state/slices/checkout.slice'

export const useCheckout = () => {
  const [selectedAddressId, setSelectedAddressId] = React.useState('')

  const addressId = useRef('')

  useEffect(() => {
    console.log(selectedAddressId)
    addressId.current = selectedAddressId
  }, [selectedAddressId, setSelectedAddressId, addressId])

  const dispatch = useAppDispatch()

  const handlePlaceOrder = useCallback(() => {
    console.log(addressId, 'selected address id')

    if (selectedAddressId !== '') {
      dispatch(placeOrderCheckout(selectedAddressId))
    }
  }, [selectedAddressId, dispatch])

  return { selectedAddressId, setSelectedAddressId, handlePlaceOrder }
}

import React, { useCallback } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { userLogout } from '../state/slices/user.slice'
import { ResetCart } from '../state/slices/cart.slice'
import { resetAddress } from '../state/slices/address.slice'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleLogout = useCallback(async () => {
    const logoutData = await dispatch(userLogout())
    dispatch(ResetCart())
    dispatch(resetAddress())
    if (userLogout.fulfilled.match(logoutData)) {
      navigate(-1)
    }
  }, [])
  return { handleLogout }
}

import { useCallback, useState } from 'react'
import { IAddress } from '../types/user.types'
import { useAppDispatch } from './useAppDispatch'
import { addUserAddress, editUserAddress } from '../state/slices/address.slice'

type returnUseEditUserAddress = [
  (data: IAddress, newAddress: boolean) => void,
  string,
  string
]

export const useEditUserAddress = (): returnUseEditUserAddress => {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(
    async (data: IAddress, newAddress: boolean) => {
      if (!newAddress) {
        const response = await dispatch(
          editUserAddress({ address: data, id: data._id })
        )
        if (editUserAddress.fulfilled.match(response)) {
          setSuccess('Successfully address updated')
        } else {
          if (editUserAddress.rejected.match(response)) {
            setError(response.payload?.message || 'Something went wrong')
          }
        }
      } else {
        const response = await dispatch(addUserAddress(data))
        if (editUserAddress.fulfilled.match(response)) {
          setSuccess('Successfully address updated')
        } else {
          if (editUserAddress.rejected.match(response)) {
            setError(response.payload?.message || 'Something went wrong')
          }
        }
      }
    },
    []
  )

  return [handleSubmit, error, success]
}

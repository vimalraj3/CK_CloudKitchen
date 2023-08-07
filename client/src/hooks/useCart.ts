import { useAppDispatch } from './useAppDispatch'
import { deleteCartFoodById, updateCartById } from '../state/slices/cart.slice'
import toast from 'react-hot-toast'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const handleCartQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return
    const data = dispatch(updateCartById({ foodId: id, quantity: quantity }))
    toast.promise(
      data,
      {
        loading: 'setting quantity',
        success: (data) => {
          console.log(data)
          if (!data.payload?.success) {
            throw data.payload?.message
          }
          return `${data.payload?.message.trim()}`
        },
        error: (err) => {
          return `${err}`
        },
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 2000,
        },
      }
    )
  }

  const handleCartDelete = (id: string) => {
    if (id) {
      const data = dispatch(deleteCartFoodById(id))

      toast.promise(
        data,
        {
          loading: 'Deleting item from cart',
          success: (data) => {
            if (!data.payload?.success) {
              throw data.payload?.message
            }
            return `${data.payload?.message.trim()}`
          },
          error: (err) => {
            return `${err}`
          },
        },
        {
          success: {
            duration: 2000,
            icon: '🥹',
          },
          error: {
            duration: 2000,
          },
        }
      )
    }
  }

  return { handleCartQuantity, handleCartDelete }
}

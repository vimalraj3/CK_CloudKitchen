import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from '@reduxjs/toolkit'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { isAxiosError } from 'axios'
import { AppDispatch, RootState, store } from '../store'
import { IOrder } from '../../types/order.types'
import toast from 'react-hot-toast'
interface RejectedAction extends Action {
  payload: ServerError
}

interface initialState {
  loading: boolean
  addressId: string
  restaurantId: string
  orders: IOrder[]
  error: ServerError | null
}
interface ServerResponse {
  orders: IOrder[]
  success: boolean
}

const initialState: initialState = {
  loading: false,
  orders: [],
  error: null,
  addressId: '',
  restaurantId: '',
}

// * ============================================================================
// ? place order
export const placeOrderCheckout = createAsyncThunk<
  ServerResponse,
  { addressId: string; cartId: string },
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('checkout/placeOrder', async (addressId, thunkApi) => {
  console.log(addressId, 'address info')

  const response = await Axios.post(`/order/checkout`, { ...addressId })
    .then(async (res) => {
      return res.data
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
// ? place order
export const setAddressId = createAsyncThunk<
  string,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('checkout/setAddressId', async (addressId, thunkApi) => {
  return addressId
})

// * ============================================================================
// ? Get user Orders
export const getMyOrders = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('checkout/getMyOrders', async (_, thunkApi) => {
  const response = await Axios.get(`/order/myorders`)
    .then(async (res) => {
      return res.data
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
// ? Get Admin Orders
export const getAdminOrders = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('checkout/getAdminOrders', async (_, thunkApi) => {
  const response = await Axios.get(`/order/restaurantorders`)
    .then(async (res) => {
      return res.data
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

// * ============================================================================

export const checkoutReducer = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.orders = action.payload.orders
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.orders = action.payload.orders
      })
      .addCase(setAddressId.fulfilled, (state, action) => {
        state.addressId = action.payload
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        if (state.error && state.error.message !== action.payload.message) {
          if (action.payload.success) {
            toast.success(action.payload.message)
          } else {
            toast.error(action.payload.message)
          }
        }
        state.error = action.payload
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
        state.error = null
      })
  },
})

export default checkoutReducer.reducer

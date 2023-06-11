import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
  PayloadAction,
  ThunkDispatch,
  ThunkAction,
} from '@reduxjs/toolkit'
import { IRestaurant } from '../../types/Restaurant.types'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { isAxiosError } from 'axios'
import { AppDispatch, RootState, store } from '../store'
import { IFoodCart, ServerResponseICart } from '../../types/cart.types'
import { useHandleError } from '../../hooks/useHandleError'
import { IOrder } from '../../types/order.types'
interface RejectedAction extends Action {
  payload: ServerError
}

interface initialState {
  loading: boolean
  orders: IOrder[]
  error: ServerError | null
}
interface ServerResponse {
  order: IOrder[]
  success: boolean
}

const initialState: initialState = {
  loading: false,
  orders: [],
  error: null,
}

// * ============================================================================
// ? place order
export const placeOrderCheckout = createAsyncThunk<
  ServerResponse,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('checkout/placeOrder', async (addressId, thunkApi) => {
  const response = await Axios.post(`/order/checkout`, { addressId })
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
        state.orders = action.payload.order
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
        state.error = null
      })
  },
})

export default checkoutReducer.reducer

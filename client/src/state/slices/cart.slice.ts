import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from '@reduxjs/toolkit'
import { IRestaurant } from '../../types/Restaurant.types'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { isAxiosError } from 'axios'
import { AppDispatch, RootState } from '../store'
import { IFoodCart, ServerResponseICart } from '../../types/cart.types'

interface RejectedAction extends Action {
  payload: ServerError
}

interface initialState {
  loading: boolean
  cart: IFoodCart[]
  restaurant: IRestaurant | null
  restaurantId: string | null
  totalPrice: number
  error: ServerError | null
}

const initialState: initialState = {
  loading: false,
  cart: [],
  restaurant: null,
  error: null,
  restaurantId: null,
  totalPrice: 0,
}

interface ServerResponse {
  cart: ServerResponseICart
  success: boolean
}

// * ============================================================================
// ? user fetchCartByUserId
export const fetchCartByUserId = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>(
  'cart/fetchCartByUserId',
  async (_, thunkApi) => {
    const response = await Axios.get(`/cart/get`)
      .then(async (res) => {
        console.log(res.data, 'res data')

        return res.data
      })
      .catch((err: ServerError) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data as ServerError)
        }
      })
    return response
  },
  {
    condition: (args, { getState }) => {
      const { cartState } = getState()
      const { cart } = cartState
      if (cart.length === 0) {
        return true
      }
      return false
    },
  }
)

// * ============================================================================
// ? Add to Cart
export const addToCart = createAsyncThunk<
  ServerResponse,
  {
    foodId: string
    restaurantId: string
    quantity: number
  },
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/addToCart', async (food, thunkApi) => {
  const response = await Axios.post('/cart/add', food)
    .then((res) => res.data)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================

// ? update cart by id
export const updateCartById = createAsyncThunk<
  ServerResponse,
  { foodId: string; quantity: number },
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>(
  'cart/updateCartById',
  async (food, thunkApi) => {
    const response = await Axios.patch(`/food/setquantity`, { ...food })
      .then((res) => res.data)
      .catch((err) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data)
        }
      })
    return response
  },
  {
    condition: (args, { getState }) => {
      const { cartState } = getState()
      const { cart } = cartState
      const { quantity } = args
      if (quantity > 0) {
        return true
      }
      return false
    },
  }
)

// * ============================================================================
// ? delete food by  id
export const deleteFoodById = createAsyncThunk<
  ServerResponse,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/deleteFoodById', async (id, thunkApi) => {
  const response = await Axios.delete(`/cart/delfood/${id}`)
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload.cart.restaurantId
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
      })
      .addCase(updateCartById.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
      })
      .addCase(deleteFoodById.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        state.error = {
          message: action.payload?.message ?? 'something went wrong',
          success: action.payload?.success ?? false,
        }
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
      })
  },
})

export default cartSlice.reducer

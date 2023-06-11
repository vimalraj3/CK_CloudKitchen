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
import { setError, setErrors } from './error.slice'
import { useAppDispatch } from '../../hooks'
import { useHandleError } from '../../hooks/useHandleError'
// const dispatch = useDispatch()
interface RejectedAction extends Action {
  payload: ServerError
}

type AppThunkDispatch = ThunkDispatch<RootState, undefined, AnyAction>

interface initialState {
  loading: boolean
  cart: IFoodCart[]
  restaurant: IRestaurant | null
  restaurantId: string | null
  totalPrice: number
  askClean: boolean
}
interface ServerResponse {
  cart: ServerResponseICart
  success: boolean
}

const initialState: initialState = {
  loading: false,
  cart: [],
  restaurant: null,
  restaurantId: null,
  totalPrice: 0,
  askClean: false,
}

// * ============================================================================
// ? centerized error handling
const { setServerError } = useHandleError()

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
// ? clean and Add to Cart
export const clearAndAddToCart = createAsyncThunk<
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
>('cart/clearAndAddToCart', async (food, thunkApi) => {
  const response = await Axios.post('/cart/clearandaddtocart', food)
    .then((res) => res.data)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================
// ? clean   Cart
export const clearCart = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/clearCart', async (food, thunkApi) => {
  const response = await Axios.post('/cart/clear', food)
    .then((res) => res.data)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

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
// ? set ask clean
export const setAskClean = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/setAskClean', async (food, thunkApi) => {})

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
  async (cart, thunkApi) => {
    const response = await Axios.patch(`/cart/setquantity`, { ...cart })
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
      if (quantity >= 1) {
        console.log(quantity, 'quantity')

        return true
      }
      return false
    },
  }
)

// * ============================================================================
// ? delete food by  id
export const deleteCartFoodById = createAsyncThunk<
  ServerResponse,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/deleteCartFoodById', async (id, thunkApi) => {
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
// ? Logout
export const ResetCart = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('cart/reset', async (id, thunkApi) => {})

// * ============================================================================

/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

const setErrorToErrorState = (action: ServerError) => {
  // setError({
  //   message: action.message,
  //   success: action.success,
  // })
  console.log('called')
}

// * ============================================================================

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ServerError>) => {
      setError(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload.cart.restaurantId
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
        state.askClean = false
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.cart.foods) state.cart = action.payload.cart.foods
        state.restaurant = action.payload.cart.restaurantId
        state.askClean = false
        state.totalPrice = action.payload.cart.totalPrice
      })
      .addCase(updateCartById.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
        state.restaurant = action.payload.cart.restaurantId
        state.askClean = false
        state.totalPrice = action.payload.cart.totalPrice
      })
      .addCase(deleteCartFoodById.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
        state.restaurant = action.payload.cart.restaurantId
      })
      .addCase(clearAndAddToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
        state.restaurant = action.payload.cart.restaurantId
        state.askClean = false
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload.cart.foods
        state.totalPrice = action.payload.cart.totalPrice
        state.restaurant = action.payload.cart.restaurantId
        state.askClean = false
      })
      .addCase(ResetCart.fulfilled, (state, action) => {
        state = initialState
      })
      .addCase(setAskClean.fulfilled, (state, action) => {
        state.askClean = !state.askClean
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        if (action.payload) {
          setServerError(action.payload)
        }
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
      })
  },
})

export default cartReducer.reducer

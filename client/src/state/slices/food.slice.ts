import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from '@reduxjs/toolkit'
import {
  IRestaurant,
  AddRestaurantFormValidationType,
} from '../../types/Restaurant.types'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { isAxiosError } from 'axios'
import { AppDispatch, RootState } from '../store'
import { IFood } from '../../types/Food.types'
import { IOwner } from '../../types/owner.types'
import { setError } from './error.slice'
import { useHandleError } from '../../hooks/useHandleError'
import { IReviewModel } from '../../types/reviews.types'

interface RejectedAction extends Action {
  payload: ServerError
}

interface initialState {
  loading: boolean
  foods: IFood[]
  currentRestaurant: IRestaurant | null
  currentRestaurantId: string | null
  reviews: IReviewModel | null
  owner: IOwner
  error: ServerError | null
}

const initialState: initialState = {
  loading: false,
  foods: [],
  currentRestaurant: null,
  currentRestaurantId: null,
  owner: {
    isOwner: false,
    restaurantId: '',
  },
  error: null,
  reviews: null,
}

interface ServerResponse {
  food: IRestaurant
  success: boolean
}
// * ============================================================================
// ? Centerized error handling
const { setServerError } = useHandleError()

// * ============================================================================
// ? user fetchFoodAndRestaurantByRestaurantId
export const fetchFoodAndRestaurantByRestaurantId = createAsyncThunk<
  { food: IFood[]; restaurant: IRestaurant; reviews: IReviewModel },
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>(
  'food/fetchFoodAndRestaurantByRestaurantId',
  async (restaurantId, thunkApi) => {
    const response = await Axios.get(`/restaurant/${restaurantId}`)
      .then(async (res) => {
        return res.data
      })
      .catch((err: ServerError) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data as ServerError)
        }
      })
    return response
  }
)

// * ============================================================================
// ? Add new food
export const addFood = createAsyncThunk<
  IFood,
  FormData,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('food/addFood', async (food, thunkApi) => {
  const response = await Axios.post('/food/new', food)
    .then((res) => res.data.food)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================

// ? update food by id
export const updateFoodById = createAsyncThunk<
  IFood,
  { data: FormData; id: string },
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('food/updateFoodById', async ({ data, id }, thunkApi) => {
  const response = await Axios.patch(`/food/${id}`, { update: data })
    .then((res) => res.data.food)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================
// ? delete food by  id
export const deleteFoodById = createAsyncThunk<
  ServerError,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('food/deleteFoodById', async (id, thunkApi) => {
  const response = await Axios.delete(`/food/${id}`)
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
// ?  Get all foods
export const getAllFoods = createAsyncThunk<
  IFood[],
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('foods/getAllFoods', async (_, thunkApi) => {
  const response = await Axios.get(`/food/all`)
    .then(async (res) => {
      return res.data.food
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
// ?  Get all reviews
export const getAllReviews = createAsyncThunk<
  IReviewModel,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('foods/getAllReviews', async (restaurantId, thunkApi) => {
  const response = await Axios.get(`/reviews/${restaurantId}`)
    .then(async (res) => {
      return res.data.reviews
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

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFoodAndRestaurantByRestaurantId.fulfilled,
        (state, action) => {
          state.loading = false
          state.foods = action.payload.food
          state.currentRestaurant = action.payload.restaurant
          state.currentRestaurantId = action.payload.restaurant._id
          state.reviews = action.payload.reviews
        }
      )
      .addCase(addFood.fulfilled, (state, action) => {
        state.loading = false
        state.foods[state.foods.length] = action.payload
      })
      .addCase(updateFoodById.fulfilled, (state, action) => {
        state.loading = false
        state.foods = state.foods.map((v) => {
          if (v._id === action.payload._id) {
            v = action.payload
          }
          return v
        })
      })
      .addCase(deleteFoodById.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getAllFoods.fulfilled, (state, action) => {
        state.loading = false
        state.foods = action.payload
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false
        state.reviews = action.payload
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
      })
  },
})

export default foodSlice.reducer

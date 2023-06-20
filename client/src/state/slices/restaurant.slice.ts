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
import { IOwner } from '../../types/owner.types'
import { IFilters } from './restaurants.slice'

interface RejectedAction extends Action {
  payload: ServerError
}

interface initialState {
  loading: boolean
  restaurant: IRestaurant | null
  restaurants: IRestaurant[]
  owner: IOwner
  error: ServerError | null
}

const initialState: initialState = {
  loading: false,
  restaurant: null,
  restaurants: [],
  owner: {
    isOwner: false,
    restaurantId: '',
  },
  error: null,
}

// * ============================================================================
// ? user fetchRestaurantByUserId

export const fetchRestaurantByUserId = createAsyncThunk<
  IRestaurant,
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>(
  'restaurant/fetchRestaurantByUserId',
  async (_, thunkApi) => {
    const response = await Axios.get('/restaurant/admin/byuserid')
      .then(async (res) => {
        return res.data.restaurant
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
      const { restaurantState } = getState()
      const { restaurant } = restaurantState
      if (restaurant?.restaurantName === '') {
        return true
      }
    },
  }
)

// * ============================================================================
// ? Add new restaurant
export const addRestaurant = createAsyncThunk<
  IRestaurant,
  FormData,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('restaurant/addRestaurant', async (restaurant, thunkApi) => {
  const response = await Axios.post('/restaurant/new', restaurant)
    .then((res) => res.data.restaurant)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================

// ? fetch Restaurant by restaurant id
export const fetchRestaurantById = createAsyncThunk<
  IRestaurant,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('restaurant/fetchRestaurantById', async (restaurantId, thunkApi) => {
  const response = await Axios.get(`/restaurant/${restaurantId}`)
    .then((res) => res.data.restaurant)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

// * ============================================================================
// ? Update restaurant by restaurant id
export const updateRestaurant = createAsyncThunk<
  IRestaurant,
  AddRestaurantFormValidationType,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('restaurant/updateRestaurant', async (restaurant, thunkApi) => {
  const response = await Axios.patch(`/restaurant/admin/update`, { restaurant })
    .then(async (res) => {
      return res.data.restaurant
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
// ? Update restaurant by restaurant id
export const deleteRestaurantById = createAsyncThunk<
  void,
  string,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('restaurant/deleteRestaurant', async (restaurantId, thunkApi) => {
  const response = await Axios.delete(`/restaurant/${restaurantId}`)
    .then(async (res) => {
      return res.data.restaurant
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
// ?  Get all restaurants

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

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = action.payload
      })
      .addCase(deleteRestaurantById.fulfilled, (state, action) => {
        state.loading = false
        state.restaurant = null
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
        state.error = action.payload as ServerError
      })
      .addMatcher(isPending, (state) => {
        state.loading = true
      })
  },
})

export default restaurantSlice.reducer

import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
  isPending,
} from '@reduxjs/toolkit'
import { AppDispatch, RootState, store } from '../store'
import { IRestaurant } from '../../types/Restaurant.types'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { isAxiosError } from 'axios'

export interface IFilters {
  rating: number
  price: {
    min: number
    max: number
  }
}

export enum SortedBy {
  rating = 'rating',
  lowToHigh = 'price-low-to-high',
  highToLow = 'price-high-to-low',
  empty = '',
}

interface initialState {
  search: string
  sortedBy: SortedBy
  filter: IFilters
  restaurants: IRestaurant[]
  canClear: boolean
  loading: boolean
  error: ServerError | null
}

// * Default values
const filtersDefault: IFilters = {
  rating: 0,
  price: {
    min: 0,
    max: 0,
  },
}

const sortedByDefault: SortedBy = SortedBy.empty

const initialState: initialState = {
  search: '',
  sortedBy: sortedByDefault,
  filter: filtersDefault,
  restaurants: [],
  canClear: false,
  error: null,
  loading: false,
}

// * ============================================================================
// ? set sorted by
export const setSortedBy = createAsyncThunk<
  SortedBy,
  SortedBy,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setSortedBy', async (sortedBy, thunkApi) => {
  return sortedBy
})

// * ============================================================================
// ? set filter
export const setFilter = createAsyncThunk<
  IFilters,
  IFilters,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setFilter', async (filter, thunkApi) => {
  return filter
})

// * ============================================================================
// ? set price filter
export const setPriceFilter = createAsyncThunk<
  { value: number; isMin: boolean },
  { value: number; isMin: boolean },
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setPriceFilter', async ({ value, isMin }, thunkApi) => {
  return { value: value >= 0 ? value : 0, isMin }
})

// * ============================================================================
// ? set search
export const setSearch = createAsyncThunk<
  string,
  string,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setSearch', async (search, thunkApi) => {
  return search
})

// * ============================================================================
// ? set Clear
export const setClear = createAsyncThunk<
  IRestaurant[],
  void,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setClear', async (_, thunkApi) => {
  let queryUrl = '/restaurant/all?'
  const response = await Axios.get(queryUrl)
    .then(async (res) => {
      return res.data.restaurants
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
export const getAllRestaurants = createAsyncThunk<
  IRestaurant[],
  void,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('restaurant/getAllRestaurants', async (_, thunkApi) => {
  let queryUrl = '/restaurant/all?'

  const { search, sortedBy, filter } = thunkApi.getState().restaurantsState

  if (search) queryUrl += `searchQuery=${search}&`

  if (sortedBy) queryUrl += `sortOption=${sortedBy}&`

  const { min, max } = filter.price
  if (min > 0 || max > 0) {
    queryUrl += `priceRange=${min}-${max}&`
  }

  if (filter.rating) queryUrl += `rating=${filter.rating}`

  const response = await Axios.get(queryUrl)
    .then(async (res) => {
      return res.data.restaurants
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
    })
  return response
})

// * ============================================================================
interface RejectedAction extends Action {
  payload: ServerError
}
/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

export const restaurantsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setFilter.fulfilled, (state, action) => {
        state.filter = action.payload
        state.canClear = true
        state.loading = false
      })
      .addCase(setSortedBy.fulfilled, (state, action) => {
        state.sortedBy = action.payload
        state.canClear = true
        state.loading = false
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload
        state.loading = false
        if (state.search) state.canClear = true
      })
      .addCase(setSearch.fulfilled, (state, action) => {
        state.search = action.payload
        state.loading = false
      })
      .addCase(setPriceFilter.fulfilled, (state, action) => {
        const { isMin, value } = action.payload
        state.canClear = true
        isMin
          ? (state.filter.price.min = value)
          : (state.filter.price.max = value)
        state.loading = false
      })
      .addCase(setClear.fulfilled, (state, action) => {
        state.search = ''
        state.canClear = false
        state.filter = filtersDefault
        state.sortedBy = sortedByDefault
        state.restaurants = action.payload
        state.loading = false
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

export default restaurantsSlice.reducer

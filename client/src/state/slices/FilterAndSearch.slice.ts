import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState, store } from '../store'

export interface IFilters {
  rating: number
  price: {
    min: number
    max: number
  }
}

export interface ISortBy {
  rating: boolean
  price: {
    lowToHigh: boolean
    highToLow: boolean
  }
}

interface initialState {
  search: string
  sortedBy: ISortBy
  filter: IFilters
  canClear: boolean
}

// * Default values
const filtersDefault: IFilters = {
  rating: 0,
  price: {
    min: 0,
    max: 0,
  },
}

const sortedByDefault: ISortBy = {
  rating: false,
  price: {
    lowToHigh: false,
    highToLow: false,
  },
}

const initialState: initialState = {
  search: '',
  sortedBy: sortedByDefault,
  filter: filtersDefault,
  canClear: false,
}

// * ============================================================================
// ? set sorted by
export const setSortedBy = createAsyncThunk<
  ISortBy,
  ISortBy,
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
  void,
  void,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('filter/setClear', async (search, thunkApi) => {})

// * ============================================================================

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setFilter.fulfilled, (state, action) => {
        state.filter = action.payload
        state.canClear = true
      })
      .addCase(setSortedBy.fulfilled, (state, action) => {
        state.sortedBy = action.payload
        state.canClear = true
      })
      .addCase(setSearch.fulfilled, (state, action) => {
        state.search = action.payload
      })
      .addCase(setPriceFilter.fulfilled, (state, action) => {
        const { isMin, value } = action.payload
        state.canClear = true
        isMin
          ? (state.filter.price.min = value)
          : (state.filter.price.max = value)
      })
      .addCase(setClear.fulfilled, (state, action) => {
        state.search = ''
        state.canClear = false
        state.filter = filtersDefault
        state.sortedBy = sortedByDefault
      })
  },
})

export default filterSlice.reducer

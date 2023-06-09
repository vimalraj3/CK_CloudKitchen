import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServerError } from '../../types/error.types'
import { AppDispatch, RootState } from '../store'

interface ErrorState {
  error: ServerError | null
}

const initialState: ErrorState = {
  error: null,
}

export const setErrors = createAsyncThunk<
  ServerError,
  ServerError,
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  }
>('error/set', async (error, thunkApi) => error)

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState['error']>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setError, (state, action) => {
      if (action.payload) {
        const error = action.payload
        state.error = {
          message: error.message,
          success: error.success,
        }
      }
    })
  },
})
export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer

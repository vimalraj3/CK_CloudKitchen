import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from '@reduxjs/toolkit'
import {
  IAddress,
  IUser,
  InitialUserState,
  UserSession,
} from '../../types/user.types'
import { Axios } from '../../axios/config'
import { ServerError } from '../../types/error.types'
import { Login, SignUp } from '../../types/user.types'
import axios, { AxiosResponse, AxiosError, isAxiosError } from 'axios'
import { AppDispatch, RootState } from '../store'
import { useAppDispatch } from '../../hooks'
import { useHandleError } from '../../hooks/useHandleError'
interface RejectedAction extends Action {
  payload: ServerError
}

const defaultUserSession: UserSession = {
  email: '',
  userName: '',
  avatar: '',
  auth: {
    isAuth: false,
    isUser: false,
    isAdmin: false,
  },
  geo: {
    region: 'Location',
  },
  address: [],
}

const initialState = {
  loading: false,
  data: defaultUserSession,
  error: null,
} as InitialUserState

interface ServerResponse {
  user: IUser
  success: boolean
}

// ? Centerized error handling
const { setServerError } = useHandleError()

/**
 * login user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface Iuser
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const loginUser = createAsyncThunk<
  UserSession, // return type
  Login, // Types for function
  {
    rejectValue: ServerError
    state: RootState
  } // config
>('user/login', async (user: Login, thunkApi) => {
  try {
    const { data } = await Axios.post<ServerResponse>('/auth/login', user)
    console.log(data, 'logoin data')

    const userSession: UserSession = {
      ...defaultUserSession,
      ...data.user,
      auth: {
        isAuth: true,
        isUser: data.user.role === 'user' ? true : false,
        isAdmin: data.user.role === 'admin' ? true : false,
      },
      geo: {
        region: '',
      },
    }
    return userSession
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data
    }
    return { message: 'something went wrong', success: false }
  }
})

/**
 * signup user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface SingUp
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const signUpUser = createAsyncThunk<
  UserSession, // return type
  SignUp, // Types for function
  {
    rejectValue: ServerError
  } // config
>('user/signup', async (user: SignUp, thunkApi) => {
  const response = await Axios.post<ServerResponse>('/auth/signup')
    .then(async (res) => {
      let locate, lat, lon
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude
          lon = position.coords.longitude
        })
        if (lat && lon) {
          locate = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={${
              import.meta.env.VITE_LOCATION_API_KEY
            }}`
          )
        }
      }

      let userData = res.data.user

      const userSession: UserSession = {
        ...defaultUserSession,
        ...userData,
        auth: {
          ...defaultUserSession.auth,
          isAuth: true,
          isUser: userData.role === 'user' ? true : false,
          isAdmin: userData.role === 'admin' ? true : false,
        },
        geo: {
          region: locate?.data.name || 'Your location',
        },
      }

      return userSession
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response || defaultUserSession
})

/**
 * logout user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 */
export const userLogout = createAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    try {
      const response = await Axios.post('/auth/logout')
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<ServerError>
        return thunkApi.rejectWithValue(err.response?.data as ServerError)
      }
      return { message: 'something went wrong', success: false } as ServerError
    }
  }
)

/**   signup user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface SingUp
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const fetchUser = createAsyncThunk<
  UserSession, // return type
  void, // Types for function
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  } // config
>(
  'user/fetch',
  async (_, thunkApi) => {
    const response = await Axios.get<ServerResponse>('/auth/getuser')
      .then(async (res) => {
        let locate, lat, lon
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude
            lon = position.coords.longitude
          })
          if (lat && lon) {
            locate = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={${
                import.meta.env.VITE_LOCATION_API_KEY
              }}`
            )
          }
        }

        let userData = res.data.user

        const userSession: UserSession = {
          ...defaultUserSession,
          ...userData,
          auth: {
            ...defaultUserSession.auth,
            isAuth: true,
            isUser: userData.role === 'user' ? true : false,
            isAdmin: userData.role === 'admin' ? true : false,
          },
          geo: {
            region: locate?.data.name || 'Your location',
          },
        }

        return userSession
      })
      .catch((err: ServerError) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data)
        }
      })
    return response || defaultUserSession
  },
  {
    condition: (args, { getState }) => {
      const { userState } = getState()
      const { loading, data } = userState
      if (data.userName === '') {
        return true
      }
    },
  }
)

// * user fetchUserAddress
export const fetchUserAddress = createAsyncThunk<
  IAddress[], // return type
  void, // Types for function
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  } // config
>(
  'user/fetchUserAddress',
  async (_, thunkApi) => {
    const response = await Axios.get('/auth/address')
      .then(async (res) => {
        return res.data.address
      })
      .catch((err: ServerError) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data)
        }
      })
    return response
  },
  {
    condition: (args, { getState }) => {
      const { userState } = getState()
      const { data } = userState
      if (data.address.length === 0) {
        return true
      }
    },
  }
)

// * Thunk action creator for forget password
export const forgetPasswordApi = createAsyncThunk<
  ServerError, // return type
  string, // Types for function
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  } // config
>('user/forgetpassword', async (email, thunkApi) => {
  await Axios.post<ServerError>('auth/forgotpassword', {
    email,
  })
    .then((res) => res)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return { success: true, message: 'Email was sent to ' + email }
})

// * Thunk action creator for reset password
export const resetPasswordApi = createAsyncThunk<
  ServerError | { success: boolean; message: string } | undefined, // return type
  { token: string; password: string }, // Types for function
  {
    rejectValue: ServerError
    state: RootState
    dispatch: AppDispatch
  } // config
>('user/forgetpassword', async (data, thunkApi) => {
  const response = await Axios.patch(`auth/resetpassword/${data.token}`, {
    password: data.password,
  })
    .then((res) => {
      return { success: true, message: 'Password reseted successfully' }
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data)
      }
    })
  return response
})

/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.data = action.payload
          state.loading = false
          sessionStorage.setItem('User', JSON.stringify(action.payload))
        }
      )
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.loading = false
          state.data = action.payload
          sessionStorage.setItem('User', JSON.stringify(action.payload))
        }
      )
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.loading = false
          state.data = action.payload
          sessionStorage.setItem('User', JSON.stringify(action.payload))
        }
      )
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false
        state.data = defaultUserSession
        sessionStorage.removeItem('User')
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.loading = false
        state.data.address = action.payload
        sessionStorage.setItem('User', JSON.stringify(state.data))
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

export default userSlice.reducer

import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import { IUser, InitialUserState, UserSession } from "../../types/user.types";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import { Login, SignUp } from "../../types/user.types";
import axios, { AxiosResponse, AxiosError, isAxiosError } from "axios";
import { AppDispatch, RootState } from "../store";
import { useAppDispatch } from "../../hooks";
interface RejectedAction extends Action {
  payload: ServerError;
}

interface AsyncThunkConfig {
  rejectValue: ServerError;
}

const defaultUserSession: UserSession = {
  email: "",
  userName: "",
  avatar: "",
  auth: {
    isAuth: false,
    isUser: false,
    isAdmin: false,
  },
  geo: {
    region: "Location",
  },
};

const initialState = {
  loading: false,
  data: defaultUserSession,
  error: null,
} as InitialUserState;

interface ServerResponse {
  user: IUser;
  success: boolean;
}

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
    rejectValue: ServerError;
    state: RootState;
  } // config
>("user/login", async (user: Login, thunkApi) => {
  try {
    const { data } = await Axios.post<ServerResponse>("/auth/login", user);
    console.log(data, "logoin data");

    const userSession: UserSession = {
      ...defaultUserSession,
      ...data.user,
      auth: {
        isAuth: true,
        isUser: data.user.role === "user" ? true : false,
        isAdmin: data.user.role === "admin" ? true : false,
      },
      geo: {
        region: "",
      },
    };
    return userSession;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
    return { message: "something went wrong", success: false };
  }
});

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
    rejectValue: ServerError;
  } // config
>("user/signup", async (user: SignUp, thunkApi) => {
  const response = await Axios.get<ServerResponse>("/auth/getuser")
    .then(async (res) => {
      let locate, lat, lon;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        });
        if (lat && lon) {
          locate = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={${
              import.meta.env.VITE_LOCATION_API_KEY
            }}`
          );
        }
      }

      let userData = res.data.user;
      const userSession: UserSession = {
        ...defaultUserSession,
        ...userData,
        auth: {
          ...defaultUserSession.auth,
          isAuth: true,
          isUser: userData.role === "user" ? true : false,
          isAdmin: userData.role === "admin" ? true : false,
        },
        geo: {
          region: locate?.data.name || "Your location",
        },
      };

      return userSession;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    });
  return response || defaultUserSession;
});

/**
 * logout user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 */
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      const response = await Axios.post("/auth/logout");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<ServerError>;
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
      return { message: "something went wrong", success: false } as ServerError;
    }
  }
);

/**   signup user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface SingUp
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const fetchUser = createAsyncThunk<
  UserSession, // return type
  void, // Types for function
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  } // config
>(
  "user/fetch",
  async (_, thunkApi) => {
    const response = await Axios.get<ServerResponse>("/auth/getuser")
      .then(async (res) => {
        let locate, lat, lon;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
          });
          if (lat && lon) {
            locate = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={${
                import.meta.env.VITE_LOCATION_API_KEY
              }}`
            );
          }
        }

        let userData = res.data.user;
        const userSession: UserSession = {
          ...defaultUserSession,
          ...userData,
          auth: {
            ...defaultUserSession.auth,
            isAuth: true,
            isUser: userData.role === "user" ? true : false,
            isAdmin: userData.role === "admin" ? true : false,
          },
          geo: {
            region: locate?.data.name || "Your location",
          },
        };

        return userSession;
      })
      .catch((err: ServerError) => {
        if (isAxiosError(err)) {
          return thunkApi.rejectWithValue(err.response?.data);
        }
      });
    return response || defaultUserSession;
  },
  {
    condition: (args, { getState }) => {
      const { userState } = getState();
      const { loading, data } = userState;
      if (data.userName === "") {
        return true;
      }
    },
  }
);

/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.data = action.payload;
          state.loading = false;
          sessionStorage.setItem("User", JSON.stringify(action.payload));
        }
      )
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.loading = false;
          state.data = action.payload;
          sessionStorage.setItem("User", JSON.stringify(action.payload));
        }
      )
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserSession>) => {
          state.loading = false;
          state.data = action.payload;
          sessionStorage.setItem("User", JSON.stringify(action.payload));
        }
      )
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = defaultUserSession;
        sessionStorage.removeItem("User");
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = {
          message: action.payload?.message ?? "something went wrong",
          success: action.payload?.success ?? false,
        };
      })
      .addMatcher(isPending, (state) => {
        console.log("action  is pending");
        state.loading = true;
      });
  },
});

export default userSlice.reducer;

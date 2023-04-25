import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import { IUser, InitialUserState } from "../../types/user.types";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import { produce } from "immer";
import { Login, SignUp } from "../../types/user.types";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { success } from "./product.slice";
import { RootState } from "../store";

interface RejectedAction extends Action {
  payload: ServerError;
}

interface AsyncThunkConfig {
  rejectValue: ServerError;
}
const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("User") as string),
  error: null,
} as InitialUserState;

/**
 * login user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface Iuser
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const loginUser = createAsyncThunk<
  IUser, // return type
  Login, // Types for function
  {
    rejectValue: ServerError;
  } // config
>("user/login", async (user: Login, thunkApi) => {
  try {
    const response = await Axios.post("/auth/login", user);
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error)) {
      const err = error as AxiosError<ServerError>;
      return thunkApi.rejectWithValue(err.response?.data as ServerError);
    }
    return { message: "something went wrong", success: false } as ServerError;
  }
});

/**
 * signup user thunk action creator function that returns a promise of IUser type and takes user object and ThunkAPI as arguments
 * @param user - user object interface SingUp
 * @param thunkApi - ThunkAPI optional
 * @returns IUser
 */
export const signUpUser = createAsyncThunk<
  IUser, // return type
  SignUp, // Types for function
  {
    rejectValue: ServerError;
  } // config
>("user/signup", async (user: SignUp, thunkApi) => {
  try {
    const response = await Axios.post("/auth/signup", user);
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error)) {
      const err = error as AxiosError<ServerError>;
      return thunkApi.rejectWithValue(err.response?.data as ServerError);
    }
    return { message: "something went wrong", success: false } as ServerError;
  }
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

type CancelablePayloadAction<T> = PayloadAction<T> & {
  abort: () => void;
};

export const fetchUser = createAsyncThunk<
  IUser | ServerError,
  void,
  {
    rejectValue: ServerError;
    state: RootState;
  }
>(
  "user/fetchUser",
  async (_, ThunkAPI) => {
    try {
      console.log(ThunkAPI.signal);

      const source = axios.CancelToken.source();
      ThunkAPI.signal.addEventListener("abort", () => {
        source.cancel();
      });
      console.log("fetching user");

      const response = await Axios.post<IUser, AxiosResponse<IUser>>(
        "/auth/getuser",
        {
          cancelToken: source.token,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const err = error as AxiosError<ServerError>;
        return ThunkAPI.rejectWithValue(err.response?.data as ServerError);
      }
      return { message: "something went wrong", success: false } as ServerError;
    }
  },
  {
    condition: (arg, { getState, extra }) => {
      const { userState } = getState();
      const { loading, data } = userState;
      console.log(loading, data);

      if (loading === true || data !== null) {
        return false;
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.data = action.payload;
        state.loading = false;
        localStorage.setItem("User", JSON.stringify(action.payload));
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("User", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("succes fectchuser");

        state.loading = false;
        state.data = action.payload as IUser;
        localStorage.setItem("User", JSON.stringify(action.payload));
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = null;
        localStorage.removeItem("User");
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

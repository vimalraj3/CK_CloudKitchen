import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, InitialUserState } from "../../types/user.types";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import { produce } from "immer";
import { Login } from "../../types/user.types";
import { AxiosError, isAxiosError } from "axios";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("User") as string),
  error: null,
} as InitialUserState;

export const loginUser = createAsyncThunk<
  IUser, // return type
  Login, // Types for ThunkAPI
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

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*
      =========================================
      login user
      =========================================
      */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.data = action.payload;
        state.loading = false;
        localStorage.setItem("User", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          message: action.payload?.message ?? "something went wrong",
          success: action.payload?.success ?? false,
        };
      });
  },
});

export default userSlice.reducer;

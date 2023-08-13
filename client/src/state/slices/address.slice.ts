import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import { IAddress } from "../../types/user.types";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import { isAxiosError } from "axios";
import { AppDispatch, RootState } from "../store";

interface RejectedAction extends Action {
  payload: ServerError;
}

interface initialState {
  loading: boolean;
  address: IAddress[];
  error: ServerError | null;
}

const initialState: initialState = {
  loading: false,
  address: [],
  error: null,
};

// * ============================================================================
// * user fetchUserAddress
export const fetchUserAddress = createAsyncThunk<
  IAddress[],
  void,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("address/fetchUserAddress", async (_, thunkApi) => {
  const response = await Axios.get("/auth/address")
    .then(async (res) => {
      return res.data.address;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================
// ? Add new user address
export const addUserAddress = createAsyncThunk<
  IAddress[],
  IAddress,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("address/addUserAddress", async (address, thunkApi) => {
  const response = await Axios.post("/auth/address", { ...address })
    .then((res) => res.data.address)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    });
  return response;
});

// * ============================================================================

// ? delete user address
export const deleteUserAddress = createAsyncThunk<
  IAddress[],
  string,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("address/deleteUserAddress", async (addressId, thunkApi) => {
  const response = await Axios.delete(`/auth/address/${addressId}`)
    .then((res) => res.data.address)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    });
  return response;
});

// * ============================================================================

export const editUserAddress = createAsyncThunk<
  IAddress[],
  { address: IAddress; id: string },
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("address/editUserAddress", async ({ address, id }, thunkApi) => {
  const response = await Axios.patch(`/auth/address/${id}`, { update: address })
    .then(async (res) => {
      return res.data.address;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================

export const resetAddress = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("address/reset", async (_, thunkApi) => {});

// * ============================================================================

/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

// * ============================================================================

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(editUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(resetAddress.fulfilled, (state) => {
        state = initialState;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith("address")) {
          state.loading = true;
        }
      });
  },
});

export default addressSlice.reducer;

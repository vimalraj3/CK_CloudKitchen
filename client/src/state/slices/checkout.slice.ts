import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import axios, { isAxiosError } from "axios";
import { AppDispatch, RootState, store } from "../store";
import { IOrder } from "../../types/order.types";
import toast from "react-hot-toast";
import Razorpay from "razorpay";
interface RejectedAction extends Action {
  payload: ServerError;
}

interface initialState {
  loading: boolean;
  addressId: string;
  restaurantId: string;
  orders: IOrder[];
  error: ServerError | null;
}
interface ServerResponse {
  orders: IOrder[];
  success: boolean;
}

const initialState: initialState = {
  loading: false,
  orders: [],
  error: null,
  addressId: "",
  restaurantId: "",
};

// * ============================================================================
// ? place order
export const placeOrderCheckout = createAsyncThunk<
  void,
  string,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("checkout/placeOrder", async (addressId, thunkApi) => {
  try {
    const { addressId } = thunkApi.getState().checkoutState;
    if (!addressId) {
      toast.error("Please select an address");

      return thunkApi.rejectWithValue({
        message: "Please select an address",
      } as ServerError);
    }

    const {
      data: { order },
    } = await Axios.post("/order/request");

    const options = {
      key: import.meta.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Cloud kitchen food order",
      description: "Enjoy your food",
      image:
        "https://res.cloudinary.com/dd39ktpmz/image/upload/v1683654934/ck/ijm30zjgcziiwy89a35a.png",
      order_id: order.id,
      handler: async function (response: Razorpay) {
        try {
          console.log(addressId, "addressId");

          const result = await Axios.post("/order/checkout", {
            addressId,
            amount: order.amount,
            response,
          });

          if (result.data.success !== true) {
            // @ts-ignore
            toast.error(result.data.message);
          } else {
            toast.success(result.data.message);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error((error.response?.data as ServerError).message);
          }
        }
      },
      prefill: {
        name: "Arun",
        email: "findme@example.com",
        contact: "920507641",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ff7e8b",
      },
    };
    // @ts-ignore
    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as ServerError);
    }
  }
});

// * ============================================================================
// ? place order
export const setAddressId = createAsyncThunk<
  string,
  string,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("checkout/setAddressId", async (addressId, thunkApi) => {
  return addressId;
});

// * ============================================================================
// ? Get user Orders
export const getMyOrders = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("checkout/getMyOrders", async (_, thunkApi) => {
  const response = await Axios.get(`/order/myorders`)
    .then(async (res) => {
      return res.data;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================
// ? Get Admin Orders
export const getAdminOrders = createAsyncThunk<
  ServerResponse,
  void,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("checkout/getAdminOrders", async (_, thunkApi) => {
  const response = await Axios.get(`/order/restaurantorders`)
    .then(async (res) => {
      return res.data;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================
// ? Get Admin Orders
export const addReview = createAsyncThunk<
  void,
  { rating: number; message: string; userId: string; foodId: string }
>(
  "checkout/getAdminOrders",
  async ({ rating, message, userId, foodId }, thunkApi) => {
    const response = Axios.post(`/review/${userId}/${foodId}`, {
      message,
      rating,
    });
    toast.promise(
      response,
      {
        loading: "adding review",
        success: (data) => {
          return "Successfully add review";
        },
        error: (err) => {
          return `Unable to add review now, try again later`;
        },
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 2000,
        },
      },
    );
  },
);

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

export const checkoutReducer = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
      })
      .addCase(setAddressId.fulfilled, (state, action) => {
        state.addressId = action.payload;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        if (state.error && state.error.message !== action.payload.message) {
          if (action.payload.success) {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        }
        state.error = action.payload;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith("checkout")) {
          state.loading = true;
          state.error = null;
        }
      });
  },
});

export default checkoutReducer.reducer;

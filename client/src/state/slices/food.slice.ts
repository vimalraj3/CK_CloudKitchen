import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import { Axios } from "../../axios/config";
import { ServerError } from "../../types/error.types";
import { isAxiosError } from "axios";
import { AppDispatch, RootState } from "../store";
import { IFood } from "../../types/Food.types";
import { IReview } from "../../types/reviews.types";
import toast from "react-hot-toast";

interface RejectedAction extends Action {
  payload: ServerError;
}

export interface IFilters {
  rating: number;
  price: {
    min: number;
    max: number;
  };
}

export enum SortedBy {
  rating = "rating",
  lowToHigh = "price-low-to-high",
  highToLow = "price-high-to-low",
  empty = "",
}
const filtersDefault: IFilters = {
  rating: 0,
  price: {
    min: 0,
    max: 0,
  },
};

interface initialState {
  loading: boolean;
  foods: IFood[];
  error: ServerError | null;
  search: string;
  sortedBy: SortedBy;
  filter: IFilters;
  canClear: boolean;
  food: IFood | null;
}

const sortedByDefault: SortedBy = SortedBy.empty;

const initialState: initialState = {
  loading: false,
  foods: [],
  food: null,
  error: null,
  search: "",
  sortedBy: sortedByDefault,
  filter: filtersDefault,
  canClear: false,
};

export const setSortedBy = createAsyncThunk<
  SortedBy,
  SortedBy,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/filter/setSortedBy", async (sortedBy, thunkApi) => {
  return sortedBy;
});

// * ============================================================================
// ? set filter
export const setFilter = createAsyncThunk<
  IFilters,
  IFilters,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/ilter/setFilter", async (filter, thunkApi) => {
  return filter;
});

// * ============================================================================
// ? set Clear
export const setClear = createAsyncThunk<
  IFood[],
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/filter/setClear", async (_, thunkApi) => {
  let queryUrl = "/food/all?";
  const response = await Axios.get(queryUrl)
    .then(async (res) => {
      return res.data.foods;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================
// ? set price filter
export const setPriceFilter = createAsyncThunk<
  { value: number; isMin: boolean },
  { value: number; isMin: boolean },
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/filter/setPriceFilter", async ({ value, isMin }, thunkApi) => {
  return { value: value >= 0 ? value : 0, isMin };
});

// * ============================================================================
// ? set search
export const setSearch = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/filter/setSearch", async (search, thunkApi) => {
  return search;
});

// * ============================================================================
// ? Add new food
export const addFood = createAsyncThunk<
  IFood,
  FormData,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/addFood", async (food, thunkApi) => {
  const response = await Axios.post("/food/new", food)
    .then((res) => res.data.food)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    });
  return response;
});

// * ============================================================================

// ? update food by id
export const updateFoodById = createAsyncThunk<
  IFood,
  { data: FormData; id: string },
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/updateFoodById", async ({ data, id }, thunkApi) => {
  const response = await Axios.patch(`/food/${id}`, { update: data })
    .then((res) => res.data.food)
    .catch((err) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    });
  return response;
});

// * ============================================================================
// ? delete food by  id
export const deleteFoodById = createAsyncThunk<
  ServerError,
  string,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/deleteFoodById", async (id, thunkApi) => {
  const response = await Axios.delete(`/food/${id}`)
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
// ?  Get all foods
export const getAllFoods = createAsyncThunk<
  IFood[],
  void,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/getAllFoods", async (_, thunkApi) => {
  let queryUrl = "/food/all?";

  const { search, sortedBy, filter } = thunkApi.getState().foodState;

  if (search) queryUrl += `searchQuery=${search}&`;

  if (sortedBy) queryUrl += `sortOption=${sortedBy}&`;

  const { min, max } = filter.price;
  if (min > 0 || max > 0) {
    queryUrl += `price=${min}-${max}&`;
  }

  if (filter.rating) queryUrl += `rating=${filter.rating}`;

  const controller = new AbortController();
  const signal = controller.signal;

  const response = await Axios.get(queryUrl, {
    signal,
  })
    .then(async (res) => {
      return res.data.foods;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });

  return response;
});

export const getFoodById = createAsyncThunk<
  IFood,
  string,
  { rejectValue: ServerError; state: RootState; dispatch: AppDispatch }
>("foods/getFoodById", async (id, thunkApi) => {
  const response = await Axios.get(`/food/${id}`)
    .then(async (res) => {
      console.log(res.data, "res.data");

      return res.data.food;
    })
    .catch((err: ServerError) => {
      console.log(err, " error");

      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================
// ?  Get all reviews
export const getAllReviews = createAsyncThunk<
  IReview[],
  string,
  {
    rejectValue: ServerError;
    state: RootState;
    dispatch: AppDispatch;
  }
>("foods/getAllReviews", async (foodId, thunkApi) => {
  const response = await Axios.get(`/reviews/${foodId}`)
    .then(async (res) => {
      return res.data.reviews;
    })
    .catch((err: ServerError) => {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data as ServerError);
      }
    });
  return response;
});

// * ============================================================================

/**
 * isRejectedAction type guard function that checks if the action is rejected
 * @param action - action object
 * @returns boolean
 */
function isRejectedAction(action: AnyAction): action is RejectedAction {
  action.type;
  return (
    (action.type as string).startsWith("foods") &&
    action.type.endsWith("rejected")
  );
}

// * ============================================================================

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFood.fulfilled, (state, action) => {
        state.loading = false;
        state.foods[state.foods.length] = action.payload;
      })
      .addCase(updateFoodById.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = state.foods.map((v) => {
          if (v._id === action.payload._id) {
            v = action.payload;
          }
          return v;
        });
      })
      .addCase(deleteFoodById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(setFilter.fulfilled, (state, action) => {
        state.filter = action.payload;
        state.canClear = true;
        state.loading = false;
      })
      .addCase(setSortedBy.fulfilled, (state, action) => {
        state.sortedBy = action.payload;
        state.canClear = true;
        state.loading = false;
      })
      .addCase(setSearch.fulfilled, (state, action) => {
        state.search = action.payload;
        state.loading = false;
        state.canClear = true;
      })
      .addCase(setPriceFilter.fulfilled, (state, action) => {
        const { isMin, value } = action.payload;
        state.canClear = true;
        isMin
          ? (state.filter.price.min = value)
          : (state.filter.price.max = value);
        state.loading = false;
      })
      .addCase(setClear.fulfilled, (state, action) => {
        state.search = "";
        state.canClear = false;
        state.filter = filtersDefault;
        state.sortedBy = sortedByDefault;
        state.foods = action.payload;
        state.loading = false;
      })
      .addCase(getFoodById.fulfilled, (state, action) => {
        state.loading = false;
        state.food = null;
        state.food = action.payload;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        console.log(action.payload, "action.payload food");
        toast.error(action.payload?.message);
        state.error = action.payload;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith("foods")) {
          state.loading = true;
          console.log(state.loading, "loading");
        }
      });
  },
});

export default foodSlice.reducer;

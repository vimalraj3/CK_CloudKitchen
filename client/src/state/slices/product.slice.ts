import { createSlice } from "@reduxjs/toolkit";
import { InitialProductState } from "../../types/product.types";

const initialState: InitialProductState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("Todo") || " "),
};

export const productSlice = createSlice({
  name: "Todo",
  initialState: initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      localStorage.setItem("product", JSON.stringify(action.payload));
    },

    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { request, failed, success } = productSlice.actions;

export default productSlice.reducer;

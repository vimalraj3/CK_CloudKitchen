import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../../types/user.types";
const initialState: InitialUserState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("User") || " "),
};

export const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },

    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { request, failed, success } = userSlice.actions;

export default userSlice.reducer;

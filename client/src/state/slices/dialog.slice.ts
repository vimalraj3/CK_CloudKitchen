import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Action,
  isPending,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialDialogState {
  open: boolean;
  title: string | null;
  description: string | null;
  isBtn: boolean;
  handlerFunction: null | Function;
}
const initialState = {
  open: false,
  title: null,
  description: null,
  isBtn: true,
  handlerFunction: null,
} as InitialDialogState;

export const dialogSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setDialogBoxToInitialState: (state) => {
      return initialState;
    },
    setDialogBoxOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setDialogBoxIsBtn: (state, action: PayloadAction<boolean>) => {
      state.isBtn = action.payload;
    },
    setDialogBoxTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDialogBoxDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setDialogBoxHandlerFunction: (state, action: PayloadAction<Function>) => {
      state.handlerFunction = action.payload;
    },
  },
});

export const {
  setDialogBoxDescription,
  setDialogBoxHandlerFunction,
  setDialogBoxIsBtn,
  setDialogBoxOpen,
  setDialogBoxTitle,
  setDialogBoxToInitialState,
} = dialogSlice.actions;

export default dialogSlice.reducer;

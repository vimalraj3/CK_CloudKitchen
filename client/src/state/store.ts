import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice";
import thunk from "redux-thunk";
import userReducer from "./slices/user.state";

const reducer = combineReducers({
  productState: productReducer,
  userState: userReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

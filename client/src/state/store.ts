import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice";
import thunk from "redux-thunk";
import userReducer from "./slices/user.slice";

const reducer = combineReducers({
  productState: productReducer,
  userState: userReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// * type of Rootstate
export type RootState = ReturnType<typeof store.getState>;

// * type of RootState dispatch
export type AppDispatch = typeof store.dispatch;

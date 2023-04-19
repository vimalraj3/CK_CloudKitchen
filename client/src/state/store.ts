import { configureStore, combineReducers } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

const reducer = combineReducers({});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './slices/user.slice'
import addressReducer from './slices/address.slice'
import foodReducer from './slices/food.slice'
import cartReducer from './slices/cart.slice'
import checkoutReducer from './slices/checkout.slice'

const reducer = combineReducers({
  userState: userReducer,
  addressState: addressReducer,
  foodState: foodReducer,
  cartState: cartReducer,
  checkoutState: checkoutReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

// * type of Rootstate
export type RootState = ReturnType<typeof store.getState>

// * type of RootState dispatch
export type AppDispatch = typeof store.dispatch

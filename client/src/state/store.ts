import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './slices/user.slice'
import restaurantReducer from './slices/restaurant.slice'
import addressReducer from './slices/address.slice'
import foodReducer from './slices/food.slice'

const reducer = combineReducers({
  userState: userReducer,
  addressState: addressReducer,
  restaurantState: restaurantReducer,
  foodState: foodReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

// * type of Rootstate
export type RootState = ReturnType<typeof store.getState>

// * type of RootState dispatch
export type AppDispatch = typeof store.dispatch

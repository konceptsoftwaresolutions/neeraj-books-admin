import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

import authReducer from "./features/auth";
import dashboardReducer from "./features/dashboard";
import userReducer from "./features/user";
import teamMemberReducer from './features/teamMembers'
import bookReducer from "./features/books"
import orderReducer from './features/orders'

import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  user: userReducer,
  team: teamMemberReducer,
  book: bookReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "dashboard", "user", "team", "book" , "order"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

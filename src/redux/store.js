import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

import authReducer from "./features/auth";
import dashboardReducer from "./features/dashboard";
import userReducer from "./features/user";
import teamMemberReducer from './features/teamMembers'
import bookReducer from './features/books'
import orderReducer from './features/orders'
import categoryReducer from './features/category'
import dummyCatReducer from './features/dummyCat'
import dummyBookReducer from './features/dummyBook'
import sliderReducer from './features/sliders'
import allBooksReducer from './features/allBooks'
import quizReducer from './features/quiz'
import testimonialReducer from './features/testimonials'
import couponReducer from './features/coupons'
import allUserReducer from './features/allUsers'
import affiliateReducer from './features/affiliates'
import customerReducer from './features/customers'

import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  user: userReducer,
  team: teamMemberReducer,
  books: bookReducer,
  order: orderReducer,
  category: categoryReducer,
  dummy: dummyCatReducer,
  dummyBook: dummyBookReducer,
  slider: sliderReducer,
  allBooks: allBooksReducer,
  quiz: quizReducer,
  testimonial: testimonialReducer,
  coupons: couponReducer,
  allUsers: allUserReducer,
  affiliate: affiliateReducer,
  customer: customerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "customer", "affiliate", "allUsers", "coupons", "testimonial", "dashboard", "user", "team", "order", "category", "slider", "books", "dummy", "dummyBook", "allBooks", "quiz"],
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

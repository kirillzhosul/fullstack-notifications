import { configureStore } from "@reduxjs/toolkit";
import { notificationApi, authApi } from "./api";
import authReducer from "@/features/auth/authSlice";
import { PRODUCTION_MODE } from "../lib";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware).concat(notificationApi.middleware),
  devTools: PRODUCTION_MODE,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

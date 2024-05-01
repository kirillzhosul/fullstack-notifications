import { createSlice } from "@reduxjs/toolkit";
import cookieCutter from "@boiseitguru/cookie-cutter";
import { AUTH_COOKIE } from "@/shared/lib";
import { USER } from "@/entities/types";

const getInitialState = () => {
  if (typeof cookieCutter.get !== "undefined") {
    return {
      user: JSON.parse(cookieCutter.get(AUTH_COOKIE.USER) ?? "null") || null,
      token: cookieCutter.get(AUTH_COOKIE.ACCESS_TOKEN) || null,
    };
  }

  return {
    user: null,
    token: null,
  };
};

const resetCookies = () => {
  cookieCutter.set(AUTH_COOKIE.ACCESS_TOKEN, "", {
    path: "/",
  });
  cookieCutter.set(AUTH_COOKIE.USER, "", {
    path: "/",
  });
};

const setCookies = (token: string, user: USER) => {
  cookieCutter.set(AUTH_COOKIE.ACCESS_TOKEN, token, {
    path: "/",
  });
  cookieCutter.set(AUTH_COOKIE.USER, JSON.stringify(user), {
    path: "/",
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      setCookies(token, user);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      resetCookies();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;

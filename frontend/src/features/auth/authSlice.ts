import { AUTH_COOKIE } from "@/shared/constants/cookies";
import { createSlice } from "@reduxjs/toolkit";
import cookieCutter from "@boiseitguru/cookie-cutter";

const getInitialState = () => {
  return {
    user: cookieCutter.get("auth-user") || null,
    token: cookieCutter.get(AUTH_COOKIE) || null,
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      cookieCutter.set(AUTH_COOKIE, JSON.stringify(token), {
        path: "/",
      });
      cookieCutter.set("auth-user", JSON.stringify(user), {
        path: "/",
      });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      cookieCutter.set(AUTH_COOKIE, "", {
        path: "/",
      });
      cookieCutter.set("auth-user", "", {
        path: "/",
      });
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;

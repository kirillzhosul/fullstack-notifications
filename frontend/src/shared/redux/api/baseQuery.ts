import { logOut, setCredentials } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/shared/lib";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      headers.set("Cookie", `access_token=${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("reauth refresh");
    api.dispatch(logOut());
    //const refreshResult = await baseQuery(
    //  "auth/jwt/refresh",
    //  api,
    //  extraOptions,
    //);
    //console.log(refreshResult);
    //if (refreshResult.data) {
    //  const user = api.getState().auth.user;
    //  api.dispatch(setCredentials({ ...refreshResult.data, user }));
    //  result = await baseQuery(args, api, extraOptions);
    //} else {
    //  api.dispatch(logOut());
    //}
  }

  return result;
};

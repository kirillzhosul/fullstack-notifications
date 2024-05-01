import { logOut, setCredentials } from "@/features/auth/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
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
  if (result?.error?.status === 403) {
    console.log("reauth refresh");
    const refreshResult = await baseQuery(
      "auth/jwt/refresh",
      api,
      extraOptions,
    );
    console.log(refreshResult);
    if (refreshResult.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    signup: build.mutation({
      query: (credentials) => ({
        url: "auth/users/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signin: build.mutation({
      query: (credentials) => ({
        url: "auth/jwt/create/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;

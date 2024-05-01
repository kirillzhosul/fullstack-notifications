import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { NotificationStats } from "@/features/notification/types";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["notifications"],
  endpoints: (build) => ({
    getStats: build.query<NotificationStats, undefined>({
      query: () => ({
        url: "notifications/stats?format=json",
        providesTags: ["notifications"],
      }),
    }),
    createNotification: build.mutation({
      query: (body: any) => ({
        url: "notifications/",
        method: "POST",
        body,
        providesTags: ["notifications"],
      }),
    }),
  }),
});

export const { useCreateNotificationMutation, useGetStatsQuery } =
  notificationApi;

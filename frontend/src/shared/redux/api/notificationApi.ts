import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { NotificationStats } from "@/features/notification/types";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  // No tag types are there is no mutation invalidation
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getStats: build.query<NotificationStats, undefined>({
      query: () => "notifications/stats?format=json",
    }),
    createNotification: build.mutation({
      query: (body: any) => ({
        url: "notifications",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateNotificationMutation, useGetStatsQuery } =
  notificationApi;

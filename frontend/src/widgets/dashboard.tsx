"use client";

import { selectCurrentUser } from "@/features/auth/authSlice";
import { ProfileCard } from "@/features/auth/profile-card";
import CreateNotificationCard from "@/features/notification/create-notification-card";
import { NotificationsCard } from "@/features/notification/notifications-card";
import { NotificationStats } from "@/features/notification/types";
import { useGetStatsQuery } from "@/shared/redux";
import { useSelector } from "react-redux";

export function DashboardWidget() {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetStatsQuery(undefined);
  return (
    <div className="flex flex-row gap-10">
      <NotificationsCard stats={data} />
      <CreateNotificationCard onSubmit={(d) => console.log(d)} />
      <ProfileCard user={user} />
    </div>
  );
}

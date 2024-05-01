"use client";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/features/auth/authSlice";
import { ProfileCard } from "@/features/auth/profile-card";
import CreateNotificationCard from "@/features/notification/create-notification-card";
import { NotificationsCard } from "@/features/notification/notifications-card";
import { CreateNotification } from "@/features/notification/types";
import {
  notificationApi,
  useCreateNotificationMutation,
  useGetStatsQuery,
  useGetUserQuery,
} from "@/shared/redux";
import { useToast } from "@/shared/ui/use-toast";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

const SOCKET_URL = `ws://127.0.0.1`;
import { useDispatch } from "react-redux";

export function DashboardWidget() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const { data, refetch: refetchStats } = useGetStatsQuery(undefined);
  const [create] = useCreateNotificationMutation();
  const { data: apiUser } = useGetUserQuery(undefined);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // TODO: use reducer + Socket.io

  const onConnectionOpen = () => {
    toast({
      title: "Channels log",
      description: "Channel connection opened!",
      variant: "default",
    });
    console.log("SUCCESS: Channel opened");

    console.log("INFO: channel send custom handshake ");

    sendMessage("handshake");
  };

  const onConnectionFinish = () => {
    console.log("FATAL: Unable to create channel");
    toast({
      title: "Channels log",
      description: "Channel error/close! Failed to open channel stream?",
      variant: "destructive",
    });
  };

  const onChannelMessage = (message: MessageEvent) => {
    console.log("LOG: Channels received", message);

    if (message.data === "invalidated") {
      // TODO dispatcher
      console.log("invalidated");
      toast({
        title: "Channels log",
        description: "Channel invalidation message!",
        variant: "destructive",
      });
      dispatch(notificationApi.util.invalidateTags(["notifications"]));
      refetchStats();
    }
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
    //eventSourceOptions: {
    //  withCredentials: true,
    //},
    retryOnError: false,
    onMessage: onChannelMessage,
    onOpen: onConnectionOpen,
    onClose: onConnectionFinish,
    onError: onConnectionFinish,
  });

  const onSubmit = (data: CreateNotification) => {
    create({
      target: data.target === 0 ? null : data.target,
      type: data.type.toUpperCase(),
    })
      .unwrap()
      .then(() => {})
      .catch(() => {
        toast({
          title: "ERROR",
          description: "Failed to create notification",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="flex flex-row gap-10">
      <NotificationsCard stats={data} />
      <CreateNotificationCard onSubmit={onSubmit} />
      <ProfileCard user={{ ...user, ...apiUser }} />
    </div>
  );
}
function dispatch(arg0: unknown) {
  throw new Error("Function not implemented.");
}

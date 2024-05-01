export type NotificationStats = {
  info: number;
  warning: number;
  error: number;
};

export type NOTIFICATION_TYPE = "info" | "warning" | "error";

export type CreateNotification = {
  type: NOTIFICATION_TYPE;
  target: number;
};

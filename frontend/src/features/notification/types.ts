export type NotificationStats = {
  INFO: number;
  WARN: number;
  ERROR: number;
};

export type NOTIFICATION_TYPE = "info" | "warn" | "error";

export type CreateNotification = {
  type: NOTIFICATION_TYPE;
  target: number;
};

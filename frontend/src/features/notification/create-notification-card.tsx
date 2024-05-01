"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { SubmitHandler, useForm } from "react-hook-form";
import { CreateNotificationForm } from "./create-notification-form";
import { CreateNotification } from "./types";

export default function CreateNotificationCard({
  onSubmit,
}: {
  onSubmit: SubmitHandler<CreateNotification>;
}) {
  const form = useForm<CreateNotification>({
    mode: "onSubmit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать уведомление</CardTitle>
        <CardDescription>Функционал администратора</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateNotificationForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}

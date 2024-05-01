"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { NotificationStats } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function NotificationsCard({
  stats,
}: {
  stats: NotificationStats | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика уведомлений</CardTitle>
        <CardDescription>Данные по количеству</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p>Ошибок: {stats?.error}</p>
          <p>Информационных: {stats?.info}</p>
          <p>Предупреждений: {stats?.warning}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="За сегодня" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yesterday">За вчера</SelectItem>
            <SelectItem value="today">За сегодня</SelectItem>
            <SelectItem value="hour">За час</SelectItem>
            <SelectItem value="week">За неделю</SelectItem>
            <SelectItem value="month">За месяц</SelectItem>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
}

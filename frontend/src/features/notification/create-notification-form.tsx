"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormDescription,
} from "@/shared/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateNotification } from "./types";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

type CreateNotificationFormProps = {
  onSubmit: SubmitHandler<CreateNotification>;
  form: ReturnType<typeof useForm<CreateNotification>>;
};

export function CreateNotificationForm({
  onSubmit,
  form,
}: CreateNotificationFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          defaultValue="warn"
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Тип </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип уведомления" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="info">Информационное</SelectItem>
                    <SelectItem value="warn">Предупреждение</SelectItem>
                    <SelectItem value="error">Ошибка</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="target"
          defaultValue={0}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>ID получателя </FormLabel>
                <Input placeholder="0 для всех, либо ID" {...field}></Input>
              </FormItem>
            );
          }}
        />
        <Button className="mt-8" type="submit" variant="default">
          Создать
        </Button>
      </form>
    </Form>
  );
}

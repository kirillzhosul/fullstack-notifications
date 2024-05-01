"use client";

import { Button } from "@/shared/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

type SignupFormProps = {
  onSubmit: SubmitHandler<SignupInputs>;
  form: ReturnType<typeof useForm<SignupInputs>>;
  isError: boolean;
  error: any;
};

export default function SignupForm({
  onSubmit,
  form,
  isError,
  error,
}: SignupFormProps) {
  const {
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Почтовый адрес </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="user@mail.com"
                    type="email"
                  ></Input>
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
        {errors.email && <FormMessage>Введите почту!</FormMessage>}
        <FormField
          control={form.control}
          name="password"
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Пароль </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="abcde" type="password"></Input>
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
        {errors.password && <FormMessage>Введите пароль!</FormMessage>}
        <FormField
          control={form.control}
          name="re_password"
          defaultValue=""
          rules={{
            required: true,
            validate: {
              checkPasswordsAreSame: (v, o) =>
                v === o.password || "Пароли не совпадают",
            },
          }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Подтвердите пароль </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="abcde" type="password"></Input>
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>

        {errors.re_password && (
          <FormMessage>Пароли должны совпадать</FormMessage>
        )}
        {isError && (
          <FormMessage>
            {error && (
              <>
                {error.status}: {error.data?.detail}
              </>
            )}
            {!error && <>Ошибка запроса!</>}
          </FormMessage>
        )}
        <Button type="submit" className="mt-5">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}

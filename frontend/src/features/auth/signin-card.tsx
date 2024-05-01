"use client";

import { ROUTES } from "@/shared/lib/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import SigninForm from "./signin-form";

export default function SigninCard({
  onSubmit,
  isLoading,
  isError,
  error,
}: {
  onSubmit: SubmitHandler<SigninInputs>;
  isLoading: boolean;
  isError: boolean;
  error: any;
}) {
  const form = useForm<SigninInputs>({
    mode: "onSubmit",
    disabled: isLoading,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>Войдите в существующий аккаунт!</CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm
          onSubmit={onSubmit}
          form={form}
          isError={isError}
          error={error}
        />
      </CardContent>
      <CardFooter>
        <Link href={ROUTES.SIGNUP}>Ещё нет аккаунта?</Link>
      </CardFooter>
    </Card>
  );
}

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
import SignupForm from "./signup-form";

export default function SignupCard({
  onSubmit,
  isLoading,
  isError,
  error,
}: {
  onSubmit: SubmitHandler<SignupInputs>;
  isLoading: boolean;
  isError: boolean;
  error: any;
}) {
  const form = useForm<SignupInputs>({
    mode: "onSubmit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Создайте новый аккаунт!</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm
          onSubmit={onSubmit}
          form={form}
          isError={isError}
          error={error}
        />
      </CardContent>
      <CardFooter>
        <Link href={ROUTES.SIGNIN}>Уже есть аккаунт?</Link>
      </CardFooter>
    </Card>
  );
}

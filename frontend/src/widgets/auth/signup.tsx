"use client";

import SignupCard from "@/features/auth/signup-card";
import { ROUTES } from "@/shared/lib/routes";
import { useSignupMutation } from "@/shared/redux/api";
import { useRouter } from "next/navigation";

export default function SignupWidget() {
  const router = useRouter();
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const onSubmit = (data: SignupInputs) => {
    signup({ email: data.email, password: data.password, username: data.email })
      .unwrap()
      .then(() => {
        router.push(ROUTES.SIGNIN);
      })
      .catch(() => {
        console.log("invalid auth");
      });
  };

  return (
    <SignupCard
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    ></SignupCard>
  );
}

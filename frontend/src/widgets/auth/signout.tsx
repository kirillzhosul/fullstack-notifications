"use client";

import { logOut } from "@/features/auth/authSlice";
import { ROUTES } from "@/shared/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignoutWidget() {
  const router = useRouter();

  useEffect(() => {
    logOut();
    router.replace(ROUTES.SIGNIN);
  });

  return <></>;
}

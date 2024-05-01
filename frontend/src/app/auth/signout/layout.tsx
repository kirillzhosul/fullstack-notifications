import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Выход из аккаунта",
};

export default function SignoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center items-center min-h-screen">
      {children}
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function SigninLayout({
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

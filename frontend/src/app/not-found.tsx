import { ROUTES } from "@/shared/lib/routes";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col justify-center items-center">
      <span className="text-2xl">Страница не найдена</span>
      <Button asChild variant="link">
        <Link href={ROUTES.HOME}>На главную</Link>
      </Button>
    </div>
  );
}

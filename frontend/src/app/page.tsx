import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <p>Тестовое задание</p>
      <span>Автор: Кирилл Жосул</span>
      <span>Стэк: Next.js + Django</span>

      <Button className="mt-10" variant="default">
        <Link href={ROUTES.DASHBOARD}>Панель управления</Link>
      </Button>
      <Button className="mt-2" variant="ghost">
        <Link href="https://github.com/kirillzhosul/fullstack-notifications">
          Исходники
        </Link>
      </Button>
    </div>
  );
}

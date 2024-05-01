import { ROUTES } from "@/shared/lib/routes";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Link from "next/link";
import { Input } from "@/shared/ui/input";
import { USER } from "@/entities/types";

export function ProfileCard({ user }: { user: USER }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль</CardTitle>
        <CardDescription>Информацию по вашему профилю</CardDescription>
      </CardHeader>

      <CardContent>
        <div>Почта: </div>
        <Input disabled={true} value={user?.email || user?.username}></Input>
        <div>Администратор? </div>
        <Input disabled={true} value={"Да"}></Input>
      </CardContent>
      <CardFooter className="gap-3">
        <Button variant="destructive">
          <Link href={ROUTES.SIGNOUT}>Выйти</Link>
        </Button>
        <Button variant="link">
          <Link href={ROUTES.HOME}>На главную</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

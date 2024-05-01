import { selectCurrentToken, setCredentials } from "@/features/auth/authSlice";
import SigninCard from "@/features/auth/signin-card";
import { ROUTES } from "@/shared/lib/routes";
import { useGetUserQuery, useSigninMutation } from "@/shared/redux/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function SigninWidget() {
  const router = useRouter();
  const [signin, { isLoading, isError, error }] = useSigninMutation();

  const dispatch = useDispatch();

  const onSubmit = (data: SigninInputs) => {
    signin({ ...data, username: data.email })
      .unwrap()
      .then((r: any) => {
        console.log("ok auth", r.access);
        data.password = "";
        dispatch(
          setCredentials({
            user: data,
            token: r.access,
          }),
        );

        router.push(ROUTES.DASHBOARD);
      })
      .catch(() => {
        console.log("invalid auth");
      });
  };

  return (
    <SigninCard
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    ></SigninCard>
  );
}

import { selectCurrentToken, setCredentials } from "@/features/auth/authSlice";
import SigninCard from "@/features/auth/signin-card";
import { ROUTES } from "@/shared/constants/routes";
import { useSigninMutation } from "@/shared/redux/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function SigninWidget() {
  const router = useRouter();
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  const dispatch = useDispatch();

  const onSubmit = (data: SigninInputs) => {
    const payload = { ...data, username: data.email };
    signin(payload)
      .unwrap()
      .then((r: any) => {
        console.log("ok auth", r.access);
        dispatch(
          setCredentials({
            user: payload,
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

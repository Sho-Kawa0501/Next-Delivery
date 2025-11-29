import { AuthForm } from "@/components/auth/auth-form";
import { login } from "./actions";

interface LoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const sp = (await searchParams) ?? {};
  const error = typeof sp.error === "string" ? sp.error : undefined;

  return (
    <AuthForm
      title="ログイン"
      mode="login"
      action={login}
      error={error}
    />
  );
}
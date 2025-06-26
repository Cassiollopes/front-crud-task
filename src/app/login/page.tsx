import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "@/components/login/loginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <div className="w-full mx-auto min-h-screen flex justify-center items-center">
        <LoginForm />
    </div>
  );
}
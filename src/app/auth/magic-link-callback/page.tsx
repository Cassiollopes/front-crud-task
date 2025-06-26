import MagicLinkCallback from "@/components/login/magicLinkCallback";
import { redirect } from "next/navigation";

export default function MagicLinkCallbackPage({ searchParams }: { searchParams?: { token?: string } }) {
  if (!searchParams?.token) {
    redirect("/login");
  }

  return (
    <div className="w-full mx-auto min-h-screen flex justify-center items-center">
      <MagicLinkCallback token={searchParams?.token} />
    </div>
  );
}
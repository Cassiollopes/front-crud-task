import MagicLinkCallback from "@/components/login/magicLinkCallback";
import { redirect } from "next/navigation";

export default async function MagicLinkCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) redirect("/login");

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <MagicLinkCallback token={token} />
    </div>
  );
}

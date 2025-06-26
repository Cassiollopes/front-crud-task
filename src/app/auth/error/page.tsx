import ErrorTemplate from "@/components/ui/errorTemplate";
import { redirect } from "next/navigation";

export default async function ErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!error) redirect("/login");

  return (
    <div className="w-full mx-auto min-h-screen flex justify-center items-center">
      <ErrorTemplate
        error={error}
        description="Ocorreu um erro ao tentar fazer login."
        ButtonLabel="Tentar novamente"
        callbackUrl="/login"
      />
    </div>
  );
}
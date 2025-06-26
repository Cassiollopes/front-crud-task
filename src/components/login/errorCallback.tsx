"use client";

import { useSearchParams } from "next/navigation";
import ErrorTemplate from "../ui/errorTemplate";

export default function ErrorCallback() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error)
    return (
      <ErrorTemplate
        error={error}
        description="Ocorreu um erro ao tentar fazer login."
        ButtonLabel="Tentar novamente"
        callbackUrl="/login"
      />
    );
  
  return null;
}

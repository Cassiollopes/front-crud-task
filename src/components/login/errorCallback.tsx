"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorTemplate from "../ui/errorTemplate";

export default function ErrorCallback() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");
    setError(error);
  }, [searchParams]);

  if (error)
    return (
      <ErrorTemplate
        error={error}
        description="Ocorreu um erro ao tentar fazer login."
        ButtonLabel="Tentar novamente"
        callbackUrl="/login"
      />
    );
}

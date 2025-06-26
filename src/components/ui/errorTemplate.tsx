"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function ErrorTemplate({ error, description, ButtonLabel, callbackUrl }: { error: string, description: string, ButtonLabel: string, callbackUrl: string }) {
  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{error}</h1>
      <p className="text-lg">{description}</p>
      <Button className="mt-6" onClick={() => router.push(callbackUrl)}>
        <p>{ButtonLabel}</p>
      </Button>
    </div>
  );
}

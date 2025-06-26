"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../ui/loadingAnimation";

export default function MagicLinkCallback({
  token,
}: {
  token?: string;
}) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const handleSignIn = async () => {
      try {
        const result = await signIn("magic-link", {
          token,
          redirect: false,
        });

        if (result?.error) {
          setStatus("error");
        } else {
          setStatus("success");
          router.push("/");
        }
      } catch (error) {
        console.error("Erro ao autenticar com magic link:", error);
        setStatus("error");
      }
    };

    handleSignIn();
  }, [token, router]);

  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <h2>Erro na Autenticação</h2>
          <p>Link inválido ou expirado</p>
          <button onClick={() => router.push("/login")}>Fazer Login</button>
        </div>
      </div>
    );
  }

  return <LoadingAnimation condition={status === "loading"} />;
}

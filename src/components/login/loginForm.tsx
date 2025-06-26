"use client";

import React, { useState } from "react";
import { AlertCircle, Mailbox } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
      });

      if (result?.error) {
        setError("Erro ao autenticar com o Google");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao autenticar com o Google:", error);
      setError("Erro ao autenticar com o Google");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/magic-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMagicLinkSent(true);
      } else {
        setError(data.message || "Erro ao enviar magic link");
      }
    } catch (error) {
      console.error("Erro ao enviar magic link:", error);
      setError("Erro ao enviar magic link");
    } finally {
      setIsLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="bg-white rounded-4xl shadow-md border border-gray-100 overflow-hidden w-full max-w-md flex flex-col justify-center items-center gap-4 p-8">
        <div className="flex flex-col items-center mb-6 gap-4">
          <Mailbox className="w-8 h-8 text-blue-500" />
          <h2 className="font-semibold text-center">
            Link de acesso enviado para <br /> {email}!
          </h2>
        </div>
        <div className="flex flex-col items-center text-sm text-gray-600">
          <p>nao esta vendo o email em sua caixa de entrada?</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMagicLinkSent(false);
              handleSubmit(e);
            }}
            className="underline"
          >
            Clique aqui para reenviar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-4xl shadow-md border border-gray-100 overflow-hidden w-full max-w-md flex flex-col justify-center items-center gap-1.5 p-8">
      <div
        className="w-full flex items-center justify-center border rounded-lg h-[44px] gap-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        onClick={handleSignInWithGoogle}
      >
        <svg
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          fill="#000000"
          className="w-5 h-5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            ></path>
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            ></path>
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            ></path>
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            ></path>
          </g>
        </svg>
        <p className="font-bold leading-0">Continuar com Google</p>
      </div>
      <p>ou</p>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 h-[44px] border rounded-lg hover:border-gray-400 transition-colors duration-200 outline-offset-4 focus:outline-blue-500"
        placeholder="Digite seu email"
        required
      />
      {error && (
        <div className="my-2 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2 w-full">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !email}
        className="w-full h-[44px] font-bold text-base mt-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </>
        ) : (
          <p>Continuar com Email</p>
        )}
      </Button>
    </div>
  );
}

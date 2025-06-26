"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Plus, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import TaskForm from "./task/taskForm";

export default function Header({ user }: { user?: User }) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 mt-[25%] mb-6">
      <div className="flex flex-col items-center relative group">
        <div
          className="h-[50px] bg-secondary aspect-square ring-2 ring-blue-300 text-blue-300 rounded-full flex items-center justify-center transition-all duration-300 ease-in overflow-hidden animate-scale-down"
          style={{ transform: "scale(1.20)" }}
        >
          {user ? (
            user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt="User Avatar"
                className="object-cover w-full h-full opacity-90"
              />
            ) : (
              <p className="text-3xl font-bold text-blue-300">
                {user.name?.charAt(0).toUpperCase() +
                  (user.name?.split(" ")[1]?.charAt(0).toUpperCase() || "")}
              </p>
            )
          ) : (
            <UserRound size={30} />
          )}
        </div>
        <h1 className="text-[40px] font-medium transition-all duration-500 ease-in animate-fade-in opacity-0">
          Olá, {user?.name?.split(" ").slice(0, 2).join(" ") || "Usuário"}!
        </h1>
        {user && (
          <div className="absolute bottom-0 top-full invisible group-hover:visible w-full h-fit flex justify-center items-center">
            <Button
              variant={"outline"}
              size={"default"}
              onClick={() => signOut()}
              className="transition-all ease-in opacity-0 group-hover:opacity-100"
            >
              <LogOut size={24} />
              Sair
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full px-6">
        <h2
          className="text-2xl font-semibold animate-fade-in opacity-0"
          style={{ animationDelay: "800ms" }}
        >
          Suas tarefas
        </h2>
        <Button
          variant={"outline"}
          size={"default"}
          onClick={() => {
            if (!user) {
              router.push("/login");
            } else {
              setShowForm(true);
            }
          }}
          className="rounded-full animate-scale-up opacity-0"
          style={{ transform: "scale(0)" }}
        >
          <Plus size={24} />
          Criar tarefa
        </Button>
        {showForm && (
          <TaskForm setShowForm={() => setShowForm(false)} user={user!} />
        )}
      </div>
    </div>
  );
}

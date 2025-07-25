"use client";

import Image from "next/image";
import { Task } from "@/types";
import CompleteTaskButton  from "./completeTaskButton";
import { Button } from "../ui/button";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import { User } from "next-auth";
import TaskForm from "./taskForm";
import ButtonLoading from "../ui/buttonLoading";

export default function TaskItem({ task, user }: { task: Task; user: User }) {
  const [excludePopup, setExcludePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleExclude = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.ok) {
        window.dispatchEvent(new Event("taskUpdated"));
      }
    } catch (error) {
      console.error("Error excluding task:", error);
    } finally {
      setExcludePopup(false);
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl p-4 py-3 flex flex-col relative h-fit bg-card">
      {isCompleted && (
        <div className="absolute h-full w-full rounded-2xl bg-black/5 opacity-90 top-0 left-0 z-30"></div>
      )}
      {showEditForm && (
        <TaskForm setShowForm={setShowEditForm} task={task} user={user} />
      )}
      {excludePopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50 px-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setExcludePopup(false);
            }
          }}
        >
          <div className="bg-background p-6 border rounded-3xl flex flex-col gap-4 w-[400px]">
            <h2 className="font-semibold text-xl">Excluir Tarefa</h2>
            <p>
              Voce esta prestes a{" "}
              <span className="font-semibold text-red-600">excluir</span> esta
              tarefa. Deseja continuar?
            </p>
            <div className="flex gap-2 mt-2 ml-auto">
              <Button
                variant={"outline"}
                onClick={() => setExcludePopup(false)}
              >
                Cancelar
              </Button>
              <Button variant={"destructive"} onClick={handleExclude}>
                {loading ? <ButtonLoading /> : "Excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center">
        <h3 className="text-lg font-semibold truncate min-w-0 flex-1 mr-4">
          {task.title}
        </h3>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500 flex items-center gap-1 rounded-full border px-2">
            <div
              className={`h-2 w-2 rounded-full ${
                task.priority === "LOW"
                  ? "bg-green-500"
                  : task.priority === "MEDIUM"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
            {task.priority === "LOW"
              ? "Baixa"
              : task.priority === "MEDIUM"
              ? "Média"
              : "Alta"}
          </span>
          <div className="relative group cursor-pointer xl:z-30">
            <div
              onClick={() => setShowOptions(!showOptions)}
              className="xl:pointer-events-none z-30 relative"
            >
              <Ellipsis size={18} />
            </div>
            {showOptions && (
              <div
                className="fixed inset-0 z-[35]"
                onClick={() => setShowOptions(false)}
              ></div>
            )}
            <div
              className={`absolute invisible xl:group-hover:visible right-full -top-3 pr-1.5 z-40 ${
                showOptions ? "visible" : ""
              }`}
            >
              <div
                className={`flex flex-col bg-background border rounded-xl p-2 opacity-0 xl:group-hover:opacity-100 transition-all shadow-md ${
                  showOptions ? "opacity-100" : ""
                }`}
              >
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setShowEditForm(true);
                    setShowOptions(false);
                  }}
                >
                  <Edit size={16} />
                  Editar
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setExcludePopup(true);
                    setShowOptions(false);
                  }}
                >
                  <Trash size={16} />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm wrap-break-word">
          {task.description}
        </p>
      )}
      {task.imageUrl && (
        <Image
          priority
          src={task.imageUrl}
          alt={task.title}
          width={300}
          height={150}
          className="rounded-lg object-contain border overflow-hidden h-fit max-h-[150px] w-full mt-1 bg-black/[0.02]"
        />
      )}
      <div className="flex items-center justify-between mt-2">
        <time className="text-sm text-gray-500">
          Criado em: {new Date(task.createdAt).toLocaleDateString()}
        </time>
        <CompleteTaskButton
          setIsCompleted={setIsCompleted}
          user={user}
          taskId={task.id}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}

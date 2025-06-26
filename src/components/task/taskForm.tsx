"use client";

import { ImageUp, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useRef, useState } from "react";
import Image from "next/image";
import LoadingAnimation from "../ui/loadingAnimation";
import { Task } from "@/types";
import { User } from "next-auth";

const priorityOptions = [
  { label: "Baixa", value: "LOW" },
  { label: "Média", value: "MEDIUM" },
  { label: "Alta", value: "HIGH" },
];

interface TaskFormProps {
  setShowForm: (show: boolean) => void;
  user: User;
  task?: Task;
}

export default function TaskForm({ setShowForm, user, task }: TaskFormProps) {
  const isEditMode = !!task;

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    task?.imageUrl || null
  );
  const [description, setDescription] = useState(task?.description || "");
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    task?.priority || "MEDIUM"
  );
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);

    if (isEditMode) {
      if (imageUrl === null || image) {
        formData.append("imageUrl", image || "");
      }
    } else {
      if (image) {
        formData.append("imageUrl", image);
      }
    }

    async function submitTask() {
      setLoading(true);
      try {
        const url = isEditMode
          ? `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: formData,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (response.ok) {
          window.dispatchEvent(new Event("taskUpdated"));

          if (!isEditMode) {
            setTitle("");
            setDescription("");
            setImage(null);
            setPriority("MEDIUM");
          }
        }
      } catch (error) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} task:`,
          error
        );
      } finally {
        setShowForm(false);
        setLoading(false);
      }
    }

    submitTask();
  };

  const hasChanges = isEditMode
    ? title !== task.title ||
      description !== task.description ||
      priority !== task.priority ||
      imageUrl !== task.imageUrl
    : !!title;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowForm(false);
        }
      }}
    >
      <LoadingAnimation condition={loading} />
      <form
        className="bg-background p-8 border rounded-3xl flex flex-col gap-4 w-[400px]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-semibold text-2xl">
          {isEditMode ? "Editar tarefa" : "Criar tarefa"}
        </h2>
        <input
          type="text"
          placeholder="Título"
          className="p-4 rounded-2xl border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          className="p-4 rounded-2xl border min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {(image || imageUrl) && (
          <div className="relative group">
            <Image
              width={400}
              height={200}
              src={image ? URL.createObjectURL(image) : imageUrl || ""}
              alt="Preview"
              className="w-full max-h-[200px] h-fit object-contain rounded-2xl overflow-hidden border"
            />
            <div
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full bg-white/80 p-1.5"
              onClick={() => {
                setImage(null);
                setImageUrl(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              <X size={18} />
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <ImageUp size={24} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
              if (file) {
                setImageUrl(URL.createObjectURL(file));
              }
            }}
          />
          <div
            className={`relative group ${buttonVariants({
              variant: "outline",
              size: "icon",
            })}`}
          >
            <div
              className={`h-2 aspect-square rounded-full ${
                priority === "LOW"
                  ? "bg-green-500"
                  : priority === "MEDIUM"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <div className="absolute invisible group-hover:visible left-full bottom-1/5 pl-1.5 z-50">
              <div className="left-full flex flex-col bg-background border rounded-xl p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <div className="p-3 pt-2 text-md">Prioridade</div>
                <div className="flex gap-1">
                  {priorityOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        setPriority(option.value as "LOW" | "MEDIUM" | "HIGH")
                      }
                      type="button"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="ml-auto rounded-full bg-blue-600 hover:bg-blue-700"
            disabled={!hasChanges}
          >
            {isEditMode ? "Salvar" : "Criar Tarefa"}
          </Button>
        </div>
      </form>
    </div>
  );
}

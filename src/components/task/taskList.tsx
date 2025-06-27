"use client";

import { useEffect, useState } from "react";
import TaskItem from "./taskItem";
import LoadingAnimation from "../ui/loadingAnimation";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { Task } from "@/types";
import TaskForm from "./taskForm";

export default function TaskList({ user }: { user?: User }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(user ? true : false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log(process.env.NEXT_PUBLIC_API_URL);

    async function fetchTasks(showLoading = true) {
      if (showLoading) {
        setLoading(true);
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setTasks(responseData.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    }

    fetchTasks();

    const handleTaskUpdated = () => {
      fetchTasks(false);
    };

    window.addEventListener("taskUpdated", handleTaskUpdated);

    return () => {
      window.removeEventListener("taskUpdated", handleTaskUpdated);
    };
  }, [user]);

  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <LoadingAnimation top condition={loading && tasks.length === 0} />
      <div
        className={`grid grid-cols-3 max-md:grid-cols-1 gap-4 w-full ${
          loading ? "" : "animate-fade-in"
        } opacity-0 transition-all duration-500 ease-in`}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} user={user!} />
        ))}
      </div>
      {tasks.length === 0 && !loading && (
        <p
          className="text-gray-500 animate-fade-in opacity-0 text-sm"
          style={{ animationDelay: `${!user ? 800 : 0}ms` }}
        >
          Nenhuma tarefa criada.{" "}
          <span
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              if (!user) {
                router.push("/login");
              } else {
                setShowForm(true);
              }
            }}
          >
            Crie uma agora mesmo!
          </span>
        </p>
      )}
      {showForm && (
        <TaskForm setShowForm={() => setShowForm(false)} user={user!} />
      )}
    </div>
  );
}

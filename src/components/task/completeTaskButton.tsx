import { Circle, CircleCheck } from "lucide-react";
import { User } from "next-auth";
import { useState } from "react";

export default function CompleteTaskButton({
  taskId,
  completed,
  user
}: {
  taskId: string;
  completed: boolean;
  user: User;
}) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleComplete = async () => {
    setIsCompleted(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            completed: true,
          }),
        }
      );
      if (response.ok) {
        window.dispatchEvent(new Event("taskUpdated"));
      } else {
        setIsCompleted(false);
      }
    } catch (error) {
      console.error("Error completing task:", error);
      setIsCompleted(false);
    }
  };

  const removeComplete = async () => {
    setIsCompleted(false);
    try {
      const response = await fetch(`$${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          completed: false,
        }),
      });
      if (response.ok) {
        window.dispatchEvent(new Event("taskUpdated"));
      } else {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error completing task:", error);
      setIsCompleted(true);
    }
  };

  return (
    <button onClick={isCompleted ? removeComplete : handleComplete} className="cursor-pointer hover:scale-105 z-30 min-h-[24px]">
      {isCompleted ? <CircleCheck /> : <Circle size={18} />}
    </button>
  );
}

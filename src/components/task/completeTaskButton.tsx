import { Circle, CircleCheck } from "lucide-react";
import { User } from "next-auth";

export default function CompleteTaskButton({
  taskId,
  user,
  isCompleted = false,
  setIsCompleted,
}: {
  taskId: string;
  user: User;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
}) {

  const handleComplete = async () => {
    setIsCompleted(true);

    try {
      const res = await fetch(
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

      if (!res.ok) {
        setIsCompleted(false);
      }

      return window.dispatchEvent(new Event("taskUpdated"));
    } catch (error) {
      console.error("Error completing task:", error);
      setIsCompleted(false);
    }
  };

  const removeComplete = async () => {
    setIsCompleted(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            completed: false,
          }),
        }
      );

      if(!res.ok) {
        setIsCompleted(true);
      }

      return window.dispatchEvent(new Event("taskUpdated"));
    } catch (error) {
      console.error("Error completing task:", error);
      setIsCompleted(true);
    }
  };

  return (
    <button
      onClick={isCompleted ? removeComplete : handleComplete}
      className="cursor-pointer hover:scale-105 z-30 min-h-[24px]"
    >
      {isCompleted ? <CircleCheck /> : <Circle size={18} />}
    </button>
  );
}

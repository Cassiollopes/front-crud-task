import Header from "@/components/header";
import TaskList from "@/components/task/taskList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = {
    id: session?.user?.id || "",
    ...session?.user,
    accessToken: session?.accessToken,
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex justify-center p-2 pb-18 flex-col items-center">
      <Header user={session?.user ? user : undefined} />
      <TaskList user={session?.user ? user : undefined} />
    </div>
  );
}

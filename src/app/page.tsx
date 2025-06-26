import Header from "@/components/header";
import TaskList from "@/components/task/taskList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = {
    id: session?.user?.id || "",
    ...session?.user,
    accessToken: session?.accessToken,
  };

  return (
    <div className="w-full mx-auto min-h-screen flex justify-center overflow-y-scroll h-screen">
      <div className="max-w-[800px] w-full p-2">
        <Header user={session?.user ? user : undefined} />
        <TaskList user={session?.user ? user : undefined} />
      </div>
    </div>
  );
}

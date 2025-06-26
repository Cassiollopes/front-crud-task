import ErrorCallback from "@/components/login/errorCallback";
import LoadingAnimation from "@/components/ui/loadingAnimation";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <div className="w-full mx-auto min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingAnimation condition={true} />}>
        <ErrorCallback />
      </Suspense>
    </div>
  );
}
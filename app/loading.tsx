import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <LoadingSpinner size={60} className="mb-5" />
        <h2 className="text-center text-black text-xl font-semibold">
          Loading...
        </h2>
      </div>
    </>
  );
}

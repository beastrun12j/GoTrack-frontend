import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-col container">
        <div className="flex items-center justify-center flex-col mt-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center text-neutral-800 mb-6">
            Unleash your team's potential
          </h1>
          <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 p-2 md:pb-4 w-fit">
            elevate performance.
          </div>
        </div>
        <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
          Streamline Collaboration, Project Management, and Propel Productivity
          to New Heights. Whether in bustling corporate hubs or remote home
          offices, harness the power of GoTrack to revolutionize your workflow
        </div>
        <Button className="mt-6">
          <Link href="/register">Get GoTrack for free</Link>
        </Button>
      </div>
      <Footer /> 
    </>
  );
}

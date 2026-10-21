
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="section-label">ERROR 404</p>

      <h1 className="display-font mt-3 text-8xl font-extrabold text-[#ccff00]">
        404
      </h1>

      <h2 className="display-font mt-3 text-3xl font-bold">
        WORKOUT NOT FOUND
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-[#a0a69f]">
        This page does not exist or the workout could not be found.
      </p>

      <Link href="/" className="accent-button mt-7">
        <ArrowLeft size={16} />
        BACK TO WORKOUTS
      </Link>
    </main>
  );
}

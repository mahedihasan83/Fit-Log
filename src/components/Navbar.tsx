
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-[#292b29] bg-[#101110]/95 backdrop-blur">
      <nav className="page-container flex min-h-[68px] items-center justify-between gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={26}
            height={26}
            priority
          />

          <span className="display-font text-xl font-extrabold tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-bold text-black sm:text-xs"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-[10px] font-semibold text-[#a0a69f] hover:text-[#ccff00] sm:text-xs"
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-white sm:text-xs"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="hidden items-center gap-1.5 text-[10px] text-white sm:flex sm:text-xs"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#555b53] px-1">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

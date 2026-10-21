
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Flame } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import type { PlanTab } from "@/types/workout";

export default function MyPlanPage() {
  const { plan, saved, hydrated } = usePlan();
  const [tab, setTab] = useState<PlanTab>("today");
  const [search, setSearch] = useState("");

  const visibleWorkouts = useMemo(() => {
    const list = tab === "today" ? plan : saved;
    const query = search.trim().toLowerCase();

    return list.filter(
      (workout) =>
        workout.name.toLowerCase().includes(query) ||
        workout.muscleGroups.some((group) =>
          group.toLowerCase().includes(query)
        )
    );
  }, [tab, plan, saved, search]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="page-container min-h-[60vh] py-12 md:py-16">
      <p className="section-label">YOUR TRAINING LOG</p>

      <h1 className="display-font mt-2 text-5xl font-extrabold uppercase sm:text-6xl">
        MY PLAN
      </h1>

      <p className="mt-3 text-sm text-[#a0a69f]">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <CheckCircle2 className="text-[#ccff00]" size={22} />
          <p className="mt-4 text-xs text-[#a0a69f]">EXERCISES</p>
          <p className="display-font mt-1 text-4xl font-bold">
            {hydrated ? plan.length : 0}
          </p>
        </div>

        <div className="surface-card p-5">
          <Clock3 className="text-[#ccff00]" size={22} />
          <p className="mt-4 text-xs text-[#a0a69f]">MINUTES</p>
          <p className="display-font mt-1 text-4xl font-bold">
            {hydrated ? totalMinutes : 0}
          </p>
        </div>

        <div className="surface-card p-5">
          <Flame className="text-[#ccff00]" size={22} />
          <p className="mt-4 text-xs text-[#a0a69f]">CALORIES</p>
          <p className="display-font mt-1 text-4xl font-bold">
            {hydrated ? totalCalories : 0}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-[#343834]">
        <button
          onClick={() => setTab("today")}
          className={`border-b-2 px-4 py-3 text-sm font-bold ${
            tab === "today"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-[#a0a69f]"
          }`}
        >
          Today&apos;s Plan ({plan.length})
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`border-b-2 px-4 py-3 text-sm font-bold ${
            tab === "saved"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-[#a0a69f]"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search your workouts..."
        className="mt-6 min-h-12 w-full rounded-md border border-[#343834] bg-[#191b19] px-4 text-sm outline-none focus:border-[#ccff00]"
      />

      {!hydrated ? (
        <p className="py-12 text-center text-sm text-[#a0a69f]">
          Loading workouts…
        </p>
      ) : visibleWorkouts.length > 0 ? (
        <div className="mt-6 space-y-4">
          {visibleWorkouts.map((workout) => {
            const planned = tab === "today";

            return (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                planned={planned}
                done={
                  planned
                    ? plan.find((item) => item.id === workout.id)?.done
                    : false
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="surface-card mt-6 flex flex-col items-center px-5 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#343834] text-[#ccff00]">
            <CheckCircle2 size={25} />
          </div>

          <h2 className="display-font mt-5 text-3xl font-bold">
            NOTHING HERE YET
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#a0a69f]">
            Browse the library and add a lift to get today moving.
          </p>

          <Link href="/" className="accent-button mt-6">
            GO TO WORKOUTS
          </Link>
        </div>
      )}
    </main>
  );
}

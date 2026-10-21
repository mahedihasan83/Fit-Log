
"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Check, Clock3, Flame, Plus, Star } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

export default function WorkoutDetails({
  workout,
}: {
  workout: Workout;
}) {
  const { plan, saved, addToPlan, saveWorkout } = usePlan();

  const alreadyPlanned = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5;

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating.toFixed(1)],
  ];

  return (
    <main className="page-container py-10 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#a0a69f] hover:text-[#ccff00]"
      >
        <ArrowLeft size={16} />
        Back to library
      </Link>

      <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="h-[300px] overflow-hidden rounded-xl border border-[#343834] bg-[#191b19] sm:h-[450px] lg:sticky lg:top-28 lg:h-[550px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="section-label">WORKOUT DETAILS</p>

          <h1 className="display-font mt-3 text-5xl font-extrabold uppercase leading-none sm:text-6xl">
            {workout.name}
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#a0a69f]">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-[#ccff00]/40 px-3 py-1.5 text-xs font-semibold text-[#ccff00]"
              >
                {group}
              </span>
            ))}
          </div>

          <h2 className="display-font mt-9 text-2xl font-bold">
            KEY SPECS
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#343834] bg-[#343834] sm:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label} className="bg-[#191b19] p-4">
                <p className="text-[10px] font-bold tracking-widest text-[#a0a69f]">
                  {label}
                </p>
                <p className="mt-2 break-words text-sm font-semibold">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <h2 className="display-font mt-9 text-2xl font-bold">
            INSTRUCTIONS
          </h2>

          <ol className="mt-4 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <li key={`${index}-${instruction}`} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-extrabold text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-6 text-[#c7ccc5]">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={alreadyPlanned || planFull}
              className="accent-button flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {alreadyPlanned ? (
                <Check size={17} />
              ) : (
                <Plus size={17} />
              )}
              {alreadyPlanned
                ? "ALREADY IN PLAN"
                : planFull
                  ? "PLAN IS FULL"
                  : "ADD TO TODAY'S PLAN"}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              disabled={alreadySaved}
              className="secondary-button flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={16} />
              {alreadySaved ? "SAVED" : "SAVE FOR LATER"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 border-t border-[#343834] pt-5 text-xs text-[#a0a69f]">
            <span className="flex items-center gap-2">
              <Clock3 size={15} /> {workout.duration} minutes
            </span>
            <span className="flex items-center gap-2">
              <Flame size={15} /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-2">
              <Star size={15} /> {workout.rating}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}


"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

interface PlanWorkoutCardProps {
  workout: Workout;
  planned?: boolean;
  done?: boolean;
}

export default function PlanWorkoutCard({
  workout,
  planned = false,
  done = false,
}: PlanWorkoutCardProps) {
  const { removeFromPlan, removeSaved, toggleDone } = usePlan();

  return (
    <article className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="h-24 w-full shrink-0 overflow-hidden rounded-md bg-[#222522] sm:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ccff00]">
          {workout.muscleGroups.join(" / ")}
        </p>

        <h3 className="display-font mt-1 text-2xl font-bold uppercase">
          {workout.name}
        </h3>

        <p className="mt-2 text-xs text-[#a0a69f]">
          {workout.equipment}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#c7ccc5]">
          <span className="flex items-center gap-1">
            <Clock3 size={13} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} /> {workout.rating}
          </span>
        </div>

        {planned && done && (
          <p className="mt-2 text-xs font-bold text-[#ccff00]">
            COMPLETED
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 sm:max-w-40 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="secondary-button min-h-9 px-3 text-xs"
        >
          View Details
        </Link>

        {planned && (
          <button
            onClick={() => toggleDone(workout.id)}
            className="secondary-button min-h-9 px-3 text-xs"
            aria-label={done ? "Mark as not done" : "Mark as done"}
          >
            <Check size={14} />
            {done ? "Undo" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={() =>
            planned
              ? removeFromPlan(workout.id)
              : removeSaved(workout.id)
          }
          className="secondary-button min-h-9 px-3 text-xs"
          aria-label={`Remove ${workout.name}`}
        >
          <X size={15} />
          Remove
        </button>
      </div>
    </article>
  );
}

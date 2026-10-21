
import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group surface-card overflow-hidden transition hover:-translate-y-1 hover:border-[#ccff00]/60"
    >
      <div className="relative h-48 overflow-hidden bg-[#222522]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded bg-black/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]">
          {workout.muscleGroups[0] ?? "WORKOUT"}
        </span>

        <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs">
          {workout.difficulty}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded border border-[#343834] px-2 py-1 text-[9px] font-bold tracking-wider text-[#a0a69f]"
            >
              {group.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="display-font text-2xl font-bold uppercase leading-tight">
            {workout.name}
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-[#ccff00]"
          />
        </div>

        <p className="mt-2 text-xs text-[#a0a69f]">
          {workout.equipment}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#343834] pt-4">
          <p className="flex items-center gap-1 text-[11px] text-[#c7ccc5]">
            <Clock3 size={13} className="text-[#ccff00]" />
            {workout.duration} min
          </p>
          <p className="flex items-center gap-1 text-[11px] text-[#c7ccc5]">
            <Flame size={13} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </p>
          <p className="flex items-center gap-1 text-[11px] text-[#c7ccc5]">
            <Star size={13} className="text-[#ccff00]" />
            {workout.rating.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}


"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import type { SortOption, Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sort, setSort] = useState<SortOption>("Duration");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) {
          setError("Unable to load workouts. Please try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return workouts
      .filter(
        (workout) =>
          workout.name.toLowerCase().includes(query) ||
          workout.muscleGroups.some((group) =>
            group.toLowerCase().includes(query)
          )
      )
      .sort((a, b) => {
        if (sort === "Duration") return a.duration - b.duration;
        if (sort === "Calories") {
          return b.caloriesBurned - a.caloriesBurned;
        }
        return b.rating - a.rating;
      });
  }, [workouts, sort, search]);

  return (
    <section id="library" className="page-container py-16 md:py-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">FIND YOUR NEXT LIFT</p>
          <h2 className="display-font mt-2 text-5xl font-extrabold uppercase">
            THE LIBRARY
          </h2>
          <p className="mt-2 text-sm text-[#a0a69f]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-md border border-[#343834] bg-[#191b19] px-4">
        <Search size={18} className="text-[#a0a69f]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search workouts or muscle groups..."
          className="min-h-12 w-full bg-transparent text-sm outline-none placeholder:text-[#777d75]"
        />
      </div>

      {loading && (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#343834] border-t-[#ccff00]" />
          <p className="text-sm text-[#a0a69f]">Loading workouts…</p>
        </div>
      )}

      {!loading && error && (
        <div className="py-16 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="secondary-button mt-4"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredWorkouts.length === 0 && (
        <p className="py-16 text-center text-[#a0a69f]">
          No workouts found.
        </p>
      )}

      {!loading && !error && filteredWorkouts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

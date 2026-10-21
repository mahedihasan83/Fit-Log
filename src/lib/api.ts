
import type { Workout } from "@/types/workout";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function getWorkouts(): Promise<Workout[]> {
  for (const url of API_URLS) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        continue;
      }

      const data: unknown = await response.json();

      if (Array.isArray(data)) {
        return data as Workout[];
      }
    } catch {
      // Try the alternative API.
    }
  }

  throw new Error(
    "Unable to load workouts. Please try again later."
  );
}

export async function getWorkoutById(
  id: string
): Promise<Workout | null> {
  const workouts = await getWorkouts();

  return (
    workouts.find((workout) => String(workout.id) === id) ??
    null
  );
}

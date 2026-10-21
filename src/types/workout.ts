
export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortOption = "Duration" | "Calories" | "Rating";

export type PlanTab = "today" | "saved";

export interface PlannedWorkout extends Workout {
  done: boolean;
}

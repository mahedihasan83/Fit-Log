
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import type { PlannedWorkout, Workout } from "@/types/workout";

interface PlanContextType {
  plan: PlannedWorkout[];
  saved: Workout[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => void;
  saveWorkout: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan) as PlannedWorkout[]);
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved) as Workout[]);
      }
    } catch {
      toast.error("Could not restore saved workout data.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, hydrated]);

  function addToPlan(workout: Workout) {
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("This workout is already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.warning("Today's plan is limited to five lifts.");
      return;
    }

    setPlan((current) => [...current, { ...workout, done: false }]);
    toast.success("Added to today's plan.");
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("This workout is already saved.");
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success("Workout saved for later.");
  }

  function removeFromPlan(id: number) {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Workout removed from today's plan.");
  }

  function removeSaved(id: number) {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.success("Saved workout removed.");
  }

  function toggleDone(id: number) {
    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );

    const workout = plan.find((item) => item.id === id);

    toast.success(
      workout?.done ? "Workout marked as not done." : "Workout marked as done!"
    );
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        hydrated,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider.");
  }

  return context;
}

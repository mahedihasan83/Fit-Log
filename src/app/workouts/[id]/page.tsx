
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutDetails from "@/components/WorkoutDetails";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    throw new Error("Unable to load workout details.");
  }

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}

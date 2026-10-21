
export default function Loading() {
  return (
    <main className="page-container flex min-h-[60vh] flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#343834] border-t-[#ccff00]" />
      <p className="mt-4 text-sm text-[#a0a69f]">
        Loading workouts…
      </p>
    </main>
  );
}

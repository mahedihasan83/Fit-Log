
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden border-b border-[#292b29] bg-[#0b0b0b]">
      <div className="page-container grid items-center gap-6 py-8 md:grid-cols-2 md:gap-10 md:py-10">
        <div>
          <p className="section-label">WORKOUT LIBRARY</p>

          <h1 className="display-font mt-4 max-w-2xl text-5xl font-extrabold uppercase leading-[0.98] sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <span className="mt-2 block text-white">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[#a0a69f]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link href="#library" className="accent-button mt-6">
            <Dumbbell size={17} />
            BROWSE WORKOUTS
            <ArrowDownRight size={17} />
          </Link>
        </div>

        <div className="relative flex min-h-[260px] items-center justify-center bg-transparent sm:min-h-[320px] md:min-h-[360px]">
          <Image
            src="/banner.png"
            alt="Workout exercise illustration"
            width={420}
            height={420}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="relative z-10 h-[280px] w-full object-contain sm:h-[330px] md:h-[360px]"
          />
        </div>
      </div>
    </section>
  );
}

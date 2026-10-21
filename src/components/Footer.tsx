
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#292b29] bg-[#0b0c0b]">
      <div className="page-container flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
          />

          <span className="display-font text-xl font-extrabold tracking-wider">
            FITLOG
          </span>
        </div>

        <p className="text-xs leading-5 text-[#a0a69f]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

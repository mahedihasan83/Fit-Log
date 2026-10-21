
"use client";

import { ChevronDown } from "lucide-react";
import type { SortOption } from "@/types/workout";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <label className="flex items-center gap-3 text-xs text-[#a0a69f]">
      SORT BY
      <span className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value as SortOption)
          }
          className="appearance-none rounded-md border border-[#343834] bg-[#191b19] py-2 pl-2 pr-9 text-sm font-semibold text-white outline-none focus:border-[#ccff00]"
        >
          <option value="Duration">Duration</option>
          <option value="Calories">Calories</option>
          <option value="Rating">Rating</option>
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </span>
    </label>
  );
}

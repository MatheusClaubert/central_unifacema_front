"use client";

import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { useId } from "react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Search({ value, onChange, placeholder = "Buscar aplicações...", className }: SearchProps) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Buscar
      </label>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border bg-background pl-9 pr-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}



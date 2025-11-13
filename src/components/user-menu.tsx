"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import { LogOut, User } from "lucide-react";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-muted/40"
      >
        {user?.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.name || "Usuário"}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs">
            {initials}
          </span>
        )}
        <span className="text-sm max-w-[120px] truncate">{user?.name ?? "Usuário"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-popover text-popover-foreground shadow-md">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name ?? "Usuário"}</p>
                {user?.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
              </div>
            </div>
          </div>
          <button
            onClick={() => void signOut()}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-muted/50"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}



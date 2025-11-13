"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@/lib/auth";

const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const readCookieSession = useCallback(() => {
    const has = document.cookie.includes("central_session=");
    if (!has) {
      setUser(null);
      setLoading(false);
      return;
    }
    const name = readCookie("central_name") || "Usuário";
    const rawGroups = readCookie("central_groups");
    const groups =
      rawGroups
        ?.split(",")
        .map((g) => g.trim())
        .filter(Boolean) ?? [];
    setUser({ id: "mock", name, groups });
    setLoading(false);
  }, []);

  useEffect(() => {
    readCookieSession();
  }, [readCookieSession]);

  const signIn = useCallback(() => {
    window.location.href = "/login";
  }, []);

  const signOut = useCallback(async () => {
    document.cookie = "central_session=; Max-Age=0; path=/";
    setUser(null);
    window.location.href = "/login";
  }, []);

  const refresh = useCallback(async () => {
    readCookieSession();
  }, [readCookieSession]);

  function readCookie(key: string): string | null {
    const match = document.cookie
      .split(";")
      .map((s) => s.trim())
      .find((c) => c.startsWith(`${key}=`));
    return match ? decodeURIComponent(match.split("=", 2)[1]) : null;
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, signIn, signOut, refresh }),
    [user, loading, signIn, signOut, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}



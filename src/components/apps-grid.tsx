"use client";

import { useMemo } from "react";
import { defaultApps, getAppsForGroups } from "@/lib/apps";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

// Mescla apps padrão com apps do(s) grupo(s) e filtra pela busca
type AppsGridProps = {
  query: string;
};

export function AppsGrid({ query }: AppsGridProps) {
  const { user } = useAuth();

  const apps = useMemo(() => {
    const sector = getAppsForGroups(user?.groups);
    const byId = new Map<string, typeof defaultApps[number]>();
    for (const a of defaultApps) byId.set(a.id, a);
    for (const a of sector) byId.set(a.id, a);
    const merged = Array.from(byId.values());
    if (!query) return merged;
    const q = query.toLowerCase();
    return merged.filter((a) => {
      const hay = `${a.name} ${a.description ?? ""} ${(a.tags ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [user?.groups, query]);

  if (apps.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma aplicação encontrada.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map((app) => (
        <a
          key={app.id}
          href={app.href}
          target={app.target ?? "_blank"}
          rel="noreferrer"
          className={cn(
            "group block rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow",
          )}
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted grid place-items-center text-lg">
              <span>{app.icon ?? "🔗"}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium truncate">{app.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {app.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{app.description}</p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}




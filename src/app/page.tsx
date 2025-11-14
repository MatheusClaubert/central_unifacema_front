"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Search } from "@/components/search";
import { UserMenu } from "@/components/user-menu";
import { AppsGrid } from "@/components/apps-grid";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";


export default function Home() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Central UniFacema</div>
          <div>
            {user ? (
              <UserMenu />
            ) : (
              <Link href="/login" className="rounded-lg border-b-black px-3 py-1.5 text-sm hover:bg-muted/50 outline-">
                <UserIcon className="h-4 w-4" />
                Autenticar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <Search value={query} onChange={setQuery} />
        </div>

        <section>
          <h2 className="text-lg font-medium mb-3">Aplicações</h2>
          <AppsGrid query={query} />
        </section>
      </main>
    </div>
  );
}

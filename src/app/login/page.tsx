"use client";

import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    // Login local: seta cookie e vai pra Home
    document.cookie = `central_session=1; path=/; max-age=${60 * 60 * 24}`;
    // Grupos e nome serão definidos pelo backend; não fazemos inferência aqui
    document.cookie = "central_groups=; Max-Age=0; path=/";
    document.cookie = "central_name=; Max-Age=0; path=/";
    router.replace("/");
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/CentralUnifacema.png"
          alt="Central UniFacema"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-xl border bg-card text-card-foreground shadow-sm p-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Central UniFacema</h1>
            <p className="text-muted-foreground mt-1">Entre com seu usuário e senha</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">
                Usuário
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="usuario"
                className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="********"
                  className="w-full rounded-lg border bg-background px-4 py-3 pr-12 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">
              {error}
            </div>
          )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-3.5 text-base font-medium hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Em caso de dúvidas, contate o suporte de TI.
          </p>
        </div>
      </div>
    </main>
  );
}

// Por enquanto o login é local: não chamo API aqui.
// Só gravo o cookie de sessão e redireciono para a Home.
// Quando o backend estiver pronto, substituo por uma chamada real.



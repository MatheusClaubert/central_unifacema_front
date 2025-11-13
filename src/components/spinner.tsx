export function Spinner({ size = 20 }: { size?: number }) {
  const border = Math.max(2, Math.round(size / 10));
  return (
    <span
      aria-label="Carregando"
      className="inline-block animate-spin rounded-full border-muted-foreground/30 border-t-primary align-middle"
      style={{
        width: size,
        height: size,
        borderWidth: border,
      }}
    />
  );
}




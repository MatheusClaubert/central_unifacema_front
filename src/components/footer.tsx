export default function Footer() {
  return (
    <footer className="border-t text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Central UniFacema. <br /> Todos os direitos reservados. Desenvolvido por John Kelvys, Luan Matheus & Matheus Claubert
    </footer>
  );
}
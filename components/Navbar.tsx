import Link from "next/link";
import NavAuth from "./auth/NavAuth";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide">
          Mira<span className="text-gold">.</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#how" className="hover:text-ink">How it works</Link>
          <Link href="/#suppliers" className="hover:text-ink">Suppliers</Link>
          <Link href="/registry/sarah-and-james" className="hover:text-ink">Example registry</Link>
          <Link href="/#faq" className="hover:text-ink">FAQ</Link>
        </div>
        <div className="flex items-center gap-3">
          <NavAuth />
          <Link
            href="/dashboard/new"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-ivory transition hover:bg-sage-dark"
          >
            Create registry
          </Link>
        </div>
      </nav>
    </header>
  );
}

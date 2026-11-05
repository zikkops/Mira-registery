import Link from "next/link";
import { Baby, ChevronDown, PartyPopper, Sparkles } from "lucide-react";
import NavAuth from "./auth/NavAuth";

const examples = [
  { label: "Wedding", name: "Sarah & James", href: "/registry/sarah-and-james", Icon: Sparkles, accent: "text-gold" },
  { label: "Birthday", name: "Rana turns 30", href: "/registry/rana-turns-30", Icon: PartyPopper, accent: "text-[#c2603f]" },
  { label: "Baby shower", name: "Baby Saab", href: "/registry/baby-saab", Icon: Baby, accent: "text-[#5b86a3]" },
];

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
          {/* Examples dropdown — opens on hover or keyboard focus */}
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 hover:text-ink group-focus-within:text-ink">
              Examples <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-2 shadow-xl">
                {examples.map((ex) => (
                  <Link key={ex.href} href={ex.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-sand">
                    <ex.Icon className={`h-4 w-4 ${ex.accent}`} />
                    <span>
                      <span className="block font-medium text-ink">{ex.label}</span>
                      <span className="block text-xs text-muted">{ex.name}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
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

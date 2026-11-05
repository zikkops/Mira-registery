import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-sand/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-semibold">
            Mira<span className="text-gold">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            The gift registry for weddings, birthdays, baby showers and more. Every guest can chip in towards the
            gifts that matter — delivered by stores we trust.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/#how" className="hover:text-sage-dark">How it works</Link></li>
            <li><Link href="/#suppliers" className="hover:text-sage-dark">Our suppliers</Link></li>
            <li><Link href="/registry/sarah-and-james" className="hover:text-sage-dark">Example registry</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@mira.example</li>
            <li>Become a supplier</li>
            <li>Help centre</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Mira Registry. Made with love. · Product photos from Unsplash
      </p>
    </footer>
  );
}

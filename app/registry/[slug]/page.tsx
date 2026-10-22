import { notFound } from "next/navigation";
import { CalendarHeart, Gift, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistryItems from "@/components/registry/RegistryItems";
import ShareButton from "@/components/registry/ShareButton";
import { allRegistrySlugs, formatMoney, getRegistry } from "@/lib/data";

export function generateStaticParams() {
  return allRegistrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRegistry(slug);
  return { title: r ? `${r.partnerOne} & ${r.partnerTwo} — Mira Registry` : "Registry not found" };
}

export default async function RegistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const registry = getRegistry(slug);
  if (!registry) notFound();

  const total = registry.items.reduce((s, i) => s + i.price, 0);
  const funded = registry.items.reduce((s, i) => s + i.funded, 0);
  const guests = registry.items.reduce((s, i) => s + i.contributors, 0);
  const pct = Math.round((funded / total) * 100);

  return (
    <>
      <Navbar />
      <main>
        {/* Couple header */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-blush/40 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-16 text-center md:pt-20">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">The wedding registry of</p>
            <h1 className="font-display mt-5 text-6xl font-medium md:text-8xl">
              {registry.partnerOne} <span className="italic text-gold">&amp;</span> {registry.partnerTwo}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2"><CalendarHeart className="h-4 w-4 text-sage" />{registry.date}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sage" />{registry.venue}, {registry.city}</span>
            </div>
            <div className="mx-auto mt-8 flex max-w-xs items-center gap-3 text-gold">
              <span className="h-px flex-1 bg-gold/40" />
              <span className="font-display text-xl">✦</span>
              <span className="h-px flex-1 bg-gold/40" />
            </div>
            <p className="font-display mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-ink/80 md:text-2xl">
              {registry.story}
            </p>
            <p className="font-display mt-4 text-lg italic text-muted">
              — with love, {registry.partnerOne} &amp; {registry.partnerTwo}
            </p>
            <div className="mt-8 flex justify-center">
              <ShareButton slug={registry.slug} />
            </div>
          </div>
        </section>

        {/* Progress summary */}
        <section className="mx-auto max-w-6xl px-5 pt-12">
          <div className="grid gap-6 rounded-3xl border border-line bg-white p-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-center md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Registry progress</p>
              <div className="mt-3 h-2.5 rounded-full bg-sand">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-sage to-sage-dark" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-ink">{formatMoney(funded)}</span> raised of {formatMoney(total)} · {pct}%
              </p>
            </div>
            <Stat icon={<Gift className="h-5 w-5 text-sage-dark" />} value={String(registry.items.length)} label="Gifts listed" />
            <Stat
              icon={<Gift className="h-5 w-5 text-gold" />}
              value={String(registry.items.filter((i) => i.funded >= i.price).length)}
              label="Fully funded"
            />
            <Stat icon={<Users className="h-5 w-5 text-sage-dark" />} value={String(guests)} label="Contributions" />
          </div>
        </section>

        <RegistryItems items={registry.items} couple={`${registry.partnerOne} & ${registry.partnerTwo}`} />

        {/* Guest messages */}
        <section className="bg-sand/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Guestbook</p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl">Notes from loved ones</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {registry.contributions.map((c) => (
                <div key={c.name} className="rounded-3xl border border-line bg-white p-7">
                  <p className="font-display text-2xl leading-snug">&ldquo;{c.message}&rdquo;</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-muted"> · towards {c.item}</span>
                    </span>
                    <span className="text-xs text-muted">{c.when}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 md:justify-center md:border-l md:border-line">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-sand">{icon}</div>
      <div>
        <p className="font-display text-3xl leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}

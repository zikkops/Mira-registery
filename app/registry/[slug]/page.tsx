import { notFound } from "next/navigation";
import { Gift, MapPin, Trophy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistryItems from "@/components/registry/RegistryItems";
import ShareButton from "@/components/registry/ShareButton";
import { allRegistrySlugs, displayName, getRegistry, type Registry } from "@/lib/data";
import { occasionInfo, type OccasionInfo } from "@/lib/occasions";

export function generateStaticParams() {
  return allRegistrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRegistry(slug);
  return { title: r ? `${displayName(r)} — Mira Registry` : "Registry not found" };
}

export default async function RegistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const registry = getRegistry(slug);
  if (!registry) notFound();

  const occasion = registry.occasion ?? "wedding";
  const t = occasionInfo[occasion];
  const parents = registry.partnerTwo ? `${registry.partnerOne} & ${registry.partnerTwo}` : registry.partnerOne;
  const signName = t.shape === "family" ? parents : t.shape === "person" ? registry.partnerOne : displayName(registry);
  const guests = registry.items.reduce((s, i) => s + i.contributors, 0);
  const bought = registry.items.filter((i) => i.funded >= i.price).length;
  const boughtPct = registry.items.length ? Math.round((bought / registry.items.length) * 100) : 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className={`relative overflow-hidden border-b border-line ${t.headerBg}`}>
          {t.glows.map((g) => (
            <div key={g} className={`pointer-events-none absolute rounded-full blur-3xl ${g}`} />
          ))}
          {t.confetti && <Confetti />}
          <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-16 text-center md:pt-20">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{t.kicker}</p>
            <Title registry={registry} info={t} />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2"><t.DateIcon className={`h-4 w-4 ${t.accent}`} />{registry.date}</span>
              <span className="flex items-center gap-2"><MapPin className={`h-4 w-4 ${t.accent}`} />{registry.venue}, {registry.city}</span>
            </div>
            <div className={`mx-auto mt-8 flex max-w-xs items-center gap-3 ${t.accent}`}>
              <span className={`h-px flex-1 ${t.rule}`} />
              {t.ornament ? <span className="font-display text-xl">{t.ornament}</span> : <t.Icon className="h-5 w-5" />}
              <span className={`h-px flex-1 ${t.rule}`} />
            </div>
            <p className="font-display mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-ink/80 md:text-2xl">
              {registry.story}
            </p>
            <p className="font-display mt-4 text-lg italic text-muted">{t.signoff(signName)}</p>
            <div className="mt-8 flex justify-center">
              <ShareButton slug={registry.slug} />
            </div>
          </div>
        </section>

        {/* Achievement */}
        <section className="mx-auto max-w-6xl px-5 pt-12">
          <Achievement pct={boughtPct} bought={bought} total={registry.items.length} accent={t.accent} bar={t.bar} />
          <div className="mt-4 grid gap-6 rounded-3xl border border-line bg-white p-6 sm:grid-cols-3 sm:items-center">
            <Stat icon={<Gift className="h-5 w-5 text-sage-dark" />} value={String(registry.items.length)} label="Gifts listed" />
            <Stat icon={<Gift className={`h-5 w-5 ${t.accent}`} />} value={String(bought)} label="Fully funded" />
            <Stat icon={<Users className="h-5 w-5 text-sage-dark" />} value={String(guests)} label="Contributions" />
          </div>
        </section>

        <RegistryItems items={registry.items} couple={displayName(registry)} title={t.wishTitle(registry.partnerOne)} />

        {/* Guest messages */}
        <section className="bg-sand/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="text-center">
              <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${t.accent}`}>{t.guestKicker}</p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl">{t.guestTitle(registry.partnerOne)}</h2>
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

function Title({ registry, info }: { registry: Registry; info: OccasionInfo }) {
  const headline = registry.headline ?? info.defaultHeadline;
  const sub = headline && <p className={`font-display mt-2 text-3xl italic md:text-4xl ${info.accent}`}>{headline}</p>;

  if (info.shape === "person") {
    return (
      <>
        <h1 className="font-display mt-5 text-6xl font-medium md:text-8xl">{registry.partnerOne}</h1>
        {sub}
      </>
    );
  }
  if (info.shape === "family") {
    return (
      <>
        <h1 className="font-display mt-5 text-6xl font-medium md:text-8xl">{displayName(registry)}</h1>
        {sub}
        <p className="mt-3 text-sm text-muted">
          Celebrating {registry.partnerTwo ? `${registry.partnerOne} & ${registry.partnerTwo}` : registry.partnerOne}
        </p>
      </>
    );
  }
  return (
    <>
      <h1 className="font-display mt-5 text-6xl font-medium md:text-8xl">
        {registry.partnerOne} <span className={`italic ${info.accent}`}>&amp;</span> {registry.partnerTwo}
      </h1>
      {sub}
    </>
  );
}


const milestones = [25, 50, 75, 100];

function Achievement({ pct, bought, total, accent, bar }: { pct: number; bought: number; total: number; accent: string; bar: string }) {
  const next = milestones.find((m) => m > pct);
  const giftsToNext = next ? Math.max(1, Math.ceil((next / 100) * total) - bought) : 0;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sand">
            <Trophy className={`h-7 w-7 ${accent}`} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Gifts bought</p>
            <p className={`font-display text-6xl leading-none md:text-7xl ${accent}`}>{pct}%</p>
          </div>
        </div>
        <div className="text-sm md:text-right">
          <p className="font-medium">
            {bought} of {total} wished-for gifts fully bought
          </p>
          <p className="mt-1 text-muted">
            {next
              ? `Just ${giftsToNext} more ${giftsToNext === 1 ? "gift" : "gifts"} to reach ${next}%`
              : "Every gift bought — wish list complete!"}
          </p>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="h-4 rounded-full bg-sand">
          <div className={`h-4 rounded-full bg-gradient-to-r ${bar}`} style={{ width: `${Math.max(pct, 2)}%` }} />
        </div>
        {milestones.map((m) => (
          <div key={m} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${m}%` }}>
            <span
              className={`h-4 w-4 rounded-full border-2 border-white ${m <= pct ? "bg-ink" : "bg-line"} ${m === 100 ? "-translate-x-1/2" : ""}`}
            />
            <span className={`mt-2 text-[11px] ${m <= pct ? "font-medium text-ink" : "text-muted"} ${m === 100 ? "-translate-x-1/2" : ""}`}>
              {m}%
            </span>
          </div>
        ))}
      </div>
      <div className="h-6" />
    </div>
  );
}

function Confetti() {
  const dots = [
    "left-[8%] top-[18%] bg-[#f0b54a]",
    "left-[18%] top-[62%] bg-[#c2603f]",
    "left-[30%] top-[10%] bg-sage",
    "right-[10%] top-[22%] bg-[#c2603f]",
    "right-[20%] top-[70%] bg-[#f0b54a]",
    "right-[32%] top-[8%] bg-sage",
    "left-[12%] top-[85%] bg-sage",
    "right-[6%] top-[50%] bg-[#f0b54a]",
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={d}
          className={`pointer-events-none absolute h-2.5 w-2.5 ${i % 2 ? "rounded-full" : "rotate-45 rounded-sm"} ${d}`}
        />
      ))}
    </>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 sm:justify-center sm:[&:not(:first-child)]:border-l sm:border-line">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-sand">{icon}</div>
      <div>
        <p className="font-display text-3xl leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}

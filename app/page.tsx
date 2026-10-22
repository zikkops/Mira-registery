import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Gift,
  HeartHandshake,
  Link2,
  ShieldCheck,
  Store,
  Truck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatMoney, photo, suppliers } from "@/lib/data";

const steps = [
  {
    icon: Gift,
    title: "Couples pick real gifts",
    body: "Browse cookware, beds, furniture, appliances and honeymoons from our partner suppliers and add them to your registry.",
  },
  {
    icon: Link2,
    title: "Share one personal link",
    body: "Every couple gets their own page — mira.com/your-names — to send with invitations or add to your wedding website.",
  },
  {
    icon: Users,
    title: "Guests chip in any amount",
    body: "Friends and family contribute whatever they like towards an item. Big gifts become possible when everyone pitches in.",
  },
  {
    icon: Truck,
    title: "We deliver the gift",
    body: "Once an item is fully funded, we order it from the supplier and deliver it to the couple's door — no cash handling, no hassle.",
  },
];

const categoryTiles = [
  { name: "Cookware", image: "1590794056226-79ef3a8147e1" },
  { name: "Beds & Mattresses", image: "1560185128-e173042f79dd" },
  { name: "Furniture", image: "1555041469-a586c61ea9bc" },
  { name: "Bedding & Bath", image: "1523471826770-c437b4636fe6" },
  { name: "Appliances", image: "1620807773206-49c1f2957417" },
  { name: "Honeymoons", image: "1612698093158-e07ac200d44e" },
];

const testimonials = [
  {
    quote:
      "We never thought we'd afford a proper bed frame and mattress so soon. Thirty guests chipped in and it arrived two weeks after the wedding.",
    name: "Nadia & Omar",
    detail: "Married May 2026",
  },
  {
    quote:
      "So much easier than guessing what to buy. I put $40 towards their cookware set and got a lovely thank-you note.",
    name: "Grace",
    detail: "Wedding guest",
  },
  {
    quote:
      "No duplicate toasters, no returns. Just the things we actually wanted, from shops we actually like.",
    name: "Leo & Hannah",
    detail: "Married Sept 2026",
  },
];

const faqs = [
  {
    q: "How do guests contribute?",
    a: "Guests open the couple's link, pick an item, and choose any amount to put towards it. They can add a personal message that the couple sees on their page.",
  },
  {
    q: "What happens if an item isn't fully funded?",
    a: "Couples can top up the remainder themselves, move the funds to another item, or keep the balance as store credit with that supplier.",
  },
  {
    q: "Who are the suppliers?",
    a: "We partner with vetted homeware, furniture, appliance and travel businesses. We regularly add new suppliers and retire ones that don't meet our standards.",
  },
  {
    q: "Is there a fee?",
    a: "Creating a registry is free for couples. A small processing fee is shown to guests at checkout.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{children}</p>;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blush/50 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 top-60 h-[380px] w-[380px] rounded-full bg-[#dfe5da]/70 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionLabel>The group-gift wedding registry</SectionLabel>
              <h1 className="font-display mt-5 text-5xl leading-[1.05] font-medium md:text-7xl">
                Gifts they&apos;ll use <em className="text-sage-dark">for a lifetime</em>, funded together.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                Mira lets wedding guests contribute any amount towards the things couples really need
                — cookware, a new bed, the sofa, the honeymoon — from suppliers we trust.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#start"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory transition hover:bg-sage-dark"
                >
                  Create your registry <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/registry/sarah-and-james"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium transition hover:border-ink"
                >
                  See an example
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Free for couples</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Any amount, any guest</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Delivered to your door</span>
              </div>
            </div>

            {/* Preview card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-6 -top-6 h-full w-full rotate-[-4deg] rounded-[2rem] bg-sand" />
              <div className="relative rounded-[2rem] border border-line bg-white p-6 shadow-[0_30px_60px_-30px_rgba(43,38,34,0.35)]">
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted">The wedding of</p>
                  <p className="font-display mt-1 text-4xl">Sarah &amp; James</p>
                  <p className="mt-1 text-xs text-muted">June 14, 2027 · Napa Valley</p>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { name: "Stainless Cookware Set", image: "1604414499020-f9ac575bc5ec", price: 1200, funded: 780 },
                    { name: "Upholstered King Bed", image: "1560185128-e173042f79dd", price: 2400, funded: 1350 },
                    { name: "Amalfi Honeymoon", image: "1612698093158-e07ac200d44e", price: 6500, funded: 4120 },
                  ].map((it) => {
                    const pct = Math.round((it.funded / it.price) * 100);
                    return (
                      <div key={it.name} className="flex items-center gap-4 rounded-2xl border border-line/80 p-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                          <Image src={photo(it.image, 200)} alt={it.name} fill sizes="56px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2 text-sm">
                            <span className="truncate font-medium">{it.name}</span>
                            <span className="text-muted">{pct}%</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-sand">
                            <div className="h-1.5 rounded-full bg-sage" style={{ width: `${pct}%` }} />
                          </div>
                          <p className="mt-1.5 text-xs text-muted">
                            {formatMoney(it.funded)} of {formatMoney(it.price)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-full bg-ink py-3 text-center text-sm font-medium text-ivory">
                  Contribute a gift
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs shadow-lg md:-right-8">
                <HeartHandshake className="h-4 w-4 text-gold" /> Aunt Linda gave $250
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-line bg-white/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 text-center md:grid-cols-4">
            {[
              ["2,400+", "Couples registered"],
              ["$3.1M", "Gifted by guests"],
              ["40+", "Partner suppliers"],
              ["4.9★", "Average couple rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <div className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">
              One link. Every guest. The gifts you actually want.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-line bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-sand">
                    <s.icon className="h-5 w-5 text-sage-dark" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-3xl text-line">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Couples / Guests */}
        <section className="bg-sand/60">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-24 md:grid-cols-2">
            <div className="rounded-[2rem] bg-ink p-10 text-ivory">
              <SectionLabel>For couples</SectionLabel>
              <h3 className="font-display mt-4 text-4xl">Build a home, not a pile of duplicates.</h3>
              <ul className="mt-8 space-y-4 text-sm text-ivory/80">
                {[
                  "Choose from curated items across trusted suppliers",
                  "Your own shareable registry page with your story",
                  "Track contributions and messages in real time",
                  "Items delivered once they're fully funded",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-white p-10">
              <SectionLabel>For guests</SectionLabel>
              <h3 className="font-display mt-4 text-4xl">Give something meaningful, at any budget.</h3>
              <ul className="mt-8 space-y-4 text-sm text-muted">
                {[
                  "No account needed — just open the couple's link",
                  "Put any amount towards a specific item",
                  "Leave a personal message for the couple",
                  "Secure checkout and instant receipt",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>What you can register for</SectionLabel>
              <h2 className="font-display mt-4 text-4xl md:text-5xl">Everything for your first home</h2>
            </div>
            <Link href="/registry/sarah-and-james" className="flex items-center gap-2 text-sm font-medium text-sage-dark hover:underline">
              Browse an example registry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categoryTiles.map((c) => (
              <div key={c.name} className="group rounded-3xl border border-line bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={photo(c.image, 400)}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-medium">{c.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Suppliers */}
        <section id="suppliers" className="scroll-mt-20 border-y border-line bg-white/70">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <SectionLabel>Our suppliers</SectionLabel>
                <h2 className="font-display mt-4 text-4xl md:text-5xl">Partners we know and trust</h2>
                <p className="mt-5 leading-relaxed text-muted">
                  Every item on Mira comes from a vetted supplier. We handle the order, the delivery and
                  any after-care — so couples get quality and guests know their gift arrives.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                  <ShieldCheck className="h-5 w-5 text-sage" /> Quality-checked &amp; reviewed every year
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                  <Store className="h-5 w-5 text-sage" /> Are you a supplier? <span className="font-medium text-ink underline">Partner with us</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {suppliers.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-line bg-ivory p-6">
                    <div className="font-display grid h-12 w-12 place-items-center rounded-full bg-ink text-xl text-ivory">
                      {s.name.charAt(0)}
                    </div>
                    <p className="mt-4 font-medium">{s.name}</p>
                    <p className="mt-1 text-sm text-muted">{s.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <SectionLabel>Kind words</SectionLabel>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">Loved by couples and guests</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-line bg-white p-8">
                <p className="font-display text-5xl leading-none text-gold">&ldquo;</p>
                <blockquote className="font-display -mt-2 text-xl leading-snug">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted"> · {t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-sand/60">
          <div className="mx-auto max-w-3xl px-5 py-24">
            <div className="text-center">
              <SectionLabel>Questions</SectionLabel>
              <h2 className="font-display mt-4 text-4xl md:text-5xl">Frequently asked</h2>
            </div>
            <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span className="text-xl text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="start" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-dark px-8 py-16 text-center text-ivory md:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-gold/20" />
            <h2 className="font-display relative text-4xl md:text-6xl">Ready to start your registry?</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-ivory/80">
              It takes five minutes to set up. Add your favourite pieces, share your link, and let the people
              who love you help build your home.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <span className="cursor-pointer rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-ink">
                Create your free registry
              </span>
              <Link href="/registry/sarah-and-james" className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-medium hover:border-ivory">
                Find a couple&apos;s registry
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

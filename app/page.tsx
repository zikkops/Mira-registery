import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Gift,
  Link2,
  ShieldCheck,
  Store,
  Truck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroPreview from "@/components/HeroPreview";
import { photo, suppliers } from "@/lib/data";
import { occasionInfo, occasionOrder } from "@/lib/occasions";

const steps = [
  {
    icon: Gift,
    title: "Pick the gifts you want",
    body: "Wedding, engagement, birthday, baby shower, graduation and more — browse real products from our partner stores and add them to your registry.",
  },
  {
    icon: Link2,
    title: "Share one personal link",
    body: "Every registry gets its own page — mira.com/your-event — to send with invitations or share in the group chat.",
  },
  {
    icon: Users,
    title: "Guests chip in any amount",
    body: "Friends and family contribute whatever they like towards an item. Big gifts become possible when everyone pitches in.",
  },
  {
    icon: Truck,
    title: "We deliver the gift",
    body: "Once the registry closes, we take care of the rest with our partner stores and arrange delivery to your door — no cash handling, no hassle.",
  },
];

const occasions = occasionOrder.map((key) => {
  const o = occasionInfo[key];
  return { name: o.plural, image: o.cover, href: o.example, Icon: o.Icon, accent: o.accent };
});

const testimonials = [
  {
    quote:
      "We never thought we'd afford a proper bed frame and mattress so soon. Thirty guests chipped in and it arrived two weeks after the wedding.",
    name: "Nadia & Omar",
    detail: "Wedding registry",
  },
  {
    quote:
      "For my 30th I finally got the camera I'd been eyeing for years — instead of five candles and a mug.",
    name: "Rana",
    detail: "Birthday registry",
  },
  {
    quote:
      "Friends covered the washing machine and the nursery basics. With a newborn, that was the best gift imaginable.",
    name: "Lea & Marc",
    detail: "Baby shower registry",
  },
];

const faqs = [
  {
    q: "What can I make a registry for?",
    a: "Weddings, engagements, bridal showers, bachelorettes, birthdays, baby showers, gender reveals, baptisms and graduations — any moment where people want to give you something.",
  },
  {
    q: "How do guests contribute?",
    a: "Guests open your link, pick an item, and choose any amount to put towards it. They can add a personal message that you'll see on your page.",
  },
  {
    q: "What happens if an item isn't fully funded?",
    a: "Every registry has a closing date. After that, you can rearrange the money collected — moving funds from items you can live without to the ones you really want — and we order everything that is fully funded.",
  },
  {
    q: "Who are the suppliers?",
    a: "We partner with vetted homeware, furniture, appliance and travel businesses. We regularly add new suppliers and retire ones that don't meet our standards.",
  },
  {
    q: "Is there a fee?",
    a: "Creating a registry is free. A small processing fee is shown to guests at checkout.",
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
              <SectionLabel>The group-gift registry for every occasion</SectionLabel>
              <h1 className="font-display mt-5 text-5xl leading-[1.05] font-medium md:text-7xl">
                The gifts you <em className="text-sage-dark">actually want</em>, funded together.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                Weddings, birthdays, baby showers and more — add the gifts you really want, share one link,
                and let the people you love chip in any amount, from stores we trust.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/new"
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
              <p className="mt-4 text-sm text-muted">
                Examples:{" "}
                <Link href="/registry/sarah-and-james" className="font-medium text-ink underline-offset-4 hover:underline">Wedding</Link>
                {" · "}
                <Link href="/registry/rana-turns-30" className="font-medium text-ink underline-offset-4 hover:underline">Birthday</Link>
                {" · "}
                <Link href="/registry/baby-saab" className="font-medium text-ink underline-offset-4 hover:underline">Baby shower</Link>
              </p>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Free to create</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Any amount, any guest</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Delivered to your door</span>
              </div>
            </div>

            {/* Preview card */}
            <HeroPreview />
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-line bg-white/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 text-center md:grid-cols-4">
            {[
              ["2,400+", "Registries created"],
              ["$3.1M", "Gifted by guests"],
              ["40+", "Partner suppliers"],
              ["4.9★", "Average host rating"],
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

        {/* Hosts / Guests */}
        <section className="bg-sand/60">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-24 md:grid-cols-2">
            <div className="rounded-[2rem] bg-ink p-10 text-ivory">
              <SectionLabel>For you</SectionLabel>
              <h3 className="font-display mt-4 text-4xl">Stop getting gifts you don&apos;t actually want.</h3>
              <p className="mt-4 text-ivory/80">Let the people you love give you what you actually want.</p>
              <ul className="mt-8 space-y-4 text-sm text-ivory/80">
                {[
                  "Choose from curated items across trusted suppliers",
                  "Your own shareable registry page with your story",
                  "Track contributions and messages in real time",
                  "Gifts delivered after your registry closes",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-white p-10">
              <SectionLabel>For guests</SectionLabel>
              <h3 className="font-display mt-4 text-4xl">Stuck on what to buy?</h3>
              <p className="mt-4 text-muted">Now it&apos;s easy — you know exactly what they want.</p>
              <ul className="mt-8 space-y-4 text-sm text-muted">
                {[
                  "No account needed — just open their link",
                  "Put any amount towards a specific item",
                  "Leave a personal message with your gift",
                  "Secure checkout and instant receipt",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Occasions */}
        <section id="occasions" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>One registry, any occasion</SectionLabel>
              <h2 className="font-display mt-4 text-4xl md:text-5xl">Whatever you&apos;re celebrating</h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Every occasion gets its own colours and wording. Open an example, or start your own.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {occasions.map((o) => (
              <Link
                key={o.name}
                href={o.href ?? "/dashboard/new"}
                className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl bg-sand md:w-24">
                  <Image
                    src={photo(o.image, 300)}
                    alt={o.name}
                    fill
                    sizes="96px"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium md:text-base">
                    <o.Icon className={`h-4 w-4 shrink-0 ${o.accent}`} /> {o.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    {o.href ? "See example" : "Start one"} <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
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
                  any after-care — so you get quality and guests know their gift arrives.
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
            <h2 className="font-display mt-4 text-4xl md:text-5xl">Loved by hosts and guests</h2>
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
              It takes five minutes to set up. Add the gifts you really want, share your link, and let the people
              who love you make your celebration unforgettable.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/dashboard/new" className="rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-ink">
                Create your free registry
              </Link>
              <Link href="/registry/sarah-and-james" className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-medium hover:border-ivory">
                See an example registry
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

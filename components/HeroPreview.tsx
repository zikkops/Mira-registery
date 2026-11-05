"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Baby, HeartHandshake, PartyPopper, Sparkles } from "lucide-react";
import { photo } from "@/lib/data";

// Homepage preview card that cycles through the three example registries.
const events = [
  {
    id: "wedding",
    tab: "Wedding",
    Icon: Sparkles,
    kicker: "The wedding of",
    title: "Sarah & James",
    detail: "June 14, 2027 · Napa Valley",
    href: "/registry/sarah-and-james",
    cover: "1465495976277-4387d4b0b4c6",
    accent: "text-gold",
    bar: "bg-sage",
    card: "bg-white",
    back: "bg-sand",
    badge: "Aunt Linda gave $250",
    items: [
      { name: "Stainless Cookware Set", image: "1604414499020-f9ac575bc5ec", price: 1200, funded: 780 },
      { name: "Upholstered King Bed", image: "1560185128-e173042f79dd", price: 2400, funded: 1350 },
      { name: "Amalfi Honeymoon", image: "1612698093158-e07ac200d44e", price: 6500, funded: 4120 },
    ],
  },
  {
    id: "birthday",
    tab: "Birthday",
    Icon: PartyPopper,
    kicker: "A birthday wish list",
    title: "Rana turns 30",
    detail: "December 12, 2026 · Beirut",
    href: "/registry/rana-turns-30",
    cover: "1530103862676-de8c9debad1d",
    accent: "text-[#c2603f]",
    bar: "bg-gradient-to-r from-[#f0b54a] to-[#c2603f]",
    card: "bg-[#fffaf2]",
    back: "bg-[#f8dfb8]",
    badge: "Dana gave $80",
    items: [
      { name: "Noise-Cancelling Headphones", image: "1505740420928-5e560c06d30e", price: 350, funded: 350 },
      { name: "Instant Film Camera", image: "1526170375885-4d8ecf77b99f", price: 180, funded: 120 },
      { name: "City Bicycle", image: "1485965120184-e220f721d03e", price: 780, funded: 300 },
    ],
  },
  {
    id: "baby",
    tab: "Baby shower",
    Icon: Baby,
    kicker: "A baby shower for",
    title: "Baby Saab",
    detail: "Due March 3, 2027 · Jounieh",
    href: "/registry/baby-saab",
    cover: "1522771930-78848d9293e8",
    accent: "text-[#5b86a3]",
    bar: "bg-gradient-to-r from-[#b9d3e3] to-[#5b86a3]",
    card: "bg-[#f8fbfd]",
    back: "bg-[#dbe8f0]",
    badge: "Teta Mona gave $140",
    items: [
      { name: "Front-Load Washing Machine", image: "1626806819282-2c1dc01a5e0c", price: 1100, funded: 650 },
      { name: "Baby Sleep Bundle", image: "1544126592-807ade215a0b", price: 380, funded: 200 },
      { name: "Wooden & Plush Toy Basket", image: "1515488042361-ee00e0ddd4e4", price: 160, funded: 160 },
    ],
  },
];

export default function HeroPreview() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // The examples are kept as data for later; for now each tab just shows a themed photo.
  const e = events[index];

  // Rotate through the occasions until the visitor picks a tab themselves.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % events.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className={`absolute -left-6 -top-6 h-full w-full rotate-[-4deg] rounded-[2rem] transition-colors duration-500 ${e.back}`} />

      <div
        className={`relative rounded-[2rem] border border-line p-6 shadow-[0_30px_60px_-30px_rgba(43,38,34,0.35)] transition-colors duration-500 ${e.card}`}
      >
        {/* Event tabs — always visible */}
        <div role="tablist" aria-label="Example registries" className="mx-auto flex w-fit gap-1 rounded-full bg-sand/70 p-1">
          {events.map((ev, i) => (
            <button
              key={ev.id}
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                i === index ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              <ev.Icon className={`h-3.5 w-3.5 ${i === index ? ev.accent : ""}`} />
              {ev.tab}
            </button>
          ))}
        </div>

        {/* Themed cover photo */}
        <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
            {events.map((ev, i) => (
              <Image
                key={ev.id}
                src={photo(ev.cover, 900)}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 400px, 85vw"
                className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div key={e.id} className="absolute inset-x-0 bottom-0 animate-[fadeIn_400ms_ease-out] p-6 text-ivory">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/80">{e.kicker}</p>
              <p className="font-display mt-1 text-4xl leading-tight">{e.title}</p>
              <p className="mt-1 text-xs text-ivory/80">{e.detail}</p>
            </div>
        </div>

        <Link
          href={e.href}
          className="mt-5 block rounded-full bg-ink py-3 text-center text-sm font-medium text-ivory transition hover:bg-sage-dark"
        >
          Contribute a gift
        </Link>
      </div>

      <div
        key={e.badge}
        className="absolute -bottom-5 -right-3 z-20 flex animate-[fadeIn_400ms_ease-out] items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs shadow-lg md:-right-8"
      >
        <HeartHandshake className={`h-4 w-4 ${e.accent}`} /> {e.badge}
      </div>
    </div>
  );
}

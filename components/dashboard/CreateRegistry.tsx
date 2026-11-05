"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import CatalogPicker from "./CatalogPicker";
import ClosingNotice from "./ClosingNotice";
import { catalog, displayName, formatMoney, photo, type Occasion } from "@/lib/data";
import { addRegistry } from "@/lib/dashboard-store";
import { occasionInfo, occasionOrder } from "@/lib/occasions";

const steps = ["Occasion", "Your details", "Pick your gifts", "Review"];

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function CreateRegistry() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [details, setDetails] = useState({ partnerOne: "", partnerTwo: "", age: "", familyName: "", date: "", venue: "", city: "" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const set = (key: keyof typeof details) => (v: string) => setDetails((d) => ({ ...d, [key]: v }));

  const opt = occasion ? occasionInfo[occasion] : null;
  const shape = opt?.shape;
  const d = { ...details, partnerOne: details.partnerOne.trim(), partnerTwo: details.partnerTwo.trim(), familyName: details.familyName.trim() };
  const detailsValid =
    !!d.date &&
    !!d.partnerOne &&
    (shape === "couple" ? !!d.partnerTwo : shape === "family" ? !!d.familyName : true);

  // What the registry will be called, depending on the occasion.
  const title = shape === "family" && d.familyName ? `Baby ${d.familyName}` : undefined;
  const partnerTwo = shape === "person" ? "" : d.partnerTwo;
  const headline =
    occasion === "birthday" && d.age
      ? `is turning ${d.age}`
      : occasion === "graduation" && d.date
        ? `Class of ${d.date.slice(0, 4)}`
        : opt?.defaultHeadline;
  const suffix = opt?.slugSuffix ? `-${opt.slugSuffix}` : "";
  const slug =
    shape === "couple"
      ? kebab(`${d.partnerOne}-and-${d.partnerTwo}${suffix}`)
      : shape === "family"
        ? kebab(suffix ? `${d.familyName}${suffix}` : `baby-${d.familyName}`)
        : kebab(occasion === "birthday" && d.age ? `${d.partnerOne}-turns-${d.age}` : `${d.partnerOne}${suffix}`);
  const name = displayName({ partnerOne: d.partnerOne, partnerTwo, title });

  const picked = catalog.filter((c) => selected.has(c.id));
  const total = picked.reduce((s, c) => s + c.price, 0);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const create = () => {
    if (!occasion) return;
    addRegistry({
      occasion,
      title,
      headline,
      partnerOne: d.partnerOne,
      partnerTwo,
      date: `${opt?.datePrefix ?? ""}${formatDate(d.date)}`,
      venue: d.venue.trim(),
      city: d.city.trim(),
      slug,
      items: picked.map((c) => ({ catalogId: c.id, funded: 0, contributors: 0 })),
      previewClosed: false,
    });
    router.push("/dashboard");
  };

  const goTo = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canContinue = step === 0 ? !!occasion : step === 1 ? detailsValid : selected.size > 0;

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Create your registry</p>
      <h1 className="font-display mt-3 text-4xl md:text-5xl">Let&apos;s set up your wish list</h1>

      {/* Stepper */}
      <ol className="mt-8 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
              i === step ? "bg-ink text-ivory" : i < step ? "bg-sand text-ink" : "border border-line text-muted"
            }`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px]">
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {i === 0 && opt && i < step ? opt.label : s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-[2rem] border border-line bg-white p-6 md:p-10">
        {step === 0 && (
          <>
            <p className="font-display text-3xl">What are you celebrating?</p>
            <p className="mt-1 text-sm text-muted">This sets the look of your page and the details we ask for.</p>
            <div role="radiogroup" className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {occasionOrder.map((key) => {
                const o = occasionInfo[key];
                const on = occasion === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setOccasion(key)}
                    className={`group overflow-hidden rounded-3xl border-2 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                      on ? o.ring : "border-line"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                      <Image src={photo(o.cover, 500)} alt="" fill sizes="(min-width: 768px) 300px, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                      {on && (
                        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-ink text-ivory">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div className="p-4 md:p-5">
                      <p className="flex items-center gap-2 font-medium">
                        <o.Icon className={`h-4 w-4 ${o.accent}`} /> {o.label}
                      </p>
                      <p className="mt-1 hidden text-sm text-muted sm:block">{o.blurb}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 1 && opt && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={opt.nameLabels[0]} value={details.partnerOne} onChange={set("partnerOne")} placeholder={opt.namePlaceholders[0]} />
            {opt.nameLabels[1] && (
              <Field
                label={opt.nameLabels[1]}
                value={details.partnerTwo}
                onChange={set("partnerTwo")}
                placeholder={opt.namePlaceholders[1]}
                optional={shape === "family"}
              />
            )}
            {shape === "family" && (
              <Field label="Family name" value={details.familyName} onChange={set("familyName")} placeholder="e.g. Saab" />
            )}
            {occasion === "birthday" && (
              <Field label="Turning" type="number" value={details.age} onChange={set("age")} placeholder="e.g. 30" optional />
            )}
            <Field label={opt.dateLabel} type="date" value={details.date} onChange={set("date")} />
            <Field label={opt.venueLabel} value={details.venue} onChange={set("venue")} placeholder={opt.venuePlaceholder} optional />
            <Field label="City" value={details.city} onChange={set("city")} placeholder="e.g. Beirut" optional />
            {detailsValid && (
              <div className="self-end rounded-xl bg-sand px-4 py-3 text-sm text-muted md:col-span-2">
                Your link: <span className="font-medium text-ink">mira.com/{slug}</span>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <>
            <p className="mb-6 text-sm text-muted">
              Choose preset items from each of our partner stores. You can add or remove items later from your dashboard.
            </p>
            <CatalogPicker selected={selected} onToggle={toggle} />
          </>
        )}

        {step === 3 && opt && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted">{opt.kicker}</p>
              <p className="font-display mt-2 text-5xl">{name}</p>
              {headline && <p className={`font-display mt-1 text-2xl italic ${opt.accent}`}>{headline}</p>}
              <p className="mt-3 text-sm text-muted">
                {picked.length} {picked.length === 1 ? "gift" : "gifts"} · {formatMoney(total)} wish list · mira.com/{slug}
              </p>
            </div>
            <ClosingNotice closed={false} />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(step - 1)}
          className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted hover:text-ink ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => goTo(step + 1)}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 2 ? `Continue with ${selected.size} ${selected.size === 1 ? "gift" : "gifts"}` : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={create}
            className="flex items-center gap-2 rounded-full bg-sage-dark px-6 py-3 text-sm font-medium text-ivory transition hover:bg-ink"
          >
            <Check className="h-4 w-4" /> Create registry
          </button>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </span>
      <input
        type={type}
        value={value}
        min={type === "number" ? 1 : undefined}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}

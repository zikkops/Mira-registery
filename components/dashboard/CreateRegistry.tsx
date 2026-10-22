"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import CatalogPicker from "./CatalogPicker";
import ClosingNotice from "./ClosingNotice";
import { catalog, formatMoney } from "@/lib/data";
import { addRegistry, slugify } from "@/lib/dashboard-store";

const steps = ["Your details", "Pick your gifts", "Review"];

export default function CreateRegistry() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({ partnerOne: "", partnerTwo: "", date: "", venue: "", city: "" });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const detailsValid = details.partnerOne.trim() && details.partnerTwo.trim() && details.date;
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
    addRegistry({
      ...details,
      date: new Date(details.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      slug: slugify(details.partnerOne, details.partnerTwo),
      items: picked.map((c) => ({ catalogId: c.id, funded: 0, contributors: 0 })),
      previewClosed: false,
    });
    router.push("/dashboard");
  };

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
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-[2rem] border border-line bg-white p-6 md:p-10">
        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Partner one" value={details.partnerOne} onChange={(v) => setDetails({ ...details, partnerOne: v })} placeholder="e.g. Maya" />
            <Field label="Partner two" value={details.partnerTwo} onChange={(v) => setDetails({ ...details, partnerTwo: v })} placeholder="e.g. Karim" />
            <Field label="Wedding date" type="date" value={details.date} onChange={(v) => setDetails({ ...details, date: v })} />
            <Field label="Venue" value={details.venue} onChange={(v) => setDetails({ ...details, venue: v })} placeholder="e.g. Le Royal Hotel" optional />
            <Field label="City" value={details.city} onChange={(v) => setDetails({ ...details, city: v })} placeholder="e.g. Beirut" optional />
            {details.partnerOne && details.partnerTwo && (
              <div className="self-end rounded-xl bg-sand px-4 py-3 text-sm text-muted">
                Your link: <span className="font-medium text-ink">mira.com/{slugify(details.partnerOne, details.partnerTwo)}</span>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <>
            <p className="mb-6 text-sm text-muted">
              Choose preset items from each of our partner stores. You can add or remove items later from your dashboard.
            </p>
            <CatalogPicker selected={selected} onToggle={toggle} />
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="font-display text-4xl">
                {details.partnerOne} <span className="italic text-gold">&amp;</span> {details.partnerTwo}
              </p>
              <p className="mt-2 text-sm text-muted">
                {picked.length} {picked.length === 1 ? "gift" : "gifts"} · {formatMoney(total)} wish list
              </p>
            </div>
            <ClosingNotice closed={false} />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted hover:text-ink ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < 2 ? (
          <button
            type="button"
            disabled={step === 0 ? !detailsValid : selected.size === 0}
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 1 ? `Continue with ${selected.size} ${selected.size === 1 ? "gift" : "gifts"}` : "Continue"}
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
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}

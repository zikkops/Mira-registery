"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Lock, RotateCcw, Save } from "lucide-react";
import { CLOSING_LABEL, formatMoney, photo, supplierById } from "@/lib/data";
import { updateRegistry, type JoinedItem } from "@/lib/dashboard-store";

export default function Rearrange({
  slug,
  items,
  closed,
  onPreview,
}: {
  slug: string;
  items: JoinedItem[];
  closed: boolean;
  onPreview: () => void;
}) {
  const initial = useMemo(() => Object.fromEntries(items.map((i) => [i.catalogId, i.funded])), [items]);
  const [draft, setDraft] = useState<Record<string, number>>(initial);
  const [saved, setSaved] = useState(false);

  const pool = items.reduce((s, i) => s + i.funded, 0);
  const assigned = Object.values(draft).reduce((s, n) => s + n, 0);
  const unassigned = pool - assigned;
  const changed = items.some((i) => draft[i.catalogId] !== i.funded);

  if (!closed) {
    return (
      <div className="rounded-[2rem] border border-dashed border-line bg-white px-6 py-16 text-center">
        <Lock className="mx-auto h-8 w-8 text-muted" strokeWidth={1.5} />
        <p className="font-display mt-4 text-3xl">Rearranging opens on {CLOSING_LABEL}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          While your registry is open, guests&apos; gifts stay on the items they chose. Once it closes you can move the
          money into the items you really want.
        </p>
        <button onClick={onPreview} className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory hover:bg-sage-dark">
          Preview it now (demo)
        </button>
      </div>
    );
  }

  const set = (id: string, value: number, price: number) => {
    setSaved(false);
    setDraft((d) => {
      const room = d[id] + (pool - Object.values(d).reduce((s, n) => s + n, 0));
      return { ...d, [id]: Math.max(0, Math.min(price, room, Math.round(value))) };
    });
  };

  const save = () => {
    updateRegistry(slug, (r) => ({
      ...r,
      items: r.items.map((i) => ({ ...i, funded: draft[i.catalogId] ?? i.funded })),
    }));
    setSaved(true);
  };

  const sorted = [...items].sort((a, b) => b.funded / b.price - a.funded / a.price);

  return (
    <div>
      {/* Balance bar */}
      <div className="sticky top-16 z-20 -mx-5 border-b border-line/70 bg-ivory/90 px-5 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Figure label="Collected from guests" value={formatMoney(pool)} />
          <Figure label="Placed on items" value={formatMoney(assigned)} />
          <Figure
            label="Ready to place"
            value={formatMoney(unassigned)}
            tone={unassigned > 0 ? "text-gold" : "text-sage-dark"}
          />
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                setDraft(initial);
                setSaved(false);
              }}
              disabled={!changed}
              className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-muted hover:border-ink hover:text-ink disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={save}
              disabled={!changed || unassigned !== 0}
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          {saved && !changed
            ? "Saved — fully funded items will be ordered from their store."
            : unassigned > 0
              ? `Place the remaining ${formatMoney(unassigned)} on an item before saving.`
              : "Take money off items you can live without, then put it towards the ones you really want."}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {sorted.map((item) => {
          const value = draft[item.catalogId] ?? 0;
          const pct = Math.round((value / item.price) * 100);
          const done = value >= item.price;
          const diff = value - item.funded;
          return (
            <div key={item.catalogId} className="grid gap-4 rounded-2xl border border-line bg-white p-4 md:grid-cols-[2fr_3fr] md:items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                  <Image src={photo(item.image, 200)} alt={item.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gold">{supplierById(item.supplierId)?.name}</p>
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted">
                    {formatMoney(value)} of {formatMoney(item.price)}
                    {diff !== 0 && (
                      <span className={diff > 0 ? "text-sage-dark" : "text-gold"}>
                        {" "}
                        ({diff > 0 ? "+" : "−"}
                        {formatMoney(Math.abs(diff))})
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={item.price}
                  step={10}
                  value={value}
                  onChange={(e) => set(item.catalogId, Number(e.target.value), item.price)}
                  aria-label={`Amount on ${item.name}`}
                  className="h-2 flex-1 accent-[var(--color-sage-dark)]"
                />
                <span className={`w-12 text-right text-xs ${done ? "font-medium text-sage-dark" : "text-muted"}`}>{pct}%</span>
                <button
                  onClick={() => set(item.catalogId, 0, item.price)}
                  disabled={value === 0}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:border-ink hover:text-ink disabled:opacity-40"
                >
                  Release
                </button>
                <button
                  onClick={() => set(item.catalogId, item.price, item.price)}
                  disabled={done || unassigned === 0}
                  className="rounded-full bg-sand px-3 py-1.5 text-xs font-medium hover:bg-ink hover:text-ivory disabled:opacity-40"
                >
                  {done ? "Funded" : "Fill"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Figure({ label, value, tone = "text-ink" }: { label: string; value: string; tone?: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className={`font-display text-2xl ${tone}`}>{value}</p>
    </div>
  );
}

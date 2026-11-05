"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus, Search, X } from "lucide-react";
import { catalog, formatMoney, photo, supplierById, suppliers } from "@/lib/data";

const priceRanges = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "under500", label: "Under $500", min: 0, max: 500 },
  { id: "500to1500", label: "$500 – $1,500", min: 500, max: 1500 },
  { id: "over1500", label: "Over $1,500", min: 1500, max: Infinity },
] as const;

type Sort = "featured" | "low" | "high";

export default function CatalogPicker({
  selected,
  locked = new Set(),
  onToggle,
}: {
  selected: Set<string>;
  /** Items that can't be removed (they already have contributions). */
  locked?: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [store, setStore] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<(typeof priceRanges)[number]["id"]>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [onlyAdded, setOnlyAdded] = useState(false);

  const range = priceRanges.find((r) => r.id === price)!;
  const q = query.trim().toLowerCase();
  const items = catalog
    .filter((c) => store === "all" || c.supplierId === store)
    .filter((c) => c.price >= range.min && c.price < range.max)
    .filter((c) => !onlyAdded || selected.has(c.id))
    .filter((c) => !q || [c.name, c.description, supplierById(c.supplierId)?.name ?? ""].some((s) => s.toLowerCase().includes(q)));
  if (sort === "low") items.sort((a, b) => a.price - b.price);
  if (sort === "high") items.sort((a, b) => b.price - a.price);

  const filtered = q || price !== "all" || onlyAdded || store !== "all";
  const clear = () => {
    setQuery("");
    setPrice("all");
    setOnlyAdded(false);
    setStore("all");
  };

  return (
    <div>
      {/* Stores */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {[{ id: "all", name: "All stores", specialty: "" }, ...suppliers].map((s) => {
          const inStore = catalog.filter((c) => s.id === "all" || c.supplierId === s.id);
          const added = inStore.filter((c) => selected.has(c.id)).length;
          const active = s.id === store;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStore(s.id)}
              className={`shrink-0 rounded-2xl px-5 py-3 text-left transition ${
                active ? "bg-ink text-ivory" : "border border-line bg-white hover:border-ink"
              }`}
            >
              <p className="text-sm font-medium">{s.name}</p>
              <p className={`text-xs ${active ? "text-ivory/70" : "text-muted"}`}>
                {added} of {inStore.length} added
              </p>
            </button>
          );
        })}
      </div>

      {/* Search & filters */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gifts, e.g. sofa, coffee, bed…"
            className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-ink"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-sand hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value as typeof price)}
            aria-label="Price range"
            className="rounded-full border border-line bg-white px-4 py-3 outline-none focus:border-ink"
          >
            {priceRanges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort"
            className="rounded-full border border-line bg-white px-4 py-3 outline-none focus:border-ink"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-3 text-muted">
            <input
              type="checkbox"
              checked={onlyAdded}
              onChange={(e) => setOnlyAdded(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-sage-dark)]"
            />
            Added only
          </label>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Showing <span className="font-medium text-ink">{items.length}</span> {items.length === 1 ? "gift" : "gifts"}
        {filtered && (
          <>
            {" · "}
            <button type="button" onClick={clear} className="font-medium text-ink underline">
              Clear filters
            </button>
          </>
        )}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const on = selected.has(item.id);
          const isLocked = on && locked.has(item.id);
          return (
            <div
              key={item.id}
              className={`flex gap-4 rounded-2xl border bg-white p-3 transition ${on ? "border-sage" : "border-line"}`}
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sand">
                <Image src={photo(item.image, 200)} alt={item.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[11px] text-gold">{supplierById(item.supplierId)?.name}</p>
                <p className="text-sm font-medium leading-snug">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted">{formatMoney(item.price)}</p>
                <button
                  type="button"
                  disabled={isLocked}
                  title={isLocked ? "Guests have contributed — rearrange the funds before removing" : undefined}
                  onClick={() => onToggle(item.id)}
                  className={`mt-auto flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    on ? "bg-sage-dark text-ivory hover:bg-sage" : "bg-sand text-ink hover:bg-ink hover:text-ivory"
                  }`}
                >
                  {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  {on ? (isLocked ? "Has gifts" : "Added") : "Add to registry"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="mt-4 rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
          <Search className="mx-auto h-7 w-7 text-muted" strokeWidth={1.5} />
          <p className="font-display mt-3 text-2xl">No gifts match</p>
          <button type="button" onClick={clear} className="mt-4 rounded-full bg-ink px-5 py-2 text-sm font-medium text-ivory hover:bg-sage-dark">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

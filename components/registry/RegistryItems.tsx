"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, Search, X } from "lucide-react";
import ContributeModal from "./ContributeModal";
import { categories, formatMoney, photo, supplierById, type Category, type RegistryItem } from "@/lib/data";

type Sort = "featured" | "low" | "high" | "closest";

export default function RegistryItems({ items, couple, title = "Our wish list" }: { items: RegistryItem[]; couple: string; title?: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [hideFunded, setHideFunded] = useState(false);
  const [selected, setSelected] = useState<RegistryItem | null>(null);

  // Items matching the search box and funded toggle, before the category filter,
  // so the category pill counts reflect the current search.
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (hideFunded && i.funded >= i.price) return false;
      if (!q) return true;
      const supplier = supplierById(i.supplierId)?.name ?? "";
      return [i.name, i.description, i.category, supplier].some((s) => s.toLowerCase().includes(q));
    });
  }, [items, query, hideFunded]);

  const visible = useMemo(() => {
    const list = searched.filter((i) => filter === "All" || i.category === filter);
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "closest") list.sort((a, b) => b.funded / b.price - a.funded / a.price);
    return list;
  }, [searched, filter, sort]);

  const usedCategories = categories.filter((c) => items.some((i) => i.category === c));
  const countFor = (c: Category | "All") =>
    c === "All" ? searched.length : searched.filter((i) => i.category === c).length;

  const clearAll = () => {
    setQuery("");
    setFilter("All");
    setHideFunded(false);
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
        <p className="mt-2 text-sm text-muted">Contribute any amount towards a gift — every bit helps.</p>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 -mx-5 mt-10 border-b border-line/70 bg-ivory/90 px-5 py-4 backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gifts, brands or suppliers…"
              className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-ink"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-sand hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-line bg-white px-4 py-3 outline-none focus:border-ink"
            >
              <option value="featured">Featured</option>
              <option value="closest">Closest to funded</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
            <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-3 text-muted">
              <input
                type="checkbox"
                checked={hideFunded}
                onChange={(e) => setHideFunded(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-sage-dark)]"
              />
              Hide funded
            </label>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(["All", ...usedCategories] as const).map((c) => {
            const count = countFor(c);
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-ink text-ivory" : "border border-line bg-white text-muted hover:border-ink hover:text-ink"
                } ${count === 0 && !active ? "opacity-50" : ""}`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-ivory/20" : "bg-sand"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing <span className="font-medium text-ink">{visible.length}</span> {visible.length === 1 ? "gift" : "gifts"}
        {filter !== "All" && <> in {filter}</>}
        {query && <> for &ldquo;{query}&rdquo;</>}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const pct = Math.min(100, Math.round((item.funded / item.price) * 100));
          const done = item.funded >= item.price;
          const supplier = supplierById(item.supplierId);
          return (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(43,38,34,0.3)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={photo(item.image)}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition duration-700 group-hover:scale-105 ${done ? "opacity-80" : ""}`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted backdrop-blur">
                  {item.category}
                </span>
                {done && (
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-sage-dark px-3 py-1 text-[11px] font-medium text-ivory">
                    <Check className="h-3 w-3" /> Fully funded
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-gold">{supplier?.name}</p>
                <h3 className="mt-1 text-lg font-medium leading-snug">{item.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.description}</p>
                <div className="mt-auto pt-6">
                  <div className="flex items-baseline justify-between text-sm">
                    <span>
                      <span className="font-medium">{formatMoney(item.funded)}</span>
                      <span className="text-muted"> of {formatMoney(item.price)}</span>
                    </span>
                    <span className="text-muted">{pct}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-sand">
                    <div className={`h-2 rounded-full ${done ? "bg-gold" : "bg-sage"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {item.contributors === 0
                      ? "Be the first to contribute"
                      : `${item.contributors} ${item.contributors === 1 ? "guest has" : "guests have"} contributed`}
                  </p>
                  <button
                    disabled={done}
                    onClick={() => setSelected(item)}
                    className="mt-5 w-full rounded-full bg-ink py-3 text-sm font-medium text-ivory transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted"
                  >
                    {done ? "Thank you — gift complete" : "Contribute"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-muted" strokeWidth={1.5} />
          <p className="font-display mt-4 text-2xl">No gifts match your search</p>
          <p className="mt-1 text-sm text-muted">Try a different word or browse another category.</p>
          <button onClick={clearAll} className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory hover:bg-sage-dark">
            Clear filters
          </button>
        </div>
      )}

      {selected && <ContributeModal item={selected} couple={couple} onClose={() => setSelected(null)} />}
    </section>
  );
}

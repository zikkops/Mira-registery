"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { catalog, formatMoney, photo, suppliers } from "@/lib/data";

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
  const [store, setStore] = useState(suppliers[0].id);
  const items = catalog.filter((c) => c.supplierId === store);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {suppliers.map((s) => {
          const total = catalog.filter((c) => c.supplierId === s.id).length;
          const added = catalog.filter((c) => c.supplierId === s.id && selected.has(c.id)).length;
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
                {added} of {total} presets added
              </p>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted">{suppliers.find((s) => s.id === store)?.specialty}</p>

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
    </div>
  );
}

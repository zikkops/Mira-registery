// Demo-only store for logins, couple dashboards and the admin view. Saved to
// localStorage so the flow survives page reloads; there is no real backend yet.

import { useSyncExternalStore } from "react";
import { allRegistrySlugs, catalogById, getRegistry, type CatalogItem } from "./data";

export type DashItem = { catalogId: string; funded: number; contributors: number };

export type DashRegistry = {
  partnerOne: string;
  partnerTwo: string;
  date: string;
  venue: string;
  city: string;
  slug: string;
  items: DashItem[];
  // Lets the demo show the post-closing "rearrange" tools before the real date.
  previewClosed: boolean;
};

export type Session = { role: "admin" } | { role: "client"; slug: string };

export type DemoState = {
  registries: Record<string, DashRegistry>;
  session: Session | null;
};

export type JoinedItem = DashItem & CatalogItem;

const KEY = "mira-demo-v2";
const listeners = new Set<() => void>();
let state: DemoState | undefined;

function seed(): DemoState {
  const registries: Record<string, DashRegistry> = {};
  for (const slug of allRegistrySlugs()) {
    const r = getRegistry(slug)!;
    registries[slug] = {
      partnerOne: r.partnerOne,
      partnerTwo: r.partnerTwo,
      date: r.date,
      venue: r.venue,
      city: r.city,
      slug,
      items: r.items.map((i) => ({ catalogId: i.id, funded: i.funded, contributors: i.contributors })),
      previewClosed: false,
    };
  }
  return { registries, session: null };
}

function read() {
  if (state === undefined) {
    try {
      state = JSON.parse(localStorage.getItem(KEY) ?? "null") ?? seed();
    } catch {
      state = seed();
    }
  }
  return state;
}

function write(next: DemoState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked — keep working in memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** `undefined` while rendering on the server, before the browser store is read. */
export function useDemo() {
  return useSyncExternalStore(subscribe, read, () => undefined);
}

export const login = (session: Session) => write({ ...read()!, session });
export const logout = () => write({ ...read()!, session: null });
export const resetDemo = () => write(seed());

export function updateRegistry(slug: string, fn: (r: DashRegistry) => DashRegistry) {
  const s = read()!;
  const r = s.registries[slug];
  if (r) write({ ...s, registries: { ...s.registries, [slug]: fn(r) } });
}

/** Adds a new registry (making its slug unique) and signs that couple in. */
export function addRegistry(r: DashRegistry) {
  const s = read()!;
  let slug = r.slug;
  for (let n = 2; s.registries[slug]; n++) slug = `${r.slug}-${n}`;
  write({ registries: { ...s.registries, [slug]: { ...r, slug } }, session: { role: "client", slug } });
}

export function joinItems(r: DashRegistry): JoinedItem[] {
  return r.items.flatMap((i) => {
    const c = catalogById(i.catalogId);
    return c ? [{ ...c, ...i }] : [];
  });
}

export function totals(r: DashRegistry) {
  const items = joinItems(r);
  const total = items.reduce((s, i) => s + i.price, 0);
  const paid = items.reduce((s, i) => s + i.funded, 0);
  return {
    items,
    total,
    paid,
    left: total - paid,
    fullyFunded: items.filter((i) => i.funded >= i.price).length,
    contributions: items.reduce((s, i) => s + i.contributors, 0),
  };
}

/** Only seeded couples have a public guest page; new demo registries live in the browser only. */
export const hasGuestPage = (slug: string) => allRegistrySlugs().includes(slug);

export const slugify = (a: string, b: string) =>
  `${a}-and-${b}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

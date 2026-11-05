"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleDollarSign, ExternalLink, Gift, HandCoins, LogIn, LogOut, PiggyBank, Plus, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import CatalogPicker from "./CatalogPicker";
import ClosingNotice from "./ClosingNotice";
import Rearrange from "./Rearrange";
import { CLOSING_DATE, displayName, formatMoney, photo, supplierById, suppliers } from "@/lib/data";
import {
  hasGuestPage,
  logout,
  totals,
  updateRegistry,
  useDemo,
  type DashRegistry,
  type JoinedItem,
} from "@/lib/dashboard-store";

type Tab = "overview" | "add" | "rearrange";

export default function Dashboard() {
  const demo = useDemo();
  if (demo === undefined) return <div className="min-h-[60vh]" />;

  const session = demo.session;
  if (session?.role === "admin") return <AdminSignedIn />;
  const registry = session?.role === "client" ? demo.registries[session.slug] : undefined;
  if (!registry) return <SignedOut />;

  return (
    <Manage
      registry={registry}
      label="Couple dashboard · demo"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-muted hover:border-ink hover:text-ink"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      }
    />
  );
}

function SignedOut() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Couple dashboard · demo</p>
      <h1 className="font-display mt-4 text-5xl">Manage your registry</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted">
        Log in to add preset gifts from ABC, Khoury Home and Abdel Tahhan, and follow how much your guests have paid and
        how much is left.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/login" className="flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory hover:bg-sage-dark">
          <LogIn className="h-4 w-4" /> Log in
        </Link>
        <Link
          href="/dashboard/new"
          className="flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink"
        >
          <Plus className="h-4 w-4" /> Create a new registry
        </Link>
      </div>
    </section>
  );
}

function AdminSignedIn() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <ShieldCheck className="mx-auto h-10 w-10 text-sage-dark" strokeWidth={1.5} />
      <h1 className="font-display mt-4 text-4xl">You&apos;re signed in as an admin</h1>
      <p className="mt-3 text-muted">Admins manage every couple&apos;s registry from the admin panel.</p>
      <Link href="/admin" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory hover:bg-sage-dark">
        Go to admin panel
      </Link>
    </section>
  );
}

export function Manage({
  registry,
  label,
  actions,
}: {
  registry: DashRegistry;
  label: string;
  actions?: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const { items, paid, left, fullyFunded, contributions } = totals(registry);
  const closed = registry.previewClosed || Date.now() > CLOSING_DATE.getTime();
  const update = (fn: (r: DashRegistry) => DashRegistry) => updateRegistry(registry.slug, fn);

  const selected = new Set(registry.items.map((i) => i.catalogId));
  const locked = new Set(registry.items.filter((i) => i.funded > 0).map((i) => i.catalogId));

  const toggleItem = (id: string) =>
    update((r) =>
      selected.has(id)
        ? { ...r, items: r.items.filter((i) => i.catalogId !== id || i.funded > 0) }
        : { ...r, items: [...r.items, { catalogId: id, funded: 0, contributors: 0 }] },
    );

  // Demo helper: pretend a guest put money towards a random open item.
  const simulateGift = () => {
    const open = registry.items.filter((i) => {
      const it = items.find((x) => x.catalogId === i.catalogId);
      return it && i.funded < it.price;
    });
    if (!open.length) return;
    const pick = open[Math.floor(Math.random() * open.length)];
    const price = items.find((x) => x.catalogId === pick.catalogId)!.price;
    const amount = Math.min(price - pick.funded, [25, 50, 75, 100, 150, 250][Math.floor(Math.random() * 6)]);
    update((r) => ({
      ...r,
      items: r.items.map((i) =>
        i.catalogId === pick.catalogId ? { ...i, funded: i.funded + amount, contributors: i.contributors + 1 } : i,
      ),
    }));
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Paid & remaining" },
    { id: "add", label: "Add items" },
    { id: "rearrange", label: "Rearrange funds" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{label}</p>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">
            {displayName(registry)}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {registry.date}
            {registry.venue && ` · ${registry.venue}`}
            {registry.city && `, ${registry.city}`} · mira.com/{registry.slug}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {hasGuestPage(registry.slug) && (
            <Link
              href={`/registry/${registry.slug}`}
              className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm hover:border-ink"
            >
              <ExternalLink className="h-4 w-4" /> Guest page
            </Link>
          )}
          {actions}
        </div>
      </div>

      <div className="mt-8">
        <ClosingNotice closed={closed} />
      </div>

      {/* Totals */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={<CircleDollarSign className="h-5 w-5 text-sage-dark" />} label="Paid by guests" value={formatMoney(paid)} />
        <Card icon={<PiggyBank className="h-5 w-5 text-gold" />} label="Still left to fund" value={formatMoney(left)} />
        <Card icon={<Gift className="h-5 w-5 text-sage-dark" />} label="Fully funded" value={`${fullyFunded} of ${items.length}`} />
        <Card
          icon={<HandCoins className="h-5 w-5 text-gold" />}
          label="Contributions"
          value={String(contributions)}
        />
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-2 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-sm transition ${
              tab === t.id ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "overview" && (
          <Overview
            items={items}
            closed={closed}
            onSimulate={simulateGift}
            onAdd={() => setTab("add")}
            onRemove={(id) => update((r) => ({ ...r, items: r.items.filter((i) => i.catalogId !== id) }))}
          />
        )}
        {tab === "add" && <CatalogPicker selected={selected} locked={locked} onToggle={toggleItem} />}
        {tab === "rearrange" && (
          <Rearrange
            key={registry.items.map((i) => i.catalogId).join()}
            slug={registry.slug}
            items={items}
            closed={closed}
            onPreview={() => update((r) => ({ ...r, previewClosed: true }))}
          />
        )}
      </div>

      {registry.previewClosed && (
        <p className="mt-10 text-center text-xs text-muted">
          You&apos;re previewing the registry after closing.{" "}
          <button
            onClick={() => update((r) => ({ ...r, previewClosed: false }))}
            className="font-medium text-ink underline"
          >
            Back to open registry
          </button>
        </p>
      )}
    </section>
  );
}

function Overview({
  items,
  closed,
  onSimulate,
  onAdd,
  onRemove,
}: {
  items: JoinedItem[];
  closed: boolean;
  onSimulate: () => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  const [store, setStore] = useState<string>("all");
  const visible = items.filter((i) => store === "all" || i.supplierId === store);

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-line bg-white px-6 py-16 text-center">
        <p className="font-display text-3xl">No gifts yet</p>
        <button onClick={onAdd} className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory hover:bg-sage-dark">
          Add preset items
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", name: "All stores" }, ...suppliers].map((s) => (
            <button
              key={s.id}
              onClick={() => setStore(s.id)}
              className={`rounded-full px-4 py-2 text-sm ${
                store === s.id ? "bg-ink text-ivory" : "border border-line bg-white text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        {!closed && (
          <button
            onClick={onSimulate}
            className="flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-sm hover:bg-gold/20"
          >
            <Sparkles className="h-4 w-4 text-gold" /> Simulate a guest gift
          </button>
        )}
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-white">
        <div className="hidden grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr] gap-4 border-b border-line bg-sand/50 px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-muted md:grid">
          <span>Gift</span>
          <span className="text-right">Price</span>
          <span className="text-right">Paid</span>
          <span className="text-right">Left</span>
          <span>Progress</span>
        </div>
        {visible.map((item) => {
          const pct = Math.min(100, Math.round((item.funded / item.price) * 100));
          const done = item.funded >= item.price;
          return (
            <div
              key={item.catalogId}
              className="grid grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr]"
            >
              <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image src={photo(item.image, 120)} alt={item.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gold">{supplierById(item.supplierId)?.name}</p>
                </div>
              </div>
              <Money label="Price" value={item.price} />
              <Money label="Paid" value={item.funded} tone="text-sage-dark" />
              <Money label="Left" value={item.price - item.funded} tone={done ? "text-muted" : "text-ink"} />
              <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                <div className="h-2 flex-1 rounded-full bg-sand">
                  <div className={`h-2 rounded-full ${done ? "bg-gold" : "bg-sage"}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-10 text-right text-xs text-muted">{done ? "Done" : `${pct}%`}</span>
                {item.funded === 0 && !closed && (
                  <RemoveButton name={item.name} onClick={() => onRemove(item.catalogId)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RemoveButton({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Remove ${name}`}
      className="rounded-full p-1.5 text-muted hover:bg-sand hover:text-ink"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function Money({ label, value, tone = "text-ink" }: { label: string; value: number; tone?: string }) {
  return (
    <p className={`text-sm md:text-right ${tone}`}>
      <span className="mr-1 text-xs text-muted md:hidden">{label}</span>
      {formatMoney(value)}
    </p>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-sand">{icon}</div>
      <div>
        <p className="font-display text-3xl leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleDollarSign, Gift, LogIn, LogOut, PiggyBank, Search, Users } from "lucide-react";
import { Manage } from "@/components/dashboard/Dashboard";
import { CLOSING_DATE, CLOSING_LABEL, formatMoney, suppliers } from "@/lib/data";
import { logout, totals, useDemo } from "@/lib/dashboard-store";

export default function AdminPanel() {
  const demo = useDemo();
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  if (demo === undefined) return <div className="min-h-[60vh]" />;

  if (demo.session?.role !== "admin") {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-5xl">Admin panel</h1>
        <p className="mt-3 text-muted">Sign in as a Mira admin to see every registry.</p>
        <Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory hover:bg-sage-dark">
          <LogIn className="h-4 w-4" /> Log in
        </Link>
      </section>
    );
  }

  const selected = open ? demo.registries[open] : undefined;
  if (selected) {
    return (
      <Manage
        registry={selected}
        label="Admin view · demo"
        actions={
          <button
            onClick={() => setOpen(null)}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ivory hover:bg-sage-dark"
          >
            <ArrowLeft className="h-4 w-4" /> All registries
          </button>
        }
      />
    );
  }

  const rows = Object.values(demo.registries).map((r) => ({ r, t: totals(r) }));
  const all = rows.flatMap((x) => x.t.items);
  const paid = all.reduce((s, i) => s + i.funded, 0);
  const left = all.reduce((s, i) => s + i.price, 0) - paid;
  const q = query.trim().toLowerCase();
  const visible = rows.filter(({ r }) => !q || `${r.partnerOne} ${r.partnerTwo} ${r.city} ${r.slug}`.toLowerCase().includes(q));
  const isClosed = (previewClosed: boolean) => previewClosed || Date.now() > CLOSING_DATE.getTime();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Admin panel · demo</p>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">All registries</h1>
          <p className="mt-2 text-sm text-muted">Every registry closes on {CLOSING_LABEL}.</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-muted hover:border-ink hover:text-ink"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={<Users className="h-5 w-5 text-sage-dark" />} label="Registries" value={String(rows.length)} />
        <Card icon={<CircleDollarSign className="h-5 w-5 text-sage-dark" />} label="Paid by guests" value={formatMoney(paid)} />
        <Card icon={<PiggyBank className="h-5 w-5 text-gold" />} label="Still left to fund" value={formatMoney(left)} />
        <Card
          icon={<Gift className="h-5 w-5 text-gold" />}
          label="Gifts fully funded"
          value={`${all.filter((i) => i.funded >= i.price).length} of ${all.length}`}
        />
      </div>

      {/* Per store */}
      <h2 className="font-display mt-12 text-3xl">By store</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {suppliers.map((s) => {
          const items = all.filter((i) => i.supplierId === s.id);
          const done = items.filter((i) => i.funded >= i.price);
          return (
            <div key={s.id} className="rounded-3xl border border-line bg-white p-6">
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted">{s.specialty}</p>
              <dl className="mt-5 space-y-2 text-sm">
                <Row label="Gifts on registries" value={String(items.length)} />
                <Row label="Paid so far" value={formatMoney(items.reduce((n, i) => n + i.funded, 0))} />
                <Row label="Still left" value={formatMoney(items.reduce((n, i) => n + i.price - i.funded, 0))} />
                <Row
                  label="Ready to order"
                  value={`${done.length} · ${formatMoney(done.reduce((n, i) => n + i.price, 0))}`}
                  strong
                />
              </dl>
            </div>
          );
        })}
      </div>

      {/* Registries */}
      <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl">Couples</h2>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search couples or cities…"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-white">
        <div className="hidden grid-cols-[2fr_1.2fr_0.7fr_1fr_1fr_0.7fr_1fr_auto] gap-4 border-b border-line bg-sand/50 px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-muted lg:grid">
          <span>Couple</span>
          <span>Wedding</span>
          <span className="text-right">Gifts</span>
          <span className="text-right">Paid</span>
          <span className="text-right">Left</span>
          <span className="text-right">Funded</span>
          <span>Status</span>
          <span className="w-16" />
        </div>
        {visible.map(({ r, t }) => {
          const closed = isClosed(r.previewClosed);
          return (
            <button
              key={r.slug}
              onClick={() => {
                setOpen(r.slug);
                window.scrollTo(0, 0);
              }}
              className="grid w-full grid-cols-2 items-center gap-x-4 gap-y-1 border-b border-line px-5 py-4 text-left text-sm transition last:border-0 hover:bg-ivory lg:grid-cols-[2fr_1.2fr_0.7fr_1fr_1fr_0.7fr_1fr_auto]"
            >
              <span className="col-span-2 lg:col-span-1">
                <span className="font-medium">
                  {r.partnerOne} &amp; {r.partnerTwo}
                </span>
                <span className="block text-xs text-muted">mira.com/{r.slug}</span>
              </span>
              <span className="text-muted">
                {r.date}
                {r.city && <span className="block text-xs">{r.city}</span>}
              </span>
              <Cell label="Gifts">{t.items.length}</Cell>
              <Cell label="Paid" tone="text-sage-dark">{formatMoney(t.paid)}</Cell>
              <Cell label="Left">{formatMoney(t.left)}</Cell>
              <Cell label="Funded">{t.total ? Math.round((t.paid / t.total) * 100) : 0}%</Cell>
              <span>
                <span
                  className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    closed ? "bg-gold/15 text-gold" : "bg-[#e8ece4] text-sage-dark"
                  }`}
                >
                  {closed ? "Closed" : "Open"}
                </span>
              </span>
              <span className="flex w-16 items-center justify-end gap-1 text-xs font-medium text-ink">
                Open <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
        {visible.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted">No couples match &ldquo;{query}&rdquo;.</p>}
      </div>
    </section>
  );
}

function Cell({ label, tone = "text-ink", children }: { label: string; tone?: string; children: React.ReactNode }) {
  return (
    <span className={`lg:text-right ${tone}`}>
      <span className="mr-1 text-xs text-muted lg:hidden">{label}</span>
      {children}
    </span>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "border-t border-line pt-2 font-medium" : ""}`}>
      <dt className={strong ? "" : "text-muted"}>{label}</dt>
      <dd>{value}</dd>
    </div>
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

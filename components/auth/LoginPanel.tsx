"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Heart, RotateCcw, ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/data";
import { login, resetDemo, totals, useDemo } from "@/lib/dashboard-store";

export default function LoginPanel() {
  const router = useRouter();
  const demo = useDemo();
  const registries = demo ? Object.values(demo.registries) : [];

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Log in · demo</p>
        <h1 className="font-display mt-3 text-5xl">Welcome back</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          This is a demo — no passwords. Pick a couple to see their own registry, or sign in as a Mira admin to see every
          registry.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        {/* Couples */}
        <div className="rounded-[2rem] border border-line bg-white p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-blush/60">
              <Heart className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="font-medium">Couples</p>
              <p className="text-xs text-muted">See and manage only your own registry</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {registries.map((r) => {
              const t = totals(r);
              return (
                <button
                  key={r.slug}
                  onClick={() => {
                    login({ role: "client", slug: r.slug });
                    router.push("/dashboard");
                  }}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-line px-4 py-3 text-left transition hover:border-ink"
                >
                  <div className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-lg">
                    {r.partnerOne.charAt(0)}
                    {r.partnerTwo.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {r.partnerOne} &amp; {r.partnerTwo}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {r.date} · {formatMoney(t.paid)} paid of {formatMoney(t.total)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
                </button>
              );
            })}
            {demo === undefined && <div className="h-40" />}
          </div>
        </div>

        {/* Admin */}
        <div className="flex flex-col rounded-[2rem] bg-ink p-6 text-ivory md:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10">
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="font-medium">Mira admin</p>
              <p className="text-xs text-ivory/60">Staff access to every registry</p>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ivory/80">
            <li>· All registries with paid and remaining totals</li>
            <li>· What to order from ABC, Khoury Home and Abdel Tahhan</li>
            <li>· Open any couple&apos;s dashboard to help them</li>
          </ul>
          <button
            onClick={() => {
              login({ role: "admin" });
              router.push("/admin");
            }}
            className="mt-auto flex items-center justify-center gap-2 rounded-full bg-ivory py-3 text-sm font-medium text-ink transition hover:bg-gold hover:text-ivory"
          >
            Sign in as admin <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        <button onClick={resetDemo} className="inline-flex items-center gap-1.5 hover:text-ink">
          <RotateCcw className="h-3.5 w-3.5" /> Reset demo data
        </button>
      </p>
    </section>
  );
}

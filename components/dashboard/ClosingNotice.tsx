"use client";

import { CalendarClock, Shuffle } from "lucide-react";
import { CLOSING_DATE, CLOSING_LABEL } from "@/lib/data";

export const daysUntilClosing = () => Math.max(0, Math.ceil((CLOSING_DATE.getTime() - Date.now()) / 86_400_000));

export default function ClosingNotice({ closed, compact = false }: { closed: boolean; compact?: boolean }) {
  const days = daysUntilClosing();
  return (
    <div
      className={`flex gap-4 rounded-3xl border p-5 md:p-6 ${
        closed ? "border-gold/40 bg-gold/10" : "border-sage/30 bg-[#e8ece4]"
      }`}
    >
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${closed ? "bg-gold/20" : "bg-white/70"}`}>
        {closed ? <Shuffle className="h-5 w-5 text-gold" /> : <CalendarClock className="h-5 w-5 text-sage-dark" />}
      </div>
      <div className="text-sm leading-relaxed">
        {closed ? (
          <>
            <p className="font-medium">Your registry has closed — time to rearrange</p>
            <p className="mt-1 text-muted">
              Guests can no longer contribute. Move the money you collected into the items you really want,
              then we&apos;ll order and deliver everything that&apos;s fully funded.
            </p>
          </>
        ) : (
          <>
            <p className="font-medium">
              Your registry closes on {CLOSING_LABEL}
              <span className="font-normal text-muted"> · {days} {days === 1 ? "day" : "days"} left</span>
            </p>
            {!compact && (
              <p className="mt-1 text-muted">
                Until then guests can contribute to any item. After {CLOSING_LABEL} you can rearrange the money
                collected into the items you really want — for example, move funds from a half-funded rug to
                finish paying for your bed.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Lock, X } from "lucide-react";
import Image from "next/image";
import { formatMoney, photo, supplierById, type RegistryItem } from "@/lib/data";

export default function ContributeModal({
  item,
  couple,
  onClose,
}: {
  item: RegistryItem;
  couple: string;
  onClose: () => void;
}) {
  const remaining = item.price - item.funded;
  const presets = [25, 50, 100, 250].filter((n) => n < remaining);
  const [amount, setAmount] = useState<number>(Math.min(50, remaining));
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const valid = amount > 0 && amount <= remaining && name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-5" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-ivory shadow-2xl sm:rounded-[2rem]"
      >
        <div className="flex items-center gap-4 border-b border-line p-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-sand">
            <Image src={photo(item.image, 200)} alt={item.name} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gold">{supplierById(item.supplierId)?.name}</p>
            <p className="truncate font-medium">{item.name}</p>
            <p className="text-xs text-muted">{formatMoney(remaining)} still needed</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted hover:bg-sand hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sand">
              <HeartHandshake className="h-8 w-8 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="font-display mt-6 text-4xl">Thank you, {name.split(" ")[0]}!</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Your {formatMoney(amount)} gift towards the {item.name.toLowerCase()} would be sent to {couple}.
            </p>
            <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-xs text-muted">
              This is a design preview — no payment was taken.
            </p>
            <button onClick={onClose} className="mt-8 rounded-full bg-ink px-8 py-3 text-sm font-medium text-ivory hover:bg-sage-dark">
              Back to registry
            </button>
          </div>
        ) : (
          <form
            className="space-y-6 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setSubmitted(true);
            }}
          >
            <div>
              <p className="text-sm font-medium">Choose an amount</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {presets.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setAmount(p)}
                    className={`rounded-xl border py-3 text-sm transition ${
                      amount === p ? "border-ink bg-ink text-ivory" : "border-line bg-white hover:border-ink"
                    }`}
                  >
                    ${p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount(remaining)}
                  className={`col-span-3 rounded-xl border py-3 text-sm transition sm:col-span-1 ${
                    amount === remaining ? "border-ink bg-ink text-ivory" : "border-line bg-white hover:border-ink"
                  }`}
                >
                  Gift it all
                </button>
              </div>
              <div className="mt-3 flex items-center rounded-xl border border-line bg-white px-4 focus-within:border-ink">
                <span className="text-muted">$</span>
                <input
                  type="number"
                  min={1}
                  max={remaining}
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none"
                  placeholder="Custom amount"
                />
              </div>
              {amount > remaining && (
                <p className="mt-2 text-xs text-red-700">Maximum for this gift is {formatMoney(remaining)}.</p>
              )}
            </div>

            <label className="block">
              <span className="text-sm font-medium">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
                placeholder="e.g. Aunt Linda"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">A message for {couple} <span className="font-normal text-muted">(optional)</span></span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink"
                placeholder="Wishing you a lifetime of happiness…"
              />
            </label>

            <button
              type="submit"
              disabled={!valid}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-medium text-ivory transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lock className="h-4 w-4" /> Contribute {amount > 0 ? formatMoney(amount) : ""}
            </button>
            <p className="text-center text-xs text-muted">Secure checkout · Your gift goes directly towards this item</p>
          </form>
        )}
      </div>
    </div>
  );
}

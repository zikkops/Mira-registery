"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/registry/${slug}`);
    } catch {
      // clipboard unavailable — still show feedback in the preview
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium transition hover:border-ink"
    >
      {copied ? <Check className="h-4 w-4 text-sage" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : "Share this registry"}
    </button>
  );
}

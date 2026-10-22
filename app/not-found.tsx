import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">We couldn&apos;t find that registry</h1>
        <p className="mt-4 text-muted">Double-check the link the couple shared with you.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory">
          Back home
        </Link>
      </main>
    </>
  );
}

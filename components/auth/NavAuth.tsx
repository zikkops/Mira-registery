"use client";

import Link from "next/link";
import { useDemo } from "@/lib/dashboard-store";

export default function NavAuth() {
  const session = useDemo()?.session;
  const [href, label] =
    session?.role === "admin" ? ["/admin", "Admin panel"] : session ? ["/dashboard", "My registry"] : ["/login", "Log in"];
  return (
    <Link href={href} className="hidden text-sm text-muted hover:text-ink sm:block">
      {label}
    </Link>
  );
}

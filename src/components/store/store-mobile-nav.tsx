"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NavCategory } from "./store-header";

export function StoreMobileNav({ categories }: { categories: NavCategory[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
        aria-expanded={open}
        aria-label="Menu"
      >
        Menu
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-[60] max-h-[min(70vh,480px)] overflow-y-auto border-b border-zinc-800 bg-zinc-950 px-4 py-4 shadow-xl">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image src="/images/jk-strikers-logo.png" alt="" fill className="object-contain p-0.5" sizes="32px" />
              </span>
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/academy"
              className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              Academy
            </Link>
            {categories.map((c) => (
              <div key={c.id} className="py-1">
                <Link
                  href={`/category/${c.slug}`}
                  className="block px-3 text-xs font-bold uppercase tracking-wider text-blue-500 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {c.name} →
                </Link>
                {c.children.map((ch) => (
                  <Link
                    key={ch.id}
                    href={`/category/${ch.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
                    onClick={() => setOpen(false)}
                  >
                    {ch.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/products"
              className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

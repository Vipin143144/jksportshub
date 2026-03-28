import Link from "next/link";
import type { Category } from "@prisma/client";

export type NavCategory = Category & { children: Category[] };

function todayLine() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function NewsHeader({ categories }: { categories: NavCategory[] }) {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-dashed border-zinc-200 bg-zinc-50 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50">
        Advertisement · 970×90 placeholder — sponsor slot
      </div>
      <div className="mx-auto max-w-6xl px-4 py-3 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>{todayLine()}</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-red-700 dark:hover:text-red-400">
              Store home
            </Link>
            <Link href="/contact" className="hover:text-red-700 dark:hover:text-red-400">
              Tip us
            </Link>
          </div>
        </div>
        <div className="mt-4 border-y-4 border-zinc-900 py-4 text-center dark:border-zinc-100">
          <Link href="/" className="inline-block">
            <span className="font-serif text-4xl font-black tracking-tight text-zinc-900 md:text-5xl dark:text-white">
              JK <span className="text-red-700 dark:text-red-500">Sports</span> Wire
            </span>
          </Link>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">
            Gear · Fixtures · Dispatch
          </p>
        </div>
        <nav className="mt-4 flex flex-wrap justify-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <Link
            href="/about"
            className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white dark:bg-white dark:text-zinc-900"
          >
            Desk
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Catalogue
          </Link>
          <Link
            href="/academy"
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Academy
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@prisma/client";
import { StoreMobileNav } from "./store-mobile-nav";

export type NavCategory = Category & { children: Category[] };

export function StoreHeader({
  categories,
}: {
  categories: NavCategory[];
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3 lg:gap-6">
          <StoreMobileNav categories={categories} />
          <Link href="/" prefetch={true} className="flex shrink-0 items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-zinc-900 sm:h-11 sm:w-11">
              <Image
                src="/images/jk-strikers-logo.png"
                alt="JK Strikers"
                fill
                className="object-contain p-0.5"
                sizes="44px"
                priority
              />
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              JK<span className="text-blue-400">sportshub</span>
            </span>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <Link
            href="/"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/academy"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Academy
          </Link>
          {categories.map((cat) => (
            <div key={cat.id} className="group relative">
              <Link
                href={`/category/${cat.slug}`}
                prefetch={true}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {cat.name}
                <span className="text-xs text-zinc-500 transition group-hover:rotate-180">▾</span>
              </Link>
              <div className="absolute left-0 top-full z-50 hidden pt-2 group-hover:block">
                <div className="min-w-[220px] rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl shadow-black/50">
                  <div className="grid gap-1">
                    {cat.children.map((ch) => (
                      <Link
                        key={ch.id}
                        href={`/category/${ch.slug}`}
                        prefetch={true}
                        className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-blue-300"
                      >
                        {ch.name}
                      </Link>
                    ))}
                    <Link
                      href={`/category/${cat.slug}`}
                      prefetch={true}
                      className="mt-1 border-t border-zinc-800 pt-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                      View all {cat.name} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/products"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            All Products
          </Link>
          <Link
            href="/products"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Products
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            prefetch={true}
            className="hidden rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 hover:border-blue-500/50 hover:text-blue-300 md:inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

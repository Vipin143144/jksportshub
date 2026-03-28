import Link from "next/link";
import type { Category } from "@prisma/client";
import { siteConfig } from "@/lib/site";

export type NavCategory = Category & { children: Category[] };

export function NewsFooter({ categories }: { categories: NavCategory[] }) {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Masthead</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Sections</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/about" className="hover:text-red-700 dark:hover:text-red-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-red-700 dark:hover:text-red-400">
                All products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-700 dark:hover:text-red-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Categories</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="hover:text-red-700 dark:hover:text-red-400">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Reach us</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {siteConfig.email}
            <br />
            WhatsApp +{siteConfig.whatsapp}
          </p>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}

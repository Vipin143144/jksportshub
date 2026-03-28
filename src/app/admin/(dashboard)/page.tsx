import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [productCount, categoryCount, bannerCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.banner.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage catalogue content and homepage banners.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard title="Products" value={productCount} href="/admin/products" />
        <StatCard title="Categories" value={categoryCount} href="/admin/categories" />
        <StatCard title="Banners" value={bannerCount} href="/admin/banners" />
      </div>
      <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold text-zinc-900 dark:text-white">Quick links</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/" className="text-blue-700 hover:underline dark:text-blue-400">
              View storefront home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-blue-700 hover:underline dark:text-blue-400">
              View public catalogue
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-blue-500/50 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <p className="text-sm font-medium text-zinc-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
    </Link>
  );
}

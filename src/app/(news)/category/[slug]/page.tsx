import { Pagination } from "@/components/product/pagination";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategoryBySlug, listProducts } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  return { title: cat?.name ?? "Category" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const q = sp.q ?? null;

  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const { items, total, totalPages } = await listProducts({
    page,
    pageSize: 12,
    categorySlug: slug,
    q,
  });

  return (
    <div>
      <header className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:bg-red-600">
            Category desk
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {total} {total === 1 ? "item" : "items"} · Updated regularly
          </span>
        </div>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-zinc-900 dark:text-white md:text-5xl">
          {cat.name}
        </h1>
        {cat.parent ? (
          <p className="mt-2 text-sm text-zinc-500">
            Under{" "}
            <Link href={`/category/${cat.parent.slug}`} className="font-semibold text-red-700 hover:underline dark:text-red-400">
              {cat.parent.name}
            </Link>
          </p>
        ) : null}
        <form action={`/category/${slug}`} method="get" className="mt-6 flex max-w-xl flex-wrap gap-2 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search in this category"
            className="min-w-[200px] flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-bold text-white dark:bg-white dark:text-zinc-900"
          >
            Search
          </button>
          <Link
            href={`/category/${slug}`}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
          >
            Clear
          </Link>
        </form>
      </header>

      <section className="mt-10">
        <ProductGrid products={items} variant="news" />
        <Pagination
          basePath={`/category/${slug}`}
          page={page}
          totalPages={totalPages}
          searchParams={q ? { q } : {}}
        />
        {items.length === 0 ? (
          <p className="mt-8 text-center text-zinc-500">No products in this category.</p>
        ) : null}
      </section>
    </div>
  );
}

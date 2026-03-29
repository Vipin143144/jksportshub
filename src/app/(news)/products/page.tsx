import { Pagination } from "@/components/product/pagination";
import { ProductGrid } from "@/components/product/product-grid";
import { listProducts, getRootCategories } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { Search, Grid3X3, List } from "lucide-react";

export const dynamic = "force-dynamic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Products - JKsportshub",
  description: "Browse our complete collection of premium sports equipment",
};

type Props = { searchParams: Promise<{ page?: string; q?: string; category?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const q = sp.q ?? null;
  const categorySlug = sp.category ?? null;

  const [{ items, total, totalPages }, categories] = await Promise.all([
    listProducts({ page, pageSize: 12, categorySlug, q }),
    getRootCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
              <p className="mt-1 text-gray-600">
                {total} items{q ? ` matching "${q}"` : ""}
              </p>
            </div>
            
            {/* Search Bar */}
            <form action="/products" method="get" className="flex gap-2 max-w-md w-full">
              {categorySlug ? <input type="hidden" name="category" value={categorySlug} /> : null}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip href="/products" label="All Products" active={!categorySlug} preserve={{ q }} />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={`/products?category=${encodeURIComponent(c.slug)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                label={c.name}
                active={categorySlug === c.slug}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid products={items} variant="news" />
        
        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            basePath="/products"
            page={page}
            totalPages={totalPages}
            searchParams={{
              ...(q ? { q } : {}),
              ...(categorySlug ? { category: categorySlug } : {}),
            }}
          />
        </div>
        
        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-600">Try adjusting your search or filters</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
  preserve,
}: {
  href: string;
  label: string;
  active: boolean;
  preserve?: { q?: string | null };
}) {
  const q = preserve?.q;
  const finalHref =
    q && !href.includes("q=") ? `${href}${href.includes("?") ? "&" : "?"}q=${encodeURIComponent(q)}` : href;

  return (
    <Link
      href={finalHref}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
      }`}
    >
      {label}
    </Link>
  );
}

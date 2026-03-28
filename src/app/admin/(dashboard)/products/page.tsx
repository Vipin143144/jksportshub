import Link from "next/link";
import { deleteProduct } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
    take: 100,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Products</h1>
          <p className="text-sm text-zinc-500">Showing latest 100. Use search on the storefront for full catalogue.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-blue-400"
        >
          New product
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Flags</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{p.name}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{p.category.name}</td>
                <td className="px-4 py-3">₹{p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  {p.featured ? "Featured " : ""}
                  {p.hotDeal ? "Hot " : ""}
                  {!p.featured && !p.hotDeal ? "—" : ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-blue-700 hover:underline dark:text-blue-400"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

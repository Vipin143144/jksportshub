import Link from "next/link";
import { ProductEditor } from "@/app/admin/product-editor";
import { prisma } from "@/lib/prisma";

export default async function AdminNewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ parentId: "asc" }, { name: "asc" }],
  });

  if (!categories.length) {
    return (
      <div>
        <p className="text-zinc-600 dark:text-zinc-400">Add a category before creating products.</p>
        <Link href="/admin/categories" className="mt-4 inline-block text-blue-700 hover:underline dark:text-blue-400">
          Go to categories
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/products" className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400">
        ← Products
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">New product</h1>
      <div className="mt-6">
        <ProductEditor categories={categories} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditor } from "@/app/admin/product-editor";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: [{ parentId: "asc" }, { name: "asc" }] }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400">
        ← Products
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">Edit product</h1>
      <div className="mt-6">
        <ProductEditor categories={categories} product={product} />
      </div>
    </div>
  );
}

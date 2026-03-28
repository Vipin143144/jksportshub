/**
 * One-off: set every product's first image to picsum seed from product slug.
 * Usage: npx tsx scripts/backfill-product-images.mjs  (or node with prisma generate)
 * Requires DATABASE_URL and prisma client.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function urlForSlug(slug) {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/640/640`;
}

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, slug: true },
    orderBy: { name: "asc" },
  });
  for (const p of products) {
    const first = await prisma.productImage.findFirst({
      where: { productId: p.id },
      orderBy: { sortOrder: "asc" },
    });
    const url = urlForSlug(p.slug);
    if (first) {
      await prisma.productImage.update({
        where: { id: first.id },
        data: { url },
      });
    } else {
      await prisma.productImage.create({
        data: { productId: p.id, url, sortOrder: 0 },
      });
    }
  }
  console.log("Updated images for", products.length, "products");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

import type { Category, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: "asc" as const } },
} as const;

export async function getCategoriesForNav() {
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      children: { orderBy: [{ sortOrder: "asc" }, { name: "asc" }] },
    },
  });
}

export async function getRootCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      children: { orderBy: [{ sortOrder: "asc" }, { name: "asc" }] },
    },
  });
}

export type RootCategoryWithPreview = Category & {
  children: Category[];
  previewImageUrl: string;
};

/** Root categories plus a hero image for home widgets (first product in tree or picsum fallback). */
export async function getRootCategoriesWithPreview(): Promise<RootCategoryWithPreview[]> {
  const roots = await getRootCategories();
  const enriched = await Promise.all(
    roots.map(async (cat) => {
      const prod = await prisma.product.findFirst({
        where: {
          category: {
            OR: [{ id: cat.id }, { parentId: cat.id }],
          },
        },
        include: {
          images: { take: 1, orderBy: { sortOrder: "asc" } },
        },
        orderBy: { updatedAt: "desc" },
      });
      const previewImageUrl =
        prod?.images[0]?.url ??
        `https://picsum.photos/seed/${encodeURIComponent(`cat-${cat.slug}`)}/640/400`;
      return { ...cat, previewImageUrl };
    }),
  );
  return enriched;
}

export async function getBanners() {
  return prisma.banner.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getHotDeals(limit = 12) {
  return prisma.product.findMany({
    where: { hotDeal: true },
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: productInclude,
  });
}

export async function getFeatured(limit = 12) {
  return prisma.product.findMany({
    where: { featured: true },
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: productInclude,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { parent: true },
  });
}

export type ProductListParams = {
  page?: number;
  pageSize?: number;
  categorySlug?: string | null;
  q?: string | null;
};

export async function listProducts({
  page = 1,
  pageSize = 12,
  categorySlug,
  q,
}: ProductListParams) {
  const and: Prisma.ProductWhereInput[] = [];

  if (categorySlug) {
    const cat = await prisma.category.findUnique({
      where: { slug: categorySlug },
      include: { children: true },
    });
    if (!cat) {
      return {
        items: [],
        total: 0,
        page,
        pageSize,
        totalPages: 1,
      };
    }
    const ids = [cat.id, ...cat.children.map((c) => c.id)];
    and.push({ categoryId: { in: ids } });
  }

  if (q?.trim()) {
    const term = q.trim();
    and.push({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
      ],
    });
  }

  const where = and.length ? { AND: and } : {};

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: "asc" },
      include: productInclude,
    }),
  ]);

  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getSitePage(slug: string) {
  return prisma.sitePage.findUnique({ where: { slug } });
}

export async function searchProducts(term: string, limit = 20) {
  const t = term.trim();
  if (!t) return [];
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: t } },
        { description: { contains: t } },
      ],
    },
    take: limit,
    orderBy: { name: "asc" },
    include: productInclude,
  });
}

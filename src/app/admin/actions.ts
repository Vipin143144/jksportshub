"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/category", "layout");
  revalidatePath("/product", "layout");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const price = Number(formData.get("price"));
  const compareRaw = formData.get("compareAtPrice");
  const compareAtPrice =
    compareRaw != null && String(compareRaw).trim() !== ""
      ? Number(compareRaw)
      : null;
  const categoryId = String(formData.get("categoryId") ?? "");
  const featured = formData.get("featured") === "on";
  const hotDeal = formData.get("hotDeal") === "on";
  const imageUrls = String(formData.get("imageUrls") ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (!name || !categoryId || Number.isNaN(price)) {
    throw new Error("Missing required fields");
  }

  if (!slug) slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 7)}`;

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      compareAtPrice: compareAtPrice != null && !Number.isNaN(compareAtPrice) ? compareAtPrice : null,
      categoryId,
      featured,
      hotDeal,
      images: {
        create: (
          imageUrls.length
            ? imageUrls
            : ["https://placehold.co/640x640/0f172a/f8fafc/png?text=Product"]
        ).map((url, i) => ({
          url,
          sortOrder: i,
        })),
      },
    },
  });

  revalidatePublic();
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const price = Number(formData.get("price"));
  const compareRaw = formData.get("compareAtPrice");
  const compareAtPrice =
    compareRaw != null && String(compareRaw).trim() !== ""
      ? Number(compareRaw)
      : null;
  const categoryId = String(formData.get("categoryId") ?? "");
  const featured = formData.get("featured") === "on";
  const hotDeal = formData.get("hotDeal") === "on";
  const imageUrls = String(formData.get("imageUrls") ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (!id || !name || !categoryId || Number.isNaN(price)) {
    throw new Error("Missing required fields");
  }

  if (!slug) slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const other = await prisma.product.findFirst({ where: { slug, NOT: { id } } });
  if (other) slug = `${slug}-${Math.random().toString(36).slice(2, 7)}`;

  await prisma.$transaction([
    prisma.productImage.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price,
        compareAtPrice: compareAtPrice != null && !Number.isNaN(compareAtPrice) ? compareAtPrice : null,
        categoryId,
        featured,
        hotDeal,
        images: {
          create: (
          imageUrls.length
            ? imageUrls
            : ["https://placehold.co/640x640/0f172a/f8fafc/png?text=Product"]
        ).map((url, i) => ({
            url,
            sortOrder: i,
          })),
        },
      },
    }),
  ]);

  revalidatePublic();
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  await prisma.product.delete({ where: { id } });
  revalidatePublic();
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const parentIdRaw = formData.get("parentId");
  const parentId =
    parentIdRaw && String(parentIdRaw).trim() !== "" ? String(parentIdRaw) : null;
  const sortOrder = Number(formData.get("sortOrder")) || 0;

  if (!name) throw new Error("Name required");
  if (!slug) slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  await prisma.category.create({
    data: { name, slug, parentId, sortOrder },
  });
  revalidatePublic();
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  const [pCount, cCount] = await Promise.all([
    prisma.product.count({ where: { categoryId: id } }),
    prisma.category.count({ where: { parentId: id } }),
  ]);
  if (pCount > 0 || cCount > 0) {
    throw new Error("Category has products or subcategories; reassign or delete them first.");
  }

  await prisma.category.delete({ where: { id } });
  revalidatePublic();
}

export async function createBanner(formData: FormData) {
  await requireAdmin();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const linkUrl = String(formData.get("linkUrl") ?? "").trim() || null;
  const label = String(formData.get("label") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  const active = formData.get("active") === "on";

  if (!imageUrl) throw new Error("Image URL required");

  await prisma.banner.create({
    data: { imageUrl, linkUrl, label, sortOrder, active },
  });
  revalidatePublic();
}

export async function deleteBanner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  await prisma.banner.delete({ where: { id } });
  revalidatePublic();
}

export async function toggleBannerActive(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  if (!id) throw new Error("Missing id");
  await prisma.banner.update({ where: { id }, data: { active } });
  revalidatePublic();
}

"use client";

import type { Category, Product, ProductImage } from "@prisma/client";
import { useRef, useState } from "react";
import { createProduct, updateProduct } from "./actions";

type ProductWithImages = Product & { images: ProductImage[] };

export function ProductEditor({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductWithImages;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      const url = data.url;
      if (!url) throw new Error("No URL returned");
      const ta = taRef.current;
      if (ta) {
        ta.value = ta.value ? `${ta.value.trim()}\n${url}` : url;
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const defaultUrls = product?.images.map((i) => i.url).join("\n") ?? "";

  return (
    <form
      action={product ? updateProduct : createProduct}
      className="mx-auto max-w-2xl space-y-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input
          name="slug"
          defaultValue={product?.slug}
          placeholder="auto from name if empty"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Price (INR)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={product?.price}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Compare-at price (optional)</label>
          <input
            name="compareAtPrice"
            type="number"
            step="0.01"
            defaultValue={product?.compareAtPrice ?? ""}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          name="categoryId"
          required
          defaultValue={product?.categoryId}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.slug})
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="rounded border-zinc-400"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="hotDeal"
            defaultChecked={product?.hotDeal}
            className="rounded border-zinc-400"
          />
          Hot deal
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium">Image URLs (one per line)</label>
        <textarea
          ref={taRef}
          name="imageUrls"
          rows={4}
          defaultValue={defaultUrls}
          placeholder="https://… or upload files below"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800">
            <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
            {uploading ? "Uploading…" : "Upload image"}
          </label>
          {uploadError ? <span className="text-sm text-red-600">{uploadError}</span> : null}
        </div>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}

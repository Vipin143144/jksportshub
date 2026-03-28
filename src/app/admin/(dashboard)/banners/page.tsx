import { createBanner, deleteBanner, toggleBannerActive } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Banners</h1>
      <p className="mt-2 text-sm text-zinc-500">Homepage hero slides (first three active banners show on the store home).</p>

      <form
        action={createBanner}
        className="mt-8 max-w-xl space-y-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="font-semibold text-zinc-900 dark:text-white">Add banner</h2>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            name="imageUrl"
            required
            placeholder="https://… or /uploads/…"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Link URL (optional)</label>
          <input
            name="linkUrl"
            placeholder="/products"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Label (optional)</label>
          <input
            name="label"
            placeholder="Shop Now"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sort order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked className="rounded border-zinc-400" />
          Active
        </label>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-zinc-900"
        >
          Create banner
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">{b.label ?? "Banner"}</p>
              <p className="text-xs text-zinc-500 break-all">{b.imageUrl}</p>
              <p className="text-xs text-zinc-500">{b.linkUrl ?? "—"}</p>
              <p className="mt-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                {b.active ? "Active" : "Inactive"} · order {b.sortOrder}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={toggleBannerActive}>
                <input type="hidden" name="id" value={b.id} />
                <input type="hidden" name="active" value={String(!b.active)} />
                <button
                  type="submit"
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
                >
                  {b.active ? "Deactivate" : "Activate"}
                </button>
              </form>
              <form action={deleteBanner}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { getRootCategories } from "@/lib/queries";
import { NewsFooter } from "./news-footer";
import { NewsHeader } from "./news-header";

export async function NewsShell({ children }: { children: React.ReactNode }) {
  const categories = await getRootCategories();
  return (
    <div className="min-h-screen bg-[#f7f6f4] text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <NewsHeader categories={categories} />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">{children}</main>
      <NewsFooter categories={categories} />
    </div>
  );
}

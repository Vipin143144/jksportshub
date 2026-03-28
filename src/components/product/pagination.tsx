import Link from "next/link";

type Props = {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams?: Record<string, string | undefined>;
};

export function Pagination({ basePath, page, totalPages, searchParams = {} }: Props) {
  const q = new URLSearchParams();
  Object.entries(searchParams).forEach(([k, v]) => {
    if (v) q.set(k, v);
  });

  function href(p: number) {
    const params = new URLSearchParams(q);
    if (p > 1) params.set("page", String(p));
    else params.delete("page");
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const show = new Set([1, totalPages, page, page - 1, page + 1, 2, totalPages - 1]);
    for (let i = 1; i <= totalPages; i++) {
      if (show.has(i)) pages.push(i);
      else if (pages[pages.length - 1] !== "ellipsis") pages.push("ellipsis");
    }
  }

  return (
    <nav className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          ‹
        </Link>
      ) : null}
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`e-${idx}`} className="px-2 py-2 text-zinc-500">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              p === page
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            }`}
          >
            {p}
          </Link>
        ),
      )}
      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          ›
        </Link>
      ) : null}
    </nav>
  );
}

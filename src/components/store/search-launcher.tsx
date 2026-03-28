"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function SearchLauncher() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/products?q=${encodeURIComponent(term)}`);
    setOpen(false);
    setQ("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-left text-sm text-zinc-400 hover:border-blue-500/40 hover:text-zinc-200"
        aria-label="Search products"
      >
        Search products…
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={close}
          />
          <div className="relative w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-950 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-200">Search</h2>
              <button
                type="button"
                onClick={close}
                className="rounded-lg px-2 py-1 text-zinc-500 hover:bg-zinc-900 hover:text-white"
              >
                ×
              </button>
            </div>
            <form onSubmit={submit} className="flex gap-2">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none ring-blue-500/30 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-zinc-950 hover:bg-blue-400"
              >
                Search
              </button>
            </form>
            <p className="mt-3 text-xs text-zinc-500">Tip: Ctrl+K to open</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ProductCard, type ProductCardProduct } from "@/components/product/product-card";

export function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllHref,
  theme = "dark",
}: {
  title: string;
  subtitle?: string;
  products: ProductCardProduct[];
  viewAllHref: string;
  /** Light strips match JK reference (white bg, blue actions). */
  theme?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  const isLight = theme === "light";

  return (
    <section className={isLight ? "border-b border-slate-200 bg-white py-10" : "py-10"}>
      <div className={isLight ? "mx-auto max-w-7xl px-4 lg:px-6" : ""}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            className={
              isLight
                ? "text-2xl font-black text-slate-900 md:text-3xl"
                : "text-2xl font-black text-white md:text-3xl"
            }
          >
            {title}
          </h2>
          {subtitle ? (
            <p className={isLight ? "mt-1 text-sm text-slate-500" : "mt-1 text-sm text-zinc-400"}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={viewAllHref}
            className={
              isLight
                ? "text-sm font-bold text-blue-600 hover:text-blue-800"
                : "text-sm font-semibold text-blue-400 hover:text-blue-300"
            }
          >
            View all
          </Link>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className={
              isLight
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg text-slate-700 shadow-sm hover:bg-slate-50"
                : "rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:bg-zinc-800"
            }
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className={
              isLight
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg text-slate-700 shadow-sm hover:bg-slate-50"
                : "rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:bg-zinc-800"
            }
          >
            ›
          </button>
        </div>
      </div>
      <motion.div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-thin"
        style={{ scrollbarGutter: "stable" }}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[260px] md:w-[280px]"
          >
            <ProductCard product={p} variant={isLight ? "storeLight" : "store"} />
          </div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}

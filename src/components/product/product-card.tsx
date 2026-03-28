"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category, Product, ProductImage } from "@prisma/client";
import { formatInr, discountPct } from "@/lib/format";
import { mailtoLink, siteConfig, waLink } from "@/lib/site";

export type ProductCardProduct = Product & {
  category: Category;
  images: ProductImage[];
};

type Props = {
  product: ProductCardProduct;
  /** Dark store cards (legacy) | light home (Hot Deals) | news catalogue */
  variant?: "store" | "storeLight" | "news";
};

export function ProductCard({ product, variant = "store" }: Props) {
  const img = product.images[0]?.url;
  const href = `/product/${product.slug}`;
  const pct = discountPct(product.price, product.compareAtPrice);
  const wa = waLink(
    `Hi! I'm interested in ${product.name} (${formatInr(product.price)}). Link: ${siteConfig.url}${href}`,
  );
  const mail = mailtoLink(
    `Enquiry: ${product.name}`,
    `Hi,\nI have a question about ${product.name} (${siteConfig.url}${href})`,
  );

  const cardClass =
    variant === "store"
      ? "group flex flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg shadow-black/30 transition-all duration-300 hover:border-blue-500 hover:shadow-blue-900/20 hover:-translate-y-1"
      : variant === "storeLight"
        ? "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
        : "group flex flex-col overflow-hidden border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-zinc-400 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600";

  return (
    <article className={cardClass}>
      <Link
        href={href}
        prefetch={true}
        className={
          variant === "storeLight"
            ? "relative aspect-square overflow-hidden bg-slate-100"
            : "relative aspect-square overflow-hidden bg-zinc-800"
        }
      >
        {img ? (
          img.endsWith(".svg") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 motion-reduce:transition-none"
            />
          ) : (
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 motion-reduce:transition-none"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-zinc-400">
            No image
          </div>
        )}
        {pct != null ? (
          <span
            className={
              variant === "storeLight"
                ? "absolute left-3 top-3 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg"
                : "absolute left-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-zinc-950 shadow-lg"
            }
          >
            {pct}% OFF
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p
          className={
            variant === "store"
              ? "text-xs font-bold uppercase tracking-wide text-blue-400"
              : variant === "storeLight"
                ? "text-xs font-bold uppercase tracking-wide text-blue-600"
                : "text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400"
          }
        >
          {product.category.name}
        </p>
        <Link href={href} className="group/title">
          <h3
            className={
              variant === "store"
                ? "line-clamp-2 font-bold text-lg text-zinc-100 transition-colors duration-300 group-hover/title:text-blue-300"
                : "font-bold text-lg leading-snug text-slate-900 transition-colors duration-300 group-hover/title:text-blue-600 dark:text-zinc-100"
            }
          >
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span
            className={
              variant === "store"
                ? "text-xl font-bold text-white"
                : variant === "storeLight"
                  ? "text-xl font-bold text-slate-900"
                  : "text-xl font-bold text-zinc-900 dark:text-white"
            }
          >
            {formatInr(product.price)}
          </span>
          {product.compareAtPrice != null && product.compareAtPrice > product.price ? (
            <span
              className={
                variant === "storeLight"
                  ? "text-sm text-slate-400 line-through"
                  : "text-sm text-zinc-500 line-through"
              }
            >
              {formatInr(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href={href}
            className={
              variant === "store"
                ? "rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-zinc-950 transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                : variant === "storeLight"
                  ? "rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                  : "rounded border border-zinc-300 px-3 py-1 text-sm font-medium transition-all duration-300 hover:bg-zinc-100 hover:-translate-y-0.5 dark:border-zinc-700 dark:hover:bg-zinc-900"
            }
          >
            View Details
          </Link>
          <a
            href={mail}
            className={
              variant === "storeLight"
                ? "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5"
                : "rounded-lg border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 hover:-translate-y-0.5"
            }
          >
            Email
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className={
              variant === "storeLight"
                ? "rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
                : "rounded-lg border border-emerald-600/60 bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-900/60 hover:border-emerald-500 hover:-translate-y-0.5"
            }
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

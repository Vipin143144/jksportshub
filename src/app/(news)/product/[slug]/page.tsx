import { ProductGallery } from "@/components/product/product-gallery";
import { discountPct, formatInr } from "@/lib/format";
import { getProductBySlug } from "@/lib/queries";
import { mailtoLink, siteConfig, waLink } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  return { title: p?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const href = `/product/${product.slug}`;
  const pct = discountPct(product.price, product.compareAtPrice);
  const wa = waLink(
    `Hi! I'm interested in ${product.name} (${formatInr(product.price)}). Link: ${siteConfig.url}${href}`,
  );
  const mail = mailtoLink(
    `Enquiry: ${product.name}`,
    `Hi,\nI have a question about ${product.name} (${siteConfig.url}${href})`,
  );

  return (
    <article>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-500">
        {product.category.name}
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold leading-tight text-zinc-900 dark:text-white md:text-5xl">
        {product.name}
      </h1>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />
        <div>
          {pct != null ? (
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950 dark:text-red-200">
              {pct}% off
            </span>
          ) : null}
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-4xl font-bold text-zinc-900 dark:text-white">
              {formatInr(product.price)}
            </span>
            {product.compareAtPrice != null && product.compareAtPrice > product.price ? (
              <span className="text-xl text-zinc-500 line-through">
                {formatInr(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          {product.description ? (
            <p className="mt-6 font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {product.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mail}
              className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-bold hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-900"
            >
              Email
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500"
            >
              WhatsApp
            </a>
            <Link
              href="/products"
              className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-zinc-900"
            >
              Back to catalogue
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

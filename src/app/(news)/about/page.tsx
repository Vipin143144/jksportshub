import { getSitePage } from "@/lib/queries";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const page = await getSitePage("about");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-500">
        Desk
      </p>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-white p-1 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <Image
            src="/images/jk-strikers-logo.png"
            alt="JK Strikers"
            fill
            className="object-contain p-1"
            sizes="112px"
          />
        </div>
        <h1 className="text-center font-serif text-4xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-left md:text-5xl">
          {page.title}
        </h1>
      </div>
      <p className="mt-8 whitespace-pre-line font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {page.body}
      </p>
      <div className="mt-10 flex flex-wrap gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/products"
          className="text-sm font-bold text-red-700 hover:underline dark:text-red-400"
        >
          Browse the catalogue →
        </Link>
        <Link
          href="/contact"
          className="text-sm font-bold text-zinc-600 hover:underline dark:text-zinc-400"
        >
          Contact us →
        </Link>
      </div>
    </article>
  );
}

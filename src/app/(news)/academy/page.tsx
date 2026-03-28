import { getSitePage } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Academy",
};

export default async function AcademyPage() {
  const page = await getSitePage("academy");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-500">
        Academy
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-zinc-900 dark:text-white md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-6 font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {page.body}
      </p>
      <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/contact"
          className="text-sm font-bold text-red-700 hover:underline dark:text-red-400"
        >
          Enrol or ask a question →
        </Link>
      </div>
    </article>
  );
}

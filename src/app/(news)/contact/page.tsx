import { getSitePage } from "@/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const page = await getSitePage("contact");
  if (!page) notFound();

  const wa = waLink("Hi! I'd like to make an enquiry about JKsportshub products.");

  return (
    <article className="mx-auto max-w-3xl">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-500">
        Dispatch
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-zinc-900 dark:text-white md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-6 font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {page.body}
      </p>
      <dl className="mt-10 grid gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div>
          <dt className="text-xs font-bold uppercase text-zinc-500">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-red-700 hover:underline dark:text-red-400">
              {siteConfig.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase text-zinc-500">WhatsApp</dt>
          <dd className="mt-1">
            <a href={wa} className="font-medium text-red-700 hover:underline dark:text-red-400" target="_blank" rel="noreferrer">
              +{siteConfig.whatsapp}
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}

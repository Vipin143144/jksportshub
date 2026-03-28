import Image from "next/image";
import Link from "next/link";
import type { RootCategoryWithPreview } from "@/lib/queries";

type Props = {
  categories: RootCategoryWithPreview[];
  productsImageUrl: string;
  academyImageUrl: string;
};

export function HomeWidgetGrid({ categories, productsImageUrl, academyImageUrl }: Props) {
  const fixed: {
    href: string;
    label: string;
    title: string;
    dek: string;
    imageUrl: string;
  }[] = [
    {
      href: "/products",
      label: "Catalogue",
      title: "All products",
      dek: "Browse the full store—filters, search, and enquiry on every item.",
      imageUrl: productsImageUrl,
    },
    {
      href: "/academy",
      label: "Academy",
      title: "JK Sports Academy",
      dek: "Programs, camps, and coach-led sessions—enquire for schedules.",
      imageUrl: academyImageUrl,
    },
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
              Sections
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
              Explore JK Sports
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Jump straight into products, training, or a category—same layout as a news portal
              section front.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {fixed.map((w) => (
            <article
              key={w.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <Link href={w.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={w.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {w.label}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-blue-700">
                    {w.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{w.dek}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-blue-600 group-hover:underline">
                    Open section →
                  </span>
                </div>
              </Link>
            </article>
          ))}

          {categories.map((cat) => (
            <article
              key={cat.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <Link href={`/category/${cat.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={cat.previewImageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {cat.name}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-blue-700">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {cat.children.length} subcategories · View catalogue
                  </p>
                  <span className="mt-4 inline-flex text-sm font-bold text-blue-600 group-hover:underline">
                    View category →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

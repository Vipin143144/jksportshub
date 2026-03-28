"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@prisma/client";

interface HomePortalHeroProps {
  categories?: Category[];
}

export function HomePortalHero({ categories = [] }: HomePortalHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6 lg:py-5">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-sky-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="relative p-5 md:p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
              {/* Logo and About Section */}
              <div className="flex flex-col gap-4 lg:w-2/5">
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
                    <Image
                      src="/images/jk-strikers-logo.png"
                      alt="JKsportshub logo"
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width:768px) 80px, 96px"
                      priority
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="text-lg font-black leading-tight md:text-xl">About JKsportshub</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                      We are a sports e-commerce store offering curated products for cricket, football, fitness, and more. Our focus is quality, value, and quick customer support.
                    </p>
                    <p className="mt-1.5 text-sm text-white/80">
                      Need help choosing gear? Contact us — we&apos;ll respond fast.
                    </p>
                  </div>
                </div>

                {/* Why shop with us */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Why shop with us?</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/90">
                    <li className="flex gap-2">
                      <span className="text-blue-300">✓</span>
                      <span>Sports-themed custom UI & easy navigation</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-300">✓</span>
                      <span>Clear categories and detailed product pages</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-300">✓</span>
                      <span>WhatsApp & Email enquiries — no payment gateway required</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-300">✓</span>
                      <span>Mobile-friendly & responsive design</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Categories Section */}
              {categories.length > 0 && (
                <div className="lg:w-1/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Categories</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        prefetch={true}
                        className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Buttons Section */}
              <div className="lg:w-2/5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Quick Links</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Link
                    href="/products"
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-500"
                  >
                    Shop products
                  </Link>
                  <Link
                    href="/academy"
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-transparent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    JK Academy
                  </Link>
                  <Link
                    href="/contact"
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-semibold text-white hover:underline"
                  >
                    Enquire
                  </Link>
                  <Link
                    href="/about"
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-bold text-slate-900 shadow-md transition hover:bg-slate-100"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact"
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-full bg-blue-400 px-4 py-1.5 text-sm font-bold text-slate-900 shadow-md transition hover:bg-blue-300"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

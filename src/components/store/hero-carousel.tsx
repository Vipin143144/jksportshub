"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type BannerSlide = {
  id: string;
  imageUrl: string;
  linkUrl: string | null;
  label: string | null;
};

export function HeroCarousel({ banners }: { banners: BannerSlide[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(
      () => setI((n) => (n + 1) % banners.length),
      reduce ? 999999 : 6000,
    );
    return () => clearInterval(t);
  }, [banners.length, reduce]);

  const b = banners[i];
  if (!b) return null;

  const inner = (
    <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-2xl bg-zinc-900 md:min-h-[320px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={b.id}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src={b.imageUrl}
            alt={b.label ?? "Banner"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 md:bottom-10 md:left-10">
            <h2 className="text-2xl font-black text-white drop-shadow md:text-4xl">
              {b.label ?? "JKsportshub"}
            </h2>
            {b.linkUrl ? (
              b.linkUrl.startsWith("http") ? (
                <a
                  href={b.linkUrl}
                  className="rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg hover:bg-blue-400"
                >
                  {b.label?.includes("Browse")
                    ? "Browse"
                    : b.label?.includes("Enquire")
                      ? "Enquire"
                      : "Shop Now"}
                </a>
              ) : (
                <Link
                  href={b.linkUrl}
                  className="rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg hover:bg-blue-400"
                >
                  {b.label?.includes("Browse")
                    ? "Browse"
                    : b.label?.includes("Enquire")
                      ? "Enquire"
                      : "Shop Now"}
                </Link>
              )
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative">
      {inner}
      {banners.length > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={banners[idx].id}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 w-8 rounded-full transition ${idx === i ? "bg-blue-500" : "bg-zinc-700 hover:bg-zinc-600"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: { id: string; url: string }[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const main = images[idx]?.url ?? images[0]?.url;

  if (!main) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        No image
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        {main.endsWith(".svg") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={main} alt={alt} className="h-full w-full object-contain p-4" />
        ) : (
          <Image
            src={main}
            alt={alt}
            fill
            className="object-contain p-4"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        )}
      </div>
      {images.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {images.map((im, i) => (
            <button
              key={im.id}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                i === idx ? "border-red-700 dark:border-red-500" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {im.url.endsWith(".svg") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={im.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image src={im.url} alt="" fill className="object-cover" sizes="64px" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

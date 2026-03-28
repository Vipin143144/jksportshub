"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function AboutStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-sky-500" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[minmax(0,220px)_1fr] md:items-center md:gap-12 md:px-12 md:py-12">
        <div className="flex justify-center md:justify-start">
          <div className="relative h-40 w-40 shrink-0 md:h-48 md:w-48">
            <Image
              src="/images/jk-strikers-logo.png"
              alt="JK Strikers logo"
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width:768px) 160px, 192px"
              priority
            />
          </div>
        </div>
        <div className="text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/90">JKsportshub</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">About JKsportshub</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            We are a sports e-commerce store offering curated products for cricket, football, fitness,
            and more. Our focus is quality, value, and quick customer support.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Need help choosing gear? Contact us — we&apos;ll respond fast.
          </p>
          <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-blue-300">
            Why shop with us?
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/90 md:text-base">
            <li className="flex gap-2">
              <span className="text-blue-300">✓</span>
              <span>Sports-themed custom UI &amp; easy navigation</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-300">✓</span>
              <span>Clear categories and detailed product pages</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-300">✓</span>
              <span>WhatsApp &amp; Email enquiries — no payment gateway required</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-300">✓</span>
              <span>Mobile-friendly &amp; responsive design</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-slate-100"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-400 px-7 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-blue-300"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

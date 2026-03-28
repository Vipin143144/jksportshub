"use client";

import Link from "next/link";
import type { Category } from "@prisma/client";

interface BentoCategoriesProps {
  categories: (Category & { children: Category[] })[];
}

export function BentoCategories({ categories }: BentoCategoriesProps) {
  return (
    <section className="py-32 bg-[#1a1b20]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[#e9c176] uppercase tracking-widest mb-4 block text-sm font-bold">Our Specialties</span>
            <h2 className="text-5xl font-bold uppercase tracking-tight text-white">Elite Disciplines</h2>
          </div>
          <div className="hidden md:block">
            <Link 
              href="/products" 
              className="text-[#e9c176] flex items-center gap-2 font-bold uppercase text-sm tracking-widest hover:underline"
            >
              View All Categories →
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[800px]">
          {/* Accessories - Large Top */}
          <div className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-xl bg-[#343439]">
            <img 
              src="/images/acadamy.jpeg" 
              alt="Accessories" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold uppercase text-white mb-2">Accessories</h3>
              <p className="text-slate-300 text-sm max-w-xs">The essential details that separate the good from the great.</p>
            </div>
          </div>

          {/* Cricket - Large Vertical */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-xl bg-[#343439]">
            <img 
              src="/images/Product.jpeg" 
              alt="Cricket" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-4xl font-bold uppercase text-white mb-2">Cricket</h3>
              <p className="text-slate-300 text-sm max-w-sm">From English Willow to professional protective gear, dominate the crease.</p>
            </div>
          </div>

          {/* Fitness - Small */}
          <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-xl bg-[#343439]">
            <img 
              src="/images/acadamy.jpeg" 
              alt="Fitness" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold uppercase text-white mb-1">Fitness</h3>
              <p className="text-slate-300 text-xs">Peak conditioning gear.</p>
            </div>
          </div>

          {/* Football - Small */}
          <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-xl bg-[#343439]">
            <img 
              src="/images/Product.jpeg" 
              alt="Football" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold uppercase text-white mb-1">Football</h3>
              <p className="text-slate-300 text-xs">The beautiful game, elevated.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import type { Product } from "@prisma/client";
import { formatInr } from "@/lib/format";

interface ModernDealsSectionProps {
  title: string;
  subtitle: string;
  products: (Product & { category: { name: string }; images: { url: string }[] })[];
  bgColor?: string;
}

export function ModernDealsSection({ 
  title, 
  subtitle, 
  products,
  bgColor = "bg-[#FAFAFA]"
}: ModernDealsSectionProps) {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-2">
              {title}
            </h2>
            <p className="text-[#6B7280] text-lg">{subtitle}</p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[#121212] font-semibold hover:text-[#E5FF00] transition-colors"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product & { category: { name: string }; images: { url: string }[] };
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#E5FF00]/50 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {product.images[0] ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
            
            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-3 left-3 bg-[#E5FF00] text-[#121212] px-3 py-1 rounded-full text-xs font-bold">
                -{discount}%
              </div>
            )}

            {/* Hover Add to Cart Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full bg-[#121212] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#E5FF00] hover:text-[#121212] transition-colors">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
            <h3 className="font-semibold text-[#1F2937] mb-2 line-clamp-2 group-hover:text-[#121212] transition-colors">
              {product.name}
            </h3>
            
            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              {product.compareAtPrice && (
                <span className="text-sm text-[#6B7280] line-through">
                  ₹{formatInr(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-[#121212]">
                ₹{formatInr(product.price)}
              </span>
            </div>

            {/* Buy Now Link */}
            <p className="mt-2 text-sm font-semibold text-[#E5FF00] opacity-0 group-hover:opacity-100 transition-opacity">
              Buy Now →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

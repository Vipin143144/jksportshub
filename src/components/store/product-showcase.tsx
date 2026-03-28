"use client";

import Link from "next/link";
import { Star } from "lucide-react";

export function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: "Pro-Series Match Ball",
      category: "Football / Equipment",
      price: "₹2,999",
      originalPrice: "₹3,499",
      image: "/images/Product.jpeg",
      badge: "New Arrival",
      rating: 5,
    },
    {
      id: 2,
      name: "Elite Cricket Bat",
      category: "Cricket / Bats",
      price: "₹4,999",
      originalPrice: "₹5,999",
      image: "/images/Product.jpeg",
      badge: "Elite Pick",
      rating: 5,
    },
    {
      id: 3,
      name: "Fitness Tracker Pro",
      category: "Fitness / Tech",
      price: "₹1,999",
      originalPrice: "₹2,499",
      image: "/images/Product.jpeg",
      badge: null,
      rating: 4,
    },
  ];

  return (
    <section className="py-32 bg-[#121317]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#e9c176] uppercase tracking-widest mb-4 block text-sm font-bold">Curated Excellence</span>
          <h2 className="text-5xl font-bold uppercase tracking-tight text-white mb-6">The Championship Edit</h2>
          <div className="w-20 h-1 bg-[#e9c176] mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <Link key={product.id} href="/products" className="group">
              <div className="aspect-square bg-[#1f1f24] rounded-xl overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <div className={`absolute top-4 right-4 text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                    product.badge === "New Arrival" 
                      ? "bg-[#e9c176] text-[#412d00]" 
                      : "bg-[#bac8dc] text-[#243141]"
                  }`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{product.category}</span>
                  <h3 className="text-xl font-bold uppercase mt-1 mb-2 text-white">{product.name}</h3>
                  <div className="flex items-center gap-1 text-[#e9c176]">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < product.rating ? "fill-current" : ""}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#bac8dc]">{product.price}</div>
                  <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function ModernHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-[#121212]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Product.jpeg"
          alt="Sports equipment"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p 
              className="text-[#E5FF00] font-semibold text-sm tracking-widest uppercase mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Premium Sports Equipment
            </motion.p>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              ELEVATE YOUR{" "}
              <span className="text-[#E5FF00]">GAME</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover professional-grade sports gear for cricket, football, fitness, and more. 
              Quality equipment for champions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-[#E5FF00] text-[#121212] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#d4eb00] transition-all hover:scale-105"
              >
                Shop Gear
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/academy"
                className="group inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                <Play className="h-4 w-4" />
                Explore Academy
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div>
                <p className="text-3xl font-bold text-[#E5FF00]">500+</p>
                <p className="text-sm text-gray-400">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-sm text-gray-400">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-sm text-gray-400">Rating</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#E5FF00] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

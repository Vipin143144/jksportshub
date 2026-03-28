"use client";

import Image from "next/image";
import Link from "next/link";

export function AcademyWidget() {
  return (
    <Link href="/academy" className="block">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:scale-[1.02]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-pink-500 blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative p-6">
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-purple-400 text-slate-900 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
            Elite Pick
          </div>
          
          {/* Image */}
          <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-slate-800/50">
            <Image
              src="/images/acadamy.jpeg"
              alt="JK Academy"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Category */}
          <span className="text-[11px] uppercase tracking-widest text-purple-400 font-bold mb-2 block">
            Enroll Now
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-wide">
            JK Academy
          </h3>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-purple-500 hover:text-white transition-all duration-300">
              Join
              <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400"></div>
      </div>
    </Link>
  );
}

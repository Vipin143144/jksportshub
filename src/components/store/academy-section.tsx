"use client";

import { Play } from "lucide-react";

export function AcademySection() {
  const programs = [
    {
      id: 1,
      title: "Cricket Masterclass",
      description: "A comprehensive 12-week program focusing on advanced stroke play, technical defense, and match mentalities taught by international veterans.",
      image: "/images/acadamy.jpeg",
      tags: ["8 Modules", "24 HD Lessons"],
    },
    {
      id: 2,
      title: "Football Tactical Hub",
      description: "Deconstructing elite systems of play. Learn the philosophies behind the world's most successful managers and teams.",
      image: "/images/acadamy.jpeg",
      tags: ["15 Blueprints", "Live Workshops"],
    },
    {
      id: 3,
      title: "Elite Conditioning",
      description: "Sports-specific strength and agility training designed to maximize output and minimize injury risk for professional competitors.",
      image: "/images/acadamy.jpeg",
      tags: ["Strength Lab", "Custom Nutrition"],
    },
  ];

  return (
    <section className="py-32 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <span className="text-[#e9c176] uppercase tracking-widest mb-4 block text-sm font-bold">The Academy</span>
            <h2 className="text-6xl font-bold uppercase tracking-tight leading-[0.9] mb-8">Master The Fundamentals</h2>
            <p className="text-gray-400 text-lg mb-10">
              Exclusive access to world-class coaching blueprints and tactical masterclasses designed for the elite athlete.
            </p>
            <button className="flex items-center gap-4 group">
              <span className="w-12 h-12 rounded-full border border-[#e9c176] flex items-center justify-center text-[#e9c176] group-hover:bg-[#e9c176] group-hover:text-[#412d00] transition-all">
                <Play className="h-5 w-5 fill-current" />
              </span>
              <span className="uppercase font-bold tracking-widest text-sm">Watch the Preview</span>
            </button>
          </div>

          {/* Right Column - Program Cards */}
          <div className="lg:col-span-8 space-y-12">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="group relative overflow-hidden flex flex-col md:flex-row gap-8 bg-slate-900/50 p-1 rounded-xl hover:bg-slate-900 transition-colors"
              >
                <div className="w-full md:w-64 h-64 flex-shrink-0 overflow-hidden rounded-lg">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex-grow p-4 md:p-8">
                  <h3 className="text-3xl font-bold uppercase mb-4">{program.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{program.description}</p>
                  <div className="flex items-center gap-6">
                    {program.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-[10px] font-bold uppercase ${
                          index === 0 ? "text-[#e9c176]" : "text-gray-500"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

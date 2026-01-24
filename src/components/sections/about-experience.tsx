"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Briefcase, Clock, ArrowRight, Building2 } from 'lucide-react';
import { getYearsOfExperience, FOUNDING_YEAR } from '@/lib/experience';

const AboutExperience = () => {
  const yearsExp = getYearsOfExperience();

  const stats = [
    { icon: Award, value: `${yearsExp}+`, label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Briefcase, value: '10K+', label: 'Projects Done' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/kon-7.webp"
                alt="Konark Computers Team"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl glass border border-white/20 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="text-2xl font-bold text-white">{yearsExp}+</span>
                </div>
                <div>
                  <p className="text-sm text-zinc-300 font-medium">Years of</p>
                  <p className="text-xl font-bold text-white">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">About Us</span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {yearsExp} Years of <span className="text-gradient-primary">Excellence</span> in IT Services
            </h2>

            <div className="space-y-6 text-zinc-400 mb-10 text-lg leading-relaxed">
              <p>
                Established in {FOUNDING_YEAR}, Konark Computers has been the trusted technology partner for banks, corporate clients, industrial corporations, hospitals, and educational institutions across Gujarat.
              </p>
              <p>
                Our commitment to excellence means zero tolerance for complaints. We pride ourselves on rapid response times and expertise that keeps your technology running smoothly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <stat.icon size={20} className="text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-500 ml-1 group-hover:text-zinc-400 transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:-translate-y-0.5"
              >
                Learn More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 backdrop-blur-sm transition-all hover:-translate-y-0.5"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;


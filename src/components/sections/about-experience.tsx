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
    <section className="relative py-24 overflow-hidden bg-[#030712]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/kon-7.webp"
                alt="Konark Computers Team"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 p-5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-sky-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{yearsExp}+</span>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Years of</p>
                  <p className="text-lg font-semibold text-white">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Building2 size={14} className="text-orange-400" />
              <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {yearsExp} Years of Excellence in IT Services
            </h2>

            <div className="space-y-4 text-zinc-400 mb-8">
              <p>
                Established in {FOUNDING_YEAR}, Konark Computers has been the trusted technology partner for banks, corporate clients, industrial corporations, hospitals, and educational institutions across Gujarat.
              </p>
              <p>
                Our commitment to excellence means zero tolerance for complaints. We pride ourselves on rapid response times and expertise that keeps your technology running smoothly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center">
                      <stat.icon size={18} className="text-sky-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs text-zinc-500 ml-12">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-sky-500/25"
              >
                Learn More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg border border-zinc-700 transition-all"
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

"use client";

import React from 'react';
import Link from 'next/link';
import { Monitor, Wifi, Wrench, Server, ArrowRight, Zap } from 'lucide-react';

const ServicesHighlights = () => {
  const services = [
    {
      icon: Monitor,
      title: 'Computer Repair',
      description: 'Expert repair for all laptop and desktop brands. HP, Dell, Lenovo, Asus, Sony, Acer & more.',
      features: ['Same-day service', 'All brands supported', 'Warranty included'],
    },
    {
      icon: Wifi,
      title: 'Networking',
      description: 'Secure wireless network configuration, router setup, and complete network infrastructure.',
      features: ['WiFi optimization', 'Network security', 'Enterprise solutions'],
    },
    {
      icon: Server,
      title: 'IT Consulting',
      description: 'Strategic technology guidance to help your business make informed decisions.',
      features: ['Infrastructure audit', 'Tech roadmap', 'Cost optimization'],
    },
    {
      icon: Wrench,
      title: 'On-Site Service',
      description: 'Fast doorstep support with comprehensive inspection and system optimization.',
      features: ['Doorstep service', 'Virus removal', 'Data recovery'],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#030712]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
            <Zap size={14} className="text-sky-400" />
            <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Professional IT Solutions
          </h2>
          <p className="text-zinc-400">
            Comprehensive computer and laptop services delivered with expertise you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div 
                className="relative h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(24,24,27,0.5) 0%, rgba(9,9,11,0.8) 100%)',
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.06), transparent 40%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5 group-hover:bg-sky-500/20 transition-colors">
                    <service.icon size={24} className="text-sky-400" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <div className="w-1 h-1 rounded-full bg-sky-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/service"
                    className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Learn More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-all"
          >
            View All Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlights;

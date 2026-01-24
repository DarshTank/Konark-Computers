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
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Our Services</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Professional <span className="text-gradient">IT Solutions</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Comprehensive computer and laptop services delivered with expertise you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="glass-card h-full p-8 hover:bg-white/5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} className="text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/service"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black bg-white hover:bg-zinc-200 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlights;


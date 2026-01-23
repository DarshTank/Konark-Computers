"use client";

import React from 'react';
import { MessageSquare, Send, Settings, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Contact Us',
      description: 'Reach out via call or WhatsApp. Describe your device issue to our support team.',
    },
    {
      number: '02',
      icon: Send,
      title: 'Drop Off / Pickup',
      description: 'Bring your device to us or schedule a convenient doorstep pickup service.',
    },
    {
      number: '03',
      icon: Settings,
      title: 'Expert Repair',
      description: 'Our certified technicians diagnose and repair your device with precision.',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Quality Return',
      description: 'Get your fully restored device back, tested and optimized for performance.',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Settings size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-zinc-400">
            Easy and effective way to get your device repaired with minimal hassle
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto group-hover:border-sky-500/30 transition-all duration-300 group-hover:-translate-y-1">
                      <step.icon size={32} className="text-zinc-400 group-hover:text-sky-400 transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-sky-500/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-zinc-500">Happy Clients</div>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24hr</div>
              <div className="text-xs text-zinc-500">Avg. Turnaround</div>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-zinc-500">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

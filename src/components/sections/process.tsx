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
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Connector Line Background */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 hidden lg:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple 4-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Process</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Easy and effective way to get your device repaired with minimal hassle
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="glass-card p-6 text-center hover:bg-white/5 h-full flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:-translate-y-2">
                       <step.icon size={28} className="text-zinc-500 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-secondary/30 border-2 border-background z-10">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-500 rounded-2xl" />
          <div className="relative flex items-center justify-center gap-8 md:gap-16 p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24hr</div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Turnaround</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;


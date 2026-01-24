"use client";

import React from 'react';

const OurClients = () => {
  const clientLogos = [
    '/assets/clients/1.png',
    '/assets/clients/2.png',
    '/assets/clients/3.png',
    '/assets/clients/4.png',
    '/assets/clients/5.png',
    '/assets/clients/6.png',
    '/assets/clients/7.png',
    '/assets/clients/8.png',
    '/assets/clients/9.png',
    '/assets/clients/10.png',
    '/assets/clients/11.png',
  ];

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Who We Serve</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Our Valued <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Trusted by Banks, Corporate Clients, Industrial Corporations, Hospitals, and Universities.
          </p>
        </div>

        <div className="relative overflow-hidden mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
          
          <div className="flex gap-12 animate-marquee">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={`client-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  <div className="w-[140px] h-[70px] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo}
                      alt={`Client ${index + 1}`}
                      className="object-contain max-h-[60px] max-w-full transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;

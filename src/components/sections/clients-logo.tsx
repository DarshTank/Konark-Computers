"use client";

import React from 'react';
import { Handshake } from 'lucide-react';

const ClientsLogo = () => {
  const brands = [
    { name: 'HP', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { name: 'Dell', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
    { name: 'Lenovo', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
    { name: 'Asus', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
    { name: 'Acer', src: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg' },
    { name: 'Samsung', src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Toshiba', src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Toshiba_logo.svg' },
    { name: 'Sony', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Sony_logo.svg' },
    { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Trusted Partners</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Brands We <span className="text-gradient">Repair</span>
          </h2>
        </div>

        <div className="relative overflow-hidden mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-12 animate-marquee">
            {[...brands, ...brands, ...brands, ...brands].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm grayscale hover:grayscale-0">
                  <div className="w-[140px] h-[70px] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.src}
                      alt={client.name}
                      className="object-contain max-h-[60px] max-w-full opacity-70 group-hover:opacity-100 transition-all duration-300 filter brightness-0 invert group-hover:filter-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Banks', value: '10+' },
            { label: 'Corporates', value: '50+' },
            { label: 'Hospitals', value: '15+' },
            { label: 'Institutions', value: '25+' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsLogo;


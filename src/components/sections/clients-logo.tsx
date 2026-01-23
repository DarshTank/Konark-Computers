"use client";

import React from 'react';
import Image from 'next/image';
import { Handshake } from 'lucide-react';

const ClientsLogo = () => {
  const [brands, setBrands] = React.useState<{ name: string; src: string }[]>([]);

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { getBrands } = await import('@/lib/db-service');
        const dbBrands = await getBrands();
        const validBrands = dbBrands
          .filter(b => b.logo_url)
          .map(b => ({ name: b.name, src: b.logo_url! }));
        setBrands(validBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden bg-zinc-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Handshake size={14} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-wide uppercase">Trusted Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Brands We Trust
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
          
          <div className="flex gap-8" style={{ animation: 'marquee 25s linear infinite' }}>
            {[...brands, ...brands, ...brands, ...brands].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="w-[120px] h-[60px] flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={120}
                      height={60}
                      className="object-contain max-h-[50px] opacity-60 group-hover:opacity-100 transition-opacity brightness-0 invert"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { label: 'Banks', value: '10+' },
            { label: 'Corporates', value: '50+' },
            { label: 'Hospitals', value: '15+' },
            { label: 'Institutions', value: '25+' },
          ].map((stat, index) => (
            <div key={index} className="text-center px-6">
              <p className="text-2xl font-bold text-sky-400">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default ClientsLogo;

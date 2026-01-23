"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ 
  title, 
  backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/Process_bg-21.webp" 
}) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#030712]">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/90 to-[#030712]" />
      
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-sky-400">{title}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {title}
          </h1>
          
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default PageBanner;

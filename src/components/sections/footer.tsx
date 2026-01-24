"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Mail, ChevronUp, ArrowRight } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPortfolio = () => {
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://portfolio.darshtank.me/" } }, "*");
  };

  const products = [
    { name: 'USB Mouse', href: '/products' },
    { name: 'USB Keybord', href: '/products' },
    { name: 'Hard Disk', href: '/products' },
    { name: 'Laptop Charger', href: '/products' },
    { name: 'Laptop Screen', href: '/products' },
    { name: 'Laptop Battery', href: '/products' },
    { name: 'Laptop Keybord', href: '/products' },
  ];

  return (
    <footer className="relative bg-zinc-950 border-t border-white/10 overflow-hidden text-zinc-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About US */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wide border-b border-primary/30 inline-block pb-1">About US</h4>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-zinc-400">
                KONARK Computers offers customized service-level maintenance programs, providing full on-site maintenance agreements. As an authorized service provider for industry-leading manufacturers, KONARK provides multi-vendor support for servers...
                <Link href="/about-us" className="text-primary hover:underline ml-1 cursor-pointer">Read more</Link>
              </p>
              
              <div className="pt-2">
                <Image
                  src="/assets/images/threebestrated.png"
                  alt="ThreeBest Rated"
                  width={150}
                  height={60}
                  className="rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wide border-b border-primary/30 inline-block pb-1">Contact Info</h4>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <span className="text-zinc-500 font-semibold min-w-[60px]">Address:</span>
                <span className="text-zinc-300 leading-relaxed">
                  234-Vitt Bhavan, Near Gondal Road Flyover,<br />
                  Rajkot. 360002,<br />
                  Gujarat India
                </span>
              </div>
              
              <div className="flex gap-4 items-center">
                <span className="text-zinc-500 font-semibold min-w-[60px]">Phone:</span>
                <a href="tel:+919426429416" className="text-zinc-300 hover:text-white transition-colors">
                  (+91)942-642-9416
                </a>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-zinc-500 font-semibold min-w-[60px]">Email:</span>
                <a href="mailto:omesh_tank@yahoo.com" className="text-primary hover:text-primary/80 transition-colors">
                  omesh_tank@yahoo.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wide border-b border-primary/30 inline-block pb-1">Products</h4>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index}>
                  <Link 
                    href={product.href}
                    className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors text-sm group"
                  >
                    <ArrowRight size={14} className="text-zinc-600 group-hover:text-primary transition-colors" />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Facebook */}
          <div>
             <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wide border-b border-primary/30 inline-block pb-1">Facebook</h4>
             <div className="mb-6 rounded-lg overflow-hidden bg-white/5 border border-white/10">
               <iframe 
                 src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKonark.Computers%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
                 width="100%" 
                 height="130" 
                 style={{ border: 'none', overflow: 'hidden' }} 
                 scrolling="no" 
                 frameBorder="0" 
                 allowFullScreen={true} 
                 allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                 className="bg-white"
               />
             </div>
             
             <div className="mt-4">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/MSME-e1452579997430-20.png" 
                alt="MSME Ministry" 
                width={180} 
                height={60} 
                className="bg-white p-2 rounded-lg opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-zinc-500 text-xs">
              © {new Date().getFullYear()} Konark Computers. All Rights Reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <p className="text-zinc-500 text-xs flex items-center gap-1">
                Developed by{' '}
                <button
                  onClick={openPortfolio}
                  className="text-zinc-300 hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  Darsh Tank
                </button>
              </p>
              
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center text-white transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

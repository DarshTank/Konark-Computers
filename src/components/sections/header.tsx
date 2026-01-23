"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import KonarkLogo from '@/components/KonarkLogo';

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/service", label: "Services" },
    { href: "/techlab", label: "TechLab" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="container mx-auto px-4">
          <nav className={`flex items-center justify-between px-4 transition-all duration-500 ${
            scrolled 
              ? 'bg-black/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50' 
              : 'bg-black/50 backdrop-blur-sm rounded-2xl'
          }`}>
            <Link href="/" className="py-3">
              <KonarkLogo size="sm" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    isActive(item.href) 
                      ? 'text-white bg-white/10' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 py-2">
              <a
                href="https://www.google.com/maps?cid=1162576568112931297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <MapPin size={14} className="text-sky-400" />
                </div>
                <span className="text-xs hidden xl:block">Rajkot</span>
              </a>
              <a
                href="tel:+919426429416"
                className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Phone size={14} className="text-emerald-400" />
                </div>
                <span className="text-xs hidden xl:block">+91 942 642 9416</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all"
              >
                Get Quote
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          <div className="absolute top-24 left-4 right-4 bg-zinc-900/95 rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-white text-black'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && <ArrowUpRight size={18} />}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex gap-2 mb-3">
                <a
                  href="https://www.google.com/maps?cid=1162576568112931297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20"
                >
                  <MapPin size={16} className="text-sky-400" />
                  <span className="text-white text-sm">Location</span>
                </a>
                <a
                  href="tel:+919426429416"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                >
                  <Phone size={16} className="text-emerald-400" />
                  <span className="text-white text-sm">Call</span>
                </a>
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-base font-semibold bg-white text-black rounded-xl"
              >
                Get Free Quote
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

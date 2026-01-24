"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-white/5 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors duration-300">
               <img src="/kon.webp" alt="Konark Logo" className="w-full h-full object-cover p-1" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
              Konark Computers
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isActive(item.href) 
                    ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" 
                    : "text-zinc-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Tags */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
              <a 
                href="https://www.google.com/maps?cid=1162576568112931297" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                <div className="hidden xl:block">
                  <span className="block text-white">Location</span>
                  <span className="opacity-60">Rajkot, Gujarat</span>
                </div>
              </a>

              <a 
                href="tel:+919426429416"
                className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                <div className="hidden xl:block">
                  <span className="block text-white">Call Us</span>
                  <span className="opacity-60">+91 94264 29416</span>
                </div>
              </a>
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <span>Get Quote</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-6 text-center p-6 w-full max-w-md">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-2xl font-bold py-3 transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="w-full h-px bg-white/10 my-4" />

              <div className="flex justify-center gap-6">
                <a href="https://www.google.com/maps?cid=1162576568112931297" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <span className="text-xs">Location</span>
                </a>
                <a href="tel:+919426429416" className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <span className="text-xs">Call</span>
                </a>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 mt-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Get A Quote
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

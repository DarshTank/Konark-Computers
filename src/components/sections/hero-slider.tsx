"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, HardDrive, Wifi, Shield } from "lucide-react";
import { getSettings } from "@/lib/db-service";

const slides = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/banner1-4.jpg",
    title: "Expert Computer",
    highlight: "Solutions",
    description: "Professional laptop & desktop repair services with same-day turnaround. Trusted by 500+ businesses across Gujarat.",
    icon: Cpu,
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/slider3-5.jpg",
    title: "Enterprise",
    highlight: "Networking",
    description: "Secure and reliable network infrastructure for homes, offices, and enterprises. Complete setup & maintenance.",
    icon: Wifi,
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/sleadn1-6.jpg",
    title: "Hardware",
    highlight: "Upgrades",
    description: "SSD upgrades, RAM expansion, and performance optimization. Boost your system speed by up to 10x.",
    icon: HardDrive,
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/sliden2-2.jpg",
    title: "IT Security",
    highlight: "Services",
    description: "Comprehensive virus removal, data recovery, and cybersecurity solutions for complete protection.",
    icon: Shield,
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [tagline, setTagline] = useState("To Win Your Smile");
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.tagline) setTagline(settings.tagline);
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current || index === currentIndex) return;
    isAnimatingRef.current = true;
    
    setTextVisible(false);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setDisplayIndex(index);
      
      setTimeout(() => {
        setTextVisible(true);
        isAnimatingRef.current = false;
      }, 100);
    }, 400);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    const prev = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(prev);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const CurrentIcon = slides[displayIndex].icon;

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#030712]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: currentIndex === index ? 1 : 0,
            transition: 'opacity 800ms ease-in-out',
            zIndex: currentIndex === index ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            style={{
              transform: currentIndex === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8000ms ease-out',
            }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-[#030712]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/50" />
        </div>
      ))}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
                <div 
                  className="mb-8"
                  style={{
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 600ms ease-out, transform 600ms ease-out',
                  }}
                >
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-xs font-medium text-sky-400 tracking-wide uppercase">Since 1999</span>
                  </div>
                  <div className="relative">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 animate-pulse">
                        &ldquo;{tagline}&rdquo;
                      </span>
                    </p>
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-xl blur-xl -z-10" />
                  </div>
                </div>

              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms',
                }}
              >
                {slides[displayIndex].title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                  {slides[displayIndex].highlight}
                </span>
              </h1>

              <p 
                className="text-base sm:text-lg text-zinc-400 mb-8 leading-relaxed max-w-md"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 600ms ease-out 200ms, transform 600ms ease-out 200ms',
                }}
              >
                {slides[displayIndex].description}
              </p>

              <div 
                className="flex flex-wrap gap-3"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 600ms ease-out 300ms, transform 600ms ease-out 300ms',
                }}
              >
                <Link
                  href="/service"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all"
                >
                  Our Services
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50" />
                <div 
                  className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-white/10 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                    opacity: textVisible ? 1 : 0.7,
                    transition: 'opacity 500ms ease-out',
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  
                  <CurrentIcon 
                    size={80} 
                    className="text-sky-400"
                    style={{
                      opacity: textVisible ? 1 : 0,
                      transform: textVisible ? 'scale(1)' : 'scale(0.8)',
                      transition: 'opacity 500ms ease-out, transform 500ms ease-out',
                    }}
                    strokeWidth={1}
                  />
                  
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <span className="text-white font-bold text-sm">{String(displayIndex + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <div 
                  className="absolute -top-8 -left-8 w-24 h-24 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center backdrop-blur-sm"
                  style={{ transform: 'perspective(500px) rotateY(10deg) rotateX(-10deg)' }}
                >
                  <Cpu size={32} className="text-zinc-500" strokeWidth={1} />
                </div>

                <div 
                  className="absolute -bottom-12 -left-4 w-20 h-20 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center backdrop-blur-sm"
                  style={{ transform: 'perspective(500px) rotateY(-10deg) rotateX(5deg)' }}
                >
                  <HardDrive size={28} className="text-zinc-500" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: currentIndex === index ? 32 : 8,
                    backgroundColor: currentIndex === index ? '#0ea5e9' : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

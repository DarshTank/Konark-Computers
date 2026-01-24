"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, HardDrive, Wifi, Shield } from "lucide-react";
import { getSettings } from "@/lib/db-service";
import { motion, AnimatePresence } from "framer-motion";

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
  const [tagline, setTagline] = useState("To Win Your Smile");

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.tagline) setTagline(settings.tagline);
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] overflow-hidden bg-background flex items-center">
      {/* Background Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority={true}
            className="object-cover"
            style={{ filter: "brightness(0.35)" }}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8 block">Since 1999</span>

              <div className="h-[180px] sm:h-[220px] flex flex-col justify-center">
                <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="block"
                  >
                    {currentSlide.title}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                  >
                    {currentSlide.highlight}
                  </motion.span>
                </h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed"
              >
                {currentSlide.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/service"
                  className="group flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  Explore Services
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 backdrop-blur-sm transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="container mx-auto px-6 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === index ? "w-12 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

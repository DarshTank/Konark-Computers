"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <div className="text-center md:text-left max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Need Help With Your Device?
            </h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Contact us today for a free consultation and quote. Our experts are ready to assist you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-zinc-100 transition-all shadow-lg hover:-translate-y-1"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:+919426429416" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/20 text-white font-bold rounded-xl border border-white/20 hover:bg-black/30 transition-all backdrop-blur-sm hover:-translate-y-1"
            >
              <Phone size={20} />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

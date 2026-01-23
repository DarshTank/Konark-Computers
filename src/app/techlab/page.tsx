"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import SmartBuilderWizard from "@/components/SmartBuilderWizard";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Brand } from "@/types";
import { getBrands } from "@/lib/db-service";
import { motion } from "framer-motion";
import { Phone, Loader2, Sparkles } from "lucide-react";

export default function TechLabPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const brandsData = await getBrands();
      setBrands(brandsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <PageBanner 
        title="TechLab" 
      />

      <section className="py-10 bg-gradient-to-b from-zinc-950 to-zinc-900/50 border-b border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Our Authorized Partners</h3>
            <p className="text-sm text-zinc-500">Genuine products with official warranty support</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {brands.map((brand, index) => (
                <motion.div 
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center justify-center p-4 w-24 md:w-28 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/40 hover:bg-zinc-800/60 transition-all duration-300 group"
                >
                  {brand.logo_url ? (
                    <div className="relative w-full h-8 mb-2">
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        fill
                        className="object-contain brightness-0 invert opacity-50 group-hover:opacity-100 transition-opacity"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-violet-400">{brand.name[0]}</span>
                    </div>
                  )}
                  <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors text-center truncate w-full">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
              
              {brands.length === 0 && (
                <p className="text-zinc-600 text-sm">No brands configured yet</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-violet-400">Smart Compatibility Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Build Your Dream PC
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our intelligent system guides you through selecting only compatible parts. 
              No more guesswork - just a perfect build every time.
            </p>
          </div>
          
          <SmartBuilderWizard />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-violet-600 to-cyan-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need Expert Advice?
              </h3>
              <p className="text-white/80">
                Our team can help you choose the perfect components for your needs
              </p>
            </div>
            <a 
              href="tel:+919426429416"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 font-semibold rounded-xl hover:bg-zinc-100 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

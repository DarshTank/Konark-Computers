"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Product } from '@/types';
import { motion, Variants } from 'framer-motion';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { getTechLabProducts } = await import('@/lib/db-service');
        const allProducts = await getTechLabProducts();
        // Staggered layouts look best with 10-12 items
        setProducts(allProducts.slice(0, 12));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading || products.length === 0) return null;

  // Animation variants for the stagger effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
      {/* Subtle radial glow to highlight products */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Editorial Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">
              Engineering Excellence
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              The <span className="text-zinc-400">Performance</span> Archive
            </h2>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </motion.div>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="break-inside-avoid group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/[0.05] transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] hover:border-white/10">
                
                {/* Image Container */}
                <Link href="/techlab" className="block relative overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center bg-zinc-900">
                      <ShoppingBag className="text-zinc-800" size={40} />
                    </div>
                  )}

                  {/* Aesthetic Overlay Controls */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">

                    <div className="flex justify-end">
                      {/* Like button removed as requested */}
                    </div>
                    {product.in_stock && (
                      <div className="self-start">
                        <span className="px-3 py-1 bg-white/90 text-[9px] font-black tracking-tighter text-black rounded-full shadow-xl">
                          IN STOCK
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info Area (Minimalist Cream/White Text) */}
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                      {product.brand || 'Original'}
                    </span>
                  </div>
                  
                  <h3 className="text-zinc-200 text-lg font-medium leading-tight mb-5 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-light text-white tracking-tighter">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <Link href="/techlab" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-[-45deg]">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* High-End Footer CTA */}
        <div className="mt-24 text-center">
          <Link 
            href="/techlab" 
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black bg-white hover:bg-zinc-200 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Explore Full Inventory
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
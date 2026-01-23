"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { getProducts } = await import('@/lib/db-service');
        const allProducts = await getProducts();
        // Take latest 8 products
        setProducts(allProducts.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <ShoppingBag size={14} className="text-violet-400" />
              <span className="text-xs font-semibold text-violet-400 tracking-wide uppercase">New Arrivals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Products
            </h2>
            <p className="text-zinc-400">
              Check out the latest hardware and peripherals in our inventory.
            </p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-all"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-zinc-900">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                    <ShoppingBag size={48} />
                  </div>
                )}
                {product.in_stock && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                    IN STOCK
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="text-xs text-violet-400 font-medium mb-2 uppercase tracking-wider">
                  {product.brand || 'Generic'} • {product.category}
                </div>
                <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-violet-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-violet-400 hover:text-white">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-all"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

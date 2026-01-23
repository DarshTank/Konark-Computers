"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Package, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { getProducts } from "@/lib/db-service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      // Sort by category if needed, getProducts already filters by in_stock
      if (data) setProducts(data.sort((a, b) => a.category.localeCompare(b.category)));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);
    
  const brands = [
    { name: "HP", logo: "https://cdn.worldvectorlogo.com/logos/hp-2.svg" },
    { name: "Dell", logo: "https://cdn.worldvectorlogo.com/logos/dell-2.svg" },
    { name: "Lenovo", logo: "https://cdn.worldvectorlogo.com/logos/lenovo-2.svg" },
    { name: "Asus", logo: "https://cdn.worldvectorlogo.com/logos/asus-rog.svg" },
    { name: "Acer", logo: "https://cdn.worldvectorlogo.com/logos/acer-2.svg" },
    { name: "Samsung", logo: "https://cdn.worldvectorlogo.com/logos/samsung-8.svg" },
    { name: "Intel", logo: "https://cdn.worldvectorlogo.com/logos/intel-2.svg" },
    { name: "AMD", logo: "https://cdn.worldvectorlogo.com/logos/amd-logo-1.svg" },
  ];

  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <PageBanner title="Our Products" />

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
              <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Computer Parts & Accessories
            </h2>
            <p className="text-zinc-400">
              Quality computer parts and accessories at affordable prices. All products come with warranty.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize ${
                      activeCategory === cat
                        ? "bg-sky-500 text-white"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-sky-500/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">No products available in this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-sky-500/30 transition-all duration-300"
                    >
                      <div className="relative h-48 bg-zinc-800/50 overflow-hidden">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-zinc-700" />
                          </div>
                        )}
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-sky-500 text-white rounded-md capitalize">
                          {product.category}
                        </span>
                        {product.brand && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-zinc-800/80 text-zinc-300 rounded-md">
                            {product.brand}
                          </span>
                        )}
                      </div>

                      <div className="p-5 text-center">
                        <h4 className="text-base font-semibold text-white mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xl font-bold text-sky-400 mb-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-zinc-600 mb-4">
                          *Price may vary
                        </p>
                        <a
                          href="tel:+919426429416"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-white text-sm font-medium rounded-lg hover:bg-sky-500 transition-colors"
                        >
                          <Phone size={14} />
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Brands</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Brands We Support
            </h3>
            <p className="text-zinc-500 mt-2">
              Authorized service and genuine parts for all major brands
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/30 hover:bg-zinc-800/50 transition-all duration-300 group"
              >
                <div className="relative w-full h-10 mb-3">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sky-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Can&apos;t Find What You Need?
              </h3>
              <p className="text-white/80">
                Contact us and we&apos;ll source the right parts for you
              </p>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-zinc-100 transition-all"
            >
              Contact Us Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

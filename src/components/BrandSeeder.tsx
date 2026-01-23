"use client";

import React, { useState } from 'react';
import { Database, Loader2, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { addBrand, getBrands, deleteBrand } from '@/lib/db-service';
import { Brand } from '@/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const DEFAULT_BRANDS: Omit<Brand, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: "HP",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg",
    is_active: true,
    display_order: 1
  },
  {
    name: "Dell",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    is_active: true,
    display_order: 2
  },
  {
    name: "Lenovo",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
    is_active: true,
    display_order: 3
  },
  {
    name: "Asus",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
    is_active: true,
    display_order: 4
  },
  {
    name: "Acer",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg",
    is_active: true,
    display_order: 5
  },
  {
    name: "Samsung",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    is_active: true,
    display_order: 6
  }
];

export default function BrandSeeder({ onUpdate }: { onUpdate?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSeedBrands = async () => {
    if (!confirm('This will add the default brands to your list. Continue?')) return;
    
    setLoading(true);
    setStatus('idle');
    try {
      let brandsAdded = 0;
      for (const brand of DEFAULT_BRANDS) {
        await addBrand({ ...brand, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        brandsAdded++;
      }
      toast.success(`Successfully added ${brandsAdded} brands.`);
      setStatus('success');
      onUpdate?.();
    } catch (error) {
      console.error('Brand seeding failed:', error);
      toast.error('Failed to seed brands.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearBrands = async () => {
    if (!confirm('WARNING: This will DELETE ALL BRANDS from the database. This action cannot be undone. Are you sure?')) return;

    setLoading(true);
    try {
      const currentBrands = await getBrands();
      let deletedCount = 0;
      for (const brand of currentBrands) {
        await deleteBrand(brand.id);
        deletedCount++;
      }
      toast.success(`Deleted ${deletedCount} brands.`);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to clear brands:', error);
      toast.error('Failed to clear brands.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-400" />
            Brand Manager
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Quickly populate or reset your brand list.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={handleClearBrands}
            className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Clear All
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={handleSeedBrands}
            className="px-4 py-2 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Seed Brands
          </motion.button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from 'react';
import { Product, BuildSelection, ProductCategory } from '@/types';

export function useSmartFilter(
  products: Product[],
  currentBuild: BuildSelection,
  targetCategory: ProductCategory
): Product[] {
  return useMemo(() => {
    const categoryProducts = products.filter(p => p.category === targetCategory);
    
    const collectedTags = new Set<string>();
    const requiredTags = new Set<string>();
    
    Object.entries(currentBuild).forEach(([category, selectedProduct]) => {
      if (selectedProduct && category !== targetCategory) {
        selectedProduct.compatibility_tags.forEach(tag => collectedTags.add(tag));
        selectedProduct.required_tags.forEach(tag => requiredTags.add(tag));
      }
    });

    if (collectedTags.size === 0 && requiredTags.size === 0) {
      return categoryProducts;
    }

    return categoryProducts.filter(product => {
      const productTags = new Set(product.compatibility_tags);
      
      for (const tag of requiredTags) {
        if (!productTags.has(tag)) {
          return false;
        }
      }

      if (targetCategory === 'motherboard' && currentBuild.cpu) {
        const cpuTags = currentBuild.cpu.compatibility_tags;
        const socketTag = cpuTags.find(t => t.startsWith('socket-'));
        if (socketTag && !productTags.has(socketTag)) {
          return false;
        }
      }

      if (targetCategory === 'ram' && currentBuild.motherboard) {
        const mbTags = currentBuild.motherboard.compatibility_tags;
        const ramTypeTag = mbTags.find(t => t.startsWith('ram-'));
        if (ramTypeTag && !productTags.has(ramTypeTag)) {
          return false;
        }
      }

      if (targetCategory === 'case' && currentBuild.motherboard) {
        const mbTags = currentBuild.motherboard.required_tags;
        const hasMatchingCase = mbTags.some(t => productTags.has(t));
        if (mbTags.length > 0 && !hasMatchingCase) {
          return false;
        }
      }

      if (targetCategory === 'cooling' && currentBuild.cpu) {
        const cpuTags = currentBuild.cpu.compatibility_tags;
        const socketTag = cpuTags.find(t => t.startsWith('socket-'));
        if (socketTag && !productTags.has(socketTag)) {
          return false;
        }
      }

      return true;
    });
  }, [products, currentBuild, targetCategory]);
}

export function calculateBuildTotal(build: BuildSelection): number {
  return Object.values(build).reduce((total, product) => {
    return total + (product?.price || 0);
  }, 0);
}

export function getBuildItems(build: BuildSelection): Product[] {
  return Object.values(build).filter((p): p is Product => p !== null);
}

export function isBuildComplete(build: BuildSelection): boolean {
  const essentialCategories: (keyof BuildSelection)[] = ['cpu', 'motherboard', 'ram', 'storage'];
  return essentialCategories.every(cat => build[cat] !== null);
}

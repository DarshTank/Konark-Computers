"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, CircuitBoard, MemoryStick, HardDrive, Monitor, Box, Zap, Fan,
  Check, ChevronRight, ChevronLeft, X, Loader2, AlertCircle,
  FileText, Download, Mail, MessageSquare, Sparkles, Plus, Minus
} from 'lucide-react';
import { Product, BuildSelection, BUILD_STEPS, ProductCategory } from '@/types';
import { getSettings, getProducts, createLead } from '@/lib/db-service';
import { useSmartFilter, calculateBuildTotal, getBuildItems } from '@/hooks/useSmartFilter';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

const iconMap: Record<string, React.ReactNode> = {
  'cpu': <Cpu className="w-5 h-5" />,
  'circuit-board': <CircuitBoard className="w-5 h-5" />,
  'memory-stick': <MemoryStick className="w-5 h-5" />,
  'hard-drive': <HardDrive className="w-5 h-5" />,
  'monitor': <Monitor className="w-5 h-5" />,
  'box': <Box className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'fan': <Fan className="w-5 h-5" />,
};

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  hidePrice?: boolean;
}

function ProductCard({ product, isSelected, onSelect, hidePrice = true }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-violet-500 bg-violet-500/10' 
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <Box className="w-8 h-8" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs text-violet-400 font-medium mb-1">{product.brand}</p>
          <h4 className="text-white font-medium text-sm leading-tight mb-2 line-clamp-2">{product.name}</h4>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(product.specifications as Record<string, unknown>).slice(0, 2).map(([key, value]) => (
              <span key={key} className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400">
                {String(value)}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          {!hidePrice && (
            <p className="text-lg font-bold text-white">₹{product.price.toLocaleString('en-IN')}</p>
          )}
          {product.in_stock ? (
            <p className="text-xs text-emerald-400">In Stock</p>
          ) : (
            <p className="text-xs text-red-400">Out of Stock</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type BuildMode = 'full-pc' | 'parts-only';

interface QuotationData {
  items: Product[];
  subtotal: number;
  gstAmount: number;
  serviceCharge: number;
  total: number;
  gstPercentage: number;
  serviceChargePercentage: number;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
}

function generatePDF(data: QuotationData, customerName: string, quoteId: string): Blob {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFillColor(15, 15, 23);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(data.companyName, 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text('QUOTATION', 20, 35);
  doc.text(`Quote #: ${quoteId}`, pageWidth - 20, 25, { align: 'right' });
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 20, 32, { align: 'right' });
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text(`${data.companyPhone} | ${data.companyEmail}`, 20, 42);
  
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('Bill To:', 20, 65);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.text(customerName, 20, 72);
  
  let y = 90;
  
  doc.setFillColor(245, 245, 250);
  doc.rect(15, y - 5, pageWidth - 30, 10, 'F');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('ITEM', 20, y);
  doc.text('CATEGORY', 100, y);
  doc.text('PRICE', pageWidth - 25, y, { align: 'right' });
  
  y += 15;
  doc.setTextColor(30, 30, 30);
  
  data.items.forEach((item) => {
    doc.setFontSize(10);
    const nameLines = doc.splitTextToSize(item.name, 75);
    doc.text(nameLines, 20, y);
    doc.setTextColor(100, 100, 100);
    doc.text(item.category.toUpperCase(), 100, y);
    doc.setTextColor(30, 30, 30);
    doc.text(`₹${item.price.toLocaleString('en-IN')}`, pageWidth - 25, y, { align: 'right' });
    y += nameLines.length * 6 + 8;
  });
  
  y += 10;
  doc.setDrawColor(220, 220, 220);
  doc.line(15, y, pageWidth - 15, y);
  y += 15;
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Subtotal', 100, y);
  doc.setTextColor(30, 30, 30);
  doc.text(`₹${data.subtotal.toLocaleString('en-IN')}`, pageWidth - 25, y, { align: 'right' });
  y += 8;
  
  doc.setTextColor(100, 100, 100);
  doc.text(`GST (${data.gstPercentage}%)`, 100, y);
  doc.setTextColor(30, 30, 30);
  doc.text(`₹${data.gstAmount.toLocaleString('en-IN')}`, pageWidth - 25, y, { align: 'right' });
  y += 8;
  
  doc.setTextColor(100, 100, 100);
  doc.text(`Service Charge (${data.serviceChargePercentage}%)`, 100, y);
  doc.setTextColor(30, 30, 30);
  doc.text(`₹${data.serviceCharge.toLocaleString('en-IN')}`, pageWidth - 25, y, { align: 'right' });
  y += 15;
  
  doc.setFillColor(139, 92, 246);
  doc.rect(90, y - 5, pageWidth - 105, 12, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL', 100, y + 3);
  doc.text(`₹${data.total.toLocaleString('en-IN')}`, pageWidth - 25, y + 3, { align: 'right' });
  
  y += 30;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Terms & Conditions:', 20, y);
  y += 5;
  doc.text('1. This quotation is valid for 7 days from the date of issue.', 20, y);
  y += 4;
  doc.text('2. Prices are subject to change based on availability.', 20, y);
  y += 4;
  doc.text('3. Warranty as per manufacturer terms.', 20, y);
  
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(data.companyAddress, pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('Thank you for your business!', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return doc.output('blob');
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  build: BuildSelection;
  onSubmit: (data: { name: string; whatsapp: string; email: string }, pdfBlob: Blob) => Promise<void>;
  isSubmitting: boolean;
  gstPercentage: number;
  serviceChargePercentage: number;
  companySettings: Record<string, string>;
}

function QuoteModal({ isOpen, onClose, build, onSubmit, isSubmitting, gstPercentage, serviceChargePercentage, companySettings }: QuoteModalProps) {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '' });
  const [showQuotation, setShowQuotation] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const items = getBuildItems(build);
  const subtotal = calculateBuildTotal(build);
  const gstAmount = Math.round(subtotal * (gstPercentage / 100));
  const serviceCharge = Math.round(subtotal * (serviceChargePercentage / 100));
  const total = subtotal + gstAmount + serviceCharge;

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `KQ-${Date.now().toString(36).toUpperCase()}`;
    const blob = generatePDF({
      items,
      subtotal,
      gstAmount,
      serviceCharge,
      total,
      gstPercentage,
      serviceChargePercentage,
      companyName: companySettings.company_name || 'Konark Computers',
      companyPhone: companySettings.company_phone || '+91 942 642 9416',
      companyEmail: companySettings.company_email || 'info@konarkcomputers.com',
      companyAddress: companySettings.company_address || 'Ahmedabad, Gujarat, India',
    }, formData.name, quoteId);
    setPdfBlob(blob);
    setShowQuotation(true);
  };

  const handleDownloadPDF = () => {
    if (pdfBlob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const fileName = `Konark-Quote-${Date.now()}.pdf`;
        
        // Use postMessage for iframe compatibility
        window.parent.postMessage({
          type: 'OPEN_EXTERNAL_URL',
          data: { url: base64data, download: fileName }
        }, '*');
        
        // Also try direct download as fallback
        const link = document.createElement('a');
        link.href = base64data;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 200);
      };
      reader.readAsDataURL(pdfBlob);
    }
  };

  const handleSubmit = async () => {
    if (pdfBlob) {
      await onSubmit(formData, pdfBlob);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl"
      >
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              {showQuotation ? 'Your Quotation' : 'Get Your Estimate'}
            </h3>
            <p className="text-sm text-zinc-500">{items.length} items selected</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!showQuotation ? (
            <form onSubmit={handleGenerateQuote} className="space-y-5">
              <div className="p-4 bg-zinc-800/50 rounded-xl mb-6">
                <h4 className="text-sm font-semibold text-zinc-400 mb-3">Selected Items</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-zinc-300 truncate pr-4">{item.name}</span>
                      <span className="text-zinc-500 capitalize text-xs">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={e => setFormData(d => ({ ...d, whatsapp: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                  placeholder="+91 9XXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                  placeholder="your@email.com"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate Estimate
              </motion.button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Quotation Ready!</h4>
                    <p className="text-sm text-zinc-400">For {formData.name}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-2 border-b border-zinc-800/50">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-xs text-zinc-500 capitalize">{item.category}</p>
                      </div>
                      <p className="text-white font-medium">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-zinc-300">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">GST ({gstPercentage}%)</span>
                    <span className="text-zinc-300">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Service Charge ({serviceChargePercentage}%)</span>
                    <span className="text-zinc-300">₹{serviceCharge.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-zinc-700">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleDownloadPDF}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      Send & Save
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-zinc-500 text-center">
                By clicking Send & Save, your quote will be saved and our team will contact you via WhatsApp.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function SmartBuilderWizard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [buildMode, setBuildMode] = useState<BuildMode>('parts-only');
  const [build, setBuild] = useState<BuildSelection>({
    cpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    gpu: null,
    case: null,
    psu: null,
    cooling: null,
  });
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [serviceChargePercentage, setServiceChargePercentage] = useState(5);
  const [companySettings, setCompanySettings] = useState<Record<string, string>>({});

  const currentCategory = BUILD_STEPS[currentStep].category;
  const filteredProducts = useSmartFilter(products, build, currentCategory);

  useEffect(() => {
    async function fetchData() {
      const [productsRes, settingsData] = await Promise.all([
        getProducts(),
        getSettings(),
      ]);
      
      if (productsRes) setProducts(productsRes);
      setCompanySettings(settingsData);
      if (settingsData.gst_percentage) setGstPercentage(parseFloat(settingsData.gst_percentage));
      if (settingsData.service_charge_percentage) setServiceChargePercentage(parseFloat(settingsData.service_charge_percentage));
      
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSelectProduct = (product: Product) => {
    setBuild(prev => ({
      ...prev,
      [currentCategory]: prev[currentCategory]?.id === product.id ? null : product,
    }));
  };

  const handleNext = () => {
    if (currentStep < BUILD_STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const handleSubmitQuote = async (data: { name: string; whatsapp: string; email: string }) => {
    setIsSubmitting(true);
    try {
      const items = getBuildItems(build);
      const subtotal = calculateBuildTotal(build);
      const gstAmount = Math.round(subtotal * (gstPercentage / 100));
      const serviceCharge = Math.round(subtotal * (serviceChargePercentage / 100));
      const total = subtotal + gstAmount + serviceCharge;

      const { error } = await createLead({
        customer_name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
        items: items,
        subtotal: subtotal,
        gst_amount: gstAmount,
        service_charge: serviceCharge,
        total_amount: total,
        status: 'new',
      });

      if (error) throw error;

      setSubmitSuccess(true);
      setShowQuoteModal(false);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to submit quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Quote Submitted Successfully!</h2>
        <p className="text-zinc-400 max-w-md mb-6">
          Thank you for your interest! Our team will contact you shortly on WhatsApp with more details.
        </p>
        <motion.button
          onClick={() => {
            setBuild({
              cpu: null, motherboard: null, ram: null, storage: null,
              gpu: null, case: null, psu: null, cooling: null,
            });
            setCurrentStep(0);
            setSubmitSuccess(false);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all"
        >
          Start New Build
        </motion.button>
      </motion.div>
    );
  }

  const selectedCount = Object.values(build).filter(Boolean).length;
  const canGetQuote = selectedCount > 0;
  const isFullPCComplete = buildMode === 'full-pc' && ['cpu', 'motherboard', 'ram', 'storage'].every(cat => build[cat as ProductCategory] !== null);

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 p-1 bg-zinc-900/80 rounded-xl border border-zinc-800">
          <button
            onClick={() => setBuildMode('parts-only')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              buildMode === 'parts-only'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Select Parts
          </button>
          <button
            onClick={() => setBuildMode('full-pc')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              buildMode === 'full-pc'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Build Full PC
          </button>
        </div>

        {selectedCount > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowQuoteModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Get Estimate ({selectedCount})
          </motion.button>
        )}
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
        {BUILD_STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = build[step.category] !== null;
          const isRequired = buildMode === 'full-pc' && ['cpu', 'motherboard', 'ram', 'storage'].includes(step.category);
          
          return (
            <button
              key={step.category}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-transparent'
                  : isCompleted
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : isRequired
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-800/50 text-zinc-400 border-zinc-700'
              }`}
            >
              {isCompleted && !isActive ? (
                <Check className="w-4 h-4" />
              ) : (
                iconMap[step.icon]
              )}
              <span className="text-sm font-medium">{step.label}</span>
              {isRequired && !isCompleted && !isActive && (
                <span className="text-xs opacity-75">*</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Select {BUILD_STEPS[currentStep].label}
            </h2>
            {buildMode === 'parts-only' && (
              <p className="text-sm text-zinc-400">
                Choose any parts you need. No minimum selection required.
              </p>
            )}
            {filteredProducts.length < products.filter(p => p.category === currentCategory).length && buildMode === 'full-pc' && (
              <p className="text-sm text-amber-400 flex items-center gap-2 mt-2">
                <AlertCircle className="w-4 h-4" />
                Showing compatible options based on your selections
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800">
                  <Box className="w-12 h-12 mx-auto text-zinc-600 mb-4" />
                  <p className="text-zinc-400">No products available in this category</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={build[currentCategory]?.id === product.id}
                    onSelect={() => handleSelectProduct(product)}
                    hidePrice={true}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            {currentStep < BUILD_STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <motion.button
                onClick={() => setShowQuoteModal(true)}
                disabled={!canGetQuote}
                whileHover={{ scale: canGetQuote ? 1.02 : 1 }}
                whileTap={{ scale: canGetQuote ? 0.98 : 1 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FileText className="w-5 h-5" />
                Get Estimate
              </motion.button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Your Selection</h3>
              <span className="px-2 py-1 bg-violet-500/10 text-violet-400 text-xs rounded-lg font-medium">
                {selectedCount} items
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              {BUILD_STEPS.map(step => {
                const selected = build[step.category];
                const isRequired = buildMode === 'full-pc' && ['cpu', 'motherboard', 'ram', 'storage'].includes(step.category);
                return (
                  <div
                    key={step.category}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      selected ? 'bg-zinc-800' : 'bg-zinc-800/30 border border-dashed border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selected ? 'bg-violet-500/20 text-violet-400' : 'bg-zinc-700/50 text-zinc-500'
                      }`}>
                        {iconMap[step.icon]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-500">
                          {step.label}
                          {isRequired && !selected && <span className="text-amber-400 ml-1">*</span>}
                        </p>
                        <p className={`text-sm truncate max-w-[140px] ${selected ? 'text-white' : 'text-zinc-600'}`}>
                          {selected ? selected.name : 'Not selected'}
                        </p>
                      </div>
                    </div>
                    {selected && (
                      <button
                        onClick={() => setBuild(prev => ({ ...prev, [step.category]: null }))}
                        className="p-1 hover:bg-red-500/20 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-800">
              {buildMode === 'full-pc' && !isFullPCComplete && (
                <p className="text-xs text-amber-400 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Select CPU, Motherboard, RAM & Storage for full PC build
                </p>
              )}
              
              <motion.button
                onClick={() => setShowQuoteModal(true)}
                disabled={!canGetQuote}
                whileHover={{ scale: canGetQuote ? 1.02 : 1 }}
                whileTap={{ scale: canGetQuote ? 0.98 : 1 }}
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:bg-zinc-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {canGetQuote ? 'Get Your Estimate' : 'Select at least 1 item'}
              </motion.button>
              
              <p className="text-xs text-zinc-500 text-center mt-3">
                Prices shown after generating estimate
              </p>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        build={build}
        onSubmit={handleSubmitQuote}
        isSubmitting={isSubmitting}
        gstPercentage={gstPercentage}
        serviceChargePercentage={serviceChargePercentage}
        companySettings={companySettings}
      />
    </div>
  );
}

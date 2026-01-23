"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import {
  Building2,
  Users,
  Package,
  Settings,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  Trash2,
  Edit2,
  Save,
  Eye,
  ChevronRight,
  ArrowUpRight,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  User,
  Phone,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Loader2,
  ShoppingBag,
  Wrench,
  Tag,
  Percent,
  MapPin,
  Link,
  Upload
} from "lucide-react";
import {
  getLeads,
  getProducts,
  getServices,
  getBrands,
  getSettings,
  getInquiries,
  addProduct,
  updateProduct,
  deleteProduct,
  addService,
  updateService,
  deleteService,
  addBrand,
  updateBrand,
  deleteBrand,
  updateSetting,
  updateLeadStatus,
  updateInquiryStatus
} from "@/lib/db-service";
import { signOut } from '@/lib/auth-service';
import { Product, Lead, Service, Setting, Brand, LeadStatus, ProductCategory, BUILD_STEPS, Inquiry } from "@/types";
import KonarkLogo from '@/components/KonarkLogo';
import DatabaseSeeder from '@/components/DatabaseSeeder';
import BrandSeeder from "@/components/BrandSeeder";

// Service type is imported from @/types now


const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string; border: string }> = {
  new: { label: 'New', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  contacted: { label: 'Contacted', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  follow_up: { label: 'Follow Up', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  converted: { label: 'Converted', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  archived: { label: 'Archived', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/30' },
};

type TabType = 'dashboard' | 'leads' | 'products' | 'services' | 'brands' | 'settings' | 'inquiries';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [sidebarCollapsed] = useState(false);

  const fetchData = useCallback(async () => {
    const [leadsRes, productsRes, servicesRes, brandsRes, settingsRes, inquiriesRes] = await Promise.all([
      getLeads(),
      getProducts(),
      getServices(),
      getBrands(),
      getSettings(),
      getInquiries()
    ]);
    
    setLeads(leadsRes);
    setProducts(productsRes);
    setServices(servicesRes);
    setBrands(brandsRes);
    setInquiries(inquiriesRes);
    // Setting needs mapping from Record to Setting[]
    const settingsArray = Object.entries(settingsRes).map(([key, value]) => ({
        id: key,
        key: key,
        value: value,
        description: null,
        updated_at: new Date().toISOString()
    } as Setting));
    setSettings(settingsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (!user) {
      router.push('/admin/login');
      return;
    }
    setAdminUser(JSON.parse(user));
    fetchData();
  }, [router, fetchData]);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const success = await updateLeadStatus(leadId, newStatus);
      if (success) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        // @ts-ignore
        toast.success(`Lead status updated to ${statusConfig[newStatus].label}`);
      } else {
        // @ts-ignore
        toast.error("Failed to update lead status");
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      // @ts-ignore
      toast.error("An error occurred while updating status");
    }
  };

  const handleInquiryStatusChange = async (id: string, status: Inquiry['status']) => {
    try {
        const success = await updateInquiryStatus(id, status);
        if (success) {
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
            toast.success("Inquiry status updated");
        } else {
            toast.error("Failed to update inquiry status");
        }
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        toast.error("An error occurred while updating status");
    }
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      await updateSetting(key, value);
      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
      // Toast handled in SettingsTab component usually, but good to have safety here if called directly.
      // Actually SettingsTab calls this. Let's wrap it there or here. 
      // The SettingsTab implementation calls onUpdate then shows toast. 
      // I will leave this as is for now and check SettingsTab later.
    } catch (error) {
      console.error("Error updating setting:", error);
      toast.error("Failed to save setting");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
        try {
            await deleteService(id);
            setServices(prev => prev.filter(s => s.id !== id));
            toast.success("Service deleted successfully");
        } catch (error) {
           console.error("Error deleting service:", error);
           toast.error("Failed to delete service");
        }
    }
  };

  const handleDeleteBrand = async (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
        try {
            await deleteBrand(id);
            setBrands(prev => prev.filter(b => b.id !== id));
            toast.success("Brand deleted successfully");
        } catch (error) {
            console.error("Error deleting brand:", error);
            toast.error("Failed to delete brand");
        }
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading || !adminUser) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-violet-500 mx-auto mb-4" />
          <p className="text-zinc-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const generateResponse = (recipient: Lead | Inquiry) => {
    const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';
    
    // Check for custom template
    const template = getSetting('message_template');

    const companyName = getSetting('company_name') || 'Konark Computers';
    const companyAddress = getSetting('company_address');
    const companyPhone = getSetting('company_phone');
    const ceoName = "Omesh Tank"; 

    /* Helper variables for template replacement */
    const name = 'customer_name' in recipient ? recipient.customer_name : recipient.name;
    // For leads, notes contain subject. For inquiries, it's direct.
    let subjectRaw = '';
    if ('notes' in recipient && recipient.notes) {
        subjectRaw = recipient.notes.split('\n')[0].replace('Subject: ', '');
    } else if ('subject' in recipient) {
        subjectRaw = recipient.subject;
    }
    const subject = subjectRaw || 'your requirements';

    let message = '';

    if (template) {
        message = template
            .replace(/{customer_name}|{name}/g, name)
            .replace(/{subject}/g, subject)
            .replace(/{company_name}/g, companyName)
            .replace(/{company_address}/g, companyAddress)
            .replace(/{company_phone}/g, companyPhone)
            .replace(/{ceo_name}/g, ceoName);
    } else {
        // Default Fallback
        message = `Dear ${name},\n\nGreetings from ${companyName}!\n\nThank you for your inquiry regarding: ${subject}.\n\nWe have received your details and are reviewing your requirements. Our team will get back to you shortly with the best possible quotation.\n\nBest Regards,\n\n${ceoName}\nCEO, ${companyName}\n${companyAddress}\nPh: ${companyPhone}`;
    }
    
    return encodeURIComponent(message);
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    converted: leads.filter(l => l.status === 'converted').length,
    revenue: leads.filter(l => l.status === 'converted').reduce((sum, l) => sum + l.total_amount, 0),
    new_inquiries: inquiries.filter(i => i.status === 'new').length,
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users, badge: stats.new },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, badge: stats.new_inquiries },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'brands', label: 'Brands', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800/50 flex flex-col transition-all duration-300`}>
        <div className="p-6 border-b border-zinc-800/50">
          <KonarkLogo size={sidebarCollapsed ? 'sm' : 'md'} showText={!sidebarCollapsed} />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white border border-violet-500/30'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''} mb-4`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-violet-400" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{adminUser.name}</p>
                <p className="text-xs text-zinc-500 truncate">{adminUser.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors`}
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-zinc-800/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
              <p className="text-sm text-zinc-500">
                {activeTab === 'dashboard' && 'Overview of your business performance'}
                {activeTab === 'leads' && `${filteredLeads.length} leads found`}
                {activeTab === 'inquiries' && `${inquiries.length} inquiries found`}
                {activeTab === 'products' && `${products.length} products in catalog`}
                {activeTab === 'services' && `${services.length} services available`}
                {activeTab === 'settings' && 'Configure your store settings'}
              </p>
            </div>
            
            {activeTab === 'leads' && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-64 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as LeadStatus | 'all')}
                    className="pl-10 pr-8 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <option key={status} value={status}>{config.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </motion.button>
            )}

            {activeTab === 'services' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setEditingService(null); setShowServiceModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </motion.button>
            )}

            {activeTab === 'brands' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setEditingBrand(null); setShowBrandModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Brand
              </motion.button>
            )}
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <DashboardTab stats={stats} leads={leads} />
              </motion.div>
            )}
            
            {activeTab === 'leads' && (
              <motion.div key="leads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <LeadsTab 
                  leads={filteredLeads} 
                  onStatusChange={handleStatusChange}
                  onViewDetails={setSelectedLead}
                  generateResponse={generateResponse}
                />
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div key="inquiries" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <InquiriesTab 
                  inquiries={inquiries}
                  onStatusChange={handleInquiryStatusChange}
                  generateResponse={generateResponse}
                />
              </motion.div>
            )}
            
            {activeTab === 'products' && (
              <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <ProductsTab 
                  products={products}
                  onEdit={(p) => { setEditingProduct(p); setShowProductModal(true); }}
                  onDelete={handleDeleteProduct}
                />
              </motion.div>
            )}

            {activeTab === 'brands' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Brands Management</h2>
                  <button onClick={() => { setEditingBrand(null); setShowBrandModal(true); }} className="px-4 py-2 bg-violet-600 text-white rounded-xl flex items-center gap-2 hover:bg-violet-700">
                    <Plus className="w-4 h-4" /> Add Brand
                  </button>
                </div>
                
                <BrandSeeder onUpdate={fetchData} />

                <BrandsTab 
                  brands={brands} 
                  onEdit={(b) => { setEditingBrand(b); setShowBrandModal(true); }}
                  onDelete={handleDeleteBrand}
                />
              </motion.div>
            )}
            
            {activeTab === 'services' && (
              <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <ServicesTab 
                  services={services}
                  onEdit={(s) => { setEditingService(s); setShowServiceModal(true); }}
                  onDelete={handleDeleteService}
                />
              </motion.div>
            )}

            
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <SettingsTab 
                  settings={settings}
                  onUpdate={handleUpdateSetting}
                  onRefresh={fetchData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      
      <ProductModal
          isOpen={showProductModal}
          onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
          product={editingProduct}
          brands={brands.filter(b => b.is_active)}
          onSave={async (product) => {
            try {
              if (editingProduct) {
                await updateProduct(editingProduct.id, product);
                setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...product } : p));
                toast.success("Product updated successfully");
              } else {
                const newProd = await addProduct(product as Product);
                if (newProd) {
                    setProducts(prev => [...prev, newProd]);
                    toast.success("Product added successfully");
                } else {
                    throw new Error("Failed to create product");
                }
              }
              setShowProductModal(false);
              setEditingProduct(null);
            } catch (error) {
              console.error("Error saving product:", error);
              toast.error("Failed to save product");
            }
          }}
        />

      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => { setShowServiceModal(false); setEditingService(null); }}
        service={editingService}
        onSave={async (service) => {
          try {
            if (editingService) {
              await updateService(editingService.id, service);
              setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...service } : s));
              toast.success("Service updated successfully");
            } else {
              const newSvc = await addService(service as Service);
              if (newSvc) {
                  setServices(prev => [...prev, newSvc]);
                  toast.success("Service added successfully");
              } else {
                  throw new Error("Failed to create service");
              }
            }
            setShowServiceModal(false);
            setEditingService(null);
          } catch (error) {
            console.error("Error saving service:", error);
            toast.error("Failed to save service");
          }
        }}
      />

      <BrandModal
        isOpen={showBrandModal}
        onClose={() => { setShowBrandModal(false); setEditingBrand(null); }}
        brand={editingBrand}
        onSave={async (brand) => {
          try {
            if (editingBrand) {
              await updateBrand(editingBrand.id, brand);
              setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...b, ...brand } : b));
              toast.success("Brand updated successfully");
            } else {
              const newBrand = await addBrand(brand as Brand);
              if (newBrand) {
                  setBrands(prev => [...prev, newBrand]);
                  toast.success("Brand added successfully");
              } else {
                  throw new Error("Failed to create brand");
              }
            }
            setShowBrandModal(false);
            setEditingBrand(null);
          } catch (error) {
            console.error("Error saving brand:", error);
            toast.error("Failed to save brand");
          }
        }}
      />
    </div>
  );
}

function DashboardTab({ stats, leads }: { stats: Record<string, number>; leads: Lead[] }) {
  const recentLeads = leads.slice(0, 5);
  
  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, gradient: 'from-violet-500 to-purple-500' },
    { label: 'New Inquiries', value: stats.new_inquiries, icon: Clock, gradient: 'from-sky-500 to-cyan-500' },
    { label: 'Converted Leads', value: stats.converted, icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Revenue', value: `₹${(stats.revenue / 1000).toFixed(0)}K`, icon: DollarSign, gradient: 'from-amber-500 to-orange-500' },
  ];
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Leads</h3>
            <p className="text-sm text-zinc-500">Latest customer inquiries</p>
          </div>
          <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {recentLeads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">No leads yet</p>
            </div>
          ) : (
            recentLeads.map(lead => (
              <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{lead.customer_name}</p>
                    <p className="text-sm text-zinc-500">{lead.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">₹{lead.total_amount.toLocaleString('en-IN')}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[lead.status].bg} ${statusConfig[lead.status].color} ${statusConfig[lead.status].border} border`}>
                    {statusConfig[lead.status].label}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function LeadsTab({ leads, onStatusChange, onViewDetails, generateResponse }: { 
  leads: Lead[]; 
  onStatusChange: (id: string, status: LeadStatus) => void;
  onViewDetails: (lead: Lead) => void;
  generateResponse: (lead: Lead) => string;
}) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Contact</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Date</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">No leads found</p>
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <LeadRow 
                  key={lead.id} 
                  lead={lead} 
                  onStatusChange={onStatusChange} 
                  onViewDetails={onViewDetails}
                  message={generateResponse(lead)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadRow({ lead, onStatusChange, onViewDetails, message }: { 
  lead: Lead; 
  onStatusChange: (id: string, status: LeadStatus) => void;
  onViewDetails: (lead: Lead) => void;
  message: string;
}) {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-violet-400" />
          </div>
          <span className="font-medium text-white">{lead.customer_name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {lead.whatsapp && (
            <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${message}`} target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Chat on WhatsApp">
              <MessageSquare className="w-4 h-4" />
            </a>
          )}
          {lead.whatsapp && (
             <a href={`tel:${lead.whatsapp}`} className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors" title="Call">
              <Phone className="w-4 h-4" />
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}?subject=Response to your inquiry - Konark Computers&body=${message}`} className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors" title="Send Email">
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-white">₹{lead.total_amount.toLocaleString('en-IN')}</span>
      </td>
      <td className="px-6 py-4">
        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusConfig[lead.status].bg} ${statusConfig[lead.status].color} ${statusConfig[lead.status].border} border flex items-center gap-1`}
          >
            {statusConfig[lead.status].label}
            <ChevronRight className={`w-3 h-3 transition-transform ${showActions ? 'rotate-90' : ''}`} />
          </button>
          
          {showActions && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
              <div className="absolute left-0 top-full mt-1 z-20 w-36 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl py-1 overflow-hidden">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => { onStatusChange(lead.id, status as LeadStatus); setShowActions(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-800 flex items-center gap-2 ${config.color}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${config.bg}`} />
                    {config.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-zinc-400 text-sm">
        {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={() => onViewDetails(lead)} 
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors"
          title="View Details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

function LeadDetailsModal({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  if (!lead) return null;
  
  const items = lead.items as Product[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{lead.customer_name}</h3>
            <p className="text-sm text-zinc-500">Quote #{lead.id.slice(0, 8)}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">WhatsApp</p>
              <p className="font-medium text-white">{lead.whatsapp}</p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Email</p>
              <p className="font-medium text-white truncate">{lead.email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Selected Items</h4>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <div>
                    <p className="text-xs text-violet-400 capitalize">{item.category}</p>
                    <p className="font-medium text-white">{item.name}</p>
                  </div>
                  <p className="font-semibold text-white">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-300">₹{(lead.subtotal || lead.total_amount).toLocaleString('en-IN')}</span>
              </div>
              {lead.gst_amount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">GST (18%)</span>
                  <span className="text-zinc-300">₹{lead.gst_amount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {lead.service_charge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Service Charge</span>
                  <span className="text-zinc-300">₹{lead.service_charge.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-zinc-800">
                <span className="font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  ₹{lead.total_amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
               className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <MessageSquare className="w-5 h-5" /> WhatsApp
            </a>
            <a href={`tel:${lead.whatsapp}`}
               className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all">
              <Phone className="w-5 h-5" /> Call
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InquiriesTab({ inquiries, onStatusChange, generateResponse }: {
  inquiries: Inquiry[];
  onStatusChange: (id: string, status: Inquiry['status']) => void;
  generateResponse: (inquiry: Inquiry) => string;
}) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Subject</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">No inquiries yet</p>
                </td>
              </tr>
            ) : (
              inquiries.map(inquiry => (
                <InquiryRow 
                  key={inquiry.id} 
                  inquiry={inquiry} 
                  onStatusChange={onStatusChange}
                  message={generateResponse(inquiry)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiryRow({ inquiry, onStatusChange, message }: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: Inquiry['status']) => void;
  message: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-zinc-800/30 transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
             </div>
             <div>
               <p className="font-medium text-white">{inquiry.name}</p>
               <p className="text-xs text-zinc-500">{inquiry.email}</p>
               {inquiry.phone && <p className="text-xs text-zinc-500">{inquiry.phone}</p>}
             </div>
          </div>
        </td>
        <td className="px-6 py-4 text-zinc-300">{inquiry.subject}</td>
        <td className="px-6 py-4 text-zinc-400 text-sm">
          {new Date(inquiry.created_at).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
           {inquiry.status === 'new' && <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-400 text-xs">New</span>}
           {inquiry.status === 'read' && <span className="px-2 py-1 rounded bg-zinc-500/10 text-zinc-400 text-xs">Read</span>}
           {inquiry.status === 'replied' && <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs">Replied</span>}
        </td>
        <td className="px-6 py-4 text-right">
             <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                {inquiry.phone && (
                <a href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}?text=${message}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  onClick={() => onStatusChange(inquiry.id, 'replied')}>
                  <MessageSquare className="w-4 h-4" />
                </a>
                )}
                 {inquiry.email && (
                <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}&body=${message}`}
                  className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors"
                  onClick={() => onStatusChange(inquiry.id, 'replied')}>
                  <Mail className="w-4 h-4" />
                </a>
                 )}
             </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-zinc-900/30">
          <td colSpan={5} className="px-6 py-4">
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
               <h4 className="text-sm font-semibold text-zinc-400 mb-2">Message:</h4>
               <p className="text-zinc-200 whitespace-pre-wrap">{inquiry.message}</p>
               {inquiry.status === 'new' && (
                   <button onClick={() => onStatusChange(inquiry.id, 'read')} className="mt-4 text-xs text-sky-400 hover:underline">
                      Mark as Read
                   </button>
               )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ProductsTab({ products, onEdit, onDelete }: { 
  products: Product[]; 
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category} className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden">
          <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
                <Package className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white capitalize">{category}</h3>
                <p className="text-xs text-zinc-500">{products.filter(p => p.category === category).length} items</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {products.filter(p => p.category === category).map(product => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-zinc-800/30 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700">
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} width={64} height={64} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-sm text-zinc-500">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className={`text-xs ${product.in_stock ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(product.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {categories.length === 0 && (
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-12 text-center">
          <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No products added yet</p>
        </div>
      )}
    </div>
  );
}

function ServicesTab({ services, onEdit, onDelete }: { 
  services: Service[]; 
  onEdit: (s: Service) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, i) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 hover:border-violet-500/30 transition-colors group relative"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(service)} className="p-2 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(service.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-4">
            <Wrench className="w-6 h-6 text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
          <p className="text-sm text-zinc-500 mb-3">{service.description}</p>
          <p className="text-violet-400 font-medium">₹{service.price_min.toLocaleString('en-IN')} - ₹{service.price_max.toLocaleString('en-IN')}</p>
          {!service.is_active && (
            <span className="mt-2 inline-block px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-lg">Inactive</span>
          )}
        </motion.div>
      ))}
      
      {services.length === 0 && (
        <div className="col-span-full bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-12 text-center">
          <Wrench className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No services added yet</p>
        </div>
      )}
    </div>
  );
}

function SettingsTab({ settings, onUpdate, onRefresh }: { settings: Setting[]; onUpdate: (key: string, value: string) => Promise<void>; onRefresh: () => void }) {
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);


  const handleSave = async (key: string) => {
    setSaving(key);
    await onUpdate(key, editValues[key]);
    setEditValues(prev => { const n = { ...prev }; delete n[key]; return n; });
    setSaving(null);
  };

  const settingsGroups = [
    { title: 'Quotation Settings', icon: Percent, keys: ['gst_percentage', 'service_charge_percentage'] },
    { title: 'Company Information', icon: Building2, keys: ['company_name', 'company_phone', 'company_email'] },
    { title: 'Location & Branding', icon: MapPin, keys: ['company_address', 'tagline', 'legacy_text'] },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <DatabaseSeeder onSeedComplete={onRefresh} />
      {settingsGroups.map((group, groupIdx) => (
        <motion.div 
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIdx * 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden"
        >
          <div className="p-4 border-b border-zinc-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
              <group.icon className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">{group.title}</h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {group.keys.map(key => {
              const setting = settings.find(s => s.key === key);
              if (!setting) return null;
              const isEditing = editValues[key] !== undefined;
              const value = isEditing ? editValues[key] : setting.value;
              
              return (
                <div key={key} className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-white capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-zinc-500">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={value}
                      onChange={e => setEditValues(prev => ({ ...prev, [key]: e.target.value }))}
                      className="px-4 py-2.5 w-56 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50"
                    />
                    {isEditing && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => handleSave(key)}
                        disabled={saving === key}
                        className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                      >
                        {saving === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </motion.button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProductModal({ isOpen, onClose, product, brands, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  brands: Brand[];
  onSave: (p: Partial<Product>) => void;
}) {
  const [form, setForm] = useState({
    name: '', category: 'cpu' as Product['category'], brand: '', price: 0,
    image_url: '', in_stock: true, compatibility_tags: [] as string[], required_tags: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url');
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableTags = [
    { group: 'Socket', tags: ['socket-lga1700', 'socket-lga1200', 'socket-am5', 'socket-am4', 'socket-tr4'] },
    { group: 'RAM Type', tags: ['ram-ddr5', 'ram-ddr4', 'ram-ddr3'] },
    { group: 'Form Factor', tags: ['form-atx', 'form-matx', 'form-itx', 'form-eatx'] },
    { group: 'Storage', tags: ['storage-nvme', 'storage-sata', 'storage-m2'] },
    { group: 'Power', tags: ['psu-modular', 'psu-semi', 'psu-non-modular', 'psu-atx3'] },
    { group: 'GPU', tags: ['gpu-nvidia', 'gpu-amd', 'gpu-intel'] },
    { group: 'Cooling', tags: ['cooling-air', 'cooling-aio', 'cooling-custom'] },
  ];

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        brand: product.brand || '',
        price: product.price,
        image_url: product.image_url || '',
        in_stock: product.in_stock,
        compatibility_tags: product.compatibility_tags || [],
        required_tags: product.required_tags || [],
      });
    } else {
      setForm({ name: '', category: 'cpu', brand: '', price: 0, image_url: '', in_stock: true, compatibility_tags: [], required_tags: [] });
    }
  }, [product, isOpen]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      name: form.name,
      category: form.category,
      brand: form.brand || null,
      price: form.price,
      image_url: form.image_url || null,
      in_stock: form.in_stock,
      compatibility_tags: form.compatibility_tags,
      required_tags: form.required_tags,
    });
    setSaving(false);
  };

  const toggleTag = (tag: string) => {
    setForm(f => ({
      ...f,
      compatibility_tags: f.compatibility_tags.includes(tag)
        ? f.compatibility_tags.filter(t => t !== tag)
        : [...f.compatibility_tags, tag]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full max-w-lg max-h-[90vh] overflow-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
          </div>
          
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Product['category'] }))}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50">
                  {['cpu', 'motherboard', 'ram', 'storage', 'gpu', 'case', 'psu', 'cooling'].map(c => (
                    <option key={c} value={c}>{c.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Brand</label>
                <select value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50">
                  <option value="">Select Brand</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Price (₹)</label>
              <input type="number" required value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                     className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">In Stock</label>
              <select value={form.in_stock ? 'yes' : 'no'} onChange={e => setForm(f => ({ ...f, in_stock: e.target.value === 'yes' }))}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Product Image</label>
            {/* File upload removed as Supabase Storage is deprecated. Use URL. */}
            <input type="url" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50" />
            
            {form.image_url && (
              <div className="mt-2 p-2 bg-zinc-800/50 rounded-xl flex items-center gap-3">
                <Image src={form.image_url} alt="Preview" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" unoptimized />
                <span className="text-xs text-zinc-400 truncate flex-1">{form.image_url}</span>
                <button type="button" onClick={() => setForm(f => ({ ...f, image_url: '' }))} className="p-1 hover:bg-red-500/20 rounded-lg text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Compatibility Tags</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-left text-white focus:outline-none focus:border-violet-500/50 flex items-center justify-between"
                >
                  <span className={form.compatibility_tags.length === 0 ? 'text-zinc-600' : ''}>
                    {form.compatibility_tags.length === 0 ? 'Select tags...' : `${form.compatibility_tags.length} tags selected`}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${tagDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {tagDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setTagDropdownOpen(false)} />
                    <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                      {availableTags.map(group => (
                        <div key={group.group} className="border-b border-zinc-800 last:border-b-0">
                          <p className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase bg-zinc-800/50">{group.group}</p>
                          <div className="p-2 flex flex-wrap gap-1">
                            {group.tags.map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                  form.compatibility_tags.includes(tag)
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {form.compatibility_tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {form.compatibility_tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-400 text-xs rounded-lg">
                      {tag}
                      <button type="button" onClick={() => toggleTag(tag)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

          <motion.button type="submit" disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> Save Product</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function ServiceModal({ isOpen, onClose, service, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSave: (s: Partial<Service>) => void;
}) {
  const [form, setForm] = useState({
    name: '', description: '', price_min: 0, price_max: 0, is_active: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description || '',
        price_min: service.price_min,
        price_max: service.price_max,
        is_active: service.is_active,
      });
    } else {
      setForm({ name: '', description: '', price_min: 0, price_max: 0, is_active: true });
    }
  }, [service, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{service ? 'Edit Service' : 'Add Service'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Service Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50 resize-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Min Price (₹)</label>
              <input type="number" required value={form.price_min} onChange={e => setForm(f => ({ ...f, price_min: Number(e.target.value) }))}
                     className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Max Price (₹)</label>
              <input type="number" required value={form.price_max} onChange={e => setForm(f => ({ ...f, price_max: Number(e.target.value) }))}
                     className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
            <select value={form.is_active ? 'active' : 'inactive'} onChange={e => setForm(f => ({ ...f, is_active: e.target.value === 'active' }))}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <motion.button type="submit" disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> Save Service</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function BrandsTab({ brands, onEdit, onDelete }: { 
  brands: Brand[]; 
  onEdit: (b: Brand) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {brands.map((brand, i) => (
        <motion.div
          key={brand.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 hover:border-violet-500/30 transition-colors group relative"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(brand)} className="p-2 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(brand.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            {brand.logo_url ? (
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  fill
                  className="object-contain brightness-0 invert opacity-70"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-violet-400">{brand.name[0]}</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-white mb-1">{brand.name}</h3>
            <p className="text-xs text-zinc-500">Order: {brand.display_order}</p>
            {!brand.is_active && (
              <span className="mt-2 inline-block px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-lg">Inactive</span>
            )}
          </div>
        </motion.div>
      ))}
      
      {brands.length === 0 && (
        <div className="col-span-full bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-12 text-center">
          <Tag className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No brands added yet</p>
        </div>
      )}
    </div>
  );
}

function BrandModal({ isOpen, onClose, brand, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | null;
  onSave: (b: Partial<Brand>) => void;
}) {
  const [form, setForm] = useState({
    name: '', logo_url: '', display_order: 0, is_active: true,
  });
  const [saving, setSaving] = useState(false);
  const [logoInputType, setLogoInputType] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const brandFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (brand) {
      setForm({
        name: brand.name,
        logo_url: brand.logo_url || '',
        display_order: brand.display_order,
        is_active: brand.is_active,
      });
    } else {
      setForm({ name: '', logo_url: '', display_order: 0, is_active: true });
    }
  }, [brand, isOpen]);

  const handleBrandFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, logo_url: reader.result as string }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      name: form.name,
      logo_url: form.logo_url || null,
      display_order: form.display_order,
      is_active: form.is_active,
    });
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-lg font-bold text-white">{brand ? 'Edit Brand' : 'Add Brand'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Brand Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Brand Logo</label>
            <div className="flex gap-2 mb-3">
              <button type="button" onClick={() => setLogoInputType('url')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${logoInputType === 'url' ? 'bg-violet-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
                <Link className="w-4 h-4" />URL
              </button>
              <button type="button" onClick={() => setLogoInputType('upload')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${logoInputType === 'upload' ? 'bg-violet-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
                <Upload className="w-4 h-4" />Upload
              </button>
            </div>

            {logoInputType === 'url' ? (
              <input type="url" value={form.logo_url.startsWith('data:') ? '' : form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))}
                     placeholder="https://example.com/logo.svg"
                     className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50" />
            ) : (
              <div>
                <input ref={brandFileInputRef} type="file" accept="image/*" onChange={handleBrandFileUpload} className="hidden" />
                <button type="button" onClick={() => brandFileInputRef.current?.click()} disabled={uploading}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 border-dashed rounded-xl text-zinc-400 hover:text-white hover:border-violet-500/50 transition-colors flex items-center justify-center gap-2">
                  {uploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Upload className="w-5 h-5" /> Choose Image from PC</>}
                </button>
              </div>
            )}

            {form.logo_url && (
              <div className="mt-3 p-3 bg-zinc-800/50 rounded-xl flex items-center gap-3">
                <div className="relative w-14 h-14 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={form.logo_url} alt="Preview" fill className="object-contain brightness-0 invert" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-400 truncate">{form.logo_url.startsWith('data:') ? 'Uploaded from PC' : form.logo_url}</p>
                </div>
                <button type="button" onClick={() => setForm(f => ({ ...f, logo_url: '' }))} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
              <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))}
                     className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
              <select value={form.is_active ? 'active' : 'inactive'} onChange={e => setForm(f => ({ ...f, is_active: e.target.value === 'active' }))}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <motion.button type="submit" disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> Save Brand</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, DollarSign, Clock,
  Phone, Mail, MessageSquare, ChevronRight, 
  Search, Filter, MoreVertical, Check, Archive, X, Loader2
} from 'lucide-react';
import { Lead, LeadStatus, Product, Service, Setting, Brand } from '@/types';
import { 
  getLeads, getProducts, getServices, getBrands, getSettings, 
  updateLeadStatus, updateSetting,
  deleteProduct, addProduct, updateProduct,
  deleteService, addService, updateService,
  deleteBrand, addBrand, updateBrand
} from '@/lib/db-service';

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: 'text-sky-400', bg: 'bg-sky-500/20' },
  contacted: { label: 'Contacted', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  follow_up: { label: 'Follow Up', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  converted: { label: 'Converted', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  archived: { label: 'Archived', color: 'text-zinc-400', bg: 'bg-zinc-500/20' },
};

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onViewDetails: (lead: Lead) => void;
}

function LeadCard({ lead, onStatusChange, onViewDetails }: LeadCardProps) {
  const [showActions, setShowActions] = useState(false);
  const items = lead.items as Product[];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-800">{lead.customer_name}</h4>
          <p className="text-xs text-slate-500">
            {new Date(lead.created_at).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showActions && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
              <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusChange(lead.id, status as LeadStatus);
                      setShowActions(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${
                      lead.status === status ? 'bg-slate-50' : ''
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${config.bg}`} />
                    {config.label}
                    {lead.status === status && <Check className="w-3 h-3 ml-auto text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 text-sm">
        <a href={`tel:${lead.whatsapp}`} className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
          <Phone className="w-3.5 h-3.5" />
          <span className="truncate max-w-[100px]">{lead.whatsapp}</span>
        </a>
        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-slate-600 hover:text-blue-600">
          <Mail className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mb-3">
        <p className="text-xs text-slate-500 mb-1">{items.length} items</p>
        <p className="text-lg font-bold text-slate-800">₹{lead.total_amount.toLocaleString('en-IN')}</p>
      </div>

      <button
        onClick={() => onViewDetails(lead)}
        className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1"
      >
        View Details
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  onClose: () => void;
}

function LeadDetailsModal({ lead, onClose }: LeadDetailsModalProps) {
  if (!lead) return null;
  
  const items = lead.items as Product[];
  const whatsappNumber = lead.whatsapp.replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent(
    `Hi ${lead.customer_name}, this is regarding your PC Build quote of ₹${lead.total_amount.toLocaleString('en-IN')} from Konark Computers.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{lead.customer_name}</h3>
            <p className="text-sm text-slate-500">Lead Details</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">WhatsApp</p>
              <p className="font-medium text-slate-800">{lead.whatsapp}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="font-medium text-slate-800 truncate">{lead.email}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Status</p>
              <span className={`inline-flex px-2 py-1 rounded-lg text-sm font-medium ${statusConfig[lead.status].bg} ${statusConfig[lead.status].color}`}>
                {statusConfig[lead.status].label}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Created</p>
              <p className="font-medium text-slate-800">
                {new Date(lead.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-slate-800 mb-3">Build Items</h4>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-500 capitalize">{item.category}</p>
                    <p className="font-medium text-slate-800">{item.name}</p>
                  </div>
                  <p className="font-semibold text-slate-800">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Total Amount</span>
              <span className="text-xl font-bold text-blue-600">₹{lead.total_amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Open WhatsApp
            </a>
            <a
              href={`tel:${lead.whatsapp}`}
              className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  }

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    const success = await updateLeadStatus(id, status);
    
    if (success) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.whatsapp.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    converted: leads.filter(l => l.status === 'converted').length,
    revenue: leads.filter(l => l.status === 'converted').reduce((sum, l) => sum + l.total_amount, 0),
  };

  const groupedLeads = {
    new: filteredLeads.filter(l => l.status === 'new'),
    contacted: filteredLeads.filter(l => l.status === 'contacted'),
    follow_up: filteredLeads.filter(l => l.status === 'follow_up'),
    converted: filteredLeads.filter(l => l.status === 'converted'),
    archived: filteredLeads.filter(l => l.status === 'archived'),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Lead Pipeline</h1>
            <p className="text-sm text-slate-500">Konark Cloud CRM</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as LeadStatus | 'all')}
                className="pl-10 pr-8 py-2 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-xs text-slate-500">Total Leads</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.new}</p>
                <p className="text-xs text-slate-500">New Inquiries</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.converted}</p>
                <p className="text-xs text-slate-500">Converted</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">₹{(stats.revenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-slate-500">Revenue</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {(['new', 'contacted', 'follow_up', 'converted', 'archived'] as LeadStatus[]).map(status => (
              <div key={status} className="w-80 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${statusConfig[status].bg}`} />
                    <h3 className="font-semibold text-slate-700">{statusConfig[status].label}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs text-slate-600">
                    {groupedLeads[status].length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {groupedLeads[status].map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onStatusChange={handleStatusChange}
                      onViewDetails={setSelectedLead}
                    />
                  ))}
                  
                  {groupedLeads[status].length === 0 && (
                    <div className="py-8 text-center bg-slate-100/50 rounded-xl border-2 border-dashed border-slate-200">
                      <Archive className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm text-slate-400">No leads</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}

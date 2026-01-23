import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createServerSupabase = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey);
};

export type ProductCategory = 'cpu' | 'motherboard' | 'ram' | 'storage' | 'gpu' | 'case' | 'psu' | 'cooling';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string | null;
  price: number;
  image_url: string | null;
  description: string | null;
  specifications: Record<string, unknown>;
  compatibility_tags: string[];
  required_tags: string[];
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'follow_up' | 'converted' | 'archived';

export interface Lead {
  id: string;
  customer_name: string;
  whatsapp: string;
  email: string;
  items: Product[];
  total_amount: number;
  subtotal: number;
  gst_amount: number;
  service_charge: number;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export type AdminRole = 'admin' | 'developer' | 'super_admin';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BuildSelection {
  cpu: Product | null;
  motherboard: Product | null;
  ram: Product | null;
  storage: Product | null;
  gpu: Product | null;
  case: Product | null;
  psu: Product | null;
  cooling: Product | null;
}

export const BUILD_STEPS: { category: ProductCategory; label: string; icon: string }[] = [
  { category: 'cpu', label: 'Processor', icon: 'cpu' },
  { category: 'motherboard', label: 'Motherboard', icon: 'circuit-board' },
  { category: 'ram', label: 'Memory', icon: 'memory-stick' },
  { category: 'storage', label: 'Storage', icon: 'hard-drive' },
  { category: 'gpu', label: 'Graphics Card', icon: 'monitor' },
  { category: 'case', label: 'Case', icon: 'box' },
  { category: 'psu', label: 'Power Supply', icon: 'zap' },
  { category: 'cooling', label: 'Cooling', icon: 'fan' },
];

export interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export async function getSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from('settings').select('key, value');
  const settings: Record<string, string> = {};
  data?.forEach(s => { settings[s.key] = s.value; });
  return settings;
}

export async function getBrands(): Promise<Brand[]> {
  const { data } = await supabase.from('brands').select('*').eq('is_active', true).order('display_order');
  return data || [];
}

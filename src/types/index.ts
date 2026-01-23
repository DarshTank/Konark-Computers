export type ProductCategory = 'cpu' | 'motherboard' | 'ram' | 'storage' | 'gpu' | 'case' | 'psu' | 'cooling' | 'laptop' | 'monitor' | 'printer' | 'networking' | 'accessory' | 'peripheral' | 'software';

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

export interface Service {
  id: string;
  name: string;
  description: string;
  price_min: number;
  price_max: number;
  is_active: boolean;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

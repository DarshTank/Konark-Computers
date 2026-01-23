"use client";

import React, { useState } from 'react';
import { Database, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { addBrand, addProduct, addService, addLead, updateSetting } from '@/lib/db-service';
import { Product, Brand, ProductCategory, Service, Lead, LeadStatus } from '@/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const DEFAULT_SETTINGS = [
  { key: 'company_name', value: 'Konark Computers' },
  { key: 'company_phone', value: '+91 98765 43210' },
  { key: 'company_email', value: 'support@konarkcomputers.com' },
  { key: 'company_address', value: 'Shop No. 12, Tech Plaza, Mumbai, India' },
  { key: 'gst_percentage', value: '18' },
  { key: 'service_charge_percentage', value: '5' },
  { key: 'tagline', value: 'Your Trusted IT Partner' },
  { key: 'legacy_text', value: 'Serving since 2010' },
];

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

const DEFAULT_PRODUCTS: Omit<Product, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: "Intel Core i5-12400",
    category: "cpu",
    brand: "Intel",
    price: 18500.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 6, "threads": 12, "base_clock": "2.5GHz", "turbo_clock": "4.4GHz"},
    compatibility_tags: ["socket-lga1700", "ram-ddr4", "ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Intel Core i7-12700K",
    category: "cpu",
    brand: "Intel",
    price: 35000.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 12, "threads": 20, "base_clock": "3.6GHz", "turbo_clock": "5.0GHz"},
    compatibility_tags: ["socket-lga1700", "ram-ddr4", "ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Intel Core i9-12900K",
    category: "cpu",
    brand: "Intel",
    price: 55000.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 16, "threads": 24, "base_clock": "3.2GHz", "turbo_clock": "5.2GHz"},
    compatibility_tags: ["socket-lga1700", "ram-ddr4", "ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "AMD Ryzen 5 5600X",
    category: "cpu",
    brand: "AMD",
    price: 16500.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 6, "threads": 12, "base_clock": "3.7GHz", "turbo_clock": "4.6GHz"},
    compatibility_tags: ["socket-am4", "ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "AMD Ryzen 7 5800X",
    category: "cpu",
    brand: "AMD",
    price: 28000.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 8, "threads": 16, "base_clock": "3.8GHz", "turbo_clock": "4.7GHz"},
    compatibility_tags: ["socket-am4", "ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "AMD Ryzen 9 5900X",
    category: "cpu",
    brand: "AMD",
    price: 42000.00,
    image_url: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=300",
    description: null,
    specifications: {"cores": 12, "threads": 24, "base_clock": "3.7GHz", "turbo_clock": "4.8GHz"},
    compatibility_tags: ["socket-am4", "ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "ASUS ROG Strix B660-A Gaming WiFi",
    category: "motherboard",
    brand: "ASUS",
    price: 18500.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "B660", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-lga1700", "ram-ddr4", "form-atx", "pcie-5"],
    required_tags: ["case-atx"],
    in_stock: true
  },
  {
    name: "MSI MAG B660M Mortar WiFi DDR4",
    category: "motherboard",
    brand: "MSI",
    price: 16000.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "B660", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-lga1700", "ram-ddr4", "form-matx", "pcie-4"],
    required_tags: ["case-matx", "case-atx"],
    in_stock: true
  },
  {
    name: "Gigabyte Z690 AORUS Elite AX DDR5",
    category: "motherboard",
    brand: "Gigabyte",
    price: 28000.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "Z690", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-lga1700", "ram-ddr5", "form-atx", "pcie-5"],
    required_tags: ["case-atx"],
    in_stock: true
  },
  {
    name: "ASUS ROG Strix B550-F Gaming WiFi",
    category: "motherboard",
    brand: "ASUS",
    price: 17500.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "B550", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-am4", "ram-ddr4", "form-atx", "pcie-4"],
    required_tags: ["case-atx"],
    in_stock: true
  },
  {
    name: "MSI MAG B550 TOMAHAWK",
    category: "motherboard",
    brand: "MSI",
    price: 15000.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "B550", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-am4", "ram-ddr4", "form-atx", "pcie-4"],
    required_tags: ["case-atx"],
    in_stock: true
  },
  {
    name: "Gigabyte X570 AORUS Elite WiFi",
    category: "motherboard",
    brand: "Gigabyte",
    price: 22000.00,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    description: null,
    specifications: {"chipset": "X570", "max_ram": "128GB", "ram_slots": 4},
    compatibility_tags: ["socket-am4", "ram-ddr4", "form-atx", "pcie-4"],
    required_tags: ["case-atx"],
    in_stock: true
  },
  {
    name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200",
    category: "ram",
    brand: "Corsair",
    price: 4500.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR4", "speed": "3200MHz", "capacity": "16GB"},
    compatibility_tags: ["ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "G.Skill Trident Z RGB 32GB (2x16GB) DDR4-3600",
    category: "ram",
    brand: "G.Skill",
    price: 9500.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR4", "speed": "3600MHz", "capacity": "32GB"},
    compatibility_tags: ["ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Kingston Fury Beast 16GB (2x8GB) DDR4-3200",
    category: "ram",
    brand: "Kingston",
    price: 4200.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR4", "speed": "3200MHz", "capacity": "16GB"},
    compatibility_tags: ["ram-ddr4"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Corsair Vengeance DDR5-5600 32GB (2x16GB)",
    category: "ram",
    brand: "Corsair",
    price: 12500.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR5", "speed": "5600MHz", "capacity": "32GB"},
    compatibility_tags: ["ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000",
    category: "ram",
    brand: "G.Skill",
    price: 15000.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR5", "speed": "6000MHz", "capacity": "32GB"},
    compatibility_tags: ["ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Kingston Fury Beast 16GB (2x8GB) DDR5-5200",
    category: "ram",
    brand: "Kingston",
    price: 8500.00,
    image_url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300",
    description: null,
    specifications: {"type": "DDR5", "speed": "5200MHz", "capacity": "16GB"},
    compatibility_tags: ["ram-ddr5"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Samsung 970 EVO Plus 1TB NVMe",
    category: "storage",
    brand: "Samsung",
    price: 8500.00,
    image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300",
    description: null,
    specifications: {"type": "NVMe", "capacity": "1TB", "read_speed": "3500MB/s"},
    compatibility_tags: ["storage-nvme", "storage-m2"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "WD Black SN850X 1TB NVMe",
    category: "storage",
    brand: "Western Digital",
    price: 9500.00,
    image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300",
    description: null,
    specifications: {"type": "NVMe", "capacity": "1TB", "read_speed": "7300MB/s"},
    compatibility_tags: ["storage-nvme", "storage-m2"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Seagate Barracuda 2TB HDD",
    category: "storage",
    brand: "Seagate",
    price: 4500.00,
    image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300",
    description: null,
    specifications: {"rpm": "7200", "type": "HDD", "capacity": "2TB"},
    compatibility_tags: ["storage-sata", "storage-hdd"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Crucial MX500 1TB SATA SSD",
    category: "storage",
    brand: "Crucial",
    price: 6500.00,
    image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300",
    description: null,
    specifications: {"type": "SATA SSD", "capacity": "1TB", "read_speed": "560MB/s"},
    compatibility_tags: ["storage-sata", "storage-ssd"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "NVIDIA GeForce RTX 4060",
    category: "gpu",
    brand: "NVIDIA",
    price: 32000.00,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    description: null,
    specifications: {"tdp": "115W", "vram": "8GB", "memory_type": "GDDR6"},
    compatibility_tags: ["gpu-nvidia", "pcie-4", "power-450w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "NVIDIA GeForce RTX 4070",
    category: "gpu",
    brand: "NVIDIA",
    price: 52000.00,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    description: null,
    specifications: {"tdp": "200W", "vram": "12GB", "memory_type": "GDDR6X"},
    compatibility_tags: ["gpu-nvidia", "pcie-4", "power-650w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "NVIDIA GeForce RTX 4080",
    category: "gpu",
    brand: "NVIDIA",
    price: 98000.00,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    description: null,
    specifications: {"tdp": "320W", "vram": "16GB", "memory_type": "GDDR6X"},
    compatibility_tags: ["gpu-nvidia", "pcie-4", "power-750w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "AMD Radeon RX 7600",
    category: "gpu",
    brand: "AMD",
    price: 28000.00,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    description: null,
    specifications: {"tdp": "165W", "vram": "8GB", "memory_type": "GDDR6"},
    compatibility_tags: ["gpu-amd", "pcie-4", "power-450w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "AMD Radeon RX 7800 XT",
    category: "gpu",
    brand: "AMD",
    price: 48000.00,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    description: null,
    specifications: {"tdp": "263W", "vram": "16GB", "memory_type": "GDDR6"},
    compatibility_tags: ["gpu-amd", "pcie-4", "power-650w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "NZXT H510 Flow",
    category: "case",
    brand: "NZXT",
    price: 7500.00,
    image_url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300",
    description: null,
    specifications: {"form_factor": "Mid-Tower", "fans_included": 2, "max_gpu_length": "381mm"},
    compatibility_tags: ["case-atx", "case-matx", "case-itx"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Corsair 4000D Airflow",
    category: "case",
    brand: "Corsair",
    price: 9500.00,
    image_url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300",
    description: null,
    specifications: {"form_factor": "Mid-Tower", "fans_included": 2, "max_gpu_length": "360mm"},
    compatibility_tags: ["case-atx", "case-matx", "case-itx"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Lian Li Lancool II Mesh",
    category: "case",
    brand: "Lian Li",
    price: 8500.00,
    image_url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300",
    description: null,
    specifications: {"form_factor": "Mid-Tower", "fans_included": 3, "max_gpu_length": "384mm"},
    compatibility_tags: ["case-atx", "case-matx", "case-itx"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Cooler Master NR200P",
    category: "case",
    brand: "Cooler Master",
    price: 8000.00,
    image_url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300",
    description: null,
    specifications: {"form_factor": "Mini-ITX", "fans_included": 2, "max_gpu_length": "330mm"},
    compatibility_tags: ["case-itx"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Corsair RM750 80+ Gold",
    category: "psu",
    brand: "Corsair",
    price: 8500.00,
    image_url: "https://images.unsplash.com/photo-1600348759986-381f99739f55?w=300",
    description: null,
    specifications: {"modular": true, "wattage": "750W", "efficiency": "80+ Gold"},
    compatibility_tags: ["power-750w", "psu-modular"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "EVGA SuperNOVA 650 G6",
    category: "psu",
    brand: "EVGA",
    price: 7500.00,
    image_url: "https://images.unsplash.com/photo-1600348759986-381f99739f55?w=300",
    description: null,
    specifications: {"modular": true, "wattage": "650W", "efficiency": "80+ Gold"},
    compatibility_tags: ["power-650w", "psu-modular"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Seasonic Focus GX-850",
    category: "psu",
    brand: "Seasonic",
    price: 10500.00,
    image_url: "https://images.unsplash.com/photo-1600348759986-381f99739f55?w=300",
    description: null,
    specifications: {"modular": true, "wattage": "850W", "efficiency": "80+ Gold"},
    compatibility_tags: ["power-850w", "psu-modular"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Cooler Master MWE 550 V2",
    category: "psu",
    brand: "Cooler Master",
    price: 4500.00,
    image_url: "https://images.unsplash.com/photo-1600348759986-381f99739f55?w=300",
    description: null,
    specifications: {"modular": false, "wattage": "550W", "efficiency": "80+ Bronze"},
    compatibility_tags: ["power-550w", "power-450w"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Noctua NH-D15",
    category: "cooling",
    brand: "Noctua",
    price: 8500.00,
    image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300",
    description: null,
    specifications: {"tdp": "250W", "type": "Air Cooler", "noise": "24.6 dB(A)"},
    compatibility_tags: ["socket-lga1700", "socket-am4", "cooling-air"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "Corsair iCUE H100i Elite",
    category: "cooling",
    brand: "Corsair",
    price: 12500.00,
    image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300",
    description: null,
    specifications: {"tdp": "300W+", "type": "AIO 240mm", "noise": "37 dB(A)"},
    compatibility_tags: ["socket-lga1700", "socket-am4", "cooling-aio", "cooling-240mm"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "be quiet! Dark Rock Pro 4",
    category: "cooling",
    brand: "be quiet!",
    price: 7500.00,
    image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300",
    description: null,
    specifications: {"tdp": "250W", "type": "Air Cooler", "noise": "24.3 dB(A)"},
    compatibility_tags: ["socket-lga1700", "socket-am4", "cooling-air"],
    required_tags: [],
    in_stock: true
  },
  {
    name: "NZXT Kraken X63",
    category: "cooling",
    brand: "NZXT",
    price: 14500.00,
    image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300",
    description: null,
    specifications: {"tdp": "350W+", "type": "AIO 280mm", "noise": "33 dB(A)"},
    compatibility_tags: ["socket-lga1700", "socket-am4", "cooling-aio", "cooling-280mm"],
    required_tags: [],
    in_stock: true
  }
];

const DEFAULT_SERVICES: Omit<Service, 'id'>[] = [
  {
    name: "Hardware Repair",
    description: "Laptop and desktop repairs",
    price_min: 500,
    price_max: 5000,
    is_active: true
  },
  {
    name: "Software Installation",
    description: "OS and software setup",
    price_min: 300,
    price_max: 1500,
    is_active: true
  },
  {
    name: "Data Recovery",
    description: "Recover lost data",
    price_min: 1000,
    price_max: 10000,
    is_active: true
  },
  {
    name: "Virus Removal",
    description: "Clean infected systems",
    price_min: 500,
    price_max: 2000,
    is_active: true
  },
  {
    name: "Network Setup",
    description: "LAN and WiFi configuration",
    price_min: 1000,
    price_max: 5000,
    is_active: true
  },
  {
    name: "Annual Maintenance",
    description: "Yearly service contract",
    price_min: 5000,
    price_max: 15000,
    is_active: true
  }
];

const DEFAULT_LEADS: Omit<Lead, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    customer_name: 'Rahul Sharma',
    whatsapp: '+919876543210',
    email: 'rahul.s@example.com',
    status: 'new',
    items: [],
    total_amount: 45000,
    subtotal: 45000,
    gst_amount: 0,
    service_charge: 0,
    notes: 'Interested in HP Laptop for college.',
  },
  {
    customer_name: 'Priya Patel',
    whatsapp: '+919876500000',
    email: 'priya.p@example.com',
    status: 'contacted',
    items: [],
    total_amount: 14200,
    subtotal: 14200,
    gst_amount: 0,
    service_charge: 0,
    notes: 'Inquired about Epson printer availability.',
  },
  {
    customer_name: 'Amit Verma',
    whatsapp: '+919988776655',
    email: 'amit.v@brand.com',
    status: 'converted',
    items: [],
    total_amount: 65000,
    subtotal: 65000,
    gst_amount: 0,
    service_charge: 0,
    notes: 'Purchased Gaming PC components.',
  },
  {
    customer_name: 'Suresh Raina',
    whatsapp: '+918877665544',
    email: 'suresh@cricket.com',
    status: 'follow_up',
    items: [],
    total_amount: 1200,
    subtotal: 1200,
    gst_amount: 0,
    service_charge: 0,
    notes: 'Needs QuickHeal antivirus renewal next week.',
  }
];

export default function DatabaseSeeder({ onSeedComplete }: { onSeedComplete?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSeed = async () => {
    if (!confirm('This will add default content to ALL tabs (Brands, Products, Services, Leads, Settings). Continue?')) return;
    
    setLoading(true);
    setStatus('idle');
    try {
      let brandsAdded = 0;
      let productsAdded = 0;
      let servicesAdded = 0;
      let leadsAdded = 0;
      let settingsAdded = 0;

      // Add Brands
      for (const brand of DEFAULT_BRANDS) {
        await addBrand({ ...brand, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        brandsAdded++;
      }
      
      // Add Products
      for (const product of DEFAULT_PRODUCTS) {
        await addProduct({ ...product, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        productsAdded++;
      }

      // Add Services
      for (const service of DEFAULT_SERVICES) {
        await addService(service);
        servicesAdded++;
      }

      // Add Leads
      for (const lead of DEFAULT_LEADS) {
        await addLead({ ...lead, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        leadsAdded++;
      }

      // Add Settings
      for (const setting of DEFAULT_SETTINGS) {
        await updateSetting(setting.key, setting.value);
        settingsAdded++;
      }
      
      toast.success(`Seeding Complete! Populated all tabs.`);
      setStatus('success');
      onSeedComplete?.();
    } catch (error) {
      console.error('Seeding failed:', error);
      toast.error('Seeding failed. Check console for details.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-400" />
            Database Seeder
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Populate your database with default brands and products. 
            Useful for initial setup.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status === 'success' && <div className="text-emerald-400 flex items-center gap-1 text-sm"><CheckCircle className="w-4 h-4" /> Done</div>}
          {status === 'error' && <div className="text-red-400 flex items-center gap-1 text-sm"><AlertCircle className="w-4 h-4" /> Error</div>}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={handleSeed}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Seeding...
              </>
            ) : (
              'Seed Default Data'
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

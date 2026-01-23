"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Youtube, ChevronUp } from 'lucide-react';

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4/kon-1768588017897.webp?width=8000&height=8000&resize=contain";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPortfolio = () => {
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://portfolio.darshtank.me/" } }, "*");
  };

  const footerLinks = {
    services: [
      { name: 'Laptop Repair', href: '/service' },
      { name: 'Desktop Repair', href: '/service' },
      { name: 'Data Recovery', href: '/service' },
      { name: 'Networking', href: '/service' },
      { name: 'AMC Services', href: '/service' },
    ],
    quickLinks: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Services', href: '/service' },
      { name: 'Products', href: '/product' },
      { name: 'PC Builder', href: '/build' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/Konark.Computers/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-5">
              <Image
                src={LOGO_URL}
                alt="Konark Computers"
                width={140}
                height={45}
                className="h-10 w-auto object-contain"
                style={{ filter: 'brightness(1.1)' }}
                unoptimized
              />
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
              Your trusted technology partner since 1999. Expert computer repair, networking, and IT consulting across Gujarat.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-sky-400 hover:border-zinc-700 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/MSME-e1452579997430-20.png" 
                alt="MSME Ministry" 
                width={100} 
                height={35} 
                className="bg-white/90 p-1.5 rounded"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <div className="space-y-4">
              <a
                href="https://www.google.com/maps?cid=1162576568112931297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-zinc-500 hover:text-white transition-colors group"
              >
                <MapPin size={16} className="text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot - 360002</span>
              </a>

              <a
                href="tel:+919426429416"
                className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-sky-400 flex-shrink-0" />
                <span className="text-sm">+91 942 642 9416</span>
              </a>

              <a
                href="mailto:omesh_tank@yahoo.com"
                className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-sky-400 flex-shrink-0" />
                <span className="text-sm">omesh_tank@yahoo.com</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-500">
                <Clock size={16} className="text-sky-400 flex-shrink-0" />
                <span className="text-sm">Mon - Sat: 9AM - 9PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Konark Computers. All Rights Reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <p className="text-zinc-600 text-sm">
                Developed by{' '}
                <button
                  onClick={openPortfolio}
                  className="text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  Darsh Tank
                </button>
              </p>
              
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-lg bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"
                aria-label="Back to top"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

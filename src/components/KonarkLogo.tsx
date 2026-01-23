"use client";

import React from 'react';

interface KonarkLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function KonarkLogo({ size = 'md', showText = true, className = '' }: KonarkLogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-2xl' },
    xl: { icon: 72, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: icon, height: icon }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="konarkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="konarkGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle with gradient */}
          <circle cx="50" cy="50" r="48" fill="url(#konarkGradient1)" opacity="0.15" />
          <circle cx="50" cy="50" r="45" stroke="url(#konarkGradient1)" strokeWidth="2" fill="none" opacity="0.5" />
          
          {/* Central hexagon representing tech/computing */}
          <path 
            d="M50 15 L75 32.5 L75 67.5 L50 85 L25 67.5 L25 32.5 Z" 
            fill="none" 
            stroke="url(#konarkGradient1)" 
            strokeWidth="3"
            filter="url(#glow)"
          />
          
          {/* Inner circuit pattern */}
          <path 
            d="M50 28 L65 38 L65 62 L50 72 L35 62 L35 38 Z" 
            fill="url(#konarkGradient1)" 
            opacity="0.3"
          />
          
          {/* K letter stylized */}
          <path 
            d="M42 35 L42 65 M42 50 L58 35 M42 50 L58 65" 
            stroke="white" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          
          {/* Circuit nodes */}
          <circle cx="50" cy="15" r="4" fill="url(#konarkGradient1)" />
          <circle cx="75" cy="32.5" r="4" fill="url(#konarkGradient1)" />
          <circle cx="75" cy="67.5" r="4" fill="url(#konarkGradient1)" />
          <circle cx="50" cy="85" r="4" fill="url(#konarkGradient1)" />
          <circle cx="25" cy="67.5" r="4" fill="url(#konarkGradient1)" />
          <circle cx="25" cy="32.5" r="4" fill="url(#konarkGradient1)" />
          
          {/* Sun rays (Konark temple inspiration) */}
          <line x1="50" y1="5" x2="50" y2="10" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="25" x2="80" y2="28" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="75" x2="80" y2="72" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="95" x2="50" y2="90" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="75" x2="20" y2="72" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="25" x2="20" y2="28" stroke="url(#konarkGradient2)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        
        {/* Animated pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 animate-pulse" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white tracking-tight ${text}`}>
            Konark
          </span>
          <span className="text-xs text-zinc-500 tracking-widest uppercase -mt-0.5">
            Computers
          </span>
        </div>
      )}
    </div>
  );
}

export function KonarkLogoMini({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="miniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#miniGrad)" />
      <path 
        d="M38 30 L38 70 M38 50 L62 30 M38 50 L62 70" 
        stroke="white" 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

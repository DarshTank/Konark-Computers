"use client";

import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface Particle {
  top: string;
  left: string;
  size: string;
  moveY: number;
  duration: number;
  delay: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  delay: number;
}

const TaglineShowcase = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newParticles = [...Array(8)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2 + 'px',
      moveY: Math.random() * -100 - 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Create stars for milky way effect
    const newStars = [...Array(150)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDuration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden bg-black flex items-center justify-center min-h-[30vh]">
      {/* Milky Way Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Star field */}
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.size > 1.5 
                ? 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(200, 220, 255, 0.6))' 
                : 'rgba(255, 255, 255, 0.9)',
              boxShadow: star.size > 1.5 
                ? '0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(200, 220, 255, 0.4)' 
                : '0 0 2px rgba(255, 255, 255, 0.5)',
              animation: `twinkle ${star.twinkleDuration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Milky Way band - diagonal gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.1) 25%, rgba(167, 139, 250, 0.15) 45%, rgba(196, 181, 253, 0.2) 50%, rgba(167, 139, 250, 0.15) 55%, rgba(139, 92, 246, 0.1) 75%, transparent 100%)',
            opacity: 0.4,
          }}
        />

        {/* Nebula clouds */}
        <div 
          className="absolute"
          style={{
            top: '20%',
            right: '15%',
            width: '300px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.2), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'nebulaPulse 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute"
          style={{
            bottom: '25%',
            left: '20%',
            width: '250px',
            height: '180px',
            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15), transparent 70%)',
            filter: 'blur(50px)',
            animation: 'nebulaPulse 10s ease-in-out 1s infinite',
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute rounded-full"
          style={{
            top: '10%',
            left: '25%',
            width: '384px',
            height: '384px',
            background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))',
            filter: 'blur(120px)',
            animation: 'float1 15s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            bottom: '10%',
            right: '25%',
            width: '320px',
            height: '320px',
            background: 'linear-gradient(to top left, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
            filter: 'blur(120px)',
            animation: 'float2 18s ease-in-out 0.5s infinite'
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '256px',
            height: '256px',
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
            filter: 'blur(100px)',
            animation: 'float3 20s ease-in-out 1s infinite'
          }}
        />
        
        {/* Subtle Floating Particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(191, 219, 254, 0.1))',
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animation: `particle${i} ${particle.duration}s ease-in-out ${particle.delay}s infinite`
            }}
          />
        ))}
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Our Philosophy</span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            To Win Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 italic pr-2">Smile</span>
          </h2>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            More than just repairs, we deliver satisfaction.
          </p>
        </div>
      </div>
      
      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(40px, 25px) scale(1.15) rotate(90deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1.1) rotate(0deg); }
          50% { transform: translate(-35px, -30px) scale(1) rotate(-90deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 40px) scale(1.2); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        ${particles.map((particle, i) => `
          @keyframes particle${i} {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(${particle.moveY}px) scale(1.5); opacity: 0; }
          }
        `).join('\n')}
      `}</style>
    </section>
  );
};

export default TaglineShowcase;
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, User, Key, CheckCircle, UserPlus } from 'lucide-react';
import KonarkLogo from '@/components/KonarkLogo';

import { toast } from 'sonner';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    developerKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          developerKey: formData.developerKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Registration failed', {
          description: data.details ? JSON.stringify(data.details) : undefined 
        });
        return;
      }

      setSuccess(true);
      toast.success('Account created successfully!');
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-600/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-10 text-center max-w-md"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">Account Created!</h2>
          <p className="text-zinc-400">Redirecting to login page...</p>
          <div className="mt-6 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-fuchsia-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <KonarkLogo size="lg" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Developer Portal</h1>
          <p className="text-zinc-500">Register a new admin account</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-8 shadow-2xl"
        >

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Developer Key
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  <input
                    type="password"
                    value={formData.developerKey}
                    onChange={e => setFormData(d => ({ ...d, developerKey: e.target.value }))}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800 transition-all"
                    placeholder="Enter developer key"
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-600 mt-1.5">Contact system administrator for developer key</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800 transition-all"
                    placeholder="admin@konark.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData(d => ({ ...d, password: e.target.value }))}
                    required
                    minLength={8}
                    className="w-full pl-12 pr-12 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800 transition-all"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(d => ({ ...d, confirmPassword: e.target.value }))}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800 transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-4 mt-2 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 transition-all group-hover:from-fuchsia-500 group-hover:to-violet-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Admin Account
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?{' '}
              <Link href="/admin/login" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50"
        >
          <p className="text-xs text-zinc-500 text-center mb-2">Test Developer Key</p>
          <div className="flex items-center justify-center">
            <code className="px-4 py-2 bg-zinc-800 rounded-lg text-fuchsia-400 text-sm">KONARK_DEV_2024_SECRET</code>
          </div>
        </motion.div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} Konark Computers. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

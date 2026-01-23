"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import KonarkLogo from '@/components/KonarkLogo';

import { toast } from 'sonner';
import { signInWithGoogle, signInWithEmailOnly } from '@/lib/auth-service';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Removed error state

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const { user, error: authError } = await signInWithGoogle();

      if (authError || !user) {
        toast.error(authError || 'Login failed');
        return;
      }

      localStorage.setItem('adminUser', JSON.stringify({
        name: user.displayName || 'Admin',
        email: user.email,
        role: 'admin'
      }));

      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
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
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500">Sign in to your account</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-8 shadow-2xl"
        >
            <div className="space-y-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const password = (form.elements.namedItem('password') as HTMLInputElement).value;
                
                try {
                  const { user, error: authError } = await signInWithEmailOnly(email, password);
                  if (authError || !user) {
                    toast.error(authError || 'Login failed');
                  } else {
                    localStorage.setItem('adminUser', JSON.stringify({
                      name: user.displayName || 'Admin',
                      email: user.email,
                      role: 'admin'
                    }));
                    toast.success('Welcome back!');
                    router.push('/admin/dashboard');
                  }
                } catch (err) {
                   toast.error('Something went wrong.');
                   console.error(err);
                } finally {
                  setLoading(false);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" placeholder="admin@konark.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                  <input type="password" name="password" required className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50" placeholder="••••••••" />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                </motion.button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3 transition-all"
              >
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                </svg>
                <span className="text-slate-700 font-medium">Sign in with Google</span>
              </motion.button>
            </div>

          <div className="mt-6 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-sm text-zinc-500">
              Developer?{' '}
              <Link href="/admin/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Register new admin
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
          <p className="text-xs text-zinc-500 text-center mb-2">Test Credentials</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <code className="px-3 py-1.5 bg-zinc-800 rounded-lg text-violet-400">admin@konark.com</code>
            <code className="px-3 py-1.5 bg-zinc-800 rounded-lg text-cyan-400">admin123</code>
          </div>
        </motion.div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} Konark Computers. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

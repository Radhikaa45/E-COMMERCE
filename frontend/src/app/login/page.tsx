'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login(email, password);
      router.push(u.role === 'admin' ? '/admin' : '/');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#F4EFE8' }}
    >
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #3A2B27 0%, #5F5148 50%, #9E1D2F 100%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
          <div className="mb-8">
            <div className="flex flex-col leading-none mb-2">
              <span
                className="font-display text-5xl text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                NEEKZ
              </span>
              <span
                className="text-[11px] tracking-[0.4em] uppercase text-[#C9A66B] mt-1"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Special
              </span>
            </div>
          </div>

          <div className="h-px w-12 bg-[#C9A66B]/40 mb-8" />

          <h2
            className="font-display text-white italic leading-snug mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2.2rem',
              fontWeight: 400,
            }}
          >
            "Welcome back to
            <br />
            the Artisan Circle"
          </h2>

          <p
            className="text-white/50 text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Handcrafted gourmet essentials from the valleys of Jammu & Kashmir,
            delivered to your door.
          </p>

          {/* Floating dots */}
          <div className="absolute bottom-12 left-12 w-24 h-24 rounded-full border border-[#C9A66B]/15" />
          <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/10" />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <span
              className="font-display text-3xl text-[#3A2B27] block"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              NEEKZ <span className="text-[#9E1D2F] italic">Special</span>
            </span>
          </div>

          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#C9A66B] mb-3 font-medium"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Welcome Back
          </p>
          <h1
            className="font-display text-[#3A2B27] mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2.4rem',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Sign in to your account
          </h1>
          <p
            className="text-[#5F5148] text-sm mb-10"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#9E1D2F] hover:underline font-medium">
              Create one
            </Link>
          </p>

          {error && (
            <div
              className="px-4 py-3 rounded-xl mb-6 text-sm text-[#9E1D2F]"
              style={{
                background: 'rgba(158,29,47,0.06)',
                border: '1px solid rgba(158,29,47,0.2)',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                className="block text-[11px] tracking-[0.15em] uppercase text-[#5F5148] font-medium mb-2"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  background: '#FAF7F2',
                  border: '1px solid #E7DDD2',
                  color: '#3A2B27',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#9E1D2F')}
                onBlur={(e) => (e.target.style.borderColor = '#E7DDD2')}
              />
            </div>

            <div>
              <label
                className="block text-[11px] tracking-[0.15em] uppercase text-[#5F5148] font-medium mb-2"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    background: '#FAF7F2',
                    border: '1px solid #E7DDD2',
                    color: '#3A2B27',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#9E1D2F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E7DDD2')}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F5148] hover:text-[#9E1D2F] transition-colors"
                >
                  {showPwd ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-300 mt-2 disabled:opacity-60 group"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                background: '#9E1D2F',
                color: 'white',
              }}
            >
              {loading ? 'Signing in…' : (
                <>
                  Sign In
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E7DDD2] text-center">
            <Link
              href="/"
              className="text-[11px] tracking-wider uppercase text-[#5F5148] hover:text-[#9E1D2F] transition-colors"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              ← Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwdChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!Object.values(pwdChecks).every(Boolean)) {
      setError('Please meet all password requirements.');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      router.push('/');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Signup failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F4EFE8' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #3A2B27 0%, #5F5148 50%, #9E1D2F 100%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
          <div className="mb-8">
            <span
              className="font-display text-5xl text-white block"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              NEEKZ
            </span>
            <span
              className="text-[11px] tracking-[0.4em] uppercase text-[#C9A66B] mt-1 block"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Special
            </span>
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
            "Join the Artisan
            <br />
            Circle Today"
          </h2>

          <div className="flex flex-col gap-3 text-left">
            {[
              'Early access to new collections',
              'Exclusive member pricing',
              'Heritage recipe & harvest updates',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C9A66B]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#C9A66B]" />
                </div>
                <span className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 left-12 w-24 h-24 rounded-full border border-[#C9A66B]/15" />
          <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/10" />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
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
            New Member
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
            Create your account
          </h1>
          <p
            className="text-[#5F5148] text-sm mb-10"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Already have an account?{' '}
            <Link href="/login" className="text-[#9E1D2F] hover:underline font-medium">
              Sign in
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
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
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
                  autoComplete="new-password"
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

              {/* Password strength */}
              {password && (
                <div className="mt-3 flex flex-col gap-1.5">
                  {[
                    { ok: pwdChecks.length, label: 'At least 8 characters' },
                    { ok: pwdChecks.upper, label: 'One uppercase letter' },
                    { ok: pwdChecks.number, label: 'One number' },
                  ].map(({ ok, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{ background: ok ? '#C9A66B' : '#E7DDD2' }}
                      >
                        {ok && <Check size={8} className="text-white" />}
                      </div>
                      <span
                        className="text-[11px] transition-colors duration-200"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          color: ok ? '#3A2B27' : '#5F5148',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
              {loading ? 'Creating account…' : (
                <>
                  Create Account
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

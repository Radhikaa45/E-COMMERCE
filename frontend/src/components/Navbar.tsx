'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Recipes', href: '/recipes' },
];

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // close mobile menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,247,242,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E7DDD2' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 16px rgba(90,50,30,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-[65px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-[21px] text-[#3A2B27] group-hover:text-[#9E1D2F] transition-colors duration-300" style={{ ...FD, fontWeight: 700, letterSpacing: '0.05em' }}>
              NEEKZ
            </span>
            <span className="text-[9px] tracking-[0.42em] uppercase text-[#C9A66B] -mt-0.5" style={F}>
              Special
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[11px] tracking-[0.16em] uppercase text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-200 group"
                style={F}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A66B] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/shop" aria-label="Search" className="text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
              <Search size={17} strokeWidth={1.5} />
            </Link>
            <button aria-label="Wishlist" className="text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
              <Heart size={17} strokeWidth={1.5} />
            </button>
            <Link href="/cart" aria-label="Cart" className="relative text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
              <ShoppingBag size={17} strokeWidth={1.5} />
              {count > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full flex items-center justify-center text-white"
                  style={{ background: '#9E1D2F', fontSize: '9px', fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600 }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-[11px] text-[#5F5148]" style={F}>{user.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full border border-[#E7DDD2] text-[#5F5148] hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all"
                  style={F}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full bg-[#9E1D2F] text-white hover:bg-[#7D0F1C] transition-colors"
                style={F}
              >
                Sign In
              </Link>
            )}

            <button className="lg:hidden text-[#5F5148] hover:text-[#9E1D2F] transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-[65px] inset-x-0 z-40 lg:hidden border-b border-[#E7DDD2]" style={{ background: '#FAF7F2' }}>
          <div className="px-6 py-8 flex flex-col gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] tracking-[0.16em] uppercase text-[#5F5148] hover:text-[#9E1D2F] transition-colors"
                style={F}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-[#E7DDD2]" />
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5F5148]" style={F}>{user.name}</span>
                <button onClick={() => { logout(); setOpen(false); }} className="text-[10px] tracking-wider uppercase text-[#9E1D2F]" style={F}>Sign Out</button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="flex-1 text-center py-3 rounded-full border border-[#E7DDD2] text-[11px] tracking-wider uppercase text-[#5F5148]" style={F} onClick={() => setOpen(false)}>Sign In</Link>
                <Link href="/signup" className="flex-1 text-center py-3 rounded-full bg-[#9E1D2F] text-[11px] tracking-wider uppercase text-white" style={F} onClick={() => setOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

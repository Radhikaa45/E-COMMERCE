'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);
  const [wishlistCount] = useState(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF7F2]/96 backdrop-blur-md shadow-sm border-b border-[#E7DDD2]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span
                className="font-display text-[22px] font-800 tracking-wider text-[#3A2B27] group-hover:text-[#9E1D2F] transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
              >
                NEEKZ
              </span>
              <span
                className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] font-body font-medium -mt-0.5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Special
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[11px] tracking-[0.18em] uppercase font-body font-medium text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300 group"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A66B] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <button
                aria-label="Search"
                className="text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button
                aria-label="Wishlist"
                className="relative text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#9E1D2F] text-white text-[9px] flex items-center justify-center font-body font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Cart"
                className="relative text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#9E1D2F] text-white text-[9px] flex items-center justify-center font-body font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Mobile menu"
                className="lg:hidden text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300 ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 inset-x-0 z-40 bg-[#FAF7F2] border-b border-[#E7DDD2] shadow-lg lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="block text-[13px] tracking-[0.18em] uppercase font-body font-medium text-[#5F5148] hover:text-[#9E1D2F] transition-colors duration-300"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-[#E7DDD2] mt-2" />
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#9E1D2F] text-white text-[11px] tracking-[0.2em] uppercase font-body font-medium rounded-full hover:bg-[#7D0F1C] transition-colors duration-300"
                onClick={() => setMobileOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

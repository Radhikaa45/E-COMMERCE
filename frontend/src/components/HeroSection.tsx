'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const heroProducts = [
  { label: 'Basmati Rice', sub: 'Aged 12 months', color: '#D4A84B' },
  { label: 'Green Cardamom', sub: 'Himalayan spice', color: '#4A7C59' },
  { label: 'Noon Chai', sub: 'Kashmiri heritage', color: '#C96A8A' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F4EFE8] overflow-hidden pt-20">
      {/* BG radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, #DCCFC3 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, #EFE7DE 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-7 bg-[#C9A66B]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1D2F] font-medium" style={F}>
                Handpicked from the Valleys of Jammu
              </span>
            </div>

            <h1
              className="text-[#3A2B27] mb-5 leading-[1.08]"
              style={{ ...FD, fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600 }}
            >
              Artisanal{' '}
              <em className="text-[#9E1D2F] not-italic" style={{ fontStyle: 'italic' }}>Treasures</em>
              <br />
              from Jammu &<br />
              Kashmir.
            </h1>

            <p className="text-[#5F5148] leading-relaxed mb-9 max-w-sm text-[0.96rem]" style={F}>
              Pure handcrafted basmati, dry fruits, and heritage spices — sourced
              directly from Himalayan farming families.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#9E1D2F] text-white text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:bg-[#7D0F1C] transition-colors shadow-md shadow-[#9E1D2F]/20"
                style={F}
              >
                Shop Collection
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#3A2B27]/25 text-[#3A2B27] text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-colors"
                style={F}
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-7 border-t border-[#E7DDD2]">
              {[
                { n: '20+', l: 'Products' },
                { n: '100%', l: 'Natural' },
                { n: '5K+', l: 'Families Served' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-[#9E1D2F] leading-none mb-1" style={{ ...FD, fontSize: '1.7rem', fontWeight: 600 }}>{n}</p>
                  <p className="text-[9px] tracking-widest uppercase text-[#5F5148]" style={F}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — real product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Main image circle */}
            <div className="relative">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-[#C9A66B]/20" style={{ transform: 'scale(1.1)' }} />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C9A66B]/10" style={{ transform: 'scale(1.22)' }} />

              <div
                className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden"
                style={{ boxShadow: '0 32px 72px rgba(90,50,30,0.18)' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=880&auto=format&fit=crop&q=80"
                  alt="Himalayan spices and artisan produce"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 440px"
                />
                {/* Warm tint overlay */}
                <div className="absolute inset-0" style={{ background: 'rgba(201,166,107,0.06)' }} />
              </div>

              {/* Brand badge */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full flex flex-col items-center"
                style={{
                  background: 'rgba(250,247,242,0.92)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(231,221,210,0.9)',
                  boxShadow: '0 4px 20px rgba(90,50,30,0.1)',
                }}
              >
                <span className="text-[11px] font-semibold text-[#3A2B27] tracking-wide" style={FD}>NEEKZ Special</span>
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#C9A66B]" style={F}>Pride of Jammu</span>
              </div>
            </div>

            {/* Floating product chips */}
            {heroProducts.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="absolute hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
                style={{
                  top: `${18 + i * 26}%`,
                  right: i % 2 === 0 ? '-4%' : '-8%',
                  background: 'rgba(250,247,242,0.94)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(231,221,210,0.8)',
                  boxShadow: '0 4px 16px rgba(90,50,30,0.07)',
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <p className="text-[11px] font-medium text-[#3A2B27] leading-none" style={F}>{p.label}</p>
                  <p className="text-[9px] text-[#C9A66B] tracking-wide mt-0.5" style={F}>{p.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

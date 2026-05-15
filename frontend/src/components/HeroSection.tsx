'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const floatingItems = [
  { label: 'Basmati Rice', sub: 'Aged 12 months', top: '12%', right: '8%', delay: 0.2 },
  { label: 'Green Cardamom', sub: 'Hand-picked', top: '38%', right: '-2%', delay: 0.4 },
  { label: 'Noon Chai', sub: 'Kashmiri Heritage', top: '65%', right: '10%', delay: 0.6 },
  { label: 'Kashmir Almonds', sub: 'Wild-harvested', top: '80%', right: '35%', delay: 0.5 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F4EFE8]">
      {/* Background grain pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #EFE7DE 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, #DCCFC3 0%, transparent 50%),
                            radial-gradient(circle at 60% 80%, #EFE7DE 0%, transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center min-h-[calc(100vh-160px)]">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-8 bg-[#C9A66B]" />
              <span
                className="text-[11px] tracking-[0.28em] uppercase text-[#9E1D2F] font-medium"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Handpicked from the Valleys of Jammu
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-display leading-[1.1] text-[#3A2B27] mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 700,
              }}
            >
              Artisanal{' '}
              <span className="italic text-[#9E1D2F]">Treasures</span>
              <br />
              from the Valleys
              <br />
              <span className="relative">
                of Jammu.
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #C9A66B, transparent)' }}
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-[#5F5148] leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.0625rem' }}
            >
              Experience the pure taste of handcrafted basmati rice, saffron, dry fruits,
              and spices sourced directly from the Himalayan region — where heritage meets
              artisanship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#9E1D2F] text-white text-[11px] tracking-[0.22em] uppercase font-medium rounded-full hover:bg-[#7D0F1C] transition-all duration-300 shadow-lg shadow-[#9E1D2F]/20 hover:shadow-xl hover:shadow-[#9E1D2F]/25 hover:-translate-y-0.5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Shop Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#3A2B27]/30 text-[#3A2B27] text-[11px] tracking-[0.22em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all duration-300 hover:-translate-y-0.5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Our Story
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex gap-8 mt-12 pt-8 border-t border-[#E7DDD2]"
            >
              {[
                { number: '20+', label: 'Premium Products' },
                { number: '100%', label: 'Natural & Pure' },
                { number: '5000+', label: 'Happy Families' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="font-display text-2xl font-700 text-[#9E1D2F]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="text-[10px] tracking-widest uppercase text-[#5F5148] mt-0.5"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN – Visual */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center relative h-[520px] lg:h-auto">
            {/* Main decorative circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#C9A66B]/30"
                style={{ transform: 'scale(1.12)' }}
              />
              {/* Second ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#C9A66B]/15"
                style={{ transform: 'scale(1.25)' }}
              />

              {/* Main circle */}
              <div
                className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #EFE7DE 0%, #DCCFC3 40%, #C9B09A 100%)',
                  boxShadow: '0 40px 80px rgba(90,50,30,0.18), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {/* Inner decorative content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {/* Large decorative text */}
                  <span
                    className="font-display text-[110px] leading-none select-none opacity-[0.07] text-[#3A2B27]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
                  >
                    N
                  </span>
                </div>

                {/* Product visual layers */}
                <div className="absolute inset-0">
                  {/* Rice grain pattern */}
                  <div
                    className="absolute top-[15%] left-[20%] w-28 h-28 rounded-full opacity-60"
                    style={{
                      background: 'radial-gradient(circle, #D4A84B 0%, #B8861A 100%)',
                      boxShadow: '0 8px 24px rgba(180,130,30,0.3)',
                    }}
                  />
                  {/* Spice element */}
                  <div
                    className="absolute bottom-[20%] right-[18%] w-20 h-20 rounded-full opacity-55"
                    style={{
                      background: 'radial-gradient(circle, #C0392B 0%, #8B1A1A 100%)',
                      boxShadow: '0 8px 24px rgba(160,30,30,0.3)',
                    }}
                  />
                  {/* Dry fruit element */}
                  <div
                    className="absolute top-[55%] left-[12%] w-16 h-16 rounded-full opacity-50"
                    style={{
                      background: 'radial-gradient(circle, #8B5E3C 0%, #4A2810 100%)',
                      boxShadow: '0 8px 24px rgba(90,50,20,0.3)',
                    }}
                  />
                  {/* Tea element */}
                  <div
                    className="absolute top-[20%] right-[15%] w-14 h-14 rounded-full opacity-45"
                    style={{
                      background: 'radial-gradient(circle, #C96A8A 0%, #6B1A35 100%)',
                      boxShadow: '0 8px 24px rgba(150,50,80,0.3)',
                    }}
                  />
                </div>

                {/* Center badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                    style={{
                      background: 'rgba(250,247,242,0.85)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 20px rgba(90,50,30,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                  >
                    <span
                      className="font-display text-[11px] font-800 text-[#3A2B27] text-center leading-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
                    >
                      NEEKZ
                    </span>
                    <span
                      className="text-[7px] tracking-[0.25em] uppercase text-[#C9A66B] mt-0.5"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Special
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating product tags */}
            {floatingItems.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay + 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute hidden sm:flex flex-col gap-0.5 px-4 py-2.5 rounded-xl"
                style={{
                  top: item.top,
                  right: item.right,
                  background: 'rgba(250,247,242,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(231,221,210,0.8)',
                  boxShadow: '0 4px 20px rgba(90,50,30,0.08)',
                }}
              >
                <span
                  className="text-[11px] font-semibold text-[#3A2B27]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[9px] tracking-wider uppercase text-[#C9A66B]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[#5F5148]"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-[#C9A66B]" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}

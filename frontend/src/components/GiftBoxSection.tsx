'use client';

import { motion } from 'framer-motion';
import { Gift, ArrowRight, Star } from 'lucide-react';
import { giftBoxes } from '@/data/products';
import Link from 'next/link';

const occasions = ['Corporate Gifting', 'Festival Boxes', 'Wedding Hampers', 'Luxury Food Gifts'];

export default function GiftBoxSection() {
  return (
    <section className="py-28 px-6 lg:px-10 relative overflow-hidden bg-[#9E1D2F]">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #7D0F1C 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, #C0392B 0%, transparent 50%)',
          }}
        />
        {/* Decorative large text */}
        <div className="absolute top-0 right-0 h-full flex items-center overflow-hidden opacity-[0.04]">
          <span
            className="font-display text-white select-none"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28vw',
              fontWeight: 800,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            G
          </span>
        </div>
        {/* Gold pattern circles */}
        <div
          className="absolute top-8 left-8 w-64 h-64 rounded-full border border-[#C9A66B]/10"
        />
        <div
          className="absolute bottom-8 right-8 w-48 h-48 rounded-full border border-[#C9A66B]/8"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C9A66B]/60" />
            <Gift size={16} className="text-[#C9A66B]" strokeWidth={1.5} />
            <div className="h-px w-8 bg-[#C9A66B]/60" />
          </div>
          <h2
            className="font-display text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            The Art of{' '}
            <span className="italic" style={{ color: '#C9A66B' }}>
              Gifting
            </span>
          </h2>
          <p
            className="text-white/60 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1rem' }}
          >
            Curated luxury hampers crafted with the finest Himalayan produce —
            for the moments that deserve to be remembered.
          </p>

          {/* Occasion tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {occasions.map((occ) => (
              <span
                key={occ}
                className="px-4 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: 'rgba(201,166,107,0.15)',
                  border: '1px solid rgba(201,166,107,0.3)',
                  color: 'rgba(201,166,107,0.9)',
                }}
              >
                {occ}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Gift box cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {giftBoxes.map((box, i) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(201,166,107,0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Top visual */}
              <div
                className="h-44 relative flex items-center justify-center overflow-hidden"
                style={{
                  background: i === 1
                    ? 'linear-gradient(135deg, #C9A66B 0%, #A0823A 50%, #7D5E1A 100%)'
                    : i === 0
                    ? 'linear-gradient(135deg, #8B4513 0%, #5C2A0A 50%, #3A1A05 100%)'
                    : 'linear-gradient(135deg, #4A7C59 0%, #2E5A3A 50%, #1A3A22 100%)',
                }}
              >
                {/* Decorative elements */}
                <div className="flex items-center justify-center w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Gift size={28} className="text-white/80" strokeWidth={1.2} />
                </div>
                {i === 1 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: 'rgba(201,166,107,0.3)' }}>
                    <Star size={9} fill="white" className="text-white" />
                    <span className="text-[8px] text-white font-medium tracking-wider" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Most Popular</span>
                  </div>
                )}
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)' }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span
                  className="text-[9px] tracking-[0.25em] uppercase font-medium mb-2 block"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#C9A66B' }}
                >
                  {box.occasion}
                </span>
                <h3
                  className="font-display text-white font-semibold mb-1"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                  }}
                >
                  {box.title}
                </h3>
                <p
                  className="text-white/50 text-[12px] mb-4"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {box.subtitle}
                </p>

                {/* Items */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {box.items.map((item) => (
                    <span
                      key={item}
                      className="text-[9px] px-2.5 py-1 rounded-full text-white/60"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="font-display text-white font-semibold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem' }}
                  >
                    ₹{box.price.toLocaleString('en-IN')}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium transition-all duration-300 group/btn"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      background: 'rgba(201,166,107,0.2)',
                      border: '1px solid rgba(201,166,107,0.4)',
                      color: '#C9A66B',
                    }}
                  >
                    Order Now
                    <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/gifting"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#C9A66B]/40 text-[#C9A66B] text-[11px] tracking-[0.22em] uppercase font-medium rounded-full hover:bg-[#C9A66B]/10 transition-all duration-300 group"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Explore All Gift Collections
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { aiPairings } from '@/data/products';

export default function AISection() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, #9E1D2F15, #C9A66B15)',
              border: '1px solid #E7DDD2',
            }}
          >
            <Sparkles size={12} className="text-[#C9A66B]" />
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-[#5F5148] font-medium"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              AI-Curated Pairings
            </span>
          </div>
          <h2
            className="font-display text-[#3A2B27] mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Perfect{' '}
            <span className="italic text-[#9E1D2F]">Pairings</span>
          </h2>
          <p
            className="text-[#5F5148] max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1rem' }}
          >
            Our intelligent pairing system suggests artisan combinations
            curated for exceptional flavour experiences.
          </p>
        </motion.div>

        {/* Pairing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiPairings.map((pairing, i) => (
            <motion.div
              key={pairing.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: '#FAF7F2',
                border: '1px solid #E7DDD2',
                boxShadow: '0 2px 16px rgba(90,50,30,0.06)',
              }}
            >
              {/* Gradient header */}
              <div
                className="h-3 w-full"
                style={{ background: pairing.gradient.replace('22', '').replace('11', '') }}
              />

              <div className="p-7">
                {/* Mood badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.18em] uppercase font-medium mb-5"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    background: pairing.gradient,
                    color: '#5F5148',
                    border: '1px solid #E7DDD2',
                  }}
                >
                  {pairing.mood}
                </span>

                <h3
                  className="font-display text-[#3A2B27] font-semibold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  {pairing.title}
                </h3>

                <p
                  className="text-[12px] text-[#5F5148] leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {pairing.description}
                </p>

                {/* Ingredient tags */}
                <div className="flex flex-col gap-2 mb-6">
                  {pairing.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#C9A66B' }}
                      />
                      <span
                        className="text-[12px] text-[#3A2B27] font-medium"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="flex items-center gap-2 text-[#9E1D2F] group/btn"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  <span className="text-[10px] tracking-[0.18em] uppercase font-medium group-hover/btn:tracking-[0.24em] transition-all duration-300">
                    Shop This Pairing
                  </span>
                  <ArrowRight
                    size={11}
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-[11px] text-[#5F5148]/60 tracking-wider"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Pairings suggested based on traditional Kashmiri recipes and culinary harmony
        </motion.p>
      </div>
    </section>
  );
}

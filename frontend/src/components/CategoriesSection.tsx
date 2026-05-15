'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function CategoriesSection() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-[#F4EFE8]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-4 font-medium"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Our Collections
          </p>
          <h2
            className="font-display text-[#3A2B27] mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Explore Our{' '}
            <span className="italic text-[#9E1D2F]">Artisan</span> Categories
          </h2>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link href={`/shop?category=${cat.id}`}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: '0 4px 24px rgba(90,50,30,0.1)',
                  }}
                >
                  {/* Gradient visual area */}
                  <div
                    className="h-44 md:h-52 flex items-center justify-center relative overflow-hidden"
                    style={{ background: cat.gradient }}
                  >
                    {/* Decorative symbol */}
                    <span
                      className="text-white/20 select-none group-hover:text-white/30 transition-colors duration-500"
                      style={{ fontSize: '5rem', lineHeight: 1 }}
                    >
                      {cat.symbol}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />

                    {/* Count badge */}
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.18)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span
                        className="text-[9px] text-white/90 font-medium tracking-wider"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {cat.count} items
                      </span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div
                    className="px-4 py-4"
                    style={{ background: '#FAF7F2' }}
                  >
                    <h3
                      className="font-display text-[#3A2B27] font-semibold mb-1 leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '0.95rem',
                        fontWeight: 600,
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-[10px] text-[#5F5148] leading-relaxed"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-[#9E1D2F] group-hover:gap-2 transition-all duration-300">
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase font-medium"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Explore
                      </span>
                      <ArrowRight size={10} strokeWidth={2} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Browse all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#3A2B27]/25 text-[#3A2B27] text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all duration-300 group"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Browse All Products
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

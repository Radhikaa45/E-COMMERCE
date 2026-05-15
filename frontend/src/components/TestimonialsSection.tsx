'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-28 px-6 lg:px-10 bg-[#EFE7DE]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-4 font-medium"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Voices of Our Circle
          </p>
          <h2
            className="font-display text-[#3A2B27]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            What Our{' '}
            <span className="italic text-[#9E1D2F]">Artisan Circle</span>
            <br className="hidden sm:block" /> Says
          </h2>
          <div className="gold-divider mt-5" />
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center px-4 sm:px-12"
            >
              {/* Quote icon */}
              <Quote
                size={40}
                className="mx-auto mb-8 text-[#C9A66B] opacity-40"
                strokeWidth={1}
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-7">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#C9A66B" className="text-[#C9A66B]" />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="font-display text-[#3A2B27] italic leading-[1.8] mb-8"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
                  fontWeight: 400,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-10 bg-[#C9A66B] mb-3" />
                <p
                  className="font-display text-[#3A2B27] font-semibold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 600 }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-[#5F5148]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {t.location}
                </p>
                <p
                  className="text-[10px] text-[#C9A66B] mt-1 italic"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {t.product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E7DDD2] bg-[#FAF7F2] text-[#5F5148] hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-[#9E1D2F]'
                      : 'w-2 h-2 bg-[#DCCFC3] hover:bg-[#C9A66B]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E7DDD2] bg-[#FAF7F2] text-[#5F5148] hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-6 mt-20 pt-12 border-t border-[#E7DDD2]"
        >
          {[
            { number: '4.9/5', label: 'Avg. Rating', sub: 'from 1,200+ reviews' },
            { number: '5000+', label: 'Happy Customers', sub: 'across 120+ cities' },
            { number: '98%', label: 'Reorder Rate', sub: 'repeat purchases' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display text-[#9E1D2F] font-semibold mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', fontWeight: 700 }}
              >
                {stat.number}
              </p>
              <p
                className="text-[#3A2B27] text-[11px] font-medium mb-0.5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {stat.label}
              </p>
              <p
                className="text-[#5F5148] text-[9px] tracking-wider"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-28 px-6 lg:px-10 relative overflow-hidden bg-[#3A2B27]">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, #5F5148 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, #9E1D2F40 0%, transparent 50%)',
          }}
        />
        {/* Grain pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-[#C9A66B]/8" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-[#C9A66B]/6" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#C9A66B]/40" />
            <span
              className="text-[9px] tracking-[0.35em] uppercase text-[#C9A66B] font-medium"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Exclusive Circle
            </span>
            <div className="h-px w-8 bg-[#C9A66B]/40" />
          </div>

          <h2
            className="font-display text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Join Our{' '}
            <span className="italic" style={{ color: '#C9A66B' }}>
              Artisanal
            </span>{' '}
            Circle
          </h2>

          <p
            className="text-white/50 leading-relaxed mb-10"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1rem' }}
          >
            Receive first access to new collections, heritage recipes, harvest
            season offers, and exclusive member pricing — delivered with care.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 rounded-full text-[13px] outline-none transition-all duration-300"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(201,166,107,0.25)',
                  color: 'white',
                  letterSpacing: '0.02em',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(201,166,107,0.6)';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(201,166,107,0.25)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium whitespace-nowrap transition-all duration-300 group"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: '#C9A66B',
                  color: '#3A2B27',
                }}
              >
                Subscribe
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <CheckCircle size={36} className="text-[#C9A66B]" strokeWidth={1.5} />
              <p
                className="font-display text-white text-lg italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Welcome to the Circle
              </p>
              <p
                className="text-white/50 text-[12px]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                You&apos;ll hear from us soon with something special.
              </p>
            </motion.div>
          )}

          {/* Privacy note */}
          <p
            className="text-white/30 text-[10px] mt-5 tracking-wider"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            No spam, ever. Unsubscribe at any time. We value your trust as much as our produce.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 pt-8 border-t border-white/10">
            {['Early Access', 'Heritage Recipes', 'Member Pricing', 'Harvest Updates'].map((b) => (
              <span
                key={b}
                className="text-[9px] tracking-[0.18em] uppercase text-[#C9A66B]/70 font-medium"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

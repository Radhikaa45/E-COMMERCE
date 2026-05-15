'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles, Users, Mountain } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Leaf,
    title: 'Organic & Natural',
    desc: 'Every product is free from additives, preservatives, and artificial processing — sourced in its most natural form.',
  },
  {
    icon: Sparkles,
    title: 'Handpicked Excellence',
    desc: 'Our artisans hand-select each batch, ensuring only the finest quality reaches your kitchen.',
  },
  {
    icon: Users,
    title: 'Direct Farmer Support',
    desc: 'We partner directly with Himalayan farming families, ensuring fair trade and preserving traditional livelihoods.',
  },
  {
    icon: Mountain,
    title: 'Himalayan Provenance',
    desc: 'The unique altitude, climate, and soil of Jammu & Kashmir impart an unmatched flavour to our products.',
  },
];

export default function HeritageSection() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-[#F4EFE8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT – Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image frame */}
            <div
              className="relative rounded-3xl overflow-hidden h-[480px] lg:h-[560px]"
              style={{
                background: 'linear-gradient(160deg, #D4A84B 0%, #8B6914 30%, #5C4108 60%, #3A2B27 100%)',
                boxShadow: '0 32px 80px rgba(90,50,30,0.2)',
              }}
            >
              {/* Landscape visual */}
              <div className="absolute inset-0 flex flex-col">
                {/* Sky area */}
                <div
                  className="flex-1"
                  style={{
                    background: 'linear-gradient(180deg, #B8D4E8 0%, #D4A84B 60%, #8B6914 100%)',
                  }}
                />
                {/* Mountain silhouette */}
                <div
                  className="h-32"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, #3A2B27 100%)',
                    clipPath: 'polygon(0% 100%, 15% 30%, 30% 60%, 45% 10%, 60% 50%, 75% 20%, 90% 55%, 100% 25%, 100% 100%)',
                  }}
                />
                {/* Ground/fields */}
                <div
                  className="h-28"
                  style={{ background: 'linear-gradient(180deg, #4A7A20 0%, #2E5010 100%)' }}
                />
              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <div
                    className="inline-block px-4 py-2 rounded-full mb-4"
                    style={{
                      background: 'rgba(201,166,107,0.2)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(201,166,107,0.3)',
                    }}
                  >
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase text-[#C9A66B] font-medium"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Jammu & Kashmir
                    </span>
                  </div>
                  <h3
                    className="font-display text-white leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.6rem',
                      fontWeight: 600,
                    }}
                  >
                    Where Heritage
                    <br />
                    <span className="italic">meets the Harvest</span>
                  </h3>
                </div>
              </div>

              {/* Decorative ring */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-[#C9A66B]/20"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-10 px-6 py-5 rounded-2xl"
              style={{
                background: '#FAF7F2',
                boxShadow: '0 16px 48px rgba(90,50,30,0.14)',
                border: '1px solid #E7DDD2',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #9E1D2F, #7D0F1C)' }}
                >
                  <Mountain size={18} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="font-display text-[#3A2B27] font-semibold leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem' }}
                  >
                    Est. 2020
                  </p>
                  <p
                    className="text-[10px] tracking-wider uppercase text-[#5F5148]"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Artisan Heritage Brand
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT – Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-4 font-medium"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Our Heritage
            </p>

            <h2
              className="font-display text-[#3A2B27] mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Born from the{' '}
              <span className="italic text-[#9E1D2F]">Himalayan</span>{' '}
              Heartland
            </h2>

            <div className="h-px w-16 bg-[#C9A66B] mb-6" />

            <p
              className="text-[#5F5148] leading-[1.85] mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1rem' }}
            >
              NEEKZ Special was born from a deep reverence for the land of Jammu &
              Kashmir — its valleys, its farmers, and its centuries-old culinary traditions.
              We bridge the distance between Himalayan artisans and modern Indian kitchens.
            </p>
            <p
              className="text-[#5F5148] leading-[1.85] mb-10"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1rem' }}
            >
              Every product carries the fingerprint of the families who grew it —
              their patience, their knowledge, their pride. When you cook with NEEKZ Special,
              you're cooking with heritage.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #9E1D2F, #7D0F1C)',
                    }}
                  >
                    <pillar.icon size={14} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4
                      className="font-display text-[#3A2B27] font-semibold mb-1"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {pillar.title}
                    </h4>
                    <p
                      className="text-[11px] text-[#5F5148] leading-relaxed"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href="/heritage"
                className="inline-flex items-center gap-3 text-[#9E1D2F] group"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                <span className="text-[11px] tracking-[0.22em] uppercase font-medium group-hover:tracking-[0.28em] transition-all duration-300">
                  Read Our Full Story
                </span>
                <div className="h-px w-8 bg-[#9E1D2F] group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

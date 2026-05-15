'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { bestsellerProducts, type Product } from '@/data/products';

const badgeColors: Record<string, string> = {
  Bestseller: 'bg-[#9E1D2F] text-white',
  Premium: 'bg-[#3A2B27] text-white',
  New: 'bg-[#C9A66B] text-white',
  Heritage: 'bg-[#5F5148] text-white',
  "Chef's Pick": 'bg-[#7D0F1C] text-white',
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#FAF7F2] rounded-3xl overflow-hidden flex flex-col"
      style={{
        boxShadow: '0 2px 20px rgba(90,50,30,0.07)',
        border: '1px solid #E7DDD2',
        transition: 'box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(90,50,30,0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(90,50,30,0.07)';
      }}
    >
      {/* Image area */}
      <div
        className="relative h-52 overflow-hidden flex items-center justify-center"
        style={{ background: product.gradient }}
      >
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-semibold ${badgeColors[product.badge] || 'bg-[#9E1D2F] text-white'}`}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(250,247,242,0.9)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            size={13}
            strokeWidth={1.8}
            fill={wishlisted ? '#9E1D2F' : 'none'}
            className={wishlisted ? 'text-[#9E1D2F]' : 'text-[#5F5148]'}
          />
        </button>

        {/* Decorative circle */}
        <div
          className="w-24 h-24 rounded-full opacity-25"
          style={{ background: 'rgba(255,255,255,0.4)' }}
        />

        {/* Weight tag */}
        {product.weight && (
          <span
            className="absolute bottom-3 right-3 text-[9px] text-white/80 font-medium tracking-wider"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {product.weight}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p
          className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-1.5"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {product.category}
        </p>

        <h3
          className="font-display text-[#3A2B27] font-semibold mb-2 leading-snug"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.05rem',
            fontWeight: 600,
          }}
        >
          {product.name}
        </h3>

        <p
          className="text-[12px] text-[#5F5148] leading-relaxed mb-4 flex-1"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill="#C9A66B" className="text-[#C9A66B]" />
          ))}
          <span
            className="text-[10px] text-[#5F5148] ml-1"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            (4.9)
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-[#3A2B27] font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem' }}
            >
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span
                className="text-[12px] text-[#5F5148] line-through"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium transition-all duration-300"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              background: added ? '#5F5148' : '#9E1D2F',
              color: 'white',
            }}
          >
            <ShoppingBag size={11} strokeWidth={2} />
            {added ? 'Added!' : 'Add'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestsellerSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? bestsellerProducts : bestsellerProducts.slice(0, 4);

  return (
    <section className="py-28 px-6 lg:px-10 bg-[#EFE7DE]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-3 font-medium"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Most Loved
            </p>
            <h2
              className="font-display text-[#3A2B27]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              Our{' '}
              <span className="italic text-[#9E1D2F]">Bestselling</span>
              <br className="hidden md:block" /> Artisan Picks
            </h2>
          </div>
          <div className="h-px flex-1 max-w-48 bg-[#E7DDD2] hidden md:block mb-2" />
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Show more / View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#3A2B27]/25 text-[#3A2B27] text-[11px] tracking-[0.22em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all duration-300 group"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

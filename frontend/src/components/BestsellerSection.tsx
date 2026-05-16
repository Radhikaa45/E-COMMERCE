'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const products = [
  {
    id: 1, name: 'Jammu Basmati Rice', category: 'Artisan Rice', price: 299, originalPrice: 349,
    desc: 'Long-grain, aromatic basmati aged 12 months', badge: 'Bestseller', weight: '1 kg',
    img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 2, name: 'Kashmir Almonds', category: 'Dry Fruits', price: 699, originalPrice: 849,
    desc: 'Wild-harvested, naturally sun-dried Himalayan almonds', badge: 'Premium', weight: '500 g',
    img: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3, name: 'Green Cardamom', category: 'Whole Spices', price: 449, originalPrice: undefined,
    desc: 'Hand-picked from Himalayan spice gardens', badge: 'New', weight: '200 g',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4, name: 'Bhaderwahi Rajmash', category: 'Heritage Pulses', price: 389, originalPrice: undefined,
    desc: 'GI-tagged kidney beans from Bhaderwah valley', badge: 'Heritage', weight: '1 kg',
    img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 5, name: 'Kashmiri Noon Chai', category: 'Traditional', price: 349, originalPrice: undefined,
    desc: 'Pink salt tea with rose petals — the original Kashmiri brew', badge: 'Heritage', weight: '100 g',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 6, name: 'Biryani King Special', category: 'Artisan Rice', price: 329, originalPrice: undefined,
    desc: 'Master blend of aged basmati for the perfect biryani', badge: "Chef's Pick", weight: '1 kg',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 7, name: 'Premium Pistachios', category: 'Dry Fruits', price: 849, originalPrice: undefined,
    desc: 'Roasted & salted Himalayan pistachios, hand-selected', badge: undefined, weight: '500 g',
    img: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 8, name: 'Himalayan Cashews', category: 'Dry Fruits', price: 549, originalPrice: 649,
    desc: 'Whole creamy cashews with a naturally sweet flavour', badge: undefined, weight: '500 g',
    img: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=500&auto=format&fit=crop&q=80',
  },
];

const badgeStyle: Record<string, string> = {
  Bestseller: '#9E1D2F', Premium: '#3A2B27', New: '#C9A66B', Heritage: '#5F5148', "Chef's Pick": '#7D0F1C',
};

function ProductCard({ p, i }: { p: typeof products[0]; i: number }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div
      className="group bg-[#FAF7F2] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{
        border: '1px solid #E7DDD2',
        boxShadow: '0 1px 12px rgba(90,50,30,0.06)',
        animationDelay: `${i * 60}ms`,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(90,50,30,0.12)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.06)'; }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={p.img}
          alt={p.name}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {p.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase text-white"
            style={{ ...F, background: badgeStyle[p.badge] || '#9E1D2F' }}
          >
            {p.badge}
          </span>
        )}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(6px)' }}
        >
          <Heart size={12} strokeWidth={1.8} fill={wished ? '#9E1D2F' : 'none'} className={wished ? 'text-[#9E1D2F]' : 'text-[#5F5148]'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] mb-1 font-medium" style={F}>{p.category}</p>
        <h3 className="text-[#3A2B27] font-semibold leading-snug mb-1.5" style={{ ...FD, fontSize: '1rem', fontWeight: 600 }}>{p.name}</h3>
        <p className="text-[11px] text-[#5F5148] leading-relaxed flex-1 mb-3" style={F}>{p.desc}</p>

        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, j) => <Star key={j} size={9} fill="#C9A66B" className="text-[#C9A66B]" />)}
          <span className="text-[9px] text-[#5F5148] ml-1" style={F}>(4.9)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#3A2B27] font-semibold" style={{ ...FD, fontSize: '1.15rem' }}>₹{p.price}</span>
            {p.originalPrice && <span className="text-[11px] text-[#5F5148] line-through" style={F}>₹{p.originalPrice}</span>}
          </div>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-medium text-white transition-colors"
            style={{ ...F, background: added ? '#5F5148' : '#9E1D2F' }}
          >
            <ShoppingBag size={10} strokeWidth={2} />
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BestsellerSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, 4);

  return (
    <section className="py-24 px-5 lg:px-10 bg-[#EFE7DE]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-2 font-medium" style={F}>Most Loved</p>
            <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 600, lineHeight: 1.15 }}>
              Our <em className="text-[#9E1D2F]">Bestselling</em> Picks
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visible.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-9 py-3.5 border border-[#3A2B27]/25 text-[#3A2B27] text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all"
            style={F}
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
}

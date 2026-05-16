'use client';

import Image from 'next/image';
import { Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const gifts = [
  {
    title: 'Himalayan Essentials', sub: 'Rice & Spice Collection',
    items: ['Jammu Basmati', 'Green Cardamom', 'Black Pepper', 'Cinnamon'], price: 1299,
    occasion: 'Corporate Gifting',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80',
  },
  {
    title: 'Festive Grand Hamper', sub: 'The Complete Artisan Collection',
    items: ['Basmati Rice', 'Mixed Dry Fruits', 'Whole Spices', 'Noon Chai'], price: 2499,
    occasion: 'Wedding & Festival',
    img: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=500&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    title: 'Dry Fruit Elegance', sub: 'Curated Premium Selection',
    items: ['Almonds', 'Cashews', 'Pistachios', 'Dried Apricots'], price: 1899,
    occasion: 'All Occasions',
    img: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=500&auto=format&fit=crop&q=80',
  },
];

export default function GiftBoxSection() {
  return (
    <section className="py-24 px-5 lg:px-10 bg-[#9E1D2F] relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 25% 50%, #7D0F1C 0%, transparent 55%), radial-gradient(ellipse at 80% 25%, rgba(192,57,43,0.5) 0%, transparent 50%)' }} />
      <div className="absolute top-8 left-8 w-56 h-56 rounded-full border border-[#C9A66B]/10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full border border-[#C9A66B]/8 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-7 bg-[#C9A66B]/50" />
            <Gift size={14} className="text-[#C9A66B]" strokeWidth={1.5} />
            <div className="h-px w-7 bg-[#C9A66B]/50" />
          </div>
          <h2 className="text-white mb-3" style={{ ...FD, fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 600 }}>
            The Art of <em style={{ color: '#C9A66B' }}>Gifting</em>
          </h2>
          <p className="text-white/55 max-w-md mx-auto text-sm leading-relaxed" style={F}>
            Curated luxury hampers with the finest Himalayan produce — for moments that deserve to be remembered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gifts.map((g) => (
            <div
              key={g.title}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${g.featured ? 'rgba(201,166,107,0.5)' : 'rgba(201,166,107,0.15)'}`,
                boxShadow: g.featured ? '0 0 0 1px rgba(201,166,107,0.2)' : 'none',
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image src={g.img} alt={g.title} fill className="object-cover group-hover:scale-103 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0" style={{ background: 'rgba(58,43,39,0.5)' }} />
                {g.featured && (
                  <span className="absolute top-3 right-3 text-[9px] px-2.5 py-1 rounded-full font-medium" style={{ ...F, background: 'rgba(201,166,107,0.3)', color: '#C9A66B', border: '1px solid rgba(201,166,107,0.4)' }}>
                    Most Popular
                  </span>
                )}
              </div>

              <div className="p-5">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A66B] font-medium block mb-1.5" style={F}>{g.occasion}</span>
                <h3 className="text-white font-semibold mb-0.5" style={{ ...FD, fontSize: '1.15rem', fontWeight: 600 }}>{g.title}</h3>
                <p className="text-white/45 text-[11px] mb-3.5" style={F}>{g.sub}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {g.items.map((item) => (
                    <span key={item} className="text-[9px] text-white/55 px-2 py-0.5 rounded-full" style={{ ...F, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{item}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold" style={{ ...FD, fontSize: '1.25rem' }}>₹{g.price.toLocaleString('en-IN')}</span>
                  <Link
                    href="/gifting"
                    className="flex items-center gap-1.5 text-[9px] tracking-wider uppercase font-medium px-3.5 py-1.5 rounded-full transition-colors"
                    style={{ ...F, background: 'rgba(201,166,107,0.15)', border: '1px solid rgba(201,166,107,0.35)', color: '#C9A66B' }}
                  >
                    Order <ArrowRight size={9} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

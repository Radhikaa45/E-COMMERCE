'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const categories = [
  { name: 'Artisan Rice', slug: 'rice', count: 5, desc: 'Himalayan Basmati & Exotic', img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&auto=format&fit=crop&q=75' },
  { name: 'Dry Fruits', slug: 'dry-fruits', count: 6, desc: 'Hand-Sorted Himalayan', img: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=400&auto=format&fit=crop&q=75' },
  { name: 'Whole Spices', slug: 'spices', count: 9, desc: "Kashmir's Aromatics", img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=75' },
  { name: 'Wellness', slug: 'health', count: 3, desc: 'Superfoods & Breakfast', img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&auto=format&fit=crop&q=75' },
  { name: 'Heritage Pulses', slug: 'pulses', count: 2, desc: 'Bhaderwahi & Traditional', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&fit=crop&q=75' },
  { name: 'Gift Hampers', slug: 'gifts', count: 4, desc: 'Curated Luxury Gifts', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=75' },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 px-5 lg:px-10 bg-[#F4EFE8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Our Collections</p>
          <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 600, lineHeight: 1.2 }}>
            Explore <em className="text-[#9E1D2F]">Artisan</em> Categories
          </h2>
          <div className="gold-divider mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group">
              <div
                className="rounded-2xl overflow-hidden transition-all duration-350 hover:-translate-y-1.5"
                style={{ boxShadow: '0 2px 16px rgba(90,50,30,0.08)', background: '#FAF7F2' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(90,50,30,0.14)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(90,50,30,0.08)'; }}
              >
                {/* Image */}
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 17vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span
                    className="absolute top-2.5 right-2.5 text-[9px] text-white/90 font-medium px-2 py-0.5 rounded-full"
                    style={{ ...F, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}
                  >
                    {cat.count} items
                  </span>
                </div>

                {/* Info */}
                <div className="px-3.5 py-3">
                  <h3 className="text-[#3A2B27] font-semibold leading-tight mb-0.5" style={{ ...FD, fontSize: '0.92rem', fontWeight: 600 }}>{cat.name}</h3>
                  <p className="text-[10px] text-[#5F5148]" style={F}>{cat.desc}</p>
                  <div className="flex items-center gap-1 mt-2 text-[#9E1D2F] group-hover:gap-1.5 transition-all">
                    <span className="text-[9px] tracking-wider uppercase font-medium" style={F}>Explore</span>
                    <ArrowRight size={9} strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

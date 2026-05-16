'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const collections = [
  {
    slug: 'artisan-rice',
    name: 'Artisan Rice',
    subtitle: 'Long-grain, aged basmati from Jammu plains',
    desc: 'Slow-aged premium basmati and speciality rice varieties grown along the Tawi river basin. Each batch is hand-sorted and stone-cleaned.',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80',
    count: 4,
    tag: 'Heritage Staple',
  },
  {
    slug: 'dry-fruits',
    name: 'Dry Fruits',
    subtitle: 'Wild-harvested from Himalayan orchards',
    desc: 'Almonds, walnuts, cashews, pistachios and raisins — sourced directly from Kashmir valley orchards and sun-dried at altitude.',
    image: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=800&auto=format&fit=crop&q=80',
    count: 6,
    tag: 'Premium',
  },
  {
    slug: 'whole-spices',
    name: 'Whole Spices',
    subtitle: 'Hand-picked from mountain spice gardens',
    desc: 'Cardamom, cloves, saffron, cinnamon and more — whole, unground spices that preserve essential oils and maximum flavour.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    count: 5,
    tag: 'Aromatic',
  },
  {
    slug: 'heritage-pulses',
    name: 'Heritage Pulses',
    subtitle: 'GI-tagged beans and lentils from mountain valleys',
    desc: 'Bhaderwahi Rajmash, black chickpeas, and heirloom lentils with Geographical Indication status — grown at 1,600m+ altitude.',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80',
    count: 3,
    tag: 'GI-Tagged',
  },
  {
    slug: 'traditional',
    name: 'Traditional',
    subtitle: 'Authentic Kashmiri brews and blends',
    desc: 'Noon chai, Kahwa, sheer chai and traditional Kashmiri mixes that carry the warmth of a mountain winter in every cup.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    count: 4,
    tag: 'Signature',
  },
  {
    slug: 'gift-hampers',
    name: 'Gift Hampers',
    subtitle: 'Curated luxury sets for every occasion',
    desc: 'Hand-assembled gift boxes and festive hampers. Perfect for Diwali, Eid, weddings and corporate gifting.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&auto=format&fit=crop&q=80',
    count: 5,
    tag: 'Gifting',
    href: '/gifting',
  },
];

export default function CollectionsPage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="py-16 px-5 lg:px-10 text-center" style={{ background: 'linear-gradient(180deg,#EFE7DE 0%,#F4EFE8 100%)' }}>
        <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Explore</p>
        <h1 className="text-[#3A2B27] mb-3" style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, lineHeight: 1.15 }}>
          Our <em className="text-[#9E1D2F]">Collections</em>
        </h1>
        <p className="text-[13px] text-[#5F5148] max-w-md mx-auto" style={F}>
          Six thoughtfully curated categories, each telling a distinct story from the Himalayan region.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={c.href || `/shop?category=${c.slug}`}
              className="group rounded-2xl overflow-hidden flex flex-col bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid #E7DDD2', boxShadow: '0 1px 12px rgba(90,50,30,0.06)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 14px 40px rgba(90,50,30,0.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.06)'; }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw"
                  priority={i < 3}
                />
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'linear-gradient(0deg,rgba(58,43,39,0.55) 0%,rgba(58,43,39,0.05) 50%)' }} />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[8px] tracking-widest uppercase font-semibold text-white"
                  style={{ ...F, background: 'rgba(201,166,107,0.85)', backdropFilter: 'blur(4px)' }}>
                  {c.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-[9px] text-white/70 font-medium" style={F}>{c.count} Products</span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-[#3A2B27] mb-1 group-hover:text-[#9E1D2F] transition-colors" style={{ ...FD, fontSize: '1.25rem', fontWeight: 600 }}>
                  {c.name}
                </h2>
                <p className="text-[10px] text-[#C9A66B] tracking-wider uppercase mb-2.5 font-medium" style={F}>{c.subtitle}</p>
                <p className="text-[11px] text-[#5F5148] leading-relaxed flex-1 mb-4" style={F}>{c.desc}</p>
                <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-medium text-[#9E1D2F]" style={F}>
                  Shop Collection <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Strip */}
      <div className="py-16 px-5 lg:px-10 text-center" style={{ background: '#EFE7DE' }}>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Can't decide?</p>
        <h2 className="text-[#3A2B27] mb-5" style={{ ...FD, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600 }}>
          Browse Everything in <em className="text-[#9E1D2F]">One Place</em>
        </h2>
        <Link href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors hover:bg-[#7D0F1C]"
          style={{ ...F, background: '#9E1D2F' }}>
          View All Products <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </div>
    </PageLayout>
  );
}

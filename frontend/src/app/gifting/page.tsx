'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Truck, Star, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';
import { useCart } from '@/context/CartContext';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const hampers = [
  {
    id: 101,
    name: 'The Kashmir Box',
    desc: 'A curated selection of Kashmir\'s finest — almonds, walnut halves, saffron strands and Noon chai in a hand-painted wooden box.',
    price: 1499,
    original_price: 1799,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=700&auto=format&fit=crop&q=80',
    badge: 'Bestseller',
    includes: ['500g Kashmir Almonds', '250g Walnut Halves', '1g Saffron Strands', '100g Noon Chai', 'Hand-painted Wooden Box'],
    slug: 'the-kashmir-box',
    occasions: ['Diwali', 'Eid', 'Wedding'],
  },
  {
    id: 102,
    name: 'The Spice Trail',
    desc: 'Premium whole spices from Himalayan gardens — green cardamom, cloves, cinnamon, star anise and black peppercorns in an oak spice box.',
    price: 999,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&auto=format&fit=crop&q=80',
    badge: 'New',
    includes: ['100g Green Cardamom', '50g Cloves', '2 Cinnamon Sticks', '50g Star Anise', 'Oak Spice Box'],
    slug: 'the-spice-trail',
    occasions: ['Housewarming', 'Corporate', 'Chef\'s Gift'],
  },
  {
    id: 103,
    name: 'The Pantry Set',
    desc: 'Everything to stock a premium Himalayan pantry — aged basmati, Rajmash, dry fruits and spices in a luxe canvas tote.',
    price: 1999,
    original_price: 2399,
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=700&auto=format&fit=crop&q=80',
    badge: 'Premium',
    includes: ['1kg Aged Basmati', '500g Bhaderwahi Rajmash', '250g Cashews', '200g Cardamom', 'Luxury Canvas Tote'],
    slug: 'the-pantry-set',
    occasions: ['Diwali', 'New Year', 'Thank You'],
  },
  {
    id: 104,
    name: 'The Tea Ceremony',
    desc: 'An immersive Kashmiri tea experience — Kahwa blend, Noon chai, saffron strands and hand-thrown clay cups in a gift box.',
    price: 1299,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    badge: 'Heritage',
    includes: ['Kashmiri Kahwa Blend', '100g Noon Chai', '1g Saffron', '2 Clay Kulhars', 'Gift Box & Card'],
    slug: 'the-tea-ceremony',
    occasions: ['Birthday', 'Thank You', 'Wellness'],
  },
  {
    id: 105,
    name: 'The Festive Grand',
    desc: 'Our most lavish hamper — the complete collection of NEEKZ Special\'s finest in a handcrafted wicker basket tied with silk ribbon.',
    price: 3499,
    original_price: 3999,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=700&auto=format&fit=crop&q=80',
    badge: 'Exclusive',
    includes: ['1kg Biryani Basmati', '500g Almonds', '250g Pistachios', '100g Saffron', '2 Spice Sets', 'Handcrafted Wicker Basket'],
    slug: 'the-festive-grand',
    occasions: ['Diwali', 'Corporate', 'Wedding'],
  },
  {
    id: 106,
    name: 'The Wellness Basket',
    desc: 'A thoughtful health-focused hamper with dry fruits, nuts, herbal teas and whole grains — for the wellness-conscious recipient.',
    price: 1799,
    original_price: null,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80',
    badge: null,
    includes: ['500g Mixed Dry Fruits', '250g Walnuts', '100g Kahwa Blend', '500g Brown Basmati', 'Eco Kraft Basket'],
    slug: 'the-wellness-basket',
    occasions: ['Get Well Soon', 'Birthday', 'Corporate'],
  },
];

const BADGE_COLORS: Record<string, string> = {
  Bestseller: '#9E1D2F', Premium: '#3A2B27', New: '#C9A66B',
  Heritage: '#5F5148', Exclusive: '#7D0F1C',
};

const perks = [
  { icon: Gift, text: 'Custom message card included' },
  { icon: Truck, text: 'Gift-wrapped & delivered pan-India' },
  { icon: Star, text: 'Premium packaging, every time' },
  { icon: CheckCircle, text: 'Bulk & corporate pricing available' },
];

function HamperCard({ h }: { h: typeof hampers[0] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);

  function handleAdd() {
    addItem({
      id: h.id,
      name: h.name,
      slug: h.slug,
      description: h.desc,
      price: h.price,
      original_price: h.original_price,
      image_url: h.image,
      category_id: null,
      category_name: 'Gift Hampers',
      weight: null,
      badge: h.badge,
      in_stock: true,
      featured: true,
    }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = h.original_price ? Math.round((1 - h.price / h.original_price) * 100) : null;

  return (
    <div className="group bg-[#FAF7F2] rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{ border: '1px solid #E7DDD2', boxShadow: '0 1px 12px rgba(90,50,30,0.06)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 40px rgba(90,50,30,0.12)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.06)'; }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image src={h.image} alt={h.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(58,43,39,0.4) 0%,transparent 50%)' }} />
        {h.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase text-white"
            style={{ ...F, background: BADGE_COLORS[h.badge] || '#9E1D2F' }}>
            {h.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] text-white font-semibold"
            style={{ ...F, background: '#C9A66B' }}>
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[#3A2B27] mb-1.5" style={{ ...FD, fontSize: '1.15rem', fontWeight: 600 }}>{h.name}</h3>
        <p className="text-[11px] text-[#5F5148] leading-relaxed mb-4 flex-1" style={F}>{h.desc}</p>

        {/* Occasions */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {h.occasions.map((o) => (
            <span key={o} className="text-[9px] px-2 py-0.5 rounded-full" style={{ ...F, background: 'rgba(201,166,107,0.1)', color: '#C9A66B', border: '1px solid rgba(201,166,107,0.2)' }}>
              {o}
            </span>
          ))}
        </div>

        {/* What's inside toggle */}
        <button onClick={() => setOpen(!open)} className="text-left text-[10px] tracking-wider uppercase font-medium text-[#5F5148] hover:text-[#9E1D2F] transition-colors mb-3" style={F}>
          {open ? 'Hide contents ▲' : "What's inside ▼"}
        </button>
        {open && (
          <ul className="mb-4 flex flex-col gap-1">
            {h.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[10px] text-[#5F5148]" style={F}>
                <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#C9A66B]" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#3A2B27] font-semibold" style={{ ...FD, fontSize: '1.25rem' }}>₹{h.price.toLocaleString()}</span>
            {h.original_price && <span className="text-[11px] text-[#5F5148] line-through" style={F}>₹{h.original_price.toLocaleString()}</span>}
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-medium text-white transition-colors"
            style={{ ...F, background: added ? '#5F5148' : '#9E1D2F' }}>
            <Gift size={11} strokeWidth={1.8} />
            {added ? 'Added!' : 'Add Gift'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GiftingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative py-24 px-5 lg:px-10 overflow-hidden" style={{ background: 'linear-gradient(135deg,#3A2B27 0%,#5F3A2A 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A66B 0%, transparent 50%), radial-gradient(circle at 80% 20%, #9E1D2F 0%, transparent 40%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(201,166,107,0.15)', border: '1px solid rgba(201,166,107,0.25)' }}>
            <Gift size={22} strokeWidth={1.5} className="text-[#C9A66B]" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A66B] mb-4 font-medium" style={F}>Gifting Collections</p>
          <h1 className="text-white mb-5" style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 600, lineHeight: 1.1 }}>
            Gift the <em className="text-[#C9A66B]">Taste of the Himalayas</em>
          </h1>
          <p className="text-white/60 text-[13px] leading-relaxed max-w-xl mx-auto" style={F}>
            Thoughtfully curated gift hampers for every occasion — from intimate celebrations to large corporate gifting.
          </p>
        </div>
      </div>

      {/* Perks bar */}
      <div style={{ background: '#FAF7F2', borderBottom: '1px solid #E7DDD2' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
          <div className="flex flex-wrap gap-5 justify-center">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={13} strokeWidth={1.5} className="text-[#C9A66B]" />
                <span className="text-[11px] text-[#5F5148]" style={F}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hampers Grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-2 font-medium" style={F}>Curated Collections</p>
            <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600 }}>
              Our Gift <em className="text-[#9E1D2F]">Hampers</em>
            </h2>
          </div>
          <p className="text-[12px] text-[#5F5148]" style={F}>{hampers.length} hampers available</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hampers.map((h) => <HamperCard key={h.id} h={h} />)}
        </div>
      </div>

      {/* Custom gifting CTA */}
      <div className="py-16 px-5 lg:px-10" style={{ background: '#EFE7DE' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Corporate & Bulk</p>
          <h2 className="text-[#3A2B27] mb-4" style={{ ...FD, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600 }}>
            Need a <em className="text-[#9E1D2F]">Custom Hamper?</em>
          </h2>
          <p className="text-[13px] text-[#5F5148] leading-relaxed mb-7 max-w-md mx-auto" style={F}>
            We create bespoke gift solutions for weddings, Diwali, Eid, and corporate events. Branding, custom notes, and bulk discounts available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white transition-colors hover:bg-[#7D0F1C]"
              style={{ ...F, background: '#9E1D2F' }}>
              Enquire Now <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
            <a href="tel:+919876543210"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-[#5F5148] border border-[#E7DDD2] hover:border-[#C9A66B] hover:text-[#9E1D2F] transition-all"
              style={F}>
              <Phone size={13} strokeWidth={1.5} />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

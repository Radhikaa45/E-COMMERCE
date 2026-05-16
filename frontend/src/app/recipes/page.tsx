'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const recipes = [
  {
    id: 1,
    name: 'Dum Pukht Biryani',
    category: 'Main Course',
    desc: 'A slow-cooked royal biryani with NEEKZ aged basmati, whole spices, and saffron milk — the definitive Kashmiri celebration dish.',
    time: '90 min',
    serves: '4–6',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80',
    ingredients: ['NEEKZ Aged Basmati', 'Green Cardamom', 'Saffron Strands', 'Caramelised Onions'],
    productSlug: 'biryani-king-special',
  },
  {
    id: 2,
    name: 'Bhaderwahi Rajmash Curry',
    category: 'Main Course',
    desc: 'The iconic GI-tagged kidney beans of Bhaderwah slow-cooked in a smoky mountain gravy. Serve with steaming basmati.',
    time: '60 min',
    serves: '4',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=700&auto=format&fit=crop&q=80',
    ingredients: ['Bhaderwahi Rajmash', 'Whole Cumin', 'Bay Leaves', 'Tomato & Ginger'],
    productSlug: 'bhaderwahi-rajmash',
  },
  {
    id: 3,
    name: 'Kashmiri Kahwa',
    category: 'Beverage',
    desc: 'The ancient green tea of Kashmir infused with saffron, cardamom, cinnamon, and blanched almonds. A ritual in every cup.',
    time: '15 min',
    serves: '2',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    ingredients: ['Green Cardamom', 'Kashmiri Saffron', 'Kashmir Almonds', 'Cinnamon Stick'],
    productSlug: 'green-cardamom',
  },
  {
    id: 4,
    name: 'Almond Milk Phirni',
    category: 'Dessert',
    desc: 'A silky rice pudding elevated with ground Kashmir almonds, cardamom, and rosewater. Served chilled in clay saucers.',
    time: '45 min',
    serves: '4',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=700&auto=format&fit=crop&q=80',
    ingredients: ['NEEKZ Basmati (ground)', 'Kashmir Almonds', 'Green Cardamom', 'Rosewater'],
    productSlug: 'kashmir-almonds',
  },
  {
    id: 5,
    name: 'Noon Chai (Pink Tea)',
    category: 'Beverage',
    desc: 'The iconic salty pink tea of Kashmir brewed with gunpowder green tea, baking soda, and milk. Topped with crushed nuts.',
    time: '20 min',
    serves: '2',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700&auto=format&fit=crop&q=80',
    ingredients: ['Kashmiri Noon Chai', 'Whole Milk', 'Himalayan Pink Salt', 'Premium Pistachios'],
    productSlug: 'kashmiri-noon-chai',
  },
  {
    id: 6,
    name: 'Trail Mix with Himalayan Nuts',
    category: 'Snack',
    desc: 'A lightly spiced trail mix using NEEKZ dry fruits — perfect for trekking, gifting, or mindful snacking at home.',
    time: '10 min',
    serves: '6',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
    ingredients: ['Kashmir Almonds', 'Himalayan Cashews', 'Premium Pistachios', 'Sun-dried Raisins'],
    productSlug: 'kashmir-almonds',
  },
];

const DIFF_COLOR: Record<string, string> = { Easy: '#5F8C5A', Medium: '#C9A66B', Advanced: '#9E1D2F' };

export default function RecipesPage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="py-16 px-5 lg:px-10 text-center" style={{ background: 'linear-gradient(180deg,#EFE7DE 0%,#F4EFE8 100%)' }}>
        <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>From Our Kitchen</p>
        <h1 className="text-[#3A2B27] mb-3" style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, lineHeight: 1.15 }}>
          Heritage <em className="text-[#9E1D2F]">Recipes</em>
        </h1>
        <p className="text-[13px] text-[#5F5148] max-w-md mx-auto" style={F}>
          Traditional Kashmiri and Jammu recipes passed down through generations, reimagined with our finest ingredients.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div key={r.id} className="group bg-[#FAF7F2] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid #E7DDD2', boxShadow: '0 1px 12px rgba(90,50,30,0.06)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 40px rgba(90,50,30,0.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.06)'; }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(58,43,39,0.5) 0%,transparent 50%)' }} />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[8px] tracking-widest uppercase text-white font-semibold"
                  style={{ ...F, background: 'rgba(58,43,39,0.65)', backdropFilter: 'blur(6px)' }}>
                  {r.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[8px] tracking-wider uppercase font-semibold"
                  style={{ ...F, background: 'rgba(250,247,242,0.9)', color: DIFF_COLOR[r.difficulty] }}>
                  {r.difficulty}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-[#3A2B27] mb-1.5" style={{ ...FD, fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.3 }}>{r.name}</h2>
                <p className="text-[11px] text-[#5F5148] leading-relaxed mb-4 flex-1" style={F}>{r.desc}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#5F5148]" style={F}>
                    <Clock size={11} strokeWidth={1.5} className="text-[#C9A66B]" /> {r.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#5F5148]" style={F}>
                    <Users size={11} strokeWidth={1.5} className="text-[#C9A66B]" /> Serves {r.serves}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#5F5148]" style={F}>
                    <ChefHat size={11} strokeWidth={1.5} className="text-[#C9A66B]" /> {r.difficulty}
                  </div>
                </div>

                {/* Key ingredients */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {r.ingredients.map((ing) => (
                    <span key={ing} className="text-[9px] px-2 py-0.5 rounded-full" style={{ ...F, background: '#EFE7DE', color: '#5F5148', border: '1px solid #E7DDD2' }}>
                      {ing}
                    </span>
                  ))}
                </div>

                <Link href={`/shop/${r.productSlug}`}
                  className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-medium text-[#9E1D2F]" style={F}>
                  Shop Key Ingredient <ArrowRight size={11} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-14 px-5 lg:px-10" style={{ background: '#EFE7DE' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Get Cooking</p>
          <h2 className="text-[#3A2B27] mb-5" style={{ ...FD, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600 }}>
            All the ingredients you need, <em className="text-[#9E1D2F]">right here</em>
          </h2>
          <Link href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors hover:bg-[#7D0F1C]"
            style={{ ...F, background: '#9E1D2F' }}>
            Shop Ingredients <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

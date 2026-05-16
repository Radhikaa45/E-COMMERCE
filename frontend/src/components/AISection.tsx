'use client';

import { Sparkles, ArrowRight } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const pairings = [
  {
    title: 'The Royal Biryani',
    items: ['Biryani King Rice', 'Green Cardamom', 'Black Pepper', 'Bay Leaves'],
    desc: 'A symphony of aged basmati and Himalayan spices for the most aromatic biryani.',
    mood: 'Festive & Rich',
    accent: '#D4A84B',
  },
  {
    title: 'The Kashmiri Morning',
    items: ['Kashmiri Noon Chai', 'Dried Apricots', 'Almonds', 'Chia Seeds'],
    desc: 'Start your morning with the warming ritual of Kashmir.',
    mood: 'Calm & Nourishing',
    accent: '#C96A8A',
  },
  {
    title: 'The Himalayan Feast',
    items: ['Bhaderwahi Rajmash', 'Jammu Basmati', 'Cumin Seeds', 'Cinnamon'],
    desc: 'A complete dal-chawal experience elevated with authentic Himalayan spices.',
    mood: 'Rustic & Hearty',
    accent: '#8B4513',
  },
];

export default function AISection() {
  return (
    <section className="py-24 px-5 lg:px-10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(201,166,107,0.1)', border: '1px solid #E7DDD2' }}
          >
            <Sparkles size={11} className="text-[#C9A66B]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#5F5148] font-medium" style={F}>AI-Curated Pairings</span>
          </div>
          <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 600 }}>
            Perfect <em className="text-[#9E1D2F]">Pairings</em>
          </h2>
          <p className="text-[#5F5148] text-sm max-w-sm mx-auto mt-3 leading-relaxed" style={F}>
            Intelligent combinations curated for exceptional flavour experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pairings.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 1px 12px rgba(90,50,30,0.05)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(90,50,30,0.10)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.05)'; }}
            >
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              <div className="p-6">
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-medium mb-4"
                  style={{ ...F, background: `${p.accent}18`, color: '#5F5148', border: '1px solid #E7DDD2' }}
                >
                  {p.mood}
                </span>

                <h3 className="text-[#3A2B27] font-semibold mb-2" style={{ ...FD, fontSize: '1.2rem', fontWeight: 600 }}>{p.title}</h3>
                <p className="text-[11px] text-[#5F5148] leading-relaxed mb-5" style={F}>{p.desc}</p>

                <div className="flex flex-col gap-2 mb-5">
                  {p.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                      <span className="text-[12px] text-[#3A2B27] font-medium" style={F}>{item}</span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-1.5 text-[#9E1D2F] group/btn">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-medium group-hover/btn:tracking-[0.24em] transition-all" style={F}>Shop This Pairing</span>
                  <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

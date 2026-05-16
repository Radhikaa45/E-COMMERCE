'use client';

import Image from 'next/image';
import { Leaf, Sparkles, Users, Mountain } from 'lucide-react';
import Link from 'next/link';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const pillars = [
  { icon: Leaf, title: 'Organic & Natural', desc: 'Free from additives and artificial processing — sourced in its purest form.' },
  { icon: Sparkles, title: 'Handpicked Excellence', desc: 'Artisans hand-select every batch for only the finest quality.' },
  { icon: Users, title: 'Direct Farmer Support', desc: 'Fair trade partnerships with Himalayan farming families.' },
  { icon: Mountain, title: 'Himalayan Provenance', desc: 'Unique altitude and climate that impart unmatched flavour.' },
];

export default function HeritageSection() {
  return (
    <section className="py-24 px-5 lg:px-10 bg-[#F4EFE8] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Image */}
        <div className="relative">
          <div
            className="relative rounded-3xl overflow-hidden h-[420px] lg:h-[520px]"
            style={{ boxShadow: '0 24px 64px rgba(90,50,30,0.16)' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1586201375362-ce7e78b5de09?w=800&auto=format&fit=crop&q=80"
              alt="Himalayan rice fields and heritage farming"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(58,43,39,0.55) 0%, transparent 50%)' }} />
            <div className="absolute bottom-7 left-7">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A66B] block mb-1" style={F}>Jammu & Kashmir</span>
              <p className="text-white leading-tight" style={{ ...FD, fontSize: '1.5rem', fontWeight: 600, fontStyle: 'italic' }}>
                Where Heritage<br />meets the Harvest
              </p>
            </div>
          </div>

          {/* Stat card */}
          <div
            className="absolute -bottom-5 -right-3 lg:-right-8 px-5 py-4 rounded-2xl flex items-center gap-4"
            style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 12px 36px rgba(90,50,30,0.12)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#9E1D2F,#7D0F1C)' }}>
              <Mountain size={16} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ ...FD, fontSize: '1.2rem', fontWeight: 600, color: '#3A2B27' }}>Est. 2020</p>
              <p className="text-[9px] tracking-wider uppercase text-[#5F5148]" style={F}>Artisan Heritage Brand</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Our Heritage</p>
          <h2 className="text-[#3A2B27] mb-5" style={{ ...FD, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, lineHeight: 1.2 }}>
            Born from the <em className="text-[#9E1D2F]">Himalayan</em> Heartland
          </h2>
          <div className="h-px w-14 bg-[#C9A66B] mb-6" />
          <p className="text-[#5F5148] leading-[1.85] mb-4 text-[0.95rem]" style={F}>
            NEEKZ Special was born from a deep reverence for Jammu & Kashmir — its valleys,
            its farmers, and centuries-old culinary traditions. We bridge the distance between
            Himalayan artisans and modern Indian kitchens.
          </p>
          <p className="text-[#5F5148] leading-[1.85] mb-9 text-[0.95rem]" style={F}>
            Every product carries the fingerprint of the families who grew it.
            When you cook with NEEKZ Special, you cook with heritage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg,#9E1D2F,#7D0F1C)' }}>
                  <Icon size={13} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[#3A2B27] font-semibold mb-0.5" style={{ ...FD, fontSize: '0.88rem', fontWeight: 600 }}>{title}</h4>
                  <p className="text-[11px] text-[#5F5148] leading-relaxed" style={F}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/heritage" className="inline-flex items-center gap-2.5 text-[#9E1D2F] group">
            <span className="text-[10px] tracking-[0.22em] uppercase font-medium group-hover:tracking-[0.28em] transition-all" style={F}>Read Our Full Story</span>
            <span className="h-px w-7 bg-[#9E1D2F] group-hover:w-10 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}

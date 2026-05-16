'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const testimonials = [
  { name: 'Priya Sharma', location: 'Reasi', rating: 5, product: 'Jammu Basmati Rice', text: 'The Jammu Basmati is unlike anything I\'ve had before. Each grain stands apart perfectly, and the fragrance fills the entire kitchen. NEEKZ Special has transformed our family dinners.' },
  { name: 'Arjun Mehta', location: 'Doda', rating: 5, product: 'Kashmiri Noon Chai', text: 'I ordered the Noon Chai for my mother who grew up in Kashmir. She said it tasted exactly like home. That says everything. The packaging was also beautifully crafted.' },
  { name: 'Riya Kapoor', location: 'jammu', rating: 5, product: 'Festive Dry Fruit Hamper', text: 'The dry fruit gift hamper for Diwali was a showstopper. My clients were genuinely impressed. This is the kind of gifting that leaves a lasting impression.' },
  { name: 'Vikram Nair', location: 'kashmir', rating: 5, product: 'Bhaderwahi Rajmash', text: 'The Bhaderwahi Rajmash took me back to my grandmother\'s kitchen in Jammu. Earthy, hearty, and genuinely from the source.' },
];

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0);
  const t = testimonials[cur];

  return (
    <section className="py-24 px-5 lg:px-10 bg-[#EFE7DE]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Voices of Our Circle</p>
          <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', fontWeight: 600, lineHeight: 1.2 }}>
            What Our <em className="text-[#9E1D2F]"> Flavor Circle</em> Says
          </h2>
          <div className="gold-divider mt-4" />
        </div>

        <div className="text-center px-4 sm:px-10">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(t.rating)].map((_, i) => <Star key={i} size={13} fill="#C9A66B" className="text-[#C9A66B]" />)}
          </div>

          {/* Quote */}
          <p
            key={cur}
            className="text-[#3A2B27] italic leading-[1.8] mb-7 transition-opacity"
            style={{ ...FD, fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', fontWeight: 400 }}
          >
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex flex-col items-center gap-1">
            <div className="h-px w-8 bg-[#C9A66B] mb-2" />
            <p className="text-[#3A2B27] font-semibold" style={{ ...FD, fontSize: '0.95rem', fontWeight: 600 }}>{t.name}</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5F5148]" style={F}>{t.location}</p>
            <p className="text-[10px] text-[#C9A66B] italic mt-0.5" style={F}>{t.product}</p>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-5 mt-9">
            <button
              onClick={() => setCur((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7DDD2] bg-[#FAF7F2] text-[#5F5148] hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all"
            >
              <ChevronLeft size={15} strokeWidth={1.5} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === cur ? '1.5rem' : '0.5rem', height: '0.5rem', background: i === cur ? '#9E1D2F' : '#DCCFC3' }}
                />
              ))}
            </div>
            <button
              onClick={() => setCur((c) => (c + 1) % testimonials.length)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7DDD2] bg-[#FAF7F2] text-[#5F5148] hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all"
            >
              <ChevronRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#E7DDD2]">
          {[
            { n: '4.9/5', l: 'Avg Rating', s: '1,200+ reviews' },
            { n: '5K+', l: 'Customers', s: '120+ cities' },
            { n: '98%', l: 'Reorder Rate', s: 'repeat purchases' },
          ].map(({ n, l, s }) => (
            <div key={l} className="text-center">
              <p className="text-[#9E1D2F] mb-0.5" style={{ ...FD, fontSize: '1.4rem', fontWeight: 600 }}>{n}</p>
              <p className="text-[11px] font-medium text-[#3A2B27]" style={F}>{l}</p>
              <p className="text-[9px] tracking-wider text-[#5F5148]" style={F}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

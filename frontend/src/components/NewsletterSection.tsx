'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); }
  };

  return (
    <section className="py-24 px-5 lg:px-10 relative overflow-hidden bg-[#3A2B27]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, #5F5148 0%, transparent 50%), radial-gradient(ellipse at 75% 25%, rgba(158,29,47,0.25) 0%, transparent 50%)' }} />
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-[#C9A66B]/8 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-[#C9A66B]/6 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-7 bg-[#C9A66B]/40" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#C9A66B] font-medium" style={F}>Exclusive Circle</span>
          <div className="h-px w-7 bg-[#C9A66B]/40" />
        </div>

        <h2 className="text-white mb-3" style={{ ...FD, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 600, lineHeight: 1.2 }}>
          Join Our <em style={{ color: '#C9A66B' }}>Artisanal</em> Circle
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-9" style={F}>
          First access to new collections, heritage recipes, harvest season offers, and exclusive member pricing.
        </p>

        {!done ? (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full text-[13px] outline-none"
              style={{ ...F, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,166,107,0.2)', color: 'white' }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(201,166,107,0.6)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,166,107,0.2)')}
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-90"
              style={{ ...F, background: '#C9A66B', color: '#3A2B27' }}
            >
              Subscribe <ArrowRight size={11} />
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            <CheckCircle size={32} className="text-[#C9A66B]" strokeWidth={1.5} />
            <p className="text-white italic" style={{ ...FD, fontSize: '1.3rem' }}>Welcome to the Circle</p>
            <p className="text-white/45 text-[12px]" style={F}>You&apos;ll hear from us soon with something special.</p>
          </div>
        )}

        <p className="text-white/25 text-[10px] mt-5 tracking-wider" style={F}>No spam, ever. Unsubscribe at any time.</p>

        <div className="flex flex-wrap justify-center gap-5 mt-8 pt-7 border-t border-white/10">
          {['Early Access', 'Heritage Recipes', 'Member Pricing', 'Harvest Updates'].map((b) => (
            <span key={b} className="text-[9px] tracking-[0.18em] uppercase text-[#C9A66B]/60 font-medium" style={F}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

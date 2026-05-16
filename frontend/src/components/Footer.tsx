import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, AtSign, Hash } from 'lucide-react';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const quickLinks = ['Shop All', 'Artisan Rice', 'Dry Fruits', 'Whole Spices', 'Gift Hampers', 'New Arrivals'];
const supportLinks = ['FAQs', 'Shipping Policy', 'Returns & Refunds', 'Track Order', 'Privacy Policy', 'Terms of Service'];
const socials = [
  { icon: AtSign, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Hash, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#3A2B27' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="text-white block" style={{ ...FD, fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.04em' }}>NEEKZ</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#C9A66B] -mt-0.5 block" style={F}>Special</span>
            </div>
            <p className="text-white/45 text-[12px] leading-relaxed mb-6" style={F}>
              Artisanal gourmet essentials handcrafted from the heart of Jammu & Kashmir.
            </p>
            <div className="flex gap-2.5 mb-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-white/12 text-white/40 hover:border-[#C9A66B]/60 hover:text-[#C9A66B] transition-all"
                >
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['100% Natural', 'GI-Tagged', 'Farmer-Direct'].map((c) => (
                <span key={c} className="text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ ...F, background: 'rgba(201,166,107,0.1)', border: '1px solid rgba(201,166,107,0.18)', color: 'rgba(201,166,107,0.7)' }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#C9A66B] mb-5" style={F}>Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <Link href="/shop" className="text-[12px] text-white/45 hover:text-white/80 transition-colors group flex items-center gap-2" style={F}>
                    <span className="w-0 group-hover:w-2.5 h-px bg-[#C9A66B] transition-all duration-300" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#C9A66B] mb-5" style={F}>Support</h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-[12px] text-white/45 hover:text-white/80 transition-colors group flex items-center gap-2" style={F}>
                    <span className="w-0 group-hover:w-2.5 h-px bg-[#C9A66B] transition-all duration-300" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#C9A66B] mb-5" style={F}>Contact</h4>
            <div className="flex flex-col gap-3.5 mb-6">
              <a href="mailto:hello@neekzspecial.com" className="flex items-start gap-2.5 group">
                <Mail size={13} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span className="text-[12px] text-white/45 group-hover:text-white/70 transition-colors" style={F}> shreevaishnavifoodssamba@gmail.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-start gap-2.5 group">
                <Phone size={13} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span className="text-[12px] text-white/45 group-hover:text-white/70 transition-colors" style={F}> +91 88999 14001</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={13} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span className="text-[12px] text-white/45 leading-relaxed" style={F}>   Shree Vaishnavi Foods<br />
        IGC, Phase III, Samba<br />
        Jammu & Kashmir - 184121</span>
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(201,166,107,0.06)', border: '1px solid rgba(201,166,107,0.12)' }}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-0.5" style={F}>Support Hours</p>
              <p className="text-[11px] text-white/40" style={F}>Mon – Sat, 9AM – 7PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(201,166,107,0.2),transparent)' }} />
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[10px]" style={F}>© {new Date().getFullYear()} NEEKZ Special. All rights reserved.</p>
          <p className="text-white/20 text-[10px]" style={F}>Crafted with ♥ from Jammu & Kashmir</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((i) => (
              <Link key={i} href="#" className="text-white/25 hover:text-white/50 text-[10px] transition-colors" style={F}>{i}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

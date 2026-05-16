import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Leaf, Award, Users } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const milestones = [
  { year: '2006', title: 'The Beginning', desc: 'A journey inspired by a passion for authentic flavors, quality ingredients, and timeless culinary traditions.' },
  { year: '2011', title: 'Going Beyond Rice', desc: "The collection grew with carefully selected gourmet products, bringing together tradition and exceptional taste." },
  { year: '2016', title: 'GI Recognition', desc: 'Several products in our catalogue received Geographical Indication tags, formally recognising the unique terroir of Jammu & Kashmir.' },
  { year: '2023', title: 'NEEKZ Special Born', desc: 'The brand was created to bring this decade heritage directly to urban kitchens across India through a curated digital storefront.' },
];

const values = [
  { icon: Leaf, title: 'Farm-to-Table Purity', desc: 'No additives, no artificial coloring, no compromise. What grows in the mountains is what reaches your kitchen.' },
  { icon: Award, title: 'GI-Tagged Authenticity', desc: 'We stock products that carry the Geographical Indication stamp, ensuring genuine origin and traceable provenance.' },
  { icon: Users, title: 'Farmer-First Economy', desc: 'We pay a premium to our partner farmers — 30% above market rate — to sustain livelihoods and encourage organic practices.' },
  { icon: MapPin, title: 'Nothern Valley', desc: 'Altitude, glacial water, and mountain soil give our products flavour profiles that simply cannot be replicated elsewhere.' },
];

export default function HeritagePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
          alt="Himalayan mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(58,43,39,0.75) 0%,rgba(58,43,39,0.2) 60%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-5 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A66B] mb-3" style={F}>Our Story</p>
          <h1 className="text-white mb-4" style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 600, lineHeight: 1.1 }}>
            Rooted in the<br /><em className="text-[#C9A66B]">Heart of Jammu &Kashmir</em>
          </h1>
          <p className="text-white/70 max-w-lg text-[13px] leading-relaxed" style={F}>
            Three decades of curating the finest gourmet produce from Jammu & Kashmir's mountains, valleys, and artisan farms.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-5 lg:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Who We Are</p>
              <h2 className="text-[#3A2B27] mb-6" style={{ ...FD, fontSize: 'clamp(1.7rem,3vw,2.6rem)', fontWeight: 600, lineHeight: 1.2 }}>
                Bringing the <em className="text-[#9E1D2F]">NOTHERN Pantry</em><br />to Modern Kitchens
              </h2>
              <p className="text-[13px] text-[#5F5148] leading-relaxed mb-4" style={F}>
                NEEKZ Special is not a product company — it is a curation movement. Every item we carry has been sourced through personal relationships with farmers, cooperatives, and artisans who have practiced their craft for generations in the mountains of Jammu & Kashmir.
              </p>
              <p className="text-[13px] text-[#5F5148] leading-relaxed mb-6" style={F}>
                From the long-grain basmati grown along the Tawi riverbanks to the wild-harvested almonds of Kashmir's high-altitude orchards, we believe that the best food carries the story of its land.
              </p>
              <Link href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white"
                style={{ ...F, background: '#9E1D2F' }}>
                Explore Our Products
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid #E7DDD2' }}>
              <Image
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80"
                alt="Rajmash beans from Bhaderwah"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw,50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-5 lg:px-10" style={{ background: '#EFE7DE' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Our Journey</p>
            <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.7rem,3vw,2.5rem)', fontWeight: 600 }}>
              Three Decades of <em className="text-[#9E1D2F]">Craft & Tradition</em>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[#E7DDD2] hidden md:block" />
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row gap-5 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-[#C9A66B] font-semibold text-sm mb-1 block" style={F}>{m.year}</span>
                    <h3 className="text-[#3A2B27] mb-2" style={{ ...FD, fontSize: '1.15rem', fontWeight: 600 }}>{m.title}</h3>
                    <p className="text-[12px] text-[#5F5148] leading-relaxed" style={F}>{m.desc}</p>
                  </div>
                  <div className="hidden md:flex w-8 h-8 rounded-full border-2 border-[#C9A66B] items-center justify-center flex-shrink-0 z-10" style={{ background: '#EFE7DE' }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#9E1D2F]" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-5 lg:px-10" style={{ background: '#FAF7F2' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>What We Stand For</p>
            <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.7rem,3vw,2.5rem)', fontWeight: 600 }}>
              Our <em className="text-[#9E1D2F]">Principles</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl" style={{ background: '#F4EFE8', border: '1px solid #E7DDD2' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(158,29,47,0.08)' }}>
                  <Icon size={18} strokeWidth={1.5} className="text-[#9E1D2F]" />
                </div>
                <h3 className="text-[#3A2B27] mb-2" style={{ ...FD, fontSize: '1.05rem', fontWeight: 600 }}>{title}</h3>
                <p className="text-[11px] text-[#5F5148] leading-relaxed" style={F}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landscape CTA */}
      <section className="relative py-24 px-5 lg:px-10 overflow-hidden" style={{ background: '#3A2B27' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-4 font-medium" style={F}>From Our Mountains</p>
          <h2 className="text-white mb-5" style={{ ...FD, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, lineHeight: 1.2 }}>
            Every bite is a journey<br />back to <em className="text-[#C9A66B]">where it came from</em>
          </h2>
          <p className="text-white/55 text-[13px] leading-relaxed mb-8 max-w-md mx-auto" style={F}>
            Taste the difference that altitude, tradition, and farmer-direct sourcing make in every meal.
          </p>
          <Link href="/shop"
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium transition-colors hover:bg-[#B8863A]"
            style={{ ...F, background: '#C9A66B', color: '#3A2B27' }}>
            Shop the Heritage Collection
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

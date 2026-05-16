'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Minus, Plus, ChevronLeft, Shield, Truck, Award, RotateCcw } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';
import Spinner from '@/components/ui/Spinner';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import api from '@/services/api';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const BADGE_COLORS: Record<string, string> = {
  Bestseller: '#9E1D2F', Premium: '#3A2B27', New: '#C9A66B',
  Heritage: '#5F5148', "Chef's Pick": '#7D0F1C',
};

const TRUST_BADGES = [
  { icon: Shield, text: '100% Natural' },
  { icon: Truck, text: 'Free Delivery ₹499+' },
  { icon: Award, text: 'GI-Tagged Products' },
  { icon: RotateCcw, text: 'Easy Returns' },
];

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem, isInCart, updateQty, items } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const cartItem = product ? items.find((i) => i.product_id === product.id) : null;
  const inCart = product ? isInCart(product.id) : false;

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.get(`/api/products/${slug}`)
      .then(({ data }) => setProduct(data.data || data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center py-40"><Spinner size={36} /></div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-[#5F5148] text-sm" style={F}>Product not found.</p>
          <Link href="/shop" className="text-[11px] tracking-wider uppercase text-[#9E1D2F] underline" style={F}>Back to Shop</Link>
        </div>
      </PageLayout>
    );
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/shop" className="flex items-center gap-1 text-[11px] text-[#5F5148] hover:text-[#9E1D2F] transition-colors" style={F}>
            <ChevronLeft size={13} strokeWidth={1.5} />
            Shop
          </Link>
          <span className="text-[#5F5148]/40 text-[11px]">/</span>
          {product.category_name && (
            <>
              <Link href={`/shop?category=${product.category_slug}`} className="text-[11px] text-[#5F5148] hover:text-[#9E1D2F] transition-colors" style={F}>
                {product.category_name}
              </Link>
              <span className="text-[#5F5148]/40 text-[11px]">/</span>
            </>
          )}
          <span className="text-[11px] text-[#3A2B27]" style={F}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#EFE7DE]" style={{ border: '1px solid #E7DDD2' }}>
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" priority />
              ) : (
                <div className="w-full h-full bg-[#EFE7DE]" />
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-semibold tracking-wider uppercase text-white"
                  style={{ ...F, background: BADGE_COLORS[product.badge] || '#9E1D2F' }}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-semibold tracking-wider text-white"
                  style={{ ...F, background: '#C9A66B' }}>
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            {product.category_name && (
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#C9A66B] mb-2 font-medium" style={F}>{product.category_name}</p>
            )}
            <h1 className="text-[#3A2B27] mb-2 leading-tight" style={{ ...FD, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600 }}>
              {product.name}
            </h1>

            {product.weight && (
              <p className="text-[12px] text-[#5F5148]/70 mb-4" style={F}>Net Weight: {product.weight}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9A66B" className="text-[#C9A66B]" />)}
              </div>
              <span className="text-[11px] text-[#5F5148]" style={F}>4.9 · 128 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[#3A2B27]" style={{ ...FD, fontSize: '2rem', fontWeight: 700 }}>₹{product.price}</span>
              {product.original_price && (
                <>
                  <span className="text-[#5F5148] line-through text-lg" style={FD}>₹{product.original_price}</span>
                  <span className="text-[11px] font-semibold text-[#9E1D2F] px-2 py-0.5 rounded-full" style={{ ...F, background: 'rgba(158,29,47,0.08)' }}>
                    Save ₹{product.original_price - product.price}
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <p className="text-[13px] text-[#5F5148] leading-relaxed mb-6" style={F}>{product.description}</p>
            )}

            {/* Quantity + Cart */}
            {product.in_stock ? (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center rounded-full overflow-hidden" style={{ border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="px-4 py-2.5 text-[14px] text-[#3A2B27] font-medium min-w-[2.5rem] text-center" style={F}>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <button onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white transition-colors"
                  style={{ ...F, background: added ? '#5F5148' : '#9E1D2F' }}>
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  {added ? 'Added to Cart!' : inCart ? 'Add More' : 'Add to Cart'}
                </button>
                <button onClick={() => setWished(!wished)}
                  className="w-12 h-11 rounded-full flex items-center justify-center border transition-colors flex-shrink-0"
                  style={{ borderColor: wished ? '#9E1D2F' : '#E7DDD2', background: '#FAF7F2' }}>
                  <Heart size={15} strokeWidth={1.5} fill={wished ? '#9E1D2F' : 'none'} className={wished ? 'text-[#9E1D2F]' : 'text-[#5F5148]'} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-6 px-5 py-3 rounded-full text-[12px] text-[#5F5148]" style={{ ...F, border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
                Currently out of stock
              </div>
            )}

            {inCart && cartItem && (
              <Link href="/cart" className="block text-center text-[11px] tracking-wider uppercase text-[#9E1D2F] mb-6 hover:underline" style={F}>
                View Cart ({cartItem.quantity} item{cartItem.quantity > 1 ? 's' : ''}) →
              </Link>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
                  <Icon size={14} strokeWidth={1.5} className="text-[#C9A66B] flex-shrink-0" />
                  <span className="text-[10px] text-[#5F5148]" style={F}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';
import { useCart } from '@/context/CartContext';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const DELIVERY_FEE = 79;
const FREE_DELIVERY_AT = 499;

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total, count } = useCart();

  const isFreeDelivery = total >= FREE_DELIVERY_AT;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-32 px-5 gap-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: '#EFE7DE' }}>
            <ShoppingBag size={32} strokeWidth={1} className="text-[#C9A66B]" />
          </div>
          <div className="text-center">
            <h2 className="text-[#3A2B27] mb-2" style={{ ...FD, fontSize: '1.8rem', fontWeight: 600 }}>Your cart is empty</h2>
            <p className="text-[13px] text-[#5F5148]" style={F}>Add your favourite gourmet picks to get started.</p>
          </div>
          <Link href="/shop"
            className="flex items-center gap-2 px-8 py-3 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white transition-colors"
            style={{ ...F, background: '#9E1D2F' }}>
            Browse Shop <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Your Selection</p>
            <h1 className="text-[#3A2B27]" style={{ ...FD, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600 }}>
              Shopping Cart <span className="text-[#5F5148]" style={{ fontSize: '1rem', fontWeight: 400 }}>({count} item{count !== 1 ? 's' : ''})</span>
            </h1>
          </div>
          <button onClick={clearCart} className="text-[11px] text-[#5F5148] hover:text-[#9E1D2F] transition-colors underline" style={F}>
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
                {/* Image */}
                <Link href={`/shop/${item.slug}`} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#EFE7DE]">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      {item.category && (
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-0.5" style={F}>{item.category}</p>
                      )}
                      <Link href={`/shop/${item.slug}`}>
                        <h3 className="text-[#3A2B27] font-semibold leading-snug truncate" style={{ ...FD, fontSize: '1rem', fontWeight: 600 }}>{item.name}</h3>
                      </Link>
                      {item.weight && <p className="text-[10px] text-[#5F5148]/60 mt-0.5" style={F}>{item.weight}</p>}
                    </div>
                    <button onClick={() => removeItem(item.product_id)} className="text-[#5F5148]/40 hover:text-[#9E1D2F] transition-colors flex-shrink-0">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center rounded-full overflow-hidden" style={{ border: '1px solid #E7DDD2' }}>
                      <button onClick={() => updateQty(item.product_id, item.quantity - 1)}
                        className="px-3 py-1.5 text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
                        <Minus size={11} strokeWidth={1.8} />
                      </button>
                      <span className="px-3 py-1.5 text-[12px] text-[#3A2B27] font-medium" style={F}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product_id, item.quantity + 1)}
                        className="px-3 py-1.5 text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
                        <Plus size={11} strokeWidth={1.8} />
                      </button>
                    </div>
                    {/* Price */}
                    <span className="text-[#3A2B27] font-semibold" style={{ ...FD, fontSize: '1.1rem' }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-6 sticky top-24" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
              <h2 className="text-[#3A2B27] mb-5" style={{ ...FD, fontSize: '1.3rem', fontWeight: 600 }}>Order Summary</h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-[12px]" style={F}>
                  <span className="text-[#5F5148]">Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
                  <span className="text-[#3A2B27] font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[12px]" style={F}>
                  <span className="text-[#5F5148]">Delivery</span>
                  <span className={isFreeDelivery ? 'text-green-600 font-medium' : 'text-[#3A2B27] font-medium'}>
                    {isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {!isFreeDelivery && (
                  <div className="text-[10px] text-[#C9A66B] px-3 py-2 rounded-xl" style={{ ...F, background: 'rgba(201,166,107,0.08)', border: '1px solid rgba(201,166,107,0.15)' }}>
                    Add ₹{(FREE_DELIVERY_AT - total).toLocaleString()} more for free delivery
                  </div>
                )}
                <div className="h-px bg-[#E7DDD2] my-1" />
                <div className="flex justify-between">
                  <span className="text-[13px] font-semibold text-[#3A2B27]" style={F}>Total</span>
                  <span className="font-semibold text-[#3A2B27]" style={{ ...FD, fontSize: '1.3rem' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="flex items-center flex-1 rounded-full overflow-hidden" style={{ border: '1px solid #E7DDD2', background: '#fff' }}>
                  <Tag size={12} strokeWidth={1.5} className="ml-3 text-[#5F5148]/40" />
                  <input placeholder="Coupon code" className="flex-1 px-2 py-2 text-[11px] outline-none bg-transparent text-[#3A2B27]" style={F} />
                </div>
                <button className="px-4 py-2 rounded-full text-[10px] tracking-wider uppercase text-[#5F5148] border border-[#E7DDD2] hover:border-[#C9A66B] hover:text-[#9E1D2F] transition-all" style={F}>
                  Apply
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white transition-colors hover:bg-[#7D0F1C]"
                style={{ ...F, background: '#9E1D2F' }}>
                Proceed to Checkout <ArrowRight size={13} strokeWidth={1.5} />
              </button>

              <p className="text-center text-[10px] text-[#5F5148]/50 mt-3" style={F}>
                Secure checkout · 128-bit SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

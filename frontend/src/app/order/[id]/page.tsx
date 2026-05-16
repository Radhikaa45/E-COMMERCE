'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle, Package, MapPin, Clock,
  ArrowRight, Truck, AlertCircle,
} from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import type { Order, OrderItem } from '@/types';
import Skeleton from '@/components/ui/Skeleton';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: '#FEF3C7', color: '#92400E', label: 'Pending' },
  confirmed:  { bg: '#DBEAFE', color: '#1E40AF', label: 'Confirmed' },
  processing: { bg: '#EDE9FE', color: '#5B21B6', label: 'Processing' },
  shipped:    { bg: '#E0F2FE', color: '#0369A1', label: 'Shipped' },
  delivered:  { bg: '#D1FAE5', color: '#065F46', label: 'Delivered' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B', label: 'Cancelled' },
};

const PAY_LABELS: Record<string, string> = {
  cod: 'Cash on Delivery', online: 'Online Payment', upi: 'UPI Payment',
};
const PAY_STATUS_LABELS: Record<string, string> = {
  pending: 'Payment Pending', paid: 'Paid', failed: 'Failed', refunded: 'Refunded',
};

function estimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ── Order skeleton ─────────────────────────────────────────────────────── */
function OrderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 py-8">
        <Skeleton className="w-20 h-20 rounded-full mx-auto" />
        <Skeleton className="h-8 w-56 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
      <div className="rounded-2xl p-6 space-y-3" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Timeline tracker ───────────────────────────────────────────────────── */
const TIMELINE: { status: string; label: string }[] = [
  { status: 'pending',    label: 'Order Placed' },
  { status: 'confirmed',  label: 'Confirmed' },
  { status: 'processing', label: 'Packing' },
  { status: 'shipped',    label: 'Shipped' },
  { status: 'delivered',  label: 'Delivered' },
];

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

function OrderTracker({ status }: { status: string }) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 justify-center text-[#991B1B] text-[12px]" style={F}>
        <AlertCircle size={14} />
        This order has been cancelled.
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(status);

  return (
    <div className="flex items-center justify-between relative">
      {/* Progress line */}
      <div className="absolute top-4 left-4 right-4 h-0.5" style={{ background: '#E7DDD2' }}>
        <div
          className="h-full transition-all duration-700"
          style={{
            background: '#9E1D2F',
            width: `${Math.min((currentIdx / (TIMELINE.length - 1)) * 100, 100)}%`,
          }}
        />
      </div>

      {TIMELINE.map(({ status: s, label }, i) => {
        const done   = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s} className="flex flex-col items-center gap-2 relative z-10">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: done ? '#9E1D2F' : '#FAF7F2',
                border: `2px solid ${done ? '#9E1D2F' : '#E7DDD2'}`,
              }}
            >
              {done && i < currentIdx && <CheckCircle size={14} className="text-white" strokeWidth={2.5} />}
              {active && <div className="w-3 h-3 rounded-full bg-white" />}
              {!done && <div className="w-2 h-2 rounded-full" style={{ background: '#E7DDD2' }} />}
            </div>
            <span className="text-[9px] text-center font-medium" style={{ ...F, color: done ? '#3A2B27' : '#5F5148/50', maxWidth: 56 }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function OrderPage() {
  const { id }        = useParams<{ id: string }>();
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const { user, loading: authLoading } = useAuth();
  const isNew         = searchParams.get('new') === '1';

  const [order,   setOrder]   = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || authLoading) return;
    api.get(`/api/orders/${id}`)
      .then(({ data }) => setOrder(data.data))
      .catch(() => setError('Order not found or access denied.'))
      .finally(() => setLoading(false));
  }, [id, user, authLoading]);

  if (authLoading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE8' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-[#9E1D2F] border-[#E7DDD2] animate-spin" />
      </div>
    );
  }

  const statusMeta = order ? (STATUS_STYLES[order.status] ?? STATUS_STYLES.pending) : null;

  return (
    <div className="min-h-screen" style={{ background: '#F4EFE8' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 px-5 lg:px-10 py-4 flex items-center justify-between" style={{ background: '#FAF7F2', borderBottom: '1px solid #E7DDD2' }}>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#3A2B27] font-semibold text-[18px]" style={FD}>NEEKZ</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A66B]" style={F}>Special</span>
        </Link>
        <Link href="/shop" className="flex items-center gap-2 text-[12px] font-medium text-[#5F5148] hover:text-[#9E1D2F] transition-colors" style={F}>
          Continue Shopping <ArrowRight size={13} />
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
        {loading ? (
          <OrderSkeleton />
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle size={40} className="mx-auto text-[#9E1D2F] mb-4" strokeWidth={1.2} />
            <p className="text-[#5F5148] text-sm" style={F}>{error}</p>
            <Link href="/shop" className="mt-4 inline-block text-[11px] text-[#9E1D2F] underline" style={F}>
              Go to Shop
            </Link>
          </div>
        ) : order ? (
          <>
            {/* Success banner */}
            <div className="text-center py-6">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(22,163,74,0.08)', animation: 'ping 1s ease-out 1' }}
                />
                <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ background: '#D1FAE5' }}>
                  <CheckCircle size={36} className="text-green-600" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A66B] mb-2" style={F}>
                {isNew ? 'Order Placed Successfully' : 'Order Details'}
              </p>
              <h1 className="text-[#3A2B27] mb-1" style={{ ...FD, fontSize: '2rem', fontWeight: 600 }}>
                Order #{order.id}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{ background: statusMeta?.bg, color: statusMeta?.color, ...F }}
                >
                  {statusMeta?.label}
                </span>
              </div>
              {isNew && (
                <p className="mt-3 text-[12px] text-[#5F5148]" style={F}>
                  A confirmation has been placed. Estimated delivery by{' '}
                  <strong>{estimatedDelivery()}</strong>.
                </p>
              )}
            </div>

            {/* Order tracker */}
            <div className="rounded-2xl p-6" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
              <div className="flex items-center gap-2 mb-5">
                <Truck size={14} className="text-[#9E1D2F]" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold text-[#3A2B27]" style={F}>Order Status</p>
              </div>
              <OrderTracker status={order.status} />
            </div>

            {/* Order items */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
              <div className="px-5 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-[#9E1D2F]" strokeWidth={1.8} />
                  <p className="text-[11px] font-semibold text-[#3A2B27]" style={F}>
                    Items Ordered ({(order.items ?? []).length})
                  </p>
                </div>
              </div>
              <div className="divide-y divide-[#E7DDD2]">
                {(order.items ?? []).map((item: OrderItem) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#EFE7DE] flex items-center justify-center"
                      style={{ border: '1px solid #E7DDD2' }}
                    >
                      {item.product_image
                        ? <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                        : <Package size={16} className="text-[#5F5148]/30" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#3A2B27] truncate" style={F}>{item.product_name}</p>
                      <p className="text-[11px] text-[#5F5148]/60" style={F}>Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[13px] font-semibold text-[#3A2B27] flex-shrink-0" style={FD}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order totals */}
              <div className="px-5 py-4 space-y-2" style={{ background: '#F4EFE8', borderTop: '1px solid #E7DDD2' }}>
                <div className="flex justify-between text-[12px]" style={F}>
                  <span className="text-[#5F5148]">Subtotal</span>
                  <span className="font-medium text-[#3A2B27]">
                    ₹{(order.items ?? []).reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[12px]" style={F}>
                  <span className="text-[#5F5148]">Delivery</span>
                  <span className="font-medium text-[#3A2B27]">
                    {Number(order.total_amount) - (order.items ?? []).reduce((s, i) => s + i.price * i.quantity, 0) === 0
                      ? 'FREE'
                      : `₹${Number(order.total_amount) - (order.items ?? []).reduce((s, i) => s + i.price * i.quantity, 0)}`
                    }
                  </span>
                </div>
                <div className="h-px" style={{ background: '#E7DDD2' }} />
                <div className="flex justify-between">
                  <span className="text-[13px] font-semibold text-[#3A2B27]" style={F}>Total Paid</span>
                  <span className="font-bold text-[#3A2B27]" style={{ ...FD, fontSize: '1.2rem' }}>
                    ₹{Number(order.total_amount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping info */}
            {order.shipping_name && (
              <div className="rounded-2xl p-5" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-[#9E1D2F]" strokeWidth={1.8} />
                  <p className="text-[11px] font-semibold text-[#3A2B27]" style={F}>Delivery Address</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[13px] font-semibold text-[#3A2B27]" style={F}>{order.shipping_name}</p>
                  <p className="text-[12px] text-[#5F5148]" style={F}>{order.shipping_address}</p>
                  <p className="text-[12px] text-[#5F5148]" style={F}>
                    {[order.shipping_city, order.shipping_state, order.shipping_pincode].filter(Boolean).join(', ')}
                  </p>
                  <p className="text-[12px] text-[#5F5148]" style={F}>{order.shipping_phone}</p>
                </div>
              </div>
            )}

            {/* Payment info */}
            <div className="rounded-2xl p-5" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-[#9E1D2F]" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold text-[#3A2B27]" style={F}>Payment Info</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#5F5148]/50 uppercase tracking-wider mb-0.5" style={F}>Method</p>
                  <p className="text-[12px] font-medium text-[#3A2B27]" style={F}>{PAY_LABELS[order.payment_method] || order.payment_method}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5F5148]/50 uppercase tracking-wider mb-0.5" style={F}>Status</p>
                  <p className="text-[12px] font-medium" style={{ ...F, color: order.payment_status === 'paid' ? '#065F46' : '#92400E' }}>
                    {PAY_STATUS_LABELS[order.payment_status] || order.payment_status}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5F5148]/50 uppercase tracking-wider mb-0.5" style={F}>Placed on</p>
                  <p className="text-[12px] font-medium text-[#3A2B27]" style={F}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Link
                href="/shop"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors hover:opacity-90"
                style={{ ...F, background: '#9E1D2F' }}
              >
                <ArrowRight size={13} /> Continue Shopping
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

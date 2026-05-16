'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ShoppingCart, Package, Check } from 'lucide-react';
import api from '@/services/api';
import type { Order, Pagination } from '@/types';
import { OrderRowSkeleton } from '@/components/ui/Skeleton';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const ORDER_STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
const PAY_STATUSES   = ['pending', 'paid', 'failed', 'refunded'] as const;

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#FEF3C7', color: '#92400E' },
  confirmed:  { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' },
  shipped:    { bg: '#E0F2FE', color: '#0369A1' },
  delivered:  { bg: '#D1FAE5', color: '#065F46' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
};

const PAY_STYLES: Record<string, { bg: string; color: string }> = {
  pending:  { bg: '#FEF3C7', color: '#92400E' },
  paid:     { bg: '#D1FAE5', color: '#065F46' },
  failed:   { bg: '#FEE2E2', color: '#991B1B' },
  refunded: { bg: '#E5E7EB', color: '#374151' },
};

function Badge({ status, map }: { status: string; map: Record<string, { bg: string; color: string }> }) {
  const s = map[status] ?? { bg: '#F3F4F6', color: '#374151' };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize"
      style={{ ...F, background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

/* ── Status Updater ──────────────────────────────────────────────────────── */
function StatusSelect({
  orderId,
  current,
  options,
  onUpdated,
  field,
  styleMap,
}: {
  orderId: number;
  current: string;
  options: readonly string[];
  onUpdated: (id: number, field: string, val: string) => void;
  field: string;
  styleMap: Record<string, { bg: string; color: string }>;
}) {
  const [loading, setLoading] = useState(false);
  const s = styleMap[current] ?? { bg: '#F3F4F6', color: '#374151' };

  async function handleChange(val: string) {
    setLoading(true);
    try {
      await api.patch(`/api/admin/orders/${orderId}/status`, { [field]: val });
      onUpdated(orderId, field, val);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="pl-3 pr-7 py-1 rounded-full text-[10px] font-semibold capitalize cursor-pointer outline-none appearance-none"
        style={{ ...F, background: s.bg, color: s.color, border: 'none', opacity: loading ? 0.6 : 1 }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={9} className="absolute right-2 pointer-events-none" style={{ color: s.color }} />
    </div>
  );
}

/* ── Expandable Row ──────────────────────────────────────────────────────── */
function OrderRow({ order, onUpdated }: { order: Order; onUpdated: (id: number, field: string, val: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="grid items-center px-5 py-3.5 hover:bg-[#F4EFE8] transition-colors cursor-pointer"
        style={{ gridTemplateColumns: '64px 1fr 120px 110px 120px 120px 50px' }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* ID */}
        <span className="text-[12px] font-semibold text-[#9E1D2F]" style={FD}>#{order.id}</span>

        {/* Customer */}
        <div className="min-w-0 pr-2">
          <p className="text-[12px] font-medium text-[#3A2B27] truncate" style={F}>{order.customer_name || 'Guest'}</p>
          <p className="text-[10px] text-[#5F5148]/50 truncate" style={F}>{order.customer_email || order.shipping_phone || '—'}</p>
        </div>

        {/* Date */}
        <p className="text-[11px] text-[#5F5148]" style={F}>
          {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
        </p>

        {/* Total */}
        <p className="text-[13px] font-semibold text-[#3A2B27]" style={FD}>
          ₹{Number(order.total_amount).toLocaleString('en-IN')}
        </p>

        {/* Order Status */}
        <div onClick={(e) => e.stopPropagation()}>
          <StatusSelect
            orderId={order.id}
            current={order.status}
            options={ORDER_STATUSES.filter((s) => s !== 'all')}
            field="status"
            styleMap={STATUS_STYLES}
            onUpdated={onUpdated}
          />
        </div>

        {/* Payment Status */}
        <div onClick={(e) => e.stopPropagation()}>
          <StatusSelect
            orderId={order.id}
            current={order.payment_status}
            options={PAY_STATUSES}
            field="payment_status"
            styleMap={PAY_STYLES}
            onUpdated={onUpdated}
          />
        </div>

        {/* Expand toggle */}
        <ChevronDown
          size={13}
          className="text-[#5F5148]/40 transition-transform ml-auto"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-4 pt-1" style={{ background: '#F4EFE8', borderTop: '1px solid #E7DDD2' }}>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {/* Shipping */}
            {order.shipping_name && (
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#5F5148]/50 mb-1.5" style={F}>Shipping To</p>
                <p className="text-[12px] font-medium text-[#3A2B27]" style={F}>{order.shipping_name}</p>
                <p className="text-[11px] text-[#5F5148]" style={F}>
                  {[order.shipping_address, order.shipping_city, order.shipping_state, order.shipping_pincode].filter(Boolean).join(', ')}
                </p>
                {order.shipping_phone && <p className="text-[11px] text-[#5F5148]" style={F}>{order.shipping_phone}</p>}
              </div>
            )}
            {/* Payment */}
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#5F5148]/50 mb-1.5" style={F}>Payment</p>
              <div className="flex items-center gap-2">
                <Badge status={order.payment_status} map={PAY_STYLES} />
                <span className="text-[11px] text-[#5F5148] capitalize" style={F}>{order.payment_method}</span>
              </div>
              {order.notes && (
                <p className="text-[11px] text-[#5F5148]/60 mt-1.5 italic" style={F}>Note: {order.notes}</p>
              )}
            </div>
          </div>

          {/* Items */}
          {(order.items?.length ?? 0) > 0 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#5F5148]/50 mb-2" style={F}>Order Items</p>
              <div className="space-y-1.5">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
                    <div className="flex items-center gap-3">
                      <Package size={13} className="text-[#5F5148]/40" />
                      <span className="text-[12px] font-medium text-[#3A2B27]" style={F}>{item.product_name}</span>
                      <span className="text-[10px] text-[#5F5148]/60" style={F}>×{item.quantity}</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#3A2B27]" style={FD}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────────── */
export default function AdminOrdersPage() {
  const [orders,     setOrders]     = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 20, pages: 0 });
  const [loading,    setLoading]    = useState(true);
  const [status,     setStatus]     = useState<string>('all');
  const [toast,      setToast]      = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/orders', {
        params: { page, limit: 20, status: status !== 'all' ? status : undefined },
      });
      setOrders(data.data);
      setPagination(data.pagination);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetchOrders(1); }, [status, fetchOrders]);

  function handleStatusUpdate(id: number, field: string, val: string) {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, [field]: val } : o)
    );
    showToast('Order updated.');
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-white text-[12px] font-medium shadow-xl" style={{ ...F, background: '#3A2B27' }}>
          <Check size={13} />{toast}
        </div>
      )}

      {/* Header */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Fulfilment</p>
        <h1 className="text-[#3A2B27]" style={{ ...FD, fontSize: '2rem', fontWeight: 600 }}>Orders</h1>
        <p className="text-[12px] text-[#5F5148]/70 mt-0.5" style={F}>{pagination.total} orders total</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className="px-4 py-2 rounded-full text-[11px] font-medium capitalize transition-all"
            style={{
              ...F,
              background: status === s ? '#9E1D2F' : '#FAF7F2',
              color:      status === s ? '#fff'     : '#5F5148',
              border: '1px solid',
              borderColor: status === s ? '#9E1D2F' : '#E7DDD2',
            }}
          >
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
        {loading ? (
          <div>
            {Array.from({ length: 8 }).map((_, i) => (
              <OrderRowSkeleton key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingCart size={32} className="mx-auto text-[#5F5148]/20 mb-3" strokeWidth={1.2} />
            <p className="text-[#5F5148]/50 text-sm" style={F}>No orders{status !== 'all' ? ` with status "${status}"` : ''} yet.</p>
          </div>
        ) : (
          <>
            {/* Header row */}
            <div
              className="grid px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-semibold text-[#5F5148]/60"
              style={{ gridTemplateColumns: '64px 1fr 120px 110px 120px 120px 50px', borderBottom: '1px solid #E7DDD2', background: '#F0EBE3' }}
            >
              <span>Order</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Total</span>
              <span>Status</span>
              <span>Payment</span>
              <span />
            </div>

            <div className="divide-y divide-[#E7DDD2]">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} onUpdated={handleStatusUpdate} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: '1px solid #E7DDD2' }}>
                <p className="text-[11px] text-[#5F5148]/60" style={F}>
                  Page {pagination.page} of {pagination.pages} ({pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchOrders(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 hover:bg-[#E7DDD2] transition-colors text-[#5F5148]"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => fetchOrders(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 hover:bg-[#E7DDD2] transition-colors text-[#5F5148]"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

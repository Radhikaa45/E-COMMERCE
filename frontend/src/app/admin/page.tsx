'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Tag, ShoppingCart, TrendingUp, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import api from '@/services/api';
import type { DashboardStats, Order } from '@/types';
import { StatCardSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#FEF3C7', color: '#92400E' },
  confirmed:  { bg: '#DBEAFE', color: '#1E40AF' },
  processing: { bg: '#EDE9FE', color: '#5B21B6' },
  shipped:    { bg: '#D1FAE5', color: '#065F46' },
  delivered:  { bg: '#D1FAE5', color: '#065F46' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
};

const PAY_STYLES: Record<string, { bg: string; color: string }> = {
  pending:  { bg: '#FEF3C7', color: '#92400E' },
  paid:     { bg: '#D1FAE5', color: '#065F46' },
  failed:   { bg: '#FEE2E2', color: '#991B1B' },
  refunded: { bg: '#E5E7EB', color: '#374151' },
};

function StatCard({
  icon: Icon, label, value, sub, href, color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: '#FAF7F2',
        border: '1px solid #E7DDD2',
        boxShadow: '0 1px 10px rgba(90,50,30,0.05)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={18} style={{ color }} strokeWidth={1.8} />
        </div>
        <ArrowRight size={14} className="text-[#5F5148]/30 mt-1" />
      </div>
      <p className="text-3xl font-semibold text-[#3A2B27] mb-1" style={FD}>{value}</p>
      <p className="text-[11px] font-medium text-[#5F5148]" style={F}>{label}</p>
      {sub && <p className="text-[10px] text-[#5F5148]/50 mt-0.5" style={F}>{sub}</p>}
    </Link>
  );
}

function StatusBadge({ status, map }: { status: string; map: Record<string, { bg: string; color: string }> }) {
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/admin/stats')
      .then(({ data }) => setStats(data.data))
      .catch(() => setError('Failed to load dashboard data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-2.5 w-16 skeleton-shimmer rounded-full mb-2" />
          <div className="h-8 w-40 skeleton-shimmer rounded-xl" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0,1,2,3].map((i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
              <div className="h-3.5 w-28 skeleton-shimmer rounded-full" />
            </div>
            {[0,1,2,3,4].map((i) => <TableRowSkeleton key={i} cols={3} />)}
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
              <div className="h-3.5 w-20 skeleton-shimmer rounded-full" />
            </div>
            {[0,1,2,3].map((i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3.5" style={{ borderBottom: '1px solid #E7DDD2' }}>
                <div className="h-3 w-28 skeleton-shimmer rounded-full" />
                <div className="h-5 w-14 skeleton-shimmer rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl p-6 text-[#9E1D2F] text-sm" style={{ background: 'rgba(158,29,47,0.06)', border: '1px solid rgba(158,29,47,0.15)' }}>
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Overview</p>
        <h1 className="text-[#3A2B27]" style={{ ...FD, fontSize: '2rem', fontWeight: 600 }}>Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          label="Total Products"
          value={stats?.totalProducts ?? 0}
          href="/admin/products"
          color="#9E1D2F"
        />
        <StatCard
          icon={Tag}
          label="Categories"
          value={stats?.totalCategories ?? 0}
          href="/admin/categories"
          color="#C9A66B"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={stats?.totalOrders ?? 0}
          href="/admin/orders"
          color="#5F5148"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={`₹${(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}`}
          sub="From paid orders"
          href="/admin/orders"
          color="#3A2B27"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}
        >
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E7DDD2' }}>
            <div className="flex items-center gap-2.5">
              <Clock size={15} strokeWidth={1.8} className="text-[#9E1D2F]" />
              <span className="text-[12px] font-semibold text-[#3A2B27]" style={F}>Recent Orders</span>
            </div>
            <Link href="/admin/orders" className="text-[10px] text-[#9E1D2F] hover:underline" style={F}>
              View all →
            </Link>
          </div>

          {!stats?.recentOrders?.length ? (
            <div className="px-6 py-10 text-center">
              <ShoppingCart size={28} className="text-[#5F5148]/25 mx-auto mb-3" strokeWidth={1.2} />
              <p className="text-[#5F5148]/50 text-sm" style={F}>No orders yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E7DDD2]">
              {stats.recentOrders.map((order: Order) => (
                <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#3A2B27] truncate" style={F}>
                      {order.customer_name || 'Guest'} — #{order.id}
                    </p>
                    <p className="text-[10px] text-[#5F5148]/60 truncate mt-0.5" style={F}>
                      {order.customer_email || '—'} · {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={order.status} map={STATUS_STYLES} />
                    <span className="text-[12px] font-semibold text-[#3A2B27]" style={FD}>
                      ₹{Number(order.total_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}
        >
          <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: '1px solid #E7DDD2' }}>
            <AlertTriangle size={15} strokeWidth={1.8} className="text-[#C9A66B]" />
            <span className="text-[12px] font-semibold text-[#3A2B27]" style={F}>Low Stock</span>
          </div>

          {!stats?.lowStock?.length ? (
            <div className="px-6 py-10 text-center">
              <p className="text-[#5F5148]/50 text-sm" style={F}>All products are well stocked.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E7DDD2]">
              {stats.lowStock.map((p) => (
                <div key={p.id} className="px-6 py-3.5 flex items-center justify-between">
                  <p className="text-[11px] text-[#3A2B27] font-medium truncate flex-1 mr-3" style={F}>{p.name}</p>
                  <span
                    className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      ...F,
                      background: p.stock_count === 0 ? '#FEE2E2' : '#FEF3C7',
                      color: p.stock_count === 0 ? '#991B1B' : '#92400E',
                    }}
                  >
                    {p.stock_count === 0 ? 'Out' : `${p.stock_count} left`}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="px-6 py-3" style={{ borderTop: '1px solid #E7DDD2' }}>
            <Link href="/admin/products" className="text-[10px] text-[#9E1D2F] hover:underline" style={F}>
              Manage products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

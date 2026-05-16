'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, ShoppingCart,
  LogOut, Menu, X, ExternalLink, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const NAV = [
  { href: '/admin',            label: 'Dashboard',  icon: LayoutDashboard, badge: false },
  { href: '/admin/products',   label: 'Products',   icon: Package,          badge: false },
  { href: '/admin/categories', label: 'Categories', icon: Tag,              badge: false },
  { href: '/admin/orders',     label: 'Orders',     icon: ShoppingCart,     badge: true  },
] as const;

const SIDEBAR_BG = 'linear-gradient(175deg,#2C1F1C 0%,#3A2B27 60%,#4A3530 100%)';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [collapsed,     setCollapsed]     = useState(false);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('admin-sidebar-collapsed');
    if (stored === 'true') setCollapsed(true);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem('admin-sidebar-collapsed', String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      api.get('/api/admin/stats')
        .then(({ data }) => setPendingOrders(data.data?.pendingOrders ?? 0))
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace('/login');
      else if (user.role !== 'admin') router.replace('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE8' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#9E1D2F', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  /* ── Sidebar content (shared between mobile + desktop renders) ─────────── */
  const sidebarContent = (
    <>
      {/* Brand */}
      <div
        className="flex items-center flex-shrink-0 px-4 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 72 }}
      >
        {collapsed ? (
          <span className="mx-auto text-[19px] font-bold text-white" style={FD}>N</span>
        ) : (
          <div className="min-w-0">
            <span className="block text-[21px] text-white font-semibold tracking-wide leading-tight" style={FD}>NEEKZ</span>
            <span className="block text-[9px] tracking-[0.35em] uppercase mt-0.5" style={{ ...F, color: '#C9A66B' }}>
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-5 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon, badge }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          const count  = badge ? pendingOrders : 0;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              onClick={() => setMobileOpen(false)}
              className="relative flex items-center rounded-xl text-[12px] font-medium transition-all duration-150"
              style={{
                ...F,
                gap:            collapsed ? 0 : '10px',
                padding:        collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background:     active ? 'rgba(158,29,47,0.2)' : 'transparent',
                color:          active ? '#fff' : 'rgba(255,255,255,0.5)',
                boxShadow:      active ? 'inset 3px 0 0 #9E1D2F' : 'inset 3px 0 0 transparent',
              }}
            >
              <span className="relative flex-shrink-0">
                <Icon size={16} strokeWidth={active ? 2.2 : 1.7} />
                {count > 0 && collapsed && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: '#9E1D2F', fontSize: '7px' }}
                  >
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{label}</span>
                  {count > 0 && (
                    <span
                      className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: '#9E1D2F', fontSize: '9px' }}
                    >
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle — desktop only */}
      <div className="hidden lg:flex justify-center py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={toggleCollapsed}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Footer */}
      <div className="px-2 pb-4 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
        {!collapsed && (
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-medium transition-colors hover:bg-white/5"
            style={{ ...F, color: 'rgba(255,255,255,0.35)' }}
          >
            <ExternalLink size={13} strokeWidth={1.7} />
            View Storefront
          </Link>
        )}

        <div
          className="flex items-center gap-2.5 px-1 py-2"
          style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[12px] font-bold"
            style={{ background: '#9E1D2F', ...F }}
            title={collapsed ? user.name : undefined}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-white truncate" style={F}>{user.name}</p>
              <p className="text-[10px] truncate" style={{ ...F, color: 'rgba(255,255,255,0.35)' }}>{user.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center rounded-xl text-[11px] font-medium transition-colors hover:bg-white/5 w-full"
          style={{
            ...F,
            gap:            collapsed ? 0 : '12px',
            padding:        collapsed ? '10px 0' : '10px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            color:          'rgba(255,255,255,0.35)',
          }}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={13} strokeWidth={1.7} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </>
  );

  return (
    /* h-screen + overflow-hidden: the page itself never scrolls; only main scrolls */
    <div className="flex h-screen overflow-hidden" style={{ background: '#F0EBE3' }}>

      {/* ── Mobile overlay backdrop ────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile sidebar (fixed overlay, hidden off-screen by default) ───── */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex flex-col lg:hidden',
          'w-[220px] overflow-hidden transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        style={{ background: SIDEBAR_BG }}
      >
        {sidebarContent}
      </aside>

      {/* ── Desktop sidebar (in-flow flex item, collapses) ─────────────────── */}
      <aside
        className={[
          'hidden lg:flex flex-col flex-shrink-0 overflow-hidden',
          'transition-[width] duration-300 ease-in-out',
          collapsed ? 'w-[68px]' : 'w-[220px]',
        ].join(' ')}
        style={{ background: SIDEBAR_BG }}
      >
        {sidebarContent}
      </aside>

      {/* ── Content area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header
          className="lg:hidden flex items-center gap-4 px-5 py-4 flex-shrink-0"
          style={{ background: '#FAF7F2', borderBottom: '1px solid #E7DDD2' }}
        >
          <button onClick={() => setMobileOpen(true)} className="text-[#3A2B27]">
            <Menu size={20} strokeWidth={1.8} />
          </button>
          <span className="text-[#3A2B27] font-semibold text-lg" style={FD}>NEEKZ Admin</span>
          {mobileOpen && (
            <button onClick={() => setMobileOpen(false)} className="ml-auto text-[#3A2B27]">
              <X size={20} />
            </button>
          )}
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

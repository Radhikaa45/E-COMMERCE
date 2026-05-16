'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Plus, Search, Edit2, Trash2, X,
  Package, Check, Star, ChevronLeft, ChevronRight,
} from 'lucide-react';
import api from '@/services/api';
import type { AdminProduct, AdminCategory, Pagination } from '@/types';
import { TableRowSkeleton } from '@/components/ui/Skeleton';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const BADGES = ['', 'Bestseller', 'Premium', 'New', 'Heritage', "Chef's Pick"];
const BADGE_COLORS: Record<string, string> = {
  Bestseller: '#9E1D2F', Premium: '#3A2B27', New: '#C9A66B',
  Heritage: '#5F5148', "Chef's Pick": '#7D0F1C',
};

type ModalState =
  | { open: false }
  | { open: true; product: AdminProduct | null };

/* ── Small helpers ──────────────────────────────────────────────────────── */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button" onClick={onToggle}
      className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
      style={{ background: on ? '#9E1D2F' : '#E7DDD2' }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: on ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>
        {label}{required && <span className="text-[#9E1D2F] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  ...F,
  background: '#F4EFE8',
  border: '1px solid #E7DDD2',
} as React.CSSProperties;

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none transition-all"
      style={inputStyle}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#9E1D2F'; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; props.onBlur?.(e); }}
    />
  );
}

/* ── Empty form template ────────────────────────────────────────────────── */
interface ProductForm {
  name: string;
  description: string;
  price: string;
  original_price: string;
  image_url: string;
  category_id: string;
  weight: string;
  badge: string;
  in_stock: boolean;
  featured: boolean;
  stock_count: string;
  sort_order: string;
}

const EMPTY_FORM: ProductForm = {
  name: '', description: '', price: '', original_price: '',
  image_url: '', category_id: '', weight: '', badge: '',
  in_stock: true, featured: false, stock_count: '100', sort_order: '0',
};

function toForm(p: AdminProduct): ProductForm {
  return {
    name: p.name,
    description: p.description ?? '',
    price: String(p.price),
    original_price: p.original_price ? String(p.original_price) : '',
    image_url: p.image_url ?? '',
    category_id: p.category_id ? String(p.category_id) : '',
    weight: p.weight ?? '',
    badge: p.badge ?? '',
    in_stock: p.in_stock,
    featured: p.featured,
    stock_count: String(p.stock_count ?? 100),
    sort_order: String(p.sort_order ?? 0),
  };
}

/* ── Product Modal ──────────────────────────────────────────────────────── */
function ProductModal({
  product, categories, onClose, onSave,
}: {
  product: AdminProduct | null;
  categories: AdminCategory[];
  onClose: () => void;
  onSave: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState<ProductForm>(product ? toForm(product) : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set<K extends keyof ProductForm>(k: K, v: ProductForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      setError('Name and price are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description || null,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
        image_url: form.image_url || null,
        category_id: form.category_id ? Number(form.category_id) : null,
        weight: form.weight || null,
        badge: form.badge || null,
        in_stock: form.in_stock,
        featured: form.featured,
        stock_count: Number(form.stock_count),
        sort_order: Number(form.sort_order),
      };
      if (isEdit) {
        await api.put(`/api/admin/products/${product.id}`, payload);
      } else {
        await api.post('/api/admin/products', payload);
      }
      onSave();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Save failed.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[92vh]"
        style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 20px 60px rgba(90,50,30,0.2)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #E7DDD2' }}>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A66B]" style={F}>{isEdit ? 'Edit' : 'New'} Product</p>
            <h2 className="text-xl font-semibold text-[#3A2B27] mt-0.5" style={FD}>{isEdit ? form.name : 'Add Product'}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E7DDD2] transition-colors text-[#5F5148]">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl text-[12px] text-[#9E1D2F]" style={{ background: 'rgba(158,29,47,0.06)', border: '1px solid rgba(158,29,47,0.2)' }}>
              {error}
            </div>
          )}

          <Field label="Product Name" required>
            <StyledInput value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Himalayan Pink Salt" />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              placeholder="Describe this product…"
              className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none resize-none transition-all"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#9E1D2F'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₹)" required>
              <StyledInput type="number" min="0" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="0.00" />
            </Field>
            <Field label="Original Price (₹)">
              <StyledInput type="number" min="0" step="0.01" value={form.original_price} onChange={(e) => set('original_price', e.target.value)} placeholder="0.00" />
            </Field>
          </div>

          <Field label="Image URL">
            <StyledInput value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://…" />
          </Field>

          {form.image_url && (
            <div className="relative h-32 rounded-xl overflow-hidden" style={{ border: '1px solid #E7DDD2' }}>
              <Image src={form.image_url} alt="Preview" fill className="object-cover"
                onError={() => set('image_url', '')} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.category_id}
                onChange={(e) => set('category_id', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none"
                style={inputStyle}
              >
                <option value="">— None —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>

            <Field label="Badge">
              <select
                value={form.badge}
                onChange={(e) => set('badge', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none"
                style={inputStyle}
              >
                {BADGES.map((b) => <option key={b} value={b}>{b || '— None —'}</option>)}
              </select>
            </Field>

            <Field label="Weight">
              <StyledInput value={form.weight} onChange={(e) => set('weight', e.target.value)} placeholder="e.g. 500g" />
            </Field>

            <Field label="Stock Count">
              <StyledInput type="number" min="0" value={form.stock_count} onChange={(e) => set('stock_count', e.target.value)} />
            </Field>

            <Field label="Sort Order">
              <StyledInput type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: '#F4EFE8', border: '1px solid #E7DDD2' }}>
              <span className="text-[12px] font-medium text-[#3A2B27]" style={F}>In Stock</span>
              <Toggle on={form.in_stock} onToggle={() => set('in_stock', !form.in_stock)} />
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: '#F4EFE8', border: '1px solid #E7DDD2' }}>
              <span className="text-[12px] font-medium text-[#3A2B27]" style={F}>Featured</span>
              <Toggle on={form.featured} onToggle={() => set('featured', !form.featured)} />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3 justify-end" style={{ borderTop: '1px solid #E7DDD2' }}>
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 rounded-full text-[11px] font-medium text-[#5F5148] hover:bg-[#E7DDD2] transition-colors"
            style={F}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-medium text-white disabled:opacity-60 transition-colors"
            style={{ ...F, background: '#9E1D2F' }}>
            {saving
              ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin inline-block" style={{ borderColor: 'white', borderTopColor: 'transparent' }} /> Saving…</>
              : <><Check size={13} /> {isEdit ? 'Save Changes' : 'Add Product'}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirm ─────────────────────────────────────────────────────── */
function DeleteConfirm({ name, onConfirm, onCancel, loading }: {
  name: string; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 20px 60px rgba(90,50,30,0.2)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(158,29,47,0.08)' }}>
          <Trash2 size={20} className="text-[#9E1D2F]" />
        </div>
        <h3 className="text-lg font-semibold text-[#3A2B27] text-center mb-2" style={FD}>Delete Product?</h3>
        <p className="text-[12px] text-[#5F5148] text-center mb-6" style={F}>
          <strong>{name}</strong> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-full text-[11px] font-medium text-[#5F5148]"
            style={{ ...F, border: '1px solid #E7DDD2' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-full text-[11px] font-medium text-white disabled:opacity-60"
            style={{ ...F, background: '#9E1D2F' }}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────────── */
export default function AdminProductsPage() {
  const [products,   setProducts]   = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 20, pages: 0 });
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [catFilter,  setCatFilter]  = useState('');
  const [modal,      setModal]      = useState<ModalState>({ open: false });
  const [delTarget,  setDelTarget]  = useState<AdminProduct | null>(null);
  const [delLoading, setDelLoading] = useState(false);
  const [toast,      setToast]      = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/products', {
        params: { page, limit: 20, search: search || undefined, category: catFilter || undefined },
      });
      setProducts(data.data);
      setPagination(data.pagination);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, catFilter]);

  useEffect(() => {
    api.get('/api/admin/categories').then(({ data }) => setCategories(data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(1), search ? 350 : 0);
    return () => clearTimeout(t);
  }, [search, catFilter, fetchProducts]);

  const handleSave = () => {
    setModal({ open: false });
    fetchProducts(pagination.page);
    showToast('Product saved successfully.');
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setDelLoading(true);
    try {
      await api.delete(`/api/admin/products/${delTarget.id}`);
      setDelTarget(null);
      fetchProducts(pagination.page);
      showToast('Product deleted.');
    } catch {
      /* ignore */
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-white text-[12px] font-medium shadow-xl" style={{ ...F, background: '#3A2B27' }}>
          <Check size={13} />{toast}
        </div>
      )}

      {/* Modals */}
      {modal.open && (
        <ProductModal
          product={modal.product}
          categories={categories}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}
      {delTarget && (
        <DeleteConfirm
          name={delTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={delLoading}
        />
      )}

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Inventory</p>
          <h1 className="text-[#3A2B27]" style={{ ...FD, fontSize: '2rem', fontWeight: 600 }}>Products</h1>
          <p className="text-[12px] text-[#5F5148]/70 mt-0.5" style={F}>{pagination.total} products total</p>
        </div>
        <button
          onClick={() => setModal({ open: true, product: null })}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ ...F, background: '#9E1D2F' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F5148]/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full text-[12px] text-[#3A2B27] outline-none"
            style={{ ...F, background: '#FAF7F2', border: '1px solid #E7DDD2' }}
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-2.5 rounded-full text-[12px] text-[#3A2B27] outline-none appearance-none"
          style={{ ...F, background: '#FAF7F2', border: '1px solid #E7DDD2' }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
        {loading ? (
          <div>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRowSkeleton key={i} cols={8} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Package size={32} className="mx-auto text-[#5F5148]/20 mb-3" strokeWidth={1.2} />
            <p className="text-[#5F5148]/50 text-sm mb-3" style={F}>No products found.</p>
            <button
              onClick={() => setModal({ open: true, product: null })}
              className="px-5 py-2.5 rounded-full text-[11px] font-medium text-white"
              style={{ ...F, background: '#9E1D2F' }}
            >
              Add first product
            </button>
          </div>
        ) : (
          <>
            {/* Table header — hidden on mobile, shown on lg */}
            <div
              className="hidden lg:grid px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-semibold text-[#5F5148]/60"
              style={{ gridTemplateColumns: '56px 1fr 130px 100px 80px 90px 70px 76px', borderBottom: '1px solid #E7DDD2', background: '#F0EBE3' }}
            >
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Badge</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-[#E7DDD2]">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex lg:grid items-center px-4 lg:px-5 py-3.5 hover:bg-[#F4EFE8] transition-colors gap-3 lg:gap-0"
                  style={{ gridTemplateColumns: '56px 1fr 130px 100px 80px 90px 70px 76px' }}
                >
                  {/* Image */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid #E7DDD2' }}>
                    {p.image_url ? (
                      <Image src={p.image_url} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#EFE7DE] flex items-center justify-center">
                        <Package size={13} className="text-[#5F5148]/30" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0 lg:pr-3">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[13px] font-semibold text-[#3A2B27] truncate" style={FD}>{p.name}</p>
                      {p.featured && <Star size={9} fill="#C9A66B" className="text-[#C9A66B] flex-shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#5F5148]/50 truncate" style={F}>{p.weight || p.slug}</p>
                  </div>

                  {/* Category — hidden on mobile */}
                  <p className="hidden lg:block text-[11px] text-[#5F5148] truncate pr-2" style={F}>{p.category_name || '—'}</p>

                  {/* Price */}
                  <div className="hidden lg:block">
                    <p className="text-[13px] font-semibold text-[#3A2B27]" style={FD}>₹{p.price}</p>
                    {p.original_price && <p className="text-[10px] text-[#5F5148]/50 line-through" style={F}>₹{p.original_price}</p>}
                  </div>

                  {/* Stock */}
                  <p className="hidden lg:block text-[12px] text-[#5F5148]" style={F}>{p.stock_count ?? '—'}</p>

                  {/* Badge */}
                  <div className="hidden lg:block">
                    {p.badge ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider text-white"
                        style={{ ...F, background: BADGE_COLORS[p.badge] || '#9E1D2F' }}>
                        {p.badge}
                      </span>
                    ) : <span className="text-[#5F5148]/30 text-[11px]" style={F}>—</span>}
                  </div>

                  {/* Status */}
                  <div className="hidden lg:block">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ ...F, background: p.in_stock ? '#D1FAE5' : '#FEE2E2', color: p.in_stock ? '#065F46' : '#991B1B' }}>
                      {p.in_stock ? 'In Stock' : 'Out'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 lg:justify-end ml-auto lg:ml-0">
                    <button
                      onClick={() => setModal({ open: true, product: p })}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#E7DDD2] transition-colors text-[#5F5148]"
                    >
                      <Edit2 size={13} strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => setDelTarget(p)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors text-[#9E1D2F]"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
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
                    onClick={() => fetchProducts(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 hover:bg-[#E7DDD2] transition-colors text-[#5F5148]"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => fetchProducts(pagination.page + 1)}
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

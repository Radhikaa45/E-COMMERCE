'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Tag, Check } from 'lucide-react';
import api from '@/services/api';
import type { AdminCategory } from '@/types';
import { CategoryCardSkeleton } from '@/components/ui/Skeleton';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

/* ── Form Input ─────────────────────────────────────────────────────────── */
function Input({
  label, required, ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>
        {label}{required && <span className="text-[#9E1D2F] ml-0.5">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none transition-all"
        style={{ ...F, background: '#F4EFE8', border: '1px solid #E7DDD2' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#9E1D2F'; props.onFocus?.(e); }}
        onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; props.onBlur?.(e); }}
      />
    </div>
  );
}

function Textarea({
  label, ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none resize-none transition-all"
        style={{ ...F, background: '#F4EFE8', border: '1px solid #E7DDD2' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#9E1D2F'; }}
        onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
      />
    </div>
  );
}

/* ── Category Modal ─────────────────────────────────────────────────────── */
const EMPTY = { name: '', description: '', image_url: '', sort_order: 0 };

function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: AdminCategory | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const isEdit = !!category;
  const [form, setForm] = useState(
    category
      ? { name: category.name, description: category.description ?? '', image_url: category.image_url ?? '', sort_order: category.sort_order }
      : { ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await api.put(`/api/admin/categories/${category!.id}`, form);
      } else {
        await api.post('/api/admin/categories', form);
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
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 20px 60px rgba(90,50,30,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #E7DDD2' }}>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A66B]" style={F}>{isEdit ? 'Edit' : 'New'} Category</p>
            <h2 className="text-xl font-semibold text-[#3A2B27] mt-0.5" style={FD}>
              {isEdit ? form.name : 'Add Category'}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E7DDD2] transition-colors text-[#5F5148]">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl text-[12px] text-[#9E1D2F]" style={{ background: 'rgba(158,29,47,0.06)', border: '1px solid rgba(158,29,47,0.2)' }}>
              {error}
            </div>
          )}

          <Input label="Category Name" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Dry Fruits" />
          <Textarea label="Description" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief description of this category…" />
          <Input label="Image URL" value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://…" />

          {form.image_url && (
            <div className="relative h-28 rounded-xl overflow-hidden" style={{ border: '1px solid #E7DDD2' }}>
              <Image src={form.image_url} alt="Preview" fill className="object-cover" onError={() => set('image_url', '')} />
            </div>
          )}

          <Input label="Sort Order" type="number" value={form.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
        </form>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center gap-3 justify-end" style={{ borderTop: '1px solid #E7DDD2' }}>
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-[11px] font-medium text-[#5F5148] hover:bg-[#E7DDD2] transition-colors" style={F}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-medium text-white transition-colors disabled:opacity-60"
            style={{ ...F, background: '#9E1D2F' }}
          >
            {saving ? (
              <><span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin inline-block" style={{ borderColor: 'white', borderTopColor: 'transparent' }} /> Saving…</>
            ) : (
              <><Check size={13} /> {isEdit ? 'Save Changes' : 'Add Category'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirm ─────────────────────────────────────────────────────── */
function DeleteConfirm({ name, count, onConfirm, onCancel, loading }: {
  name: string; count: number; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 20px 60px rgba(90,50,30,0.2)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(158,29,47,0.08)' }}>
          <Trash2 size={20} className="text-[#9E1D2F]" />
        </div>
        <h3 className="text-lg font-semibold text-[#3A2B27] text-center mb-2" style={FD}>Delete Category?</h3>
        <p className="text-[12px] text-[#5F5148] text-center mb-6" style={F}>
          <strong>{name}</strong> will be deleted.
          {count > 0 && <> {count} product{count > 1 ? 's' : ''} will be uncategorized.</>}
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-full text-[11px] font-medium text-[#5F5148] transition-colors" style={{ ...F, border: '1px solid #E7DDD2' }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full text-[11px] font-medium text-white disabled:opacity-60"
            style={{ ...F, background: '#9E1D2F' }}
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

type CatModal = { open: false } | { open: true; category: AdminCategory | null };

/* ── Main Page ──────────────────────────────────────────────────────────── */
export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modal,      setModal]      = useState<CatModal>({ open: false });
  const [deleting,   setDeleting]   = useState<AdminCategory | null>(null);
  const [delLoading, setDelLoading] = useState(false);
  const [toast,      setToast]      = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/categories');
      setCategories(data.data);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleSave = () => {
    setModal({ open: false });
    fetchCategories();
    showToast('Category saved.');
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDelLoading(true);
    try {
      await api.delete(`/api/admin/categories/${deleting.id}`);
      setDeleting(null);
      fetchCategories();
      showToast('Category deleted.');
    } catch {
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
        <CategoryModal
          category={modal.category}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}
      {deleting && (
        <DeleteConfirm
          name={deleting.name}
          count={Number(deleting.product_count)}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          loading={delLoading}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Catalogue</p>
          <h1 className="text-[#3A2B27]" style={{ ...FD, fontSize: '2rem', fontWeight: 600 }}>Categories</h1>
          <p className="text-[12px] text-[#5F5148]/70 mt-0.5" style={F}>{categories.length} categories</p>
        </div>
        <button
          onClick={() => setModal({ open: true, category: null })}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ ...F, background: '#9E1D2F' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Category
        </button>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center rounded-2xl" style={{ border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
          <Tag size={32} className="mx-auto text-[#5F5148]/20 mb-3" strokeWidth={1.2} />
          <p className="text-[#5F5148]/50 text-sm" style={F}>No categories yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FAF7F2', border: '1px solid #E7DDD2', boxShadow: '0 1px 10px rgba(90,50,30,0.05)' }}
            >
              {/* Image */}
              <div className="relative h-36 bg-[#EFE7DE]">
                {cat.image_url ? (
                  <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag size={28} className="text-[#5F5148]/20" strokeWidth={1.2} />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={() => setModal({ open: true, category: cat })}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-[#5F5148]"
                    style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(4px)' }}
                  >
                    <Edit2 size={12} strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={() => setDeleting(cat)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-[#9E1D2F]"
                    style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(4px)' }}
                  >
                    <Trash2 size={12} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[15px] font-semibold text-[#3A2B27]" style={FD}>{cat.name}</h3>
                  <span
                    className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider"
                    style={{ ...F, background: 'rgba(201,166,107,0.15)', color: '#C9A66B' }}
                  >
                    {cat.product_count} products
                  </span>
                </div>
                <p className="text-[10px] text-[#C9A66B]/70 tracking-wider uppercase mb-2" style={F}>/{cat.slug}</p>
                {cat.description && (
                  <p className="text-[11px] text-[#5F5148]/60 line-clamp-2" style={F}>{cat.description}</p>
                )}
                <div className="mt-3 flex items-center gap-3 pt-3" style={{ borderTop: '1px solid #E7DDD2' }}>
                  <span className="text-[10px] text-[#5F5148]/50" style={F}>Sort: {cat.sort_order}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

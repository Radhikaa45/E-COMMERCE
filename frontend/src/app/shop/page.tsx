'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Star, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useCart } from '@/context/CartContext';
import type { Product, Category } from '@/types';
import api from '@/services/api';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const BADGE_COLORS: Record<string, string> = {
  Bestseller: '#9E1D2F', Premium: '#3A2B27', New: '#C9A66B',
  Heritage: '#5F5148', "Chef's Pick": '#7D0F1C',
};

const SORT_OPTIONS = [
  { label: 'Featured',          value: 'featured'   },
  { label: 'Price: Low → High', value: 'price_asc'  },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Newest',            value: 'newest'     },
];

const BADGE_OPTIONS = ['Bestseller', 'Premium', 'New', 'Heritage', "Chef's Pick"];

/* ─── Product card ──────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const [wished, setWished] = useState(false);
  const [added,  setAdded]  = useState(false);
  const inCart = isInCart(product.id);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group bg-[#FAF7F2] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{ border: '1px solid #E7DDD2', boxShadow: '0 1px 12px rgba(90,50,30,0.06)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 36px rgba(90,50,30,0.12)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 12px rgba(90,50,30,0.06)'; }}
    >
      <div className="relative h-52 overflow-hidden">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
        ) : (
          <div className="w-full h-full bg-[#EFE7DE]" />
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase text-white"
            style={{ ...F, background: BADGE_COLORS[product.badge] || '#9E1D2F' }}>
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(6px)' }}>
          <Heart size={12} strokeWidth={1.8} fill={wished ? '#9E1D2F' : 'none'}
            className={wished ? 'text-[#9E1D2F]' : 'text-[#5F5148]'} />
        </button>
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(250,247,242,0.75)' }}>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#5F5148]" style={F}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] mb-1 font-medium" style={F}>
          {product.category_name}
        </p>
        <h3 className="text-[#3A2B27] font-semibold leading-snug mb-1.5"
          style={{ ...FD, fontSize: '1rem', fontWeight: 600 }}>
          {product.name}
        </h3>
        {product.weight && (
          <p className="text-[10px] text-[#5F5148]/70 mb-2" style={F}>{product.weight}</p>
        )}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, j) => <Star key={j} size={9} fill="#C9A66B" className="text-[#C9A66B]" />)}
          <span className="text-[9px] text-[#5F5148] ml-1" style={F}>(4.9)</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#3A2B27] font-semibold" style={{ ...FD, fontSize: '1.15rem' }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-[11px] text-[#5F5148] line-through" style={F}>
                ₹{product.original_price}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.in_stock}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-medium text-white transition-colors disabled:opacity-40"
            style={{ ...F, background: (added || inCart) ? '#5F5148' : '#9E1D2F' }}>
            <ShoppingBag size={10} strokeWidth={2} />
            {added ? 'Added!' : inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}

/* ─── Filter panel ──────────────────────────────────────────────────────── */
interface FilterState {
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  badges: string[];
}

const DEFAULT_FILTERS: FilterState = {
  minPrice: 0,
  maxPrice: 2000,
  inStockOnly: false,
  badges: [],
};

function FilterPanel({
  filters, onChange, onReset,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}) {
  const active =
    filters.minPrice !== DEFAULT_FILTERS.minPrice ||
    filters.maxPrice !== DEFAULT_FILTERS.maxPrice ||
    filters.inStockOnly ||
    filters.badges.length > 0;

  function toggleBadge(b: string) {
    const next = filters.badges.includes(b)
      ? filters.badges.filter((x) => x !== b)
      : [...filters.badges, b];
    onChange({ ...filters, badges: next });
  }

  return (
    <div className="mb-6 rounded-2xl overflow-hidden"
      style={{ border: '1px solid #E7DDD2', background: '#FAF7F2' }}>
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #E7DDD2' }}>
        <span className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#3A2B27]" style={F}>
          Filters
        </span>
        {active && (
          <button onClick={onReset}
            className="text-[10px] text-[#9E1D2F] hover:underline" style={F}>
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E7DDD2]">
        {/* Price range */}
        <div className="px-5 py-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#5F5148]/70 font-medium mb-3" style={F}>
            Price Range
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] text-[#3A2B27] font-medium w-16" style={FD}>
              ₹{filters.minPrice}
            </span>
            <span className="text-[10px] text-[#5F5148]/50" style={F}>–</span>
            <span className="text-[12px] text-[#3A2B27] font-medium" style={FD}>
              ₹{filters.maxPrice === 2000 ? '2000+' : filters.maxPrice}
            </span>
          </div>
          <div className="space-y-2">
            <input type="range" min={0} max={2000} step={50}
              value={filters.minPrice}
              onChange={(e) => onChange({ ...filters, minPrice: +e.target.value })}
              className="w-full accent-[#9E1D2F] h-1"
            />
            <input type="range" min={0} max={2000} step={50}
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: +e.target.value })}
              className="w-full accent-[#9E1D2F] h-1"
            />
          </div>
        </div>

        {/* In-stock toggle */}
        <div className="px-5 py-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#5F5148]/70 font-medium mb-3" style={F}>
            Availability
          </p>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
              className="relative w-9 h-5 rounded-full transition-colors"
              style={{ background: filters.inStockOnly ? '#9E1D2F' : '#E7DDD2' }}>
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                style={{ transform: filters.inStockOnly ? 'translateX(16px)' : 'translateX(0)' }} />
            </div>
            <span className="text-[11px] text-[#3A2B27]" style={F}>In stock only</span>
          </label>
        </div>

        {/* Badge filter */}
        <div className="px-5 py-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#5F5148]/70 font-medium mb-3" style={F}>
            Label
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BADGE_OPTIONS.map((b) => {
              const active = filters.badges.includes(b);
              return (
                <button key={b} onClick={() => toggleBadge(b)}
                  className="px-2.5 py-1 rounded-full text-[9px] tracking-wider uppercase font-medium transition-all"
                  style={{
                    ...F,
                    background: active ? (BADGE_COLORS[b] || '#9E1D2F') : 'transparent',
                    color: active ? '#fff' : '#5F5148',
                    border: `1px solid ${active ? (BADGE_COLORS[b] || '#9E1D2F') : '#E7DDD2'}`,
                  }}>
                  {b}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────────── */
export default function ShopPage() {
  const [products,       setProducts]       = useState<Product[]>([]);
  const [categories,     setCategories]     = useState<Category[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search,         setSearch]         = useState('');
  const [sort,           setSort]           = useState('featured');
  const [page,           setPage]           = useState(1);
  const [hasMore,        setHasMore]        = useState(false);
  const [showFilters,    setShowFilters]    = useState(false);
  const [filters,        setFilters]        = useState<FilterState>(DEFAULT_FILTERS);
  const PER_PAGE = 12;

  const fetchProducts = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        limit: PER_PAGE,
        offset: reset ? 0 : (page - 1) * PER_PAGE,
      };
      if (activeCategory !== 'all') params.category = activeCategory;
      if (search.trim()) params.search = search.trim();

      const { data } = await api.get('/api/products', { params });
      const list: Product[] = data.data || data;
      if (reset) {
        setProducts(list);
        setPage(1);
      } else {
        setProducts((prev) => {
          const seen = new Set(prev.map((x) => x.slug));
          return [...prev, ...list.filter((x) => !seen.has(x.slug))];
        });
      }
      setHasMore(list.length === PER_PAGE);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search, page]);

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(true), search ? 350 : 0);
    return () => clearTimeout(t);
  }, [activeCategory, search]);

  useEffect(() => {
    api.get('/api/categories').then(({ data }) => setCategories(data.data || data)).catch(() => {});
  }, []);

  /* client-side sort + filter */
  const sorted = [...products]
    .filter((p) => {
      if (filters.inStockOnly && !p.in_stock) return false;
      if (p.price < filters.minPrice) return false;
      if (filters.maxPrice < 2000 && p.price > filters.maxPrice) return false;
      if (filters.badges.length > 0 && (!p.badge || !filters.badges.includes(p.badge))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc')  return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return 0;
    });

  const activeFilterCount =
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 2000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    filters.badges.length;

  return (
    <PageLayout>
      {/* Header */}
      <div className="py-14 px-5 lg:px-10 text-center"
        style={{ background: 'linear-gradient(180deg,#EFE7DE 0%,#F4EFE8 100%)' }}>
        <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>
          Our Products
        </p>
        <h1 className="text-[#3A2B27] mb-3"
          style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, lineHeight: 1.15 }}>
          Curated <em className="text-[#9E1D2F]">Gourmet</em> Collection
        </h1>
        <p className="text-[13px] text-[#5F5148] max-w-md mx-auto" style={F}>
          Handpicked from mountain farms and artisan producers across Jammu & Kashmir
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8">
        {/* Search + Sort + Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} strokeWidth={1.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F5148]/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-9 py-2.5 rounded-full text-[12px] text-[#3A2B27] bg-[#FAF7F2] outline-none focus:ring-1 focus:ring-[#C9A66B]"
              style={{ ...F, border: '1px solid #E7DDD2' }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F5148]/50 hover:text-[#9E1D2F]">
                <X size={13} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-full text-[11px] text-[#3A2B27] bg-[#FAF7F2] outline-none cursor-pointer"
                style={{ ...F, border: '1px solid #E7DDD2' }}>
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5148] pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] font-medium transition-all"
              style={{
                ...F,
                border: '1px solid',
                borderColor: showFilters || activeFilterCount > 0 ? '#9E1D2F' : '#E7DDD2',
                background: showFilters ? '#9E1D2F' : '#FAF7F2',
                color: showFilters ? '#fff' : activeFilterCount > 0 ? '#9E1D2F' : '#5F5148',
              }}>
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                  style={{ background: showFilters ? 'rgba(255,255,255,0.3)' : '#9E1D2F', color: '#fff' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
        )}

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {[{ slug: 'all', name: 'All' }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className="px-4 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium transition-all"
              style={{
                ...F,
                background: activeCategory === c.slug ? '#9E1D2F' : '#FAF7F2',
                color:      activeCategory === c.slug ? '#fff'     : '#5F5148',
                border: '1px solid',
                borderColor: activeCategory === c.slug ? '#9E1D2F' : '#E7DDD2',
              }}>
              {c.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#5F5148] text-sm" style={F}>
              No products found{search ? ` for "${search}"` : ''}.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); setFilters(DEFAULT_FILTERS); }}
              className="mt-3 text-[11px] text-[#9E1D2F] underline" style={F}>
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] text-[#5F5148]/60 mb-5" style={F}>
              {sorted.length} product{sorted.length !== 1 ? 's' : ''}
              {activeFilterCount > 0 ? ' (filtered)' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => { setPage((n) => n + 1); fetchProducts(false); }}
                  disabled={loading}
                  className="px-9 py-3.5 border border-[#3A2B27]/25 text-[#3A2B27] text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:border-[#9E1D2F] hover:text-[#9E1D2F] transition-all disabled:opacity-50"
                  style={F}>
                  {loading ? 'Loading…' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}

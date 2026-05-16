import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const RADIUS = {
  sm: '0.375rem', md: '0.5rem', lg: '0.75rem',
  xl: '1rem', '2xl': '1.5rem', full: '9999px',
};

export default function Skeleton({ className = '', style, rounded = 'xl' }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{ borderRadius: RADIUS[rounded], ...style }}
    />
  );
}

/* ── Composite skeletons ────────────────────────────────────────────────── */

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
      <Skeleton className="h-52 w-full" rounded="sm" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-12" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-7 w-20" rounded="full" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl p-6" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-10 h-10" rounded="xl" />
        <Skeleton className="w-4 h-4" rounded="sm" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  const widths = ['w-10', 'w-full', 'w-24', 'w-16', 'w-14', 'w-20', 'w-16'];
  return (
    <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={`h-4 flex-1 ${widths[i] || 'w-16'}`} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
      <Skeleton className="h-36 w-full" rounded="sm" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

export function OrderRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
      <Skeleton className="h-4 w-12" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-36" />
        <Skeleton className="h-2.5 w-48" />
      </div>
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-6 w-20" rounded="full" />
      <Skeleton className="h-6 w-16" rounded="full" />
    </div>
  );
}

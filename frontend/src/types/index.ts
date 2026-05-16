export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  weight: string | null;
  badge: string | null;
  in_stock: boolean;
  featured: boolean;
  stock_count?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface CartItem {
  id: string;
  product_id: number;
  name: string;
  slug: string;
  image_url: string | null;
  price: number;
  quantity: number;
  weight: string | null;
  category: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

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
  sort_order?: number;
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

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number | null;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_name: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  shipping_phone: string | null;
  payment_method: 'cod' | 'online' | 'upi';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer_name: string | null;
  customer_email: string | null;
  items?: OrderItem[];
}

export interface AdminProduct extends Product {
  stock_count: number;
  sort_order: number;
  category_id: number | null;
  created_at: string;
}

export interface AdminCategory extends Category {
  product_count: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  lowStock: { id: number; name: string; stock_count: number; in_stock: boolean }[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

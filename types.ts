
export enum Category {
  ELECTRONICS = 'إلكترونيات',
  HOME = 'منتجات منزلية',
  CARS = 'سيارات'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AppSettings {
  fbPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  googleSheetUrl: string;
  domainName: string;
  nameServers: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

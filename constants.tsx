
import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'هاتف ذكي ألترا 2024',
    description: 'أحدث هاتف ذكي بكاميرا احترافية ومعالج قوي.',
    price: 4500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/seed/phone/400/400'
  },
  {
    id: '2',
    name: 'خلاط منزلي متعدد السرعات',
    description: 'خلاط قوي للمطبخ العصري مع شفرات فولاذية.',
    price: 850,
    category: Category.HOME,
    image: 'https://picsum.photos/seed/mixer/400/400'
  },
  {
    id: '3',
    name: 'سيارة دفع رباعي عائلية',
    description: 'سيارة واسعة ومريحة للسفر الطويل والمغامرات.',
    price: 280000,
    category: Category.CARS,
    image: 'https://picsum.photos/seed/car/400/400'
  },
  {
    id: '4',
    name: 'شاشة ذكية 55 بوصة',
    description: 'دقة 4K مع نظام أندرويد متكامل.',
    price: 3200,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/seed/tv/400/400'
  },
  {
    id: '5',
    name: 'طقم أواني فاخر',
    description: 'مجموعة متكاملة من الأواني غير اللاصقة.',
    price: 1200,
    category: Category.HOME,
    image: 'https://picsum.photos/seed/pots/400/400'
  }
];

export const CURRENCY = 'د.م.';

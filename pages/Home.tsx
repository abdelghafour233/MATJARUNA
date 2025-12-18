
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { CURRENCY } from '../constants';
import { Category } from '../types';
import { ShoppingCart, ArrowLeft, Smartphone, Home as HomeIcon, Car } from 'lucide-react';

const Home: React.FC = () => {
  const { products, addToCart } = useApp();
  const featured = products.slice(0, 3);

  const categories = [
    { name: Category.ELECTRONICS, icon: Smartphone, color: 'bg-blue-100 text-blue-600', link: '/shop?cat=electronics' },
    { name: Category.HOME, icon: HomeIcon, color: 'bg-emerald-100 text-emerald-600', link: '/shop?cat=home' },
    { name: Category.CARS, icon: Car, color: 'bg-purple-100 text-purple-600', link: '/shop?cat=cars' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-emerald-900">
        <img 
          src="https://picsum.photos/seed/hero/1200/600" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Hero"
        />
        <div className="relative h-full flex flex-col justify-center items-start p-8 md:p-16 space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            تسوق أفضل المنتجات في المغرب بجودة عالمية
          </h1>
          <p className="text-lg text-emerald-50 text-opacity-90">
            إلكترونيات، مستلزمات المنزل، وسيارات - كل ما تحتاجه في مكان واحد مع خدمة التوصيل السريع.
          </p>
          <Link 
            to="/shop" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            تصفح المنتجات
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center md:text-right">تصفح حسب الفئة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.link}
              className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`${cat.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">وصل حديثاً</h2>
          <Link to="/shop" className="text-emerald-600 font-bold hover:underline">مشاهدة الكل</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <div className="text-xs text-emerald-600 font-bold mb-2 uppercase tracking-wider">{product.category}</div>
                <Link to={`/product/${product.id}`} className="block text-xl font-bold mb-2 hover:text-emerald-600 transition-colors">
                  {product.name}
                </Link>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">{product.price} <span className="text-sm font-normal text-gray-500">{CURRENCY}</span></span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 hover:bg-emerald-500 hover:text-white p-3 rounded-xl transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-4">
          <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
             <span className="text-3xl">🚚</span>
          </div>
          <h3 className="text-xl font-bold">توصيل سريع</h3>
          <p className="text-gray-500">نصل إليك في أي مكان بالمغرب في ظرف 24-48 ساعة.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
             <span className="text-3xl">🛡️</span>
          </div>
          <h3 className="text-xl font-bold">دفع آمن</h3>
          <p className="text-gray-500">الدفع عند الاستلام لضمان راحتك وأمانك التام.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
             <span className="text-3xl">⭐</span>
          </div>
          <h3 className="text-xl font-bold">جودة مضمونة</h3>
          <p className="text-gray-500">جميع منتجاتنا تمر باختبارات جودة صارمة قبل العرض.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

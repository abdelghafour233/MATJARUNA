
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Category } from '../types';
import { CURRENCY } from '../constants';
import { ShoppingCart, Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const { products, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

  const [activeCategory, setActiveCategory] = useState<string>(catParam || 'الكل');

  const filteredProducts = activeCategory === 'الكل' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ['الكل', Category.ELECTRONICS, Category.HOME, Category.CARS];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold">جميع المنتجات</h1>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (cat === 'الكل') searchParams.delete('cat');
                else setSearchParams({ cat });
              }}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
            <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-[10px] text-emerald-600 font-bold mb-1 uppercase">{product.category}</div>
              <Link to={`/product/${product.id}`} className="text-lg font-bold mb-2 hover:text-emerald-600 transition-colors line-clamp-1">
                {product.name}
              </Link>
              <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-grow">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-black text-gray-900">{product.price} {CURRENCY}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white p-2 rounded-lg transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
          <p className="text-gray-400 text-xl font-medium">لا توجد منتجات في هذه الفئة حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;

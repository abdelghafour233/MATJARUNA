
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { CURRENCY } from '../constants';
import { ShoppingCart, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useApp();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <button onClick={() => navigate('/shop')} className="text-emerald-600 underline">العودة للمتجر</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-3xl font-black text-emerald-600">{product.price} {CURRENCY}</p>
          </div>

          <div className="prose prose-emerald text-gray-600">
            <h3 className="text-lg font-bold mb-2">وصف المنتج:</h3>
            <p className="leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y">
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="text-emerald-500 h-8 w-8" />
              <span className="text-xs font-bold">ضمان سنة</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="text-emerald-500 h-8 w-8" />
              <span className="text-xs font-bold">توصيل منزلي</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RefreshCw className="text-emerald-500 h-8 w-8" />
              <span className="text-xs font-bold">إرجاع مجاني</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-emerald-200"
            >
              <ShoppingCart className="h-6 w-6" />
              أضف إلى السلة
            </button>
            <button 
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              شراء الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

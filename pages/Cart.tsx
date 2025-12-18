
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { CURRENCY } from '../constants';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 30 : 0; // Standard flat shipping fee in Morocco

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8 max-w-md">يبدو أنك لم تضف أي منتج بعد. استمتع بتجربة تسوق فريدة واكتشف منتجاتنا الرائعة.</p>
        <Link 
          to="/shop" 
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
        >
          اذهب للمتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">سلة المشتريات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900">{item.product.name}</h3>
                <p className="text-emerald-600 font-bold">{item.product.price} {CURRENCY}</p>
                <div className="flex items-center gap-4 mt-2">
                   <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                      ><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                      ><Plus className="h-4 w-4" /></button>
                   </div>
                   <button 
                     onClick={() => removeFromCart(item.product.id)}
                     className="text-red-500 hover:text-red-700 p-1"
                   >
                     <Trash2 className="h-5 w-5" />
                   </button>
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-black text-xl">{item.product.price * item.quantity} {CURRENCY}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 h-fit space-y-6">
          <h2 className="text-2xl font-bold border-b pb-4">ملخص الطلب</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-bold text-gray-900">{subtotal} {CURRENCY}</span>
            </div>
            <div className="flex justify-between">
              <span>مصاريف التوصيل:</span>
              <span className="font-bold text-gray-900">{shipping} {CURRENCY}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-emerald-600 border-t pt-4">
              <span>الإجمالي:</span>
              <span>{subtotal + shipping} {CURRENCY}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-100"
          >
            إتمام الطلب
          </button>
          <Link to="/shop" className="block text-center text-gray-500 font-bold hover:text-emerald-600">
            متابعة التسوق
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

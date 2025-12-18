
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { CURRENCY } from '../constants';
import { Order } from '../types';
import { CheckCircle2 } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, clearCart, setOrders } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    phone: ''
  });
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = 30;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.fullName,
      city: formData.city,
      phone: formData.phone,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setIsOrdered(true);
    clearCart();

    // In a real app, here we would send data to Google Sheets via an API call
    console.log('Sending to Google Sheets...', newOrder);
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-8 bg-white rounded-3xl shadow-sm border border-emerald-100 p-8">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full">
          <CheckCircle2 className="h-16 w-16 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">تم الطلب بنجاح!</h1>
        <p className="text-lg text-gray-600">
          شكراً لك، سنتصل بك قريباً لتأكيد طلبك وبدء عملية التوصيل.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-emerald-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">معلومات الشحن</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <input
                required
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المدينة</label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                placeholder="مثلاً: الدار البيضاء، الرباط..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="0600000000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="pt-6">
            <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border italic">
              * الدفع سيكون عند الاستلام. سنقوم بمراجعة طلبك والاتصال بك هاتفياً لتأكيده.
            </p>
            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-100"
            >
              تأكيد الطلب الآن
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-2xl font-bold mb-6">ملخص السلة</h2>
             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center gap-4 border-b pb-4">
                     <div className="flex gap-3 items-center">
                        <img src={item.product.image} className="w-12 h-12 rounded object-cover" alt="" />
                        <div>
                          <p className="font-bold text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-gray-500 text-xs">{item.quantity} × {item.product.price} {CURRENCY}</p>
                        </div>
                     </div>
                     <p className="font-bold">{item.product.price * item.quantity} {CURRENCY}</p>
                  </div>
                ))}
             </div>
             <div className="mt-6 space-y-2 text-lg">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع:</span>
                  <span>{subtotal} {CURRENCY}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>التوصيل:</span>
                  <span>{shipping} {CURRENCY}</span>
                </div>
                <div className="flex justify-between font-black text-2xl text-emerald-600 border-t pt-4">
                  <span>الإجمالي:</span>
                  <span>{total} {CURRENCY}</span>
                </div>
             </div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-3">
             <p className="flex items-center gap-2 text-emerald-800 font-bold">
               <span className="bg-emerald-200 p-1 rounded-full">✅</span>
               توصيل مجاني للطلبات فوق 1000 درهم
             </p>
             <p className="flex items-center gap-2 text-emerald-800 font-bold">
               <span className="bg-emerald-200 p-1 rounded-full">✅</span>
               ضمان استرجاع لمدة 14 يوم
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

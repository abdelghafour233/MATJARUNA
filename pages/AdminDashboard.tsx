
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CURRENCY } from '../constants';
import { Product, Category, Order } from '../types';
import { 
  Plus, Search, Settings, Package, 
  ShoppingCart, Globe, ChevronDown, 
  Trash2, Edit3, CheckCircle, Clock,
  Facebook, TrendingUp, Chrome, Database
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { products, setProducts, orders, setOrders, settings, setSettings } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');

  // Order stats
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">لوحة التحكم</h1>
        <div className="flex bg-white rounded-xl shadow-sm border p-1">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <ShoppingCart className="h-4 w-4" /> الطلبات
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'products' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Package className="h-4 w-4" /> المنتجات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Settings className="h-4 w-4" /> الإعدادات
          </button>
        </div>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">إجمالي المبيعات</p>
                <p className="text-2xl font-black">{totalSales} {CURRENCY}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">طلبات قيد الانتظار</p>
                <p className="text-2xl font-black">{pendingOrders}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">إجمالي الطلبات</p>
                <p className="text-2xl font-black">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="p-4 text-sm font-bold text-gray-600">رقم الطلب</th>
                      <th className="p-4 text-sm font-bold text-gray-600">الزبون</th>
                      <th className="p-4 text-sm font-bold text-gray-600">المدينة / الهاتف</th>
                      <th className="p-4 text-sm font-bold text-gray-600">المجموع</th>
                      <th className="p-4 text-sm font-bold text-gray-600">الحالة</th>
                      <th className="p-4 text-sm font-bold text-gray-600">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-mono text-xs">#{order.id}</td>
                        <td className="p-4 font-bold">{order.customerName}</td>
                        <td className="p-4">
                          <div className="text-sm">{order.city}</div>
                          <div className="text-xs text-gray-500">{order.phone}</div>
                        </td>
                        <td className="p-4 font-bold text-emerald-600">{order.total} {CURRENCY}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'completed' ? 'تم التوصيل' : 'ملغي'}
                          </span>
                        </td>
                        <td className="p-4 space-x-2 space-x-reverse">
                           <button 
                             onClick={() => updateOrderStatus(order.id, 'completed')}
                             className="text-emerald-500 hover:text-emerald-700 p-1"
                             title="تحديد كمكتمل"
                           ><CheckCircle className="h-5 w-5" /></button>
                           <button 
                             onClick={() => deleteOrder(order.id)}
                             className="text-red-400 hover:text-red-600 p-1"
                           ><Trash2 className="h-5 w-5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
             {orders.length === 0 && (
               <div className="p-20 text-center text-gray-400">لا توجد طلبات حالياً.</div>
             )}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
              <Plus className="h-5 w-5" /> إضافة منتج جديد
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-2xl border shadow-sm flex gap-4">
                <img src={product.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                <div className="flex-grow">
                  <h3 className="font-bold line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="font-black text-emerald-600 mt-1">{product.price} {CURRENCY}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-blue-500 hover:text-blue-700"><Edit3 className="h-5 w-5" /></button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tracking Pixels */}
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="text-emerald-600 h-6 w-6" /> أكواد التتبع (Pixels)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" /> Facebook Pixel ID
                </label>
                <input 
                  type="text" 
                  value={settings.fbPixelId}
                  onChange={e => setSettings({...settings, fbPixelId: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none" 
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <Chrome className="h-4 w-4 text-red-500" /> Google Analytics ID (GA4)
                </label>
                <input 
                  type="text" 
                  value={settings.googleAnalyticsId}
                  onChange={e => setSettings({...settings, googleAnalyticsId: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none" 
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <span className="text-xs font-black">TikTok</span> TikTok Pixel ID
                </label>
                <input 
                  type="text" 
                  value={settings.tiktokPixelId}
                  onChange={e => setSettings({...settings, tiktokPixelId: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none" 
                  placeholder="ID من لوحة تحكم تيك توك"
                />
              </div>
            </div>
          </div>

          {/* Integrations & Domain */}
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Database className="text-emerald-600 h-6 w-6" /> الربط مع Google Sheets
                </h2>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">رابط Google Sheet</label>
                  <input 
                    type="text" 
                    value={settings.googleSheetUrl}
                    onChange={e => setSettings({...settings, googleSheetUrl: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none" 
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <p className="text-xs text-gray-400 mt-2">سيتم إرسال كل طلب جديد تلقائياً إلى هذا الجدول.</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Globe className="text-emerald-600 h-6 w-6" /> إعدادات الدومين
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">اسم النطاق (Domain)</label>
                    <input 
                      type="text" 
                      value={settings.domainName}
                      onChange={e => setSettings({...settings, domainName: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none text-left" 
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Name Servers</label>
                    <textarea 
                      rows={2}
                      value={settings.nameServers}
                      onChange={e => setSettings({...settings, nameServers: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none text-left" 
                      dir="ltr"
                    />
                  </div>
                </div>
             </div>
          </div>
          <div className="md:col-span-2">
             <button 
               onClick={() => alert('تم حفظ جميع الإعدادات بنجاح!')}
               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-100"
             >
               حفظ التغييرات
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

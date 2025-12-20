
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Home, Package, Menu, X } from 'lucide-react';
import { useApp } from '../store/AppContext';
import AIAssistant from './AIAssistant';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'المتجر', path: '/shop', icon: Package },
    { name: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white/80 glass-effect shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 mr-4 md:mr-0">
                <div className="bg-emerald-600 p-1.5 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black text-emerald-600 tracking-tight">متجرنا</span>
              </Link>
              <div className="hidden md:flex md:mr-10 md:space-x-8 md:space-x-reverse">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-emerald-500'
                    } flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-200`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block animate-slide-down' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  location.pathname === item.path ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
        {children}
      </main>

      <AIAssistant />

      <footer className="bg-gray-900 text-white py-12 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">متجرنا</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              بوابتكم الأولى للتسوق في المغرب. نوفر لكم أفضل المنتجات العالمية مع خدمة توصيل محلية سريعة ودعم فني على مدار الساعة.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-500">روابط سريعة</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link></li>
              <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">تصفح المتجر</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-500">تواصل معنا</h3>
            <div className="space-y-3 text-gray-400 font-medium">
              <p className="flex items-center gap-2">📱 0600000000</p>
              <p className="flex items-center gap-2">📧 contact@shop.ma</p>
              <p className="flex items-center gap-2">📍 الدار البيضاء، المغرب</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} متجرنا المغرب. صنع بكل حب لخدمة زبائننا الكرام.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

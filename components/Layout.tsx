
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Home, Package, Menu, X } from 'lucide-react';
import { useApp } from '../store/AppContext';

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
      <nav className="bg-white shadow-sm sticky top-0 z-50">
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
                <span className="text-2xl font-bold text-emerald-600">متجرنا</span>
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
                    } flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-emerald-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="text-xl font-bold mb-4">متجرنا الإلكتروني</h3>
            <p className="text-gray-400">أفضل المنتجات بأفضل الأسعار في المغرب. خدمة التوصيل متاحة لجميع المدن.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-emerald-400">الرئيسية</Link></li>
              <li><Link to="/shop" className="hover:text-emerald-400">المتجر</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400">لوحة التحكم</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">اتصل بنا</h3>
            <p className="text-gray-400">الهاتف: 0600000000</p>
            <p className="text-gray-400">البريد: contact@shop.ma</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} متجرنا
        </div>
      </footer>
    </div>
  );
};

export default Layout;

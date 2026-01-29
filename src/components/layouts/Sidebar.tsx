import { Layers, Package, Home, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import FPTLogo from '../../assets/fpt_logo.png';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  badge?: string;
}

const adminMenuItems: MenuItem[] = [
  // {
  //   id: 'dashboard',
  //   label: 'Quản lý người dùng',
  //   icon: <LayoutDashboard size={20} />,
  //   path: '/admin/dashboard',
  // },
  {
    id: 'category',
    label: 'Quản lý danh mục',
    icon: <Layers size={20} />,
    path: '/admin/category',
  },
  {
    id: 'product',
    label: 'Quản lý sản phẩm',
    icon: <Package size={20} />,
    path: '/admin/product',
  }
];

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const menuItems = userRole === 'admin' ? adminMenuItems : [];

  return (
    <aside className="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="flex items-center gap-3 mb-2">
          <img src={FPTLogo} alt="FPT Logo" className="w-12 h-12" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">FPT Store</h2>
            <p className="text-xs text-orange-600 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
            Menu chính
          </p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path || '#'}
                    className={`
                      group flex items-center justify-between px-4 py-3 rounded-xl
                      transition-all duration-300 ease-in-out
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'text-gray-700 bg-white hover:bg-orange-50 hover:text-orange-600 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg transition-colors
                        ${
                          isActive
                            ? 'bg-white/20'
                            : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                        }
                      `}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">
                        {item.label}
                      </span>
                    </div>
                    
                    {isActive && (
                      <ChevronRight 
                        size={18} 
                        className="animate-pulse" 
                      />
                    )}
                    
                    {item.badge && !isActive && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
            Truy cập nhanh
          </p>
          <Link
            to="/"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 bg-white hover:bg-orange-50 hover:text-orange-600 hover:shadow-md transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-200 transition-colors">
              <Home size={20} />
            </div>
            <span className="font-medium text-sm">
              Về trang chủ
            </span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-t border-gray-200 bg-white">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-orange-600">Quản trị viên</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Phiên bản</span>
              <span className="text-orange-600 font-semibold">v1.0.0</span>
            </div>
          </div>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;

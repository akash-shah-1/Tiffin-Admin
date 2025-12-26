
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', icon: 'grid_view', path: '/dashboard' },
    { label: 'Customers', icon: 'groups', path: '/customers' },
    { label: 'Kitchens', icon: 'restaurant', path: '/kitchens' },
    { label: 'Monitor', icon: 'analytics', path: '/monitor' },
    { label: 'Approvals', icon: 'checklist', path: '/approvals' },
    { label: 'Settings', icon: 'settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/customers') return location.pathname.startsWith('/customer');
    if (path === '/kitchens') return location.pathname.startsWith('/kitchen');
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-primary rounded-md flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px] font-bold">corporate_fare</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">Tiffin<span className="text-primary">Admin</span></h1>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] transition-colors ${
                isActive(item.path) ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
              }`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-6 pb-2 px-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support</p>
          </div>
          <Link
            to="/disputes"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group text-sm font-medium ${
              location.pathname.startsWith('/dispute')
                ? 'bg-red-500/10 text-red-600'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">report</span>
            <span>Disputes</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-slate-600" style={{ backgroundImage: 'url("https://ui-avatars.com/api/?name=Admin&background=16a34a&color=fff")' }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-slate-50 dark:bg-slate-950/20">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden sticky bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe pt-3 px-4 flex justify-between items-center z-50 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                isActive(item.path) ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${isActive(item.path) ? 'fill-[1]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;


import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_CONFIG = [
  { label: 'Dashboard', icon: 'grid_view', path: '/dashboard', primary: true, bottomLabel: 'HOME' },
  { label: 'Customers', icon: 'groups', path: '/customers', primary: true, bottomLabel: 'USERS' },
  { label: 'Kitchens', icon: 'restaurant', path: '/kitchens', primary: true, bottomLabel: 'KITCHENS' },
  { label: 'Complaints', icon: 'support_agent', path: '/complaints', primary: true, bottomLabel: 'DISPUTES' },
  { label: 'Approvals', icon: 'how_to_reg', path: '/approvals', primary: false },
  { label: 'Payments', icon: 'account_balance', path: '/payments', primary: false },
  { label: 'Reports', icon: 'bar_chart', path: '/reports', primary: false },
  { label: 'Settings', icon: 'settings', path: '/settings', primary: false },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const pageTitle = useMemo(() => {
    const current = NAV_CONFIG.find(item => isActive(item.path));
    if (location.pathname === '/profile') return 'PROFILE';
    return (current?.label || 'DASHBOARD').toUpperCase();
  }, [location.pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800">
      <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-md flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px] font-bold">corporate_fare</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">Tiffin<span className="text-primary">Admin</span></h1>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden size-8 flex items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {NAV_CONFIG.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`items-center gap-3 px-3 py-2.5 rounded-md transition-all font-medium transition-all duration-200 ${
              isActive(item.path) 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            } ${item.primary ? 'hidden md:flex' : 'flex'}`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isActive(item.path) ? 'text-primary' : 'text-slate-400'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <Link to="/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black border-2 border-white dark:border-slate-800">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">Super Admin</p>
            <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Registry Head</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-100 font-display">
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Persistent Sidebar on Desktop, Drawer on Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-[#0b0f1a] border-b border-slate-200 dark:border-slate-800 z-40">
          <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="md:hidden size-9 flex items-center justify-center rounded-md bg-slate-100 dark:bg-[#1f2937]/50 text-slate-500">
                <span className="material-symbols-outlined text-[24px]">menu</span>
             </button>
             <h2 className="text-sm font-black uppercase tracking-[0.15em] text-primary">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center relative text-slate-500 transition-colors">
               <span className="material-symbols-outlined text-[22px]">notifications</span>
               <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <Link to="/profile" className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black border-2 border-white dark:border-slate-800">AD</Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50 dark:bg-[#0b0f1a] relative">
          <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
            {children}
          </div>
        </main>

        {/* Mobile-only Bottom Navigation */}
        <nav className="md:hidden h-16 shrink-0 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 px-2 flex justify-around items-center z-50">
          {NAV_CONFIG.filter(item => item.primary).map((item) => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-all ${active ? 'text-primary' : 'text-slate-400'}`}>
                <span className={`material-symbols-outlined text-[24px] ${active ? 'fill-[1]' : ''}`}>{item.icon}</span>
                <span className="text-[8px] font-black uppercase tracking-widest leading-none scale-90">{item.bottomLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;

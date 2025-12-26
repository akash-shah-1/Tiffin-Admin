
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';

const OrderMonitor: React.FC = () => {
  const navigate = useNavigate();
  const { list, allOrders, loading, activeTab, changeTab, refreshOrders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [kitchenFilter, setKitchenFilter] = useState('All');

  const kitchens = Array.from(new Set(allOrders.map(o => o.sellerName)));

  const finalOrders = list.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKitchen = kitchenFilter === 'All' || o.sellerName === kitchenFilter;
    return matchesSearch && matchesKitchen;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Out for Delivery': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'Preparing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Delayed': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Order Logistics Monitor</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time fulfillment visibility</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={refreshOrders}
            className="h-10 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Refresh Queue
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active', val: allOrders.filter(o => ['Preparing', 'Out for Delivery'].includes(o.status)).length, color: 'text-blue-500' },
          { label: 'Cancelled', val: allOrders.filter(o => o.status === 'Cancelled').length, color: 'text-red-500' },
          { label: 'Completed', val: allOrders.filter(o => o.status === 'Delivered').length, color: 'text-emerald-500' },
          { label: 'Volume (₹)', val: `₹${allOrders.reduce((acc, o) => acc + o.amount, 0).toLocaleString()}`, color: 'text-slate-900 dark:text-slate-100' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </section>

      {/* Search & Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input 
                type="text" 
                placeholder="Search by Order ID or Customer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary transition-all"
              />
           </div>
           <select 
             value={kitchenFilter}
             onChange={(e) => setKitchenFilter(e.target.value)}
             className="h-11 px-3 pr-8 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-600"
           >
              <option value="All">All Kitchens</option>
              {kitchens.map(k => <option key={k} value={k}>{k}</option>)}
           </select>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-950/40 rounded-md border border-slate-200 dark:border-slate-800/50 overflow-x-auto no-scrollbar">
          {/* Explicitly cast array to string[] to ensure 'tab' is not inferred as 'unknown' */}
          {(['All', 'Active', 'Completed', 'Cancelled'] as string[]).map((tab) => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              className={`flex-1 min-w-[100px] py-2 text-[10px] font-black uppercase tracking-widest rounded transition-all ${
                activeTab === tab ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
           <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : finalOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => navigate(`/order/${order.id}`)}
              className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group flex flex-col"
            >
              <div className="p-5 space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{order.id}</h3>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">{order.customerName}</p>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-[16px]">restaurant</span>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{order.sellerName}</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-[16px]">shopping_basket</span>
                      <p className="text-xs font-medium text-slate-500 truncate">{order.itemsSummary}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/50">
                   <div className="text-right flex flex-col items-start">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Time</p>
                      <p className="text-xs font-bold">{order.time}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                      <p className="text-sm font-black text-primary">₹{order.amount}</p>
                   </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between px-5">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.date}</span>
                 <span className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                   Manage Order
                   <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                 </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-3 opacity-50 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
           <span className="material-symbols-outlined text-4xl text-slate-400">package_2</span>
           <p className="font-bold text-slate-500 text-sm">No orders found matching this criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrderMonitor;

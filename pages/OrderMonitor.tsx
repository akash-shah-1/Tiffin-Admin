
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';

const OrderCardSkeleton = () => (
  <div className="bg-[#1e293b] dark:bg-[#0f172a] rounded-lg border border-slate-800 shadow-xl flex flex-col overflow-hidden">
    <div className="p-6 space-y-5 flex-1">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-5 w-32 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-20 bg-slate-700 rounded animate-pulse"></div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="size-5 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-start gap-3">
          <div className="size-5 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
        <div className="space-y-1">
          <div className="h-2 w-12 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 w-12 bg-slate-700 rounded animate-pulse ml-auto"></div>
          <div className="h-5 w-20 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
    <div className="p-4 bg-black/20 dark:bg-black/40 border-t border-slate-800 flex items-center justify-between px-6">
      <div className="h-3 w-20 bg-slate-700 rounded animate-pulse"></div>
      <div className="h-3 w-24 bg-slate-700 rounded animate-pulse"></div>
    </div>
  </div>
);

const OrderMonitor: React.FC = () => {
  const navigate = useNavigate();
  const { list, allOrders, loading, activeTab, changeTab, refreshOrders, updateStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [kitchenFilter, setKitchenFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const kitchens = Array.from(new Set(allOrders.map(o => o.sellerName)));

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleStatusUpdate = (e: React.MouseEvent, id: string, status: string) => {
    e.stopPropagation();
    if (window.confirm(`Mark this order as ${status}?`)) {
      updateStatus(id, status);
    }
  };

  const finalOrders = list.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKitchen = kitchenFilter === 'All' || o.sellerName === kitchenFilter;
    const matchesDate = !dateFilter || o.date === dateFilter;
    return matchesSearch && matchesKitchen && matchesDate;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
      case 'Cancelled': return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'Preparing': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'Out for Delivery': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      default: return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Order Logistics Monitor</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time fulfillment visibility</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePullToRefresh}
            className="h-10 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>sync</span>
            {isRefreshing ? 'Refreshing...' : 'Pull to Refresh'}
          </button>
        </div>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              type="text"
              placeholder="Search ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-11 px-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-600 shadow-sm"
            />
            <select
              value={kitchenFilter}
              onChange={(e) => setKitchenFilter(e.target.value)}
              className="h-11 px-3 pr-8 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-600 shadow-sm"
            >
              <option value="All">All Kitchens</option>
              {kitchens.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-950/40 rounded border border-slate-200 dark:border-slate-800/50 overflow-x-auto no-scrollbar">
          {(['All', 'Active', 'Completed', 'Cancelled'] as string[]).map((tab) => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              className={`flex-1 min-w-[100px] py-2 text-[10px] font-black uppercase tracking-widest rounded transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <OrderCardSkeleton key={i} />)
        ) : finalOrders.length > 0 ? (
          finalOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/order/${order.id}`)}
              className="bg-[#1e293b] dark:bg-[#0f172a] rounded-lg border border-slate-800 shadow-xl hover:border-primary/40 transition-all cursor-pointer group flex flex-col overflow-hidden"
            >
              <div className="p-6 space-y-5 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{order.id}</h3>
                    <p className="text-lg font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">{order.customerName}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">restaurant</span>
                    <p className="text-sm font-bold text-slate-200 truncate">{order.sellerName}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-[20px] mt-0.5">shopping_basket</span>
                    <p className="text-sm font-medium text-slate-400 line-clamp-2 leading-relaxed">{order.itemsSummary}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Ordered At</p>
                    <p className="text-sm font-black text-white">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Amount</p>
                    <p className="text-lg font-black text-primary">₹{order.amount}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-black/20 dark:bg-black/40 border-t border-slate-800 flex gap-2 px-4">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/order/${order.id}`); }}
                  className="flex-1 h-9 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all shadow-sm"
                >
                  Details
                </button>
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <button
                    onClick={(e) => handleStatusUpdate(e, order.id, 'Delivered')}
                    className="flex-1 h-9 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-hover transition-all shadow-sm"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center space-y-3 opacity-50 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded">
            <span className="material-symbols-outlined text-4xl text-slate-400">package_2</span>
            <p className="font-bold text-slate-500 text-sm">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderMonitor;

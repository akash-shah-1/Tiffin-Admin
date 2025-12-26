
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKitchens } from '../hooks/useKitchens';

const KitchenManagement: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, counts, setStatus } = useKitchens();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

  const filteredKitchens = list
    .filter(k => {
      const matchesSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           k.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || k.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.joinedAt.localeCompare(a.joinedAt);
    });

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Kitchen Network</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Operational Control & Compliance</p>
        </div>
        <button 
          onClick={() => navigate('/kitchens/add')}
          className="h-10 px-6 rounded-md bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          Onboard Kitchen
        </button>
      </header>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Search kitchen or owner..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-primary text-sm font-medium transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-10 px-3 pr-8 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="Active">Active ({counts.active})</option>
            <option value="Pending">Pending ({counts.pending})</option>
            <option value="Inactive">Inactive ({counts.inactive})</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 px-3 pr-8 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Recent</option>
          </select>
        </div>
      </div>

      {/* Kitchen Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
           <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredKitchens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKitchens.map((kitchen) => (
            <div 
              key={kitchen.id}
              onClick={() => navigate(`/kitchen/${kitchen.id}`)}
              className="group bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="p-5 space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url("${kitchen.logo}")` }}></div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">{kitchen.name}</h3>
                      <p className="text-[10px] font-medium text-slate-400 truncate uppercase tracking-widest">{kitchen.ownerName}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                    kitchen.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                    kitchen.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    {kitchen.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/60 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Orders</p>
                    <p className="text-base font-black text-slate-800 dark:text-slate-200">{kitchen.totalOrders.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/60 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Rating</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <p className="text-base font-black text-slate-800 dark:text-slate-200">{kitchen.rating}</p>
                      <span className="material-symbols-outlined text-[14px] text-amber-500 fill-[1]">star</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">phone</span>
                    {kitchen.phone}
                  </div>
                  <span className="text-primary hover:underline">View Details</span>
                </div>
              </div>

              {/* Quick Action Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60 flex gap-2">
                <a 
                  href={`tel:${kitchen.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] mr-1.5">call</span>
                  Call
                </a>
                {kitchen.status === 'Pending' ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setStatus(kitchen.id, 'Active'); }}
                    className="flex-1 h-9 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-hover transition-all shadow-sm flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1.5">check_circle</span>
                    Approve
                  </button>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/kitchen/${kitchen.id}`); }}
                    className="flex-1 h-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:border-primary/50 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1.5">visibility</span>
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-3 opacity-50 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
           <span className="material-symbols-outlined text-4xl text-slate-400">inventory_2</span>
           <p className="font-bold text-slate-500 text-sm">No kitchens found matching criteria.</p>
        </div>
      )}
    </div>
  );
};

export default KitchenManagement;

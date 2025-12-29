
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuApprovals } from '../hooks/useMenuApprovals';

const MenuApprovalSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[420px] bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
  </div>
);

const MenuApprovals: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, activeFilter, changeFilter, approveItem, stats } = useMenuApprovals();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'kitchen'>('date');

  const processedList = [...list]
    .filter(i => 
      i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      i.kitchenName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return b.submittedAt.localeCompare(a.submittedAt);
      return a.kitchenName.localeCompare(b.kitchenName);
    });

  if (loading && list.length === 0) {
    return <MenuApprovalSkeleton />;
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Veg': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      case 'Non-Veg': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'Vegan': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      case 'Jain': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'Gluten-Free': return 'text-sky-600 bg-sky-500/10 border-sky-500/20';
      case 'Dairy-Free': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20';
      default: return 'text-slate-500 bg-slate-100';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      case 'Rejected': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'Changes Requested': return 'text-orange-600 bg-orange-500/10 border-orange-500/20';
      default: return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Quality Assurance</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Manual Content Verification Pipeline</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-md border border-slate-200 dark:border-slate-800/50">
          {(['All', 'Today', 'This Week'] as const).map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition-all ${
                activeFilter === f ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Action', val: stats.pending, icon: 'pending_actions', color: 'text-amber-500', badge: true },
          { label: 'Approved Today', val: stats.approvedToday, icon: 'check_circle', color: 'text-primary' },
          { label: 'Rejected Today', val: stats.rejectedToday, icon: 'cancel', color: 'text-red-500' },
          { label: 'Total Items', val: stats.totalItems, icon: 'fastfood', color: 'text-blue-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined ${s.color} text-[20px]`}>{s.icon}</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
            </div>
            <p className="text-2xl font-black mt-2">{s.val}</p>
          </div>
        ))}
      </section>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Search items or kitchens..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm transition-all"
          />
        </div>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="h-11 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 focus:ring-primary"
        >
          <option value="date">Sort by Recent</option>
          <option value="kitchen">Sort by Kitchen</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {processedList.length > 0 ? (
          processedList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-300"
            >
              <div 
                className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                onClick={() => navigate(`/approvals/${item.id}`)}
              >
                <img src={item.image} alt={item.itemName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                   <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded self-start">{item.category}</span>
                   <span className={`px-2 py-1 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded border self-start ${getStatusBadge(item.status)}`}>{item.status === 'Pending' ? 'In Review' : item.status}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded font-black text-xs shadow-xl">₹{item.price}</div>
              </div>
              
              <div className="p-4 space-y-4 flex-1 flex flex-col">
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight truncate">{item.itemName}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">restaurant</span>
                    {item.kitchenName}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase border ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && <span className="text-[8px] font-bold text-slate-400">+{item.tags.length - 2}</span>}
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 flex-1 italic">"{item.description}"</p>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-800/50 flex flex-col gap-2">
                  <button 
                    onClick={() => navigate(`/approvals/${item.id}`)}
                    className="w-full h-9 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black text-[9px] uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all shadow-sm"
                  >
                    Examine Item
                  </button>
                  {item.status === 'Pending' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); approveItem(item.id); }}
                      className="w-full h-9 rounded bg-primary text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
                    >
                      Quick Approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center opacity-40 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
            <span className="material-symbols-outlined text-5xl mb-3">fact_check</span>
            <p className="text-sm font-black uppercase tracking-[0.2em]">Queue Fully Cleared</p>
            <p className="text-xs font-bold text-slate-400 mt-2">No menu items awaiting review at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuApprovals;

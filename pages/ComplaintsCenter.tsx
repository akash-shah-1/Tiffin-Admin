
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';
import { ComplaintCategory } from '../types';

const ComplaintCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
    <div className="flex justify-between items-center pt-2">
      <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
    </div>
  </div>
);

const ComplaintsCenter: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, activeTab, changeTab, counts } = useComplaints();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | 'All'>('All');

  const categories: ComplaintCategory[] = ['Order issue', 'Payment issue', 'Food quality', 'Delivery problem', 'App issue', 'Other'];

  const filteredList = list.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-100';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Customer Support</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Resolution Pipeline & Ticketing</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-md border border-slate-200 dark:border-slate-800/50">
          {[
            { id: 'Open', label: 'Open', count: counts.open },
            { id: 'In Progress', label: 'In Progress', count: counts.inProgress },
            { id: 'Resolved', label: 'Resolved', count: counts.resolved }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => changeTab(t.id as any)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition-all flex items-center gap-2 ${
                activeTab === t.id ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
              <span className={`px-1.5 py-0.5 rounded text-[8px] ${activeTab === t.id ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>{t.count}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Search Ticket ID or Customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="h-11 px-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 focus:ring-primary shadow-sm"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <ComplaintCardSkeleton key={i} />)
        ) : filteredList.length > 0 ? (
          filteredList.map((c) => (
            <div 
              key={c.id}
              onClick={() => navigate(`/complaint/${c.id}`)}
              className="group bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/40 transition-all cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{c.id}</h3>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors leading-tight">{c.subject}</h2>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${getPriorityColor(c.priority)}`}>
                    {c.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">{c.description}</p>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50 dark:border-slate-800/50">
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      {c.customerName}
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">category</span>
                      {c.category}
                   </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <span>Created {c.createdAt}</span>
                 <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Resolve Ticket
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                 </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md text-center opacity-40">
             <span className="material-symbols-outlined text-4xl mb-2">support_agent</span>
             <p className="text-xs font-bold uppercase tracking-widest">No matching tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsCenter;

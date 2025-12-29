
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKitchenApprovals } from '../hooks/useKitchenApprovals';

const ApprovalSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[400px] bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
  </div>
);

const KitchenApprovals: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, activeFilter, changeFilter, approveKitchen, stats } = useKitchenApprovals();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = list.filter(r => 
    r.kitchenName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && list.length === 0) {
    return <ApprovalSkeleton />;
  }

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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Merchant Enrollment</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">External Seller Registration Queue</p>
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
          { label: 'Pending Review', val: stats.pending, icon: 'how_to_reg', color: 'text-amber-500' },
          { label: 'Approved Today', val: 4, icon: 'check_circle', color: 'text-primary' },
          { label: 'Rejected Today', val: 1, icon: 'cancel', color: 'text-red-500' },
          { label: 'Total Inflow', val: stats.total, icon: 'input', color: 'text-blue-500' },
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

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </span>
        <input 
          type="text" 
          placeholder="Search by kitchen or owner name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <div 
              key={req.id} 
              className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-300"
            >
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                onClick={() => navigate(`/approvals/${req.id}`)}
              >
                <img src={req.kitchenPhotos[0]} alt={req.kitchenName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                   <span className={`px-2 py-1 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded border ${getStatusBadge(req.status)}`}>{req.status}</span>
                </div>
              </div>
              
              <div className="p-4 space-y-4 flex-1 flex flex-col">
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate">{req.kitchenName}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {req.ownerName}
                  </p>
                </div>

                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">FSSAI License</p>
                   <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{req.fssaiNumber}</p>
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 flex-1">
                  <span className="material-symbols-outlined text-[12px] align-middle mr-1">location_on</span>
                  {req.address}
                </p>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-800/50 flex flex-col gap-2">
                  <button 
                    onClick={() => navigate(`/approvals/${req.id}`)}
                    className="w-full h-9 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black text-[9px] uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    Review Documents
                  </button>
                  {req.status === 'Pending' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); approveKitchen(req.id); }}
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
            <span className="material-symbols-outlined text-5xl mb-3">how_to_reg</span>
            <p className="text-sm font-black uppercase tracking-[0.2em]">Queue Fully Cleared</p>
            <p className="text-xs font-bold text-slate-400 mt-2">No incoming registration requests at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenApprovals;

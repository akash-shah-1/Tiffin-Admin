
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApprovals } from '../hooks/useApprovals';

const PlanApprovals: React.FC = () => {
  const navigate = useNavigate();
  const { plans, loading, activeTab, changeTab, handleProcess, counts } = useApprovals();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = plans.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Verification Pipeline</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Merchant Content Lifecycle Management</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group flex-1 md:flex-none">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input 
              type="text" 
              placeholder="Filter queue..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-medium transition-all shadow-sm"
            />
          </div>
          <button className="h-10 px-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">filter_alt</span>
          </button>
        </div>
      </header>

      {/* Professional Responsive Tabs - Using Green Theme */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-950/40 rounded-md overflow-x-auto no-scrollbar scroll-smooth">
        {[
          { id: 'Pending', label: 'REVIEW NEEDED', count: counts.pending },
          { id: 'Approved', label: 'LIVE PLANS', count: counts.approved },
          { id: 'Rejected', label: 'DECLINED', count: counts.rejected }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => changeTab(t.id as any)}
            className={`flex-1 flex items-center justify-center gap-3 py-2.5 px-6 rounded-md transition-all duration-200 min-w-max md:min-w-0 ${
              activeTab === t.id 
                ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap">
              {t.label}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              activeTab === t.id 
                ? 'bg-primary/10 text-primary' 
                : 'bg-slate-200 dark:bg-slate-800'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
           <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => navigate(`/review/${plan.id}`)}
              className="group bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Card Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-slate-200 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundImage: `url("${plan.sellerAvatar}")` }}></div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">{plan.seller}</h3>
                    <p className="text-[10px] font-medium text-slate-400 truncate uppercase tracking-widest">{plan.sentAt}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                   plan.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
                   plan.status === 'Approved' ? 'bg-primary/10 text-primary border-primary/20' : 
                   'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}>
                  {plan.status === 'Pending' ? 'Queued' : plan.status}
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] font-bold text-white shadow-lg">
                  {plan.price}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2 flex-1">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors leading-tight">{plan.title}</h2>
                <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed h-8">{plan.description}</p>
              </div>

              {/* Footer Actions */}
              {activeTab === 'Pending' && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60 flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleProcess(plan.id, 'Rejected'); }} 
                    className="flex-1 h-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-600 hover:border-red-200 dark:hover:border-red-900/40 font-bold text-[10px] uppercase transition-all shadow-sm"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleProcess(plan.id, 'Approved'); }} 
                    className="flex-1 h-9 rounded bg-primary text-white font-bold text-[10px] uppercase shadow shadow-primary/20 hover:bg-primary-hover transition-all"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-3 opacity-50 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
           <span className="material-symbols-outlined text-4xl text-slate-400">checklist</span>
           <p className="font-bold text-slate-500 text-sm">Review queue is clear.</p>
        </div>
      )}
    </div>
  );
};

export default PlanApprovals;
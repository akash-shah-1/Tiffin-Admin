
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';

const PaymentsDashboardSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 animate-pulse">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      ))}
    </div>

    <div className="space-y-6">
      <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-1"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6 space-y-6">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
              <div className="h-14 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
            </div>
            <div className="h-16 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PaymentsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { settlements, loading, stats, activeFilter, changeFilter } = usePayments();

  if (loading && settlements.length === 0) {
    return <PaymentsDashboardSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Treasury & Settlements</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Platform Financial Reconciliation</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-md border border-slate-200 dark:border-slate-800/50">
          {(['All', 'Pending', 'Completed'] as const).map((f) => (
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

      {/* Financial Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Revenue", val: `₹${(24500).toLocaleString()}`, icon: 'payments', color: 'text-primary' },
          { label: "Monthly Gross", val: `₹${(stats.totalRevenue * 4.5).toLocaleString()}`, icon: 'account_balance', color: 'text-blue-500' },
          { label: "Pending Payouts", val: `₹${stats.pendingPayouts.toLocaleString()}`, icon: 'pending', color: 'text-amber-500' },
          { label: "Processed (All Time)", val: `₹${(stats.processedPayouts * 12).toLocaleString()}`, icon: 'check_circle', color: 'text-emerald-500' },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
             <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${m.color} text-[20px]`}>{m.icon}</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{m.label}</p>
             </div>
             <p className="text-2xl font-black tracking-tight">{m.val}</p>
          </div>
        ))}
      </section>

      {/* Settlements List */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider px-1">Settlement Queue ({settlements.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settlements.length > 0 ? (
            settlements.map((s) => (
              <div 
                key={s.id}
                onClick={() => navigate(`/settlement/${s.id}`)}
                className="group bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/40 transition-all cursor-pointer flex flex-col"
              >
                <div className="p-6 space-y-5 flex-1">
                   <div className="flex justify-between items-start">
                      <div className="min-w-0">
                         <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">{s.kitchenName}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.dateRange}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                        s.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      }`}>
                        {s.status}
                      </span>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 rounded text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Orders</p>
                         <p className="text-lg font-black">{s.totalOrders}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 rounded text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Gross Amount</p>
                         <p className="text-lg font-black text-slate-800 dark:text-slate-200">₹{s.totalAmount}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-4 bg-primary/5 dark:bg-primary/10 rounded-md border border-primary/20">
                      <div>
                         <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">Final Payout</p>
                         <p className="text-xl font-black text-primary">₹{s.payoutAmount}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Commission ({s.commissionRate}%)</p>
                         <p className="text-sm font-bold text-slate-500">₹{s.commissionAmount}</p>
                      </div>
                   </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60">
                   <button className="w-full h-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:text-primary hover:border-primary/40 transition-all shadow-sm">
                      {s.status === 'Pending' ? 'Review & Disburse' : 'View Payout Receipt'}
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md text-center opacity-40">
               <span className="material-symbols-outlined text-4xl mb-2">payments</span>
               <p className="text-xs font-bold uppercase tracking-widest">No matching settlements found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsDashboard;

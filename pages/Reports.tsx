
import React, { useState, useEffect } from 'react';
import { useReports } from '../hooks/useReports';
import { useKitchens } from '../hooks/useKitchens';

const ReportSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6"></div>
      ))}
    </div>
    <div className="h-64 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
    <div className="h-96 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
  </div>
);

const Reports: React.FC = () => {
  const { report, loading, activeType, changeType, getDaily, getMonthly, getKitchen, simulateExport } = useReports();
  const { list: kitchens } = useKitchens();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState('2024-05');
  const [selectedKitchen, setSelectedKitchen] = useState('');
  const [dateRange, setDateRange] = useState('Last 7 Days');

  useEffect(() => {
    if (activeType === 'Daily') getDaily(selectedDate);
    if (activeType === 'Monthly') getMonthly(selectedMonth);
    if (activeType === 'Kitchen' && selectedKitchen) getKitchen(selectedKitchen, dateRange);
  }, [activeType, selectedDate, selectedMonth, selectedKitchen, dateRange, getDaily, getMonthly, getKitchen]);

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Financial Intelligence</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Audit-ready reporting modules</p>
        </div>
        <button 
          onClick={simulateExport}
          className="h-10 px-4 rounded bg-primary text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
          Export PDF Report
        </button>
      </header>

      {/* Report Type Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-md border border-slate-200 dark:border-slate-800/50 max-w-xl">
        {(['Daily', 'Monthly', 'Kitchen'] as const).map((t) => (
          <button
            key={t}
            onClick={() => changeType(t)}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded transition-all ${
              activeType === t ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t} Sales
          </button>
        ))}
      </div>

      {/* Contextual Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center">
        {activeType === 'Daily' && (
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Date</span>
             <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="h-9 px-3 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950 text-xs font-bold" />
          </div>
        )}
        {activeType === 'Monthly' && (
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Month</span>
             <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="h-9 px-3 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950 text-xs font-bold" />
          </div>
        )}
        {activeType === 'Kitchen' && (
          <>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Kitchen</span>
               <select value={selectedKitchen} onChange={(e) => setSelectedKitchen(e.target.value)} className="h-9 px-3 pr-8 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950 text-xs font-bold">
                  <option value="">Choose Kitchen...</option>
                  {kitchens.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
               </select>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Range</span>
               <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="h-9 px-3 pr-8 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950 text-xs font-bold">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Custom Range</option>
               </select>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <ReportSkeleton />
      ) : report ? (
        <div className="space-y-8 animate-in fade-in duration-500">
           {/* Summary Cards */}
           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Gross Revenue', val: `₹${report.totalRevenue.toLocaleString()}`, icon: 'payments', color: 'text-primary' },
                { label: 'Total Volume', val: `${report.totalOrders} Orders`, icon: 'shopping_cart', color: 'text-blue-500' },
                { label: 'Yield (Comm.)', val: `₹${report.totalCommission.toLocaleString()}`, icon: 'account_balance', color: 'text-emerald-500' },
                { label: 'Avg Order', val: `₹${report.avgOrderValue}`, icon: 'analytics', color: 'text-amber-500' },
              ].map((m) => (
                <div key={m.label} className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                   <div className="flex items-center gap-2 text-slate-400">
                      <span className={`material-symbols-outlined text-[18px] ${m.color}`}>{m.icon}</span>
                      <p className="text-[9px] font-black uppercase tracking-widest leading-none">{m.label}</p>
                   </div>
                   <p className="text-2xl font-black">{m.val}</p>
                </div>
              ))}
           </section>

           {/* Charts / Visuals */}
           {(report.chartData || report.topKitchens) && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {report.chartData && (
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b dark:border-slate-800 pb-2">Revenue Velocity</h3>
                      <div className="h-48 flex items-end justify-between gap-4">
                         {report.chartData.map((d, i) => (
                           <div key={i} className="flex-1 flex flex-col items-center gap-2">
                              <div className="w-full bg-primary/10 rounded-t-sm relative group" style={{ height: `${(d.value / Math.max(...report.chartData!.map(v => v.value))) * 100}%` }}>
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹{d.value}</div>
                                 <div className="size-full bg-primary/40 group-hover:bg-primary transition-colors rounded-t-sm"></div>
                              </div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.label}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
                 {report.topKitchens && (
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b dark:border-slate-800 pb-2">Top Performers</h3>
                      <div className="space-y-4">
                         {report.topKitchens.map((k, i) => (
                           <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400">{i+1}</div>
                                 <p className="text-sm font-bold">{k.name}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-black">₹{k.revenue.toLocaleString()}</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase">{k.orders} Orders</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
              </section>
           )}

           {/* Itemized Table */}
           {report.breakdown && (
             <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Itemized Audit Log</h3>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/50 dark:bg-slate-950/20 font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                         <tr>
                            <th className="px-6 py-3">Kitchen Profile</th>
                            <th className="px-6 py-3 text-right">Orders</th>
                            <th className="px-6 py-3 text-right">Gross GMV</th>
                            <th className="px-6 py-3 text-right">Yield (Net)</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 font-medium">
                         {report.breakdown.map((row, i) => (
                           <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{row.name}</td>
                              <td className="px-6 py-4 text-right font-black">{row.orders}</td>
                              <td className="px-6 py-4 text-right font-black">₹{row.revenue.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right text-emerald-600 font-black">₹{row.commission.toLocaleString()}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </section>
           )}
        </div>
      ) : (
        <div className="py-24 text-center opacity-40 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
           <span className="material-symbols-outlined text-4xl mb-2">query_stats</span>
           <p className="text-xs font-bold uppercase tracking-widest">Select criteria to generate report</p>
        </div>
      )}
    </div>
  );
};

export default Reports;

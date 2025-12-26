
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';

const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8">
    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
       <div className="space-y-2">
         <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
         <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
       </div>
       <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
      </div>
      <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { metrics, quickStats, revenueData, volumeData, activity, loading, refreshData } = useDashboard();
  
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');

  // SVG Chart Configuration
  const chartW = 1000;
  const chartH = 200;
  
  // Calculate Chart Points
  const maxVal = useMemo(() => Math.max(...(revenueData?.map(d => d.val) || [1])), [revenueData]);
  const getX = (i: number) => (i / (revenueData.length - 1)) * chartW;
  const getY = (v: number) => chartH - (v / maxVal) * chartH;

  // Generate Smooth Bezier Path
  const smoothPath = useMemo(() => {
    if (!revenueData.length) return "";
    return revenueData.reduce((path, d, i, arr) => {
      const x = getX(i);
      const y = getY(d.val);
      if (i === 0) return `M ${x},${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(arr[i - 1].val);
      const cp1x = prevX + (x - prevX) / 2;
      return `${path} C ${cp1x},${prevY} ${cp1x},${y} ${x},${y}`;
    }, "");
  }, [revenueData, maxVal]);

  if (loading && !metrics) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Command Center</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time fulfillment network overview</p>
        </div>
        <button 
          onClick={refreshData}
          className="h-10 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>sync</span>
          Sync
        </button>
      </header>

      {/* 1. Essential Metrics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Orders", val: metrics?.todayOrders, trend: metrics?.trends.orders, icon: 'shopping_cart', color: 'text-primary' },
          { label: "Active Customers", val: metrics?.activeCustomers, trend: metrics?.trends.customers, icon: 'groups', color: 'text-blue-500' },
          { label: "Active Kitchens", val: metrics?.activeKitchens, trend: metrics?.trends.kitchens, icon: 'restaurant', color: 'text-orange-500' },
          { label: "Today's Revenue", val: `₹${metrics?.todayRevenue.toLocaleString()}`, trend: metrics?.trends.revenue, icon: 'payments', color: 'text-emerald-500' },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <span className={`material-symbols-outlined ${m.color} text-[24px]`}>{m.icon}</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black">{m.trend}</span>
             </div>
             <div>
                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">{m.val}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{m.label}</p>
             </div>
          </div>
        ))}
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {[
           { label: 'View All Orders', icon: 'package_2', path: '/orders' },
           { label: 'Manage Kitchens', icon: 'storefront', path: '/kitchens' },
           { label: 'View Customers', icon: 'person_search', path: '/customers' },
           { label: 'Handle Disputes', icon: 'report_problem', path: '/disputes' },
         ].map((action) => (
           <button
             key={action.label}
             onClick={() => navigate(action.path)}
             className="h-20 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-md flex flex-col items-center justify-center gap-1.5 hover:bg-primary hover:text-white transition-all group"
           >
              <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-[20px]">{action.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
           </button>
         ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Revenue Trend - High Fidelity SVG Chart */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 overflow-hidden">
             <div className="flex justify-between items-center">
                <div>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue Forecast</h3>
                   <p className="text-[10px] text-slate-500 mt-0.5">Performance tracking across delivery zones</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded text-[9px] font-black">
                   {(['7D', '30D', '90D'] as const).map(r => (
                     <button 
                       key={r} 
                       onClick={() => setTimeRange(r)}
                       className={`px-3 py-1 rounded transition-all ${timeRange === r ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}
                     >
                        {r}
                     </button>
                   ))}
                </div>
             </div>

             <div className="h-56 w-full relative group/chart">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
                   {/* Y-Axis Grid Lines */}
                   {[0, 0.25, 0.5, 0.75, 1].map(p => (
                     <line 
                        key={p} 
                        x1="0" y1={chartH * p} x2={chartW} y2={chartH * p} 
                        stroke="currentColor" 
                        className="text-slate-100 dark:text-slate-800/50" 
                        strokeWidth="1" 
                     />
                   ))}

                   {/* Main Gradient Area */}
                   <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   <path d={`${smoothPath} L ${chartW},${chartH} L 0,${chartH} Z`} fill="url(#areaGrad)" className="transition-all duration-500" />
                   
                   {/* Bezier Line */}
                   <path d={smoothPath} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500" />

                   {/* Hover Vertical Line */}
                   {hoveredIdx !== null && (
                      <line 
                        x1={getX(hoveredIdx)} y1="0" x2={getX(hoveredIdx)} y2={chartH} 
                        stroke="#16a34a" strokeWidth="1" strokeDasharray="4,4" 
                      />
                   )}

                   {/* Interaction Points */}
                   {revenueData.map((d, i) => (
                      <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                         <rect 
                           x={getX(i) - (chartW / (revenueData.length * 2))} 
                           y="0" 
                           width={chartW / (revenueData.length - 1)} 
                           height={chartH} 
                           fill="transparent" 
                           className="cursor-pointer"
                         />
                         <circle 
                            cx={getX(i)} cy={getY(d.val)} 
                            r={hoveredIdx === i ? 7 : 4} 
                            fill={hoveredIdx === i ? "#16a34a" : "#fff"} 
                            stroke="#16a34a" strokeWidth="2" 
                            className="transition-all duration-200 pointer-events-none" 
                         />
                      </g>
                   ))}
                </svg>

                {/* Floating Tooltip */}
                {hoveredIdx !== null && (
                  <div 
                    className="absolute z-20 bg-slate-900 text-white p-2 rounded shadow-xl pointer-events-none flex flex-col gap-0.5 min-w-[100px] border border-slate-700"
                    style={{ 
                      left: `${(getX(hoveredIdx) / chartW) * 100}%`, 
                      top: `${(getY(revenueData[hoveredIdx].val) / chartH) * 100}%`,
                      transform: `translate(${getX(hoveredIdx) > chartW/2 ? '-110%' : '10%'}, -110%)`
                    }}
                  >
                     <span className="text-[8px] font-black uppercase text-slate-400">{revenueData[hoveredIdx].day} Analytics</span>
                     <span className="text-sm font-black">₹{revenueData[hoveredIdx].val.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between mt-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   {revenueData.map((d, i) => (
                      <span key={i} className={hoveredIdx === i ? 'text-primary' : ''}>{d.day}</span>
                   ))}
                </div>
             </div>
          </section>

          {/* Order Volume - Reactive Bar Chart */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Order Frequency</h3>
                <span className="text-[10px] font-bold text-slate-400">Target: 200/Day</span>
             </div>
             <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
                {volumeData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                     <div 
                        className="w-full max-w-[44px] bg-slate-100 dark:bg-slate-800 group-hover:bg-primary transition-all rounded-t-sm relative"
                        style={{ height: `${(d.val / Math.max(...volumeData.map(v => v.val))) * 100}%` }}
                     >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-lg whitespace-nowrap z-10">
                           {d.val} Deliveries
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-slate-900 rotate-45"></div>
                        </div>
                     </div>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.day}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Quick Stats / Pulse */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-4">Fulfillment Pulse</h3>
             <div className="space-y-4">
                {[
                  { label: 'Orders pending acceptance', val: quickStats?.pendingAcceptance, icon: 'pending_actions', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Complaints to resolve', val: quickStats?.complaintsToResolve, icon: 'report', color: 'text-red-500', bg: 'bg-red-500/10' },
                  { label: 'New registrations pending', val: quickStats?.pendingKitchens, icon: 'app_registration', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary/30 transition-all cursor-default group">
                     <div className="flex items-center gap-3">
                        <div className={`size-8 rounded ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                           <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-tight max-w-[120px]">{stat.label}</span>
                     </div>
                     <span className="text-lg font-black">{stat.val}</span>
                  </div>
                ))}
             </div>
          </section>

          {/* Activity Log */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-4">Network Activity</h3>
             <div className="space-y-5">
                {activity.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                     <div className={`size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all`}>
                        <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-primary">{item.icon}</span>
                     </div>
                     <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.sub}</p>
                        <p className="text-[9px] text-slate-400 mt-1">{item.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

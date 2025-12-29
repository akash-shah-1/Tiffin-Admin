
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import { MetricCard } from '../components/ui/MetricCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { metrics, quickStats, revenueData, volumeData, activity, loading } = useDashboard();
  
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const chartW = 1000;
  const chartH = 200;
  
  const maxVal = useMemo(() => Math.max(...(revenueData?.map(d => d.val) || [1])), [revenueData]);
  const getX = (i: number) => (i / (revenueData.length - 1)) * chartW;
  const getY = (v: number) => chartH - (v / maxVal) * chartH;

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

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      {/* Essential Metrics - Unified Component */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <MetricCard label="TODAY'S ORDERS" value={metrics?.todayOrders} trend={metrics?.trends.orders} icon="shopping_cart" loading={loading} />
        <MetricCard label="ACTIVE CUSTOMERS" value={metrics?.activeCustomers} trend={metrics?.trends.customers} icon="groups" iconColor="text-blue-500" loading={loading} />
        <MetricCard label="ACTIVE KITCHENS" value={metrics?.activeKitchens} trend={metrics?.trends.kitchens} icon="restaurant" iconColor="text-orange-500" loading={loading} />
        <MetricCard label="TODAY'S REVENUE" value={`₹${metrics?.todayRevenue.toLocaleString()}`} trend={metrics?.trends.revenue} icon="payments" iconColor="text-emerald-500" loading={loading} />
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-3 gap-3">
         {[
           { label: 'Manage Kitchens', icon: 'storefront', path: '/kitchens' },
           { label: 'View Customers', icon: 'person_search', path: '/customers' },
           { label: 'Handle Disputes', icon: 'support_agent', path: '/complaints' },
         ].map((action) => (
           <button
             key={action.label}
             onClick={() => navigate(action.path)}
             className="h-16 md:h-20 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-md flex flex-col items-center justify-center gap-1 hover:bg-primary hover:text-white transition-all group"
           >
              <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-[18px] md:text-[20px]">{action.icon}</span>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center px-1 leading-tight">{action.label}</span>
           </button>
         ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Forecast SVG Chart */}
          <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 overflow-hidden">
             <div className="flex justify-between items-center">
                <div>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue Forecast</h3>
                   <p className="text-[10px] text-slate-500 mt-0.5">Real-time GMV pacing</p>
                </div>
             </div>
             <div className="h-56 w-full relative">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
                   <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   <path d={`${smoothPath} L ${chartW},${chartH} L 0,${chartH} Z`} fill="url(#areaGrad)" />
                   <path d={smoothPath} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
                   {revenueData.map((d, i) => (
                      <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                         <circle cx={getX(i)} cy={getY(d.val)} r={hoveredIdx === i ? 6 : 4} fill={hoveredIdx === i ? "#16a34a" : "#fff"} stroke="#16a34a" strokeWidth="2" className="transition-all" />
                      </g>
                   ))}
                </svg>
             </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-4">Fulfillment Pulse</h3>
             <div className="space-y-4">
                {[
                  { label: 'Orders pending', val: quickStats?.pendingAcceptance, icon: 'pending_actions', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Unresolved disputes', val: quickStats?.complaintsToResolve, icon: 'report', color: 'text-red-500', bg: 'bg-red-500/10' },
                  { label: 'Kitchen approvals', val: quickStats?.pendingKitchens, icon: 'app_registration', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary/30 transition-all cursor-default">
                     <div className="flex items-center gap-3">
                        <div className={`size-8 rounded ${stat.bg} ${stat.color} flex items-center justify-center`}><span className="material-symbols-outlined text-[18px]">{stat.icon}</span></div>
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{stat.label}</span>
                     </div>
                     <span className="text-lg font-black">{stat.val}</span>
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

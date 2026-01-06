import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
   LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
   Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useDashboard } from '../hooks/useDashboard';
import { MetricCard } from '../components/ui/MetricCard';

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard: React.FC = () => {
   const navigate = useNavigate();
   const {
      metrics,
      quickStats,
      revenueData,
      monthlyRevenue,
      orderStatusDistribution,
      categoryDistribution,
      loading
   } = useDashboard();

   return (
      <div className="space-y-8 pb-24 md:pb-8">
         {/* Essential Metrics */}
         <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MetricCard label="TODAY'S ORDERS" value={metrics?.todayOrders} trend={metrics?.trends.orders} icon="shopping_cart" loading={loading} />
            <MetricCard label="ACTIVE CUSTOMERS" value={metrics?.activeCustomers} trend={metrics?.trends.customers} icon="groups" iconColor="text-blue-500" loading={loading} />
            <MetricCard label="ACTIVE KITCHENS" value={metrics?.activeKitchens} trend={metrics?.trends.kitchens} icon="restaurant" iconColor="text-orange-500" loading={loading} />
            <MetricCard label="TODAY'S REVENUE" value={`₹${(metrics?.todayRevenue || 0).toLocaleString()}`} trend={metrics?.trends.revenue} icon="payments" iconColor="text-emerald-500" loading={loading} />
         </section>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Revenue Chart */}
            <div className="lg:col-span-2 space-y-6">
               <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue Forecast (Weekly)</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">Rolling 7-day GMV pacing</p>
                     </div>
                  </div>
                  <div className="h-72 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                           <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                              dy={10}
                           />
                           <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: '#9ca3af', fontSize: 10 }}
                              tickFormatter={(val) => `₹${val}`}
                           />
                           <Tooltip
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                              itemStyle={{ color: '#16a34a' }}
                           />
                           <Line
                              type="monotone"
                              dataKey="val"
                              stroke="#16a34a"
                              strokeWidth={3}
                              dot={{ fill: '#16a34a', r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                           />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
               </section>

               {/* Monthly Growth */}
               <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Scaling</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">Revenue growth across last 6 months</p>
                     </div>
                  </div>
                  <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyRevenue}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                           <XAxis
                              dataKey="month"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                           />
                           <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                           <Tooltip cursor={{ fill: '#374151', opacity: 0.1 }} contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                           <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </section>
            </div>

            {/* Sidebar Charts & Stats */}
            <div className="space-y-6">
               <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-4">Order Logistics</h3>
                  <div className="h-56 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={orderStatusDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                           >
                              {orderStatusDistribution?.map((entry: any, index: number) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                           </Pie>
                           <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                           <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
               </section>

               <section className="bg-white dark:bg-[#111827] p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-4">Meal Preferences</h3>
                  <div className="h-56 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={categoryDistribution}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                           >
                              {categoryDistribution?.map((entry: any, index: number) => (
                                 <Cell key={`cell-${index}`} fill={index === 0 ? '#16a34a' : '#ef4444'} />
                              ))}
                           </Pie>
                           <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
               </section>

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

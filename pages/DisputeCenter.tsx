
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DisputeCenter: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Resolved'>('All');

  const disputes = [
    {
      id: '8821',
      orderId: '#4092',
      title: 'Food quality & Hygiene',
      desc: 'User claims the food delivered was spoiled and had a bad odor. Photos attached.',
      priority: 'Critical',
      elapsed: '2h 15m',
      userImg: 'https://picsum.photos/100/100?random=41',
      sellerImg: 'https://picsum.photos/100/100?random=42'
    },
    {
      id: '8822',
      orderId: '#3881',
      title: 'Late Delivery',
      desc: 'Delivery arrived 45 mins late. User requesting partial refund.',
      priority: 'Medium',
      elapsed: '5h 30m',
      userImg: 'https://picsum.photos/100/100?random=43',
      sellerImg: 'https://picsum.photos/100/100?random=44'
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Dispute Center</h1>
        </div>
        <button className="size-10 rounded-full flex items-center justify-center hover:bg-white/10 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      {/* Stats Row */}
      <section className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {[
          { label: 'Open', value: '12', icon: 'folder_open', color: 'blue' },
          { label: 'Critical', value: '3', icon: 'error', color: 'red' },
          { label: 'Avg. Time', value: '4h', icon: 'timer', color: 'primary' },
        ].map((stat, i) => (
          <div key={i} className="flex-1 min-w-[140px] p-5 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
             <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg bg-${stat.color === 'primary' ? 'primary' : stat.color}-500/10 text-${stat.color === 'primary' ? 'primary' : stat.color}-500`}>
                  <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {['All', 'Active', 'Pending', 'Resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filter === f 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg' 
                : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-white/10 text-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold tracking-tight px-2">Active Disputes</h3>

      {/* Dispute Cards */}
      <div className="space-y-6">
        {disputes.map((dispute) => (
          <div 
            key={dispute.id}
            onClick={() => navigate(`/dispute/${dispute.id}`)}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
          >
            {/* Left accent strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${dispute.priority === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            
            <div className="p-6 pl-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Order {dispute.orderId}</span>
                  <h4 className="text-lg font-bold leading-tight">{dispute.title}</h4>
                </div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  dispute.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                } flex items-center gap-1.5`}>
                  <span className="material-symbols-outlined text-[14px]">{dispute.priority === 'Critical' ? 'priority_high' : 'schedule'}</span>
                  {dispute.priority}
                </span>
              </div>

              <p className="text-sm font-medium text-gray-500 line-clamp-2">{dispute.desc}</p>

              {/* Participants Bar */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-100 dark:bg-background-dark/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={dispute.userImg} className="size-9 rounded-full border-2 border-white dark:border-surface-dark shadow-sm" alt="User" />
                    <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-100 text-[8px] font-black text-red-600 border border-white">U</span>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-white/10"></div>
                  <div className="relative">
                    <img src={dispute.sellerImg} className="size-9 rounded-full border-2 border-white dark:border-surface-dark shadow-sm" alt="Seller" />
                    <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-blue-100 text-[8px] font-black text-blue-600 border border-white">S</span>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Time elapsed</p>
                   <p className="text-sm font-black">{dispute.elapsed}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="py-3 rounded-2xl border border-gray-100 dark:border-white/10 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all active:scale-95"
                >
                  Dismiss
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="py-3 rounded-2xl bg-primary text-background-dark font-black text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  Resolve
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputeCenter;

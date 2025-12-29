
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelivery } from '../hooks/useDelivery';
import { DeliveryStatus } from '../types';

const DeliverySkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[380px] bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      ))}
    </div>
  </div>
);

const DeliveryPartners: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, stats } = useDelivery();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | 'All'>('All');

  const filtered = list.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading && list.length === 0) {
    return <DeliverySkeleton />;
  }

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'Online': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Offline': return 'text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
      case 'Busy': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Suspended': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Pending Verification': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-500';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'Bike': return 'motorcycle';
      case 'Scooter': return 'moped';
      case 'Cycle': return 'pedal_bike';
      default: return 'directions_bike';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Logistics Fleet</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Delivery Partner Network Operations</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => navigate('/delivery/add')}
             className="h-10 px-6 rounded-md bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2"
           >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Onboard Partner
           </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Partners', val: stats.total, icon: 'groups', color: 'text-slate-400' },
          { label: 'Online Now', val: stats.online, icon: 'sensors', color: 'text-emerald-500' },
          { label: 'Deliveries Today', val: stats.todayDeliveries, icon: 'local_shipping', color: 'text-blue-500' },
          { label: 'Avg Time', val: stats.avgTime, icon: 'timer', color: 'text-amber-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined ${s.color} text-[20px]`}>{s.icon}</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
            </div>
            <p className="text-2xl font-black mt-2">{s.val}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Search by name, phone or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="h-11 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 focus:ring-primary"
        >
          <option value="All">All Statuses</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Busy">Busy</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending Verification">Pending Verification</option>
        </select>
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-300">
              <div className="p-6 space-y-4 flex-1 flex flex-col items-center text-center">
                 <div className="relative">
                    <div className="size-20 rounded-full p-1 border-2 border-slate-100 dark:border-slate-800 shadow-md">
                       <img src={p.avatar} className="size-full rounded-full object-cover" />
                    </div>
                    <div className={`absolute bottom-0 right-0 size-6 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${getStatusColor(p.status).split(' ')[1]}`}>
                       <span className={`size-2 rounded-full ${getStatusColor(p.status).split(' ')[0].replace('text-', 'bg-')}`}></span>
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{p.name}</h3>
                    <div className="flex items-center justify-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.id}</span>
                       <span className="size-1 rounded-full bg-slate-300"></span>
                       <div className="flex items-center gap-0.5 text-amber-500">
                          <span className="material-symbols-outlined text-[14px] fill-[1]">star</span>
                          <span className="text-[10px] font-black">{p.rating}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">{getVehicleIcon(p.vehicleType)}</span>
                    <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-300">{p.vehicleNumber}</span>
                 </div>

                 <div className="grid grid-cols-2 gap-4 w-full pt-2">
                    <div className="text-center">
                       <p className="text-[9px] font-bold text-slate-400 uppercase">Lifetime</p>
                       <p className="text-sm font-black">{p.totalDeliveries}</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[9px] font-bold text-slate-400 uppercase">Today</p>
                       <p className="text-sm font-black text-primary">{p.todayDeliveries}</p>
                    </div>
                 </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60 flex gap-2">
                 <button 
                   onClick={() => navigate(`/delivery/${p.id}`)}
                   className="flex-1 h-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:border-primary transition-all shadow-sm"
                 >
                   Profile
                 </button>
                 <button 
                   onClick={() => alert('Opening Track View...')}
                   className="flex-1 h-9 rounded bg-primary text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
                 >
                   Track
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center opacity-40 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-md">
            <span className="material-symbols-outlined text-5xl mb-3">person_off</span>
            <p className="text-sm font-black uppercase tracking-[0.2em]">No Partners Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartners;


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SellerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState<'Plans' | 'History' | 'Documents'>('Plans');

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md py-2">
        <button onClick={() => navigate(-1)} className="size-11 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Seller Details</h1>
        <button className="size-11 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Profile Header */}
      <section className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="size-32 rounded-full p-1.5 bg-white dark:bg-surface-dark shadow-2xl border-4 border-primary/20">
            <div className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/200/200?random=21")' }}></div>
          </div>
          <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center text-background-dark">
            <span className="material-symbols-outlined text-[18px] font-black">check</span>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight">Taste of Punjab Tiffins</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-bold text-gray-500">ID: #SEL-8821</span>
            <span className="size-1 rounded-full bg-gray-300"></span>
            <span className="text-sm font-black text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">Pending Approval</span>
          </div>
        </div>
        <div className="flex w-full gap-4 max-w-md">
          <button className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl bg-primary text-background-dark font-black text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all">
            <span className="material-symbols-outlined">call</span>
            Call Seller
          </button>
          <button className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 font-black text-sm active:scale-95 transition-all">
            <span className="material-symbols-outlined">mail</span>
            Email
          </button>
        </div>
      </section>

      {/* Account Status Toggle */}
      <section className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Account Status</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Toggle to suspend or activate</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-background-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Rating', val: '4.8', icon: 'star' },
          { label: 'Orders', val: '1,240', icon: 'shopping_bag' },
          { label: 'Revenue', val: '$12k', icon: 'payments' },
          { label: 'Fulfillment', val: '98%', icon: 'local_shipping' },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-gray-400">
               <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
               <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
            </div>
            <p className="text-2xl font-black">{s.val}</p>
          </div>
        ))}
      </section>

      {/* Tab Nav */}
      <div className="flex w-full border-b border-gray-200 dark:border-white/5 pt-4">
        {['Plans', 'History', 'Documents'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`flex-1 pb-4 text-sm font-bold transition-all border-b-2 ${
              tab === t ? 'border-primary text-gray-900 dark:text-white' : 'border-transparent text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content: Plans List */}
      <div className="space-y-4">
        {[
          { title: 'Premium Veg Thali', status: 'Active', price: '$140', desc: 'Roti, Dal Makhani, Paneer, Rice, Salad, Sweet', img: 'https://picsum.photos/200/200?random=31' },
          { title: 'Standard Mini Meal', status: 'Active', price: '$90', desc: '3 Roti, Seasonal Veg, Salad', img: 'https://picsum.photos/200/200?random=32' },
          { title: 'Student Special', status: 'Paused', price: '$75', desc: 'Budget friendly meal for students', img: 'https://picsum.photos/200/200?random=33' },
        ].map((plan, i) => (
          <div key={i} className={`flex items-center gap-5 p-4 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm active:scale-[0.98] transition-all cursor-pointer group ${plan.status === 'Paused' ? 'opacity-60' : ''}`}>
            <div className={`size-20 rounded-2xl bg-cover bg-center shrink-0 border border-gray-200 dark:border-white/10 ${plan.status === 'Paused' ? 'grayscale' : ''}`} style={{ backgroundImage: `url("${plan.img}")` }}></div>
            <div className="flex-1 min-w-0 space-y-1">
               <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold truncate pr-2 group-hover:text-primary transition-colors">{plan.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    plan.status === 'Active' ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-white/10 text-gray-400'
                  }`}>{plan.status}</span>
               </div>
               <p className="text-xs text-gray-500 font-medium line-clamp-1">{plan.desc}</p>
               <div className="flex items-center gap-1 font-black">
                 <span className="text-base">{plan.price}</span>
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ month</span>
               </div>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDetails;

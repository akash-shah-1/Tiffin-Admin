
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlanReview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-32">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md py-2">
        <button onClick={() => navigate(-1)} className="size-11 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Plan Review</h1>
        <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-500/20">Pending</span>
      </header>

      {/* Hero Carousel Concept */}
      <section className="space-y-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
          <div className="snap-center shrink-0 w-[85%] md:w-[450px] aspect-[16/10] rounded-3xl overflow-hidden relative shadow-2xl">
            <img src="https://picsum.photos/800/600?random=31" className="w-full h-full object-cover" alt="Plan" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span> 1/4
            </div>
          </div>
          <div className="snap-center shrink-0 w-[85%] md:w-[450px] aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
             <img src="https://picsum.photos/800/600?random=32" className="w-full h-full object-cover" alt="Plan Detail" />
          </div>
        </div>

        <div className="flex justify-between items-start pt-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight leading-tight">Deluxe North Indian Monthly</h1>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Submitted on Oct 12, 10:30 AM</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-3xl font-black text-primary">₹2,500</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">per month</span>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
          <span className="size-2 rounded-full bg-green-500"></span>
          <span className="text-xs font-bold uppercase tracking-widest">Vegetarian</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-orange-500">local_fire_department</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Medium Spice</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-blue-500">calendar_month</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Monthly Plan</span>
        </div>
      </section>

      {/* Seller Mini Card */}
      <section className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-md" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=21")' }}></div>
          <div>
            <h3 className="text-lg font-bold leading-tight">Kitchen of Punjab</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <span className="material-symbols-outlined text-[16px] fill-[1]">star</span>
                <span className="text-sm">4.8</span>
              </div>
              <span className="text-gray-300 dark:text-white/10">•</span>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Verified Seller</span>
            </div>
          </div>
        </div>
        <button className="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-background-dark transition-all">
          <span className="material-symbols-outlined">info</span>
        </button>
      </section>

      {/* Content */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">About this Plan</h3>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
          Authentic Punjabi homestyle tiffin featuring daily rotating vegetables, lentils (dal), and soft wheat rotis. All meals are prepared with low oil and medium spices suitable for daily consumption. Includes pickle and salad daily.
        </p>
      </section>

      {/* Weekly Menu */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">Weekly Menu</h3>
          <button className="text-xs font-bold text-primary uppercase tracking-widest">View Full Cycle</button>
        </div>
        <div className="space-y-3">
          {[
            { day: 'Mon', title: 'Paneer Butter Masala', sub: 'With 3 Rotis, Jeera Rice, Dal Tadka' },
            { day: 'Tue', title: 'Aloo Gobi Dry', sub: 'With 3 Rotis, Steamed Rice, Rajma' },
            { day: 'Wed', title: 'Bhindi Masala', sub: 'With 3 Rotis, Rice, Yellow Dal Fry' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm group hover:border-primary/30 transition-all">
              <div className="size-14 rounded-xl bg-gray-100 dark:bg-white/5 flex flex-col items-center justify-center shrink-0 border border-gray-200 dark:border-white/5 group-hover:bg-primary/10 transition-colors">
                <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 group-hover:text-primary">{item.day}</span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-base font-bold truncate leading-tight">{item.title}</p>
                <p className="text-xs text-gray-500 font-medium mt-1 truncate">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Breakdown */}
      <section className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-inner">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Pricing Breakdown</h3>
        <div className="space-y-4">
          {[
            { label: 'Base Subscription (24 Days)', val: '₹2,200' },
            { label: 'Packaging Fee', val: '₹150' },
            { label: 'Platform Fee (5%)', val: '₹150' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-bold">{item.val}</span>
            </div>
          ))}
          <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-black tracking-tight">Total Customer Price</span>
            <span className="text-2xl font-black text-primary tracking-tight">₹2,500</span>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 z-50">
        <div className="max-w-4xl mx-auto grid grid-cols-4 md:grid-cols-6 gap-3">
          <button className="col-span-1 flex flex-col items-center justify-center size-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 active:scale-95 transition-all">
            <span className="material-symbols-outlined font-bold">close</span>
            <span className="text-[8px] font-black uppercase mt-0.5">Reject</span>
          </button>
          <button className="col-span-2 md:col-span-2 flex items-center justify-center gap-2 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold text-sm active:scale-95 transition-all">
            <span className="material-symbols-outlined">edit_note</span>
            Request Changes
          </button>
          <button className="col-span-1 md:col-span-3 flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-background-dark font-black text-sm shadow-[0_0_20px_rgba(25,230,60,0.3)] active:scale-95 transition-all">
            <span className="material-symbols-outlined">check_circle</span>
            Approve Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanReview;

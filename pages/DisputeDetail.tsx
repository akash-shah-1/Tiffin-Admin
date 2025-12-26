
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DisputeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-3xl mx-auto pb-48">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md py-2">
        <button onClick={() => navigate(-1)} className="size-11 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Dispute #{id || '8821'}</h1>
        <button className="size-11 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      {/* Title Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-orange-500">
          <span className="material-symbols-outlined filled">warning</span>
          <span className="text-xs font-black uppercase tracking-widest">Action Required</span>
        </div>
        <h2 className="text-4xl font-black tracking-tight leading-tight">Late Delivery & Quality Issue</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Investigation</span>
            <span className="text-primary">Step 2 of 4</span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_10px_rgba(25,230,60,0.5)]" style={{ width: '50%' }}></div>
          </div>
        </div>
      </section>

      {/* Participants */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">Participants</h3>
        <div className="flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="relative">
              <img src="https://picsum.photos/100/100?random=41" className="size-16 rounded-full border-2 border-primary/20 shadow-lg" alt="Buyer" />
              <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-background-dark rounded-full">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full"><span className="material-symbols-outlined text-[14px] text-blue-500">person</span></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-black">Rahul K.</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Buyer</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-10 bg-gray-200 dark:bg-white/10 mb-1"></div>
            <span className="text-[10px] font-black text-gray-400">VS</span>
            <div className="h-[1px] w-10 bg-gray-200 dark:bg-white/10 mt-1"></div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="relative">
              <img src="https://picsum.photos/100/100?random=42" className="size-16 rounded-full border-2 border-primary/20 shadow-lg" alt="Seller" />
              <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-background-dark rounded-full">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full"><span className="material-symbols-outlined text-[14px] text-purple-500">storefront</span></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-black">Mama's Kitchen</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">4.8 ★</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Context */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">Disputed Order</h3>
        <div className="flex bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <img src="https://picsum.photos/200/200?random=31" className="w-1/3 aspect-square object-cover" alt="Order" />
          <div className="flex-1 p-5 flex flex-col justify-center gap-4">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold leading-tight">Veg Thali Subscription</h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Day 12 of 30</p>
                </div>
                <span className="text-xl font-black text-primary">₹150</span>
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
               <span className="material-symbols-outlined text-[16px]">schedule</span>
               <span>12:45 PM Today</span>
             </div>
          </div>
        </div>
      </section>

      {/* Communication Log */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold tracking-tight">Communication Log</h3>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Dispute Created 1:45 PM</span>
          </div>

          <div className="flex gap-4 max-w-[85%]">
            <img src="https://picsum.photos/100/100?random=41" className="size-9 rounded-full shrink-0 border border-white dark:border-white/10" alt="Rahul" />
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-gray-400 ml-1">Rahul • 1:48 PM</span>
              <div className="p-4 rounded-3xl rounded-tl-sm bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
                <p className="text-sm font-medium leading-relaxed">The tiffin never arrived. I waited until 1:30 PM. This is the second time this week.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-w-[85%] self-end flex-row-reverse text-right">
            <img src="https://picsum.photos/100/100?random=42" className="size-9 rounded-full shrink-0 border border-white dark:border-white/10" alt="Kitchen" />
            <div className="space-y-1.5 flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 mr-1">Mama's Kitchen • 1:55 PM</span>
              <div className="p-4 rounded-3xl rounded-tr-sm bg-gray-100 dark:bg-white/5 shadow-sm text-left">
                <p className="text-sm font-medium leading-relaxed">Hello, our delivery partner was stuck in a major traffic jam near the plaza. We can offer a replacement dinner.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-w-[85%]">
             <img src="https://picsum.photos/100/100?random=41" className="size-9 rounded-full shrink-0" alt="Rahul" />
             <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 ml-1">Rahul • 1:58 PM</span>
                <div className="p-4 rounded-3xl rounded-tl-sm bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
                  <p className="text-sm font-medium leading-relaxed">No, I already ordered from somewhere else. Please refund.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Resolution Dock */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50">
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-background-dark/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-5">
           <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Suggested Action</span>
              <span className="text-primary font-black">Refund User</span>
           </div>
           <div className="grid grid-cols-4 gap-4">
              <button className="col-span-2 flex items-center justify-center gap-3 h-14 rounded-2xl bg-primary hover:bg-[#16cc35] text-background-dark font-black text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all">
                <span className="material-symbols-outlined font-bold">currency_rupee</span>
                Refund
              </button>
              <button className="col-span-1 flex flex-col items-center justify-center gap-1.5 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
                <span className="text-[8px] uppercase font-black">Dismiss</span>
              </button>
              <button className="col-span-1 flex flex-col items-center justify-center gap-1.5 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span className="text-[8px] uppercase font-black">Chat</span>
              </button>
           </div>
           <div className="md:hidden h-2"></div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetail;

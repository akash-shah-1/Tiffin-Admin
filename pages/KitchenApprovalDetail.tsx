
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useKitchenApprovals } from '../hooks/useKitchenApprovals';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';

const KitchenApprovalDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentRequest, getRequest, resetSelection, approveKitchen, rejectKitchen, requestChanges, loading } = useKitchenApprovals();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) getRequest(id);
    return () => resetSelection();
  }, [id, getRequest, resetSelection]);

  if (loading || !currentRequest) return <div className="animate-pulse space-y-8"><div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl" /></div>;

  return (
    <div className="space-y-8 pb-48 md:pb-32 animate-in fade-in duration-500">
      <PageHeader 
        title="Registration Review" 
        subtitle={`Merchant: ${currentRequest.kitchenName} • ID: ${currentRequest.id}`}
        onBack={() => navigate('/approvals')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
            <img src={currentRequest.kitchenPhotos[activeImage]} className="w-full aspect-video object-cover" alt="Premises" />
            <div className="absolute bottom-6 left-6 flex gap-2">
              {currentRequest.kitchenPhotos.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`size-14 rounded-md border-2 ${activeImage === i ? 'border-primary ring-4 ring-primary/20' : 'border-white/20'}`}>
                  <img src={img} className="size-full object-cover rounded-sm" />
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Profile</p>
                   <div>
                      <p className="text-2xl font-black">{currentRequest.kitchenName}</p>
                      <p className="text-xs font-medium text-slate-500 mt-2">{currentRequest.address}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance</p>
                   <div className="flex items-center gap-4">
                      <div className="size-16 rounded border bg-cover bg-center" style={{ backgroundImage: `url("${currentRequest.fssaiDoc}")` }} />
                      <div>
                         <p className="text-sm font-black">{currentRequest.fssaiNumber}</p>
                         <Badge variant="success">FSSAI Active</Badge>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <div className="space-y-6">
           <section className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-3">Review Signals</h3>
              <div className="space-y-3">
                 {['Merchant Face Match', 'Premises Hygiene', 'Geolocation Match'].map(label => (
                   <div key={label} className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">{label}</span>
                      <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>

      <div className="fixed bottom-16 md:bottom-0 left-0 md:left-64 right-0 p-4 md:p-6 bg-white/95 dark:bg-[#0b0f1a]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
           <button onClick={() => rejectKitchen(currentRequest.id, [], '')} className="flex-1 h-14 rounded-xl bg-red-500/10 text-red-600 border border-red-500/20 font-black text-xs uppercase tracking-widest transition-all">Reject</button>
           <button onClick={() => requestChanges(currentRequest.id, [], '')} className="flex-1 h-14 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 font-black text-xs uppercase tracking-widest transition-all">Fixes</button>
           <button onClick={() => approveKitchen(currentRequest.id)} className="flex-[2] h-14 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all">Verify & Approve</button>
        </div>
      </div>
    </div>
  );
};

export default KitchenApprovalDetail;

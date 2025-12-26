
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useKitchens } from '../hooks/useKitchens';

const KitchenDetailSkeleton = () => (
  <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center gap-4">
        <div className="size-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </header>
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </section>
  </div>
);

const KitchenDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentKitchen, getKitchen, setStatus, persistKitchen, resetSelection, loading } = useKitchens();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Menu' | 'Performance' | 'Documents'>('Overview');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (id) getKitchen(id);
    return () => { resetSelection(); };
  }, [id, getKitchen, resetSelection]);

  useEffect(() => {
    if (currentKitchen?.adminNotes) setNotes(currentKitchen.adminNotes);
  }, [currentKitchen]);

  const handleSaveNotes = () => {
    if (currentKitchen) {
      persistKitchen({ ...currentKitchen, adminNotes: notes });
    }
  };

  const handleViewOnMap = () => {
    if (currentKitchen) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentKitchen.address)}`;
      window.open(url, '_blank');
    }
  };

  if (loading || !currentKitchen) {
    return <KitchenDetailSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{currentKitchen.name}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">ID: {currentKitchen.id} • Joined {currentKitchen.joinedAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setStatus(currentKitchen.id, currentKitchen.status === 'Active' ? 'Inactive' : 'Active')}
            className={`h-10 px-6 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm transition-all border ${
              currentKitchen.status === 'Active' 
                ? 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/40 hover:bg-red-600 hover:text-white' 
                : 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            {currentKitchen.status === 'Active' ? 'Deactivate Account' : 'Approve & Activate'}
          </button>
          <button 
            onClick={() => navigate(`/kitchen/edit/${currentKitchen.id}`)}
            className="h-10 w-10 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
            <div className="size-24 rounded-full mx-auto bg-cover bg-center border-2 border-slate-100 dark:border-slate-800 shadow-md" style={{ backgroundImage: `url("${currentKitchen.logo}")` }}></div>
            <div>
              <h2 className="text-lg font-bold">{currentKitchen.ownerName}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Primary Contact</p>
            </div>
            <div className="flex justify-center gap-2">
              <a 
                href={`tel:${currentKitchen.phone}`}
                className="flex-1 h-9 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center justify-center gap-2 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">call</span> Call Owner
              </a>
              <a 
                href={`mailto:${currentKitchen.email}`}
                className="flex-1 h-9 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center justify-center gap-2 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span> Mail
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Location & Compliance</h3>
             <div className="space-y-4">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">FSSAI License</p>
                   <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentKitchen.fssai}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Operating Hours</p>
                   <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentKitchen.operatingHours}</p>
                </div>
                <div>
                   <div className="flex items-center justify-between mb-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Full Address</p>
                      <button 
                        onClick={handleViewOnMap}
                        className="text-[9px] font-bold text-primary uppercase flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-[12px]">map</span>
                        View on Map
                      </button>
                   </div>
                   <p className="text-sm font-medium text-slate-500 leading-relaxed">{currentKitchen.address}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Rating', val: currentKitchen.rating, icon: 'star', color: 'text-amber-500' },
              { label: 'Orders', val: currentKitchen.totalOrders, icon: 'shopping_bag', color: 'text-primary' },
              { label: 'Revenue', val: `₹${(currentKitchen.revenue / 1000).toFixed(1)}k`, icon: 'payments', color: 'text-emerald-500' },
              { label: 'Comm. %', val: `${currentKitchen.commissionRate}%`, icon: 'percent', color: 'text-blue-500' },
            ].map((s) => (
              <div key={s.label} className="bg-white dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`material-symbols-outlined text-[16px] ${s.color}`}>{s.icon}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
                </div>
                <p className="text-xl font-black">{s.val}</p>
              </div>
            ))}
          </div>

          <div className="flex border-b border-slate-200 dark:border-slate-800">
            {['Overview', 'Menu', 'Performance', 'Documents'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === t ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'Overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Kitchen Gallery</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {currentKitchen.photos.length > 0 ? (
                        currentKitchen.photos.map((p, i) => (
                          <div key={i} className="aspect-square rounded-md bg-cover bg-center border border-slate-200 dark:border-slate-800" style={{ backgroundImage: `url("${p}")` }}></div>
                        ))
                      ) : (
                        <div className="col-span-2 py-10 bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800 rounded flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                           No Photos Uploaded
                        </div>
                      )}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Internal Admin Notes</h3>
                    <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-4 space-y-4">
                       <textarea 
                         value={notes}
                         onChange={(e) => setNotes(e.target.value)}
                         placeholder="Add private admin notes here..."
                         className="w-full min-h-[120px] p-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:ring-1 focus:ring-primary transition-all resize-none font-medium"
                       />
                       <button 
                         onClick={handleSaveNotes}
                         className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-widest rounded transition-all hover:bg-slate-800"
                       >
                         Sync Admin Notes
                       </button>
                    </div>
                 </div>
              </div>
            )}
            {activeTab === 'Menu' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentKitchen.menuItems.length > 0 ? (
                  currentKitchen.menuItems.map((item) => (
                    <div key={item.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex gap-4 shadow-sm group">
                      <div className="size-16 rounded bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url("${item.image}")` }}></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <p className="text-primary font-black text-sm mt-1">₹{item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-20 text-center opacity-40">
                    <span className="material-symbols-outlined text-4xl mb-2">flatware</span>
                    <p className="text-xs font-bold uppercase tracking-widest">No menu items found</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'Performance' && (
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-center">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Delivered</p>
                       <p className="text-xl font-black">{currentKitchen.totalOrders}</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-center">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gross Rev.</p>
                       <p className="text-xl font-black">₹{(currentKitchen.revenue / 1000).toFixed(1)}k</p>
                    </div>
                 </div>
              </div>
            )}
            {activeTab === 'Documents' && (
              <div className="space-y-4">
                 <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                       <span className="text-xs font-bold uppercase tracking-widest">FSSAI_License_{currentKitchen.id}.pdf</span>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KitchenDetails;

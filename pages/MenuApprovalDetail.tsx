
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMenuApprovals } from '../hooks/useMenuApprovals';

const DetailSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-24 animate-pulse">
    <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="space-y-6">
        <div className="h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"></div>
        <div className="h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"></div>
      </div>
    </div>
  </div>
);

const FeedbackModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  reasons: string[];
  onSubmit: (selectedReasons: string[], comments: string) => void;
  colorClass: string;
}> = ({ isOpen, onClose, title, submitLabel, reasons, onSubmit, colorClass }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [comments, setComments] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className={`text-xl font-black ${colorClass}`}>{title}</h3>
            <button onClick={onClose} className="size-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Reason for Action</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reasons.map(r => (
                <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected.includes(r) ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={selected.includes(r)}
                    onChange={() => setSelected(prev => prev.includes(r) ? prev.filter(p => p !== r) : [...prev, r])}
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detailed Feedback for Kitchen</p>
            <textarea 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Explain the issues in detail to help the kitchen improve..."
              className="w-full h-32 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          <button 
            onClick={() => { onSubmit(selected, comments); onClose(); }}
            className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 ${colorClass === 'text-red-600' ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'}`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuApprovalDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentItem, getItem, resetSelection, approveItem, rejectItem, requestChanges, saveNotes, loading } = useMenuApprovals();
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [adminNotesLocal, setAdminNotesLocal] = useState('');
  
  // Modals state
  const [modalType, setModalType] = useState<'Reject' | 'Request' | null>(null);

  useEffect(() => {
    if (id) getItem(id);
    return () => { resetSelection(); };
  }, [id, getItem, resetSelection]);

  useEffect(() => {
    if (currentItem?.adminNotes) setAdminNotesLocal(currentItem.adminNotes);
  }, [currentItem]);

  if (loading || !currentItem) {
    return <DetailSkeleton />;
  }

  const handleStatusUpdate = (status: 'Approved') => {
    if (currentItem) {
      approveItem(currentItem.id);
      alert("Menu item approved! It is now live for customers.");
      navigate('/approvals');
    }
  };

  const handleReject = (reasons: string[], comments: string) => {
    rejectItem(currentItem.id, reasons, comments);
    alert("Item Rejected. Kitchen has been notified.");
    navigate('/approvals');
  };

  const handleRequestChanges = (reasons: string[], comments: string) => {
    requestChanges(currentItem.id, reasons, comments);
    alert("Changes requested. Item returned to kitchen queue.");
    navigate('/approvals');
  };

  const handleSaveInternalNotes = () => {
    saveNotes(currentItem.id, adminNotesLocal);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'Veg': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      case 'Non-Veg': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'Vegan': return 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10';
      case 'Jain': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'Gluten-Free': return 'text-sky-600 bg-sky-500/10 border-sky-500/20';
      case 'Dairy-Free': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20';
      default: return 'text-slate-500 bg-slate-100';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-48 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Verification Console</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Submitted {currentItem.submittedAt} • REF: {currentItem.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => window.open(`tel:${currentItem.kitchenId}`)} // Simulated
             className="size-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-primary transition-all shadow-sm group"
             title="Call Kitchen"
           >
              <span className="material-symbols-outlined text-[20px]">call</span>
           </button>
           <button 
             onClick={() => setModalType('Request')}
             className="size-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-red-500 transition-all shadow-sm group"
             title="Flag as Inappropriate"
           >
              <span className="material-symbols-outlined text-[20px]">report</span>
           </button>
           <button 
             className="size-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-blue-500 transition-all shadow-sm group"
             title="View Edit History"
           >
              <span className="material-symbols-outlined text-[20px]">history</span>
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Item Visuals */}
          <section className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 group shadow-2xl">
              <img 
                src={currentItem.gallery[activeImage]} 
                alt={currentItem.itemName} 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`w-full aspect-video object-cover transition-all duration-700 cursor-zoom-in ${isZoomed ? 'scale-150 object-center' : 'hover:scale-105'}`} 
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {currentItem.gallery.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(i)}
                      className={`size-14 rounded-md border-2 overflow-hidden transition-all shrink-0 ${activeImage === i ? 'border-primary ring-4 ring-primary/20' : 'border-white/20'}`}
                    >
                      <img src={img} className="size-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                   {activeImage + 1} / {currentItem.gallery.length} Images
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight leading-tight">{currentItem.itemName}</h2>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-sm font-bold text-primary uppercase tracking-widest">{currentItem.cuisine}</span>
                       <span className="size-1 rounded-full bg-slate-300"></span>
                       <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{currentItem.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-primary">₹{currentItem.price}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                       <span className="material-symbols-outlined text-[16px]">schedule</span>
                       {currentItem.prepTime} Preparation
                    </p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Detailed Description</h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 italic">
                     "{currentItem.description}"
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-4">
                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Dietary Profiles</h3>
                     <div className="flex flex-wrap gap-2">
                        {currentItem.tags.map(tag => (
                           <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getTagStyle(tag)}`}>
                              {tag}
                           </span>
                        ))}
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Spice Intensity</p>
                           <div className="flex gap-1">
                              {[1,2,3].map(i => (
                                 <span key={i} className={`material-symbols-outlined text-[18px] ${i <= (currentItem.spiceLevel === 'Mild' ? 1 : currentItem.spiceLevel === 'Medium' ? 2 : 3) ? 'text-red-500 fill-[1]' : 'text-slate-200 dark:text-slate-800'}`}>local_fire_department</span>
                              ))}
                           </div>
                        </div>
                        <div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Allergen Flags</p>
                           <div className="flex flex-wrap gap-1.5">
                              {currentItem.allergens.length > 0 ? currentItem.allergens.map(a => (
                                 <span key={a} className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/40">{a}</span>
                              )) : <span className="text-[10px] font-bold text-emerald-500">None Reported</span>}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Ingredients</h3>
                     <div className="flex flex-wrap gap-2">
                        {currentItem.ingredients.map((ing, i) => (
                           <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-400">
                              • {ing}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Internal Notes Section */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Internal CRM Audit Notes</h3>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Private - Not visible to kitchen</span>
             </div>
             <textarea 
               value={adminNotesLocal}
               onChange={(e) => setAdminNotesLocal(e.target.value)}
               placeholder="Enter internal flags, observations or previous review feedback..."
               className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary transition-all resize-none"
             />
             <div className="flex justify-end">
                <button 
                  onClick={handleSaveInternalNotes}
                  className="h-10 px-6 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm"
                >
                  Update Internal Notes
                </button>
             </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Kitchen Metadata */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-3">Provider Profile</h3>
             <div className="flex items-center gap-4">
                <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=1")' }}></div>
                <div>
                   <h4 className="text-base font-bold">{currentItem.kitchenName}</h4>
                   <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center gap-0.5 text-amber-500">
                         <span className="material-symbols-outlined text-[14px] fill-[1]">star</span>
                         <span className="text-xs font-black">4.8</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">• High Performance</span>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/60 text-center">
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Live Menu</p>
                   <p className="text-lg font-black">24 Items</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/60 text-center">
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">FSSAI Status</p>
                   <p className="text-[10px] font-black text-emerald-600 uppercase">Verified</p>
                </div>
             </div>
             <div className="flex gap-2">
                <Link to={`/kitchen/${currentItem.kitchenId}`} className="flex-1 h-10 rounded border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Profile</Link>
                <button onClick={() => alert("Calling Kitchen...")} className="flex-1 h-10 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-primary hover:text-white transition-all">Quick Call</button>
             </div>
          </section>

          {/* Verification Checklist */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-3">Automated Quality Signals</h3>
             <div className="space-y-4">
                {[
                  { label: 'High Definition Gallery', val: currentItem.qualityCheck.imageQuality },
                  { label: 'Comprehensive Bio', val: currentItem.qualityCheck.descriptionComplete },
                  { label: 'Fair Market Pricing', val: currentItem.qualityCheck.priceReasonable },
                  { label: 'Technical Field Compliance', val: currentItem.qualityCheck.detailsFilled },
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">{check.label}</span>
                     <span className={`material-symbols-outlined text-[20px] ${check.val ? 'text-emerald-500' : 'text-red-400'}`}>
                        {check.val ? 'check_circle' : 'error'}
                     </span>
                  </div>
                ))}
             </div>
          </section>

          {/* Schedule */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Availability Matrix</h3>
             <div className="flex gap-1.5 flex-wrap">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                  const isActive = currentItem.availability.includes(day);
                  return (
                    <div key={day} className={`px-2 py-1 rounded text-[9px] font-black uppercase border transition-all ${
                      isActive ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 dark:bg-slate-950 text-slate-300 border-slate-100 dark:border-slate-800'
                    }`}>
                      {day}
                    </div>
                  );
                })}
             </div>
             <div className="flex justify-between items-center pt-2 text-[10px] font-bold text-slate-400 uppercase">
                <span>Daily Prepared Units</span>
                <span className="text-slate-800 dark:text-slate-200 font-black">{currentItem.stock || 50} Units</span>
             </div>
          </section>
        </div>
      </div>

      {/* FIXED BOTTOM ACTIONS BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => setModalType('Reject')}
             className="flex-1 h-16 rounded-2xl bg-red-500/10 text-red-600 border border-red-500/20 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-red-500/5"
           >
              <span className="material-symbols-outlined text-[24px]">cancel</span>
              Reject Item
           </button>
           <button 
             onClick={() => setModalType('Request')}
             className="flex-1 h-16 rounded-2xl bg-orange-500/10 text-orange-600 border border-orange-500/20 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-orange-500/5"
           >
              <span className="material-symbols-outlined text-[24px]">edit_note</span>
              Request Changes
           </button>
           <button 
             onClick={() => handleStatusUpdate('Approved')}
             className="flex-[2] h-16 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all"
           >
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              Approve & Go Live
           </button>
        </div>
      </div>

      {/* REJECT MODAL */}
      <FeedbackModal 
        isOpen={modalType === 'Reject'}
        onClose={() => setModalType(null)}
        title="Confirm Rejection"
        submitLabel="Submit Final Rejection"
        colorClass="text-red-600"
        reasons={[
          "Poor image quality",
          "Incomplete description",
          "Incorrect pricing",
          "Missing dietary information",
          "Inappropriate content",
          "Duplicate item",
          "FSSAI compliance issue",
          "Other"
        ]}
        onSubmit={handleReject}
      />

      {/* REQUEST CHANGES MODAL */}
      <FeedbackModal 
        isOpen={modalType === 'Request'}
        onClose={() => setModalType(null)}
        title="Action Required: Request Changes"
        submitLabel="Send Improvement Request"
        colorClass="text-orange-500"
        reasons={[
          "Better images needed",
          "More detailed description",
          "Verify ingredients",
          "Clarify dietary information",
          "Update pricing",
          "Portion size unclear",
          "Cuisine tag incorrect",
          "Other"
        ]}
        onSubmit={handleRequestChanges}
      />
    </div>
  );
};

export default MenuApprovalDetail;

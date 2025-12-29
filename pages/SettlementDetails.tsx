
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';

const SettlementDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentSettlement, getSettlement, processPayout, resetSelection, loading, processing } = usePayments();
  const [adjustment, setAdjustment] = useState(0);
  const [adjReason, setAdjReason] = useState('');

  useEffect(() => {
    if (id) getSettlement(id);
    return () => { resetSelection(); };
  }, [id, getSettlement, resetSelection]);

  if (loading || !currentSettlement) return null;

  const finalPayout = currentSettlement.payoutAmount - adjustment;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Manual Reconciliation</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{currentSettlement.kitchenName} • Window: {currentSettlement.dateRange}</p>
          </div>
        </div>
        <div className="flex gap-2">
           {currentSettlement.status === 'Pending' && (
             <button 
                onClick={() => processPayout(currentSettlement.id)}
                disabled={processing}
                className="h-10 px-6 rounded-md bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
             >
                {processing ? 'Processing...' : 'Approve & Release Funds'}
             </button>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Breakdown Card */}
          <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Summary</h3>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-[8px] font-black uppercase rounded">Funds with Platform</span>
             </div>
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-medium">Customer Payments (Gross)</span>
                   <span className="font-bold text-slate-900 dark:text-slate-100">₹{currentSettlement.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-medium">Platform Commission ({currentSettlement.commissionRate}%)</span>
                   <span className="font-bold text-red-500">- ₹{currentSettlement.commissionAmount.toLocaleString()}</span>
                </div>
                
                {/* ADJUSTMENT SECTION */}
                {currentSettlement.status === 'Pending' && (
                  <div className="pt-4 border-t border-dashed dark:border-slate-800 space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Manual Adjustments</span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-slate-400">- ₹</span>
                           <input 
                             type="number" 
                             value={adjustment}
                             onChange={(e) => setAdjustment(Number(e.target.value))}
                             className="w-24 h-8 px-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-black"
                           />
                        </div>
                     </div>
                     <input 
                       placeholder="Penalty reason (e.g. hygiene complaint, refund offset)..."
                       value={adjReason}
                       onChange={(e) => setAdjReason(e.target.value)}
                       className="w-full h-9 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-medium"
                     />
                  </div>
                )}

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                <div className="flex justify-between items-center">
                   <div>
                      <span className="text-sm font-black uppercase tracking-wider">Final Disbursal Amount</span>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Manual Release Step</p>
                   </div>
                   <span className="text-3xl font-black text-primary tracking-tight">₹{finalPayout.toLocaleString()}</span>
                </div>
             </div>
          </section>

          {/* Bank Details */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Payout Destination</h3>
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">A/C Holder</p>
                   <p className="text-sm font-black">{currentSettlement.bankDetails.accountHolder}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Number</p>
                   <p className="text-sm font-black">{currentSettlement.bankDetails.accountNo}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                   <p className="text-sm font-black">{currentSettlement.bankDetails.bankName}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC</p>
                   <p className="text-sm font-black">{currentSettlement.bankDetails.ifsc}</p>
                </div>
             </div>
          </section>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Risk Control</h3>
              <button 
                className="w-full h-11 rounded bg-red-500/10 text-red-600 border border-red-200 font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Place Payout On Hold
              </button>
              <p className="text-[9px] text-slate-400 font-medium leading-relaxed">Holds prevent manual/auto release. Usually triggered during active food quality disputes.</p>
           </div>

           <div className="p-6 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Audit Information</h3>
              <div className="space-y-3">
                 <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Settlement ID</span>
                    <span className="text-[10px] font-black uppercase">{currentSettlement.id}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Orders Covered</span>
                    <span className="text-[10px] font-black uppercase">{currentSettlement.totalOrders} Units</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementDetails;

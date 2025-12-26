
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';

const SettlementDetailsSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-32 animate-pulse">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center gap-4">
        <div className="size-9 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 h-64"></div>
        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 h-96"></div>
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 h-80"></div>
        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 h-40"></div>
      </div>
    </div>
  </div>
);

const SettlementDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentSettlement, getSettlement, processPayout, resetSelection, loading, processing } = usePayments();

  useEffect(() => {
    if (id) getSettlement(id);
    return () => { resetSelection(); };
  }, [id, getSettlement, resetSelection]);

  if (loading || !currentSettlement) {
    return <SettlementDetailsSkeleton />;
  }

  const handleProcessPayout = async () => {
    if (confirm('Confirm payout processing for ' + currentSettlement.kitchenName + '?')) {
      await processPayout(currentSettlement.id);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{currentSettlement.kitchenName} Settlement</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Ref: {currentSettlement.id} • {currentSettlement.dateRange}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="h-10 px-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              Report
           </button>
           {currentSettlement.status === 'Pending' && (
             <button 
                onClick={handleProcessPayout}
                disabled={processing}
                className="h-10 px-6 rounded-md bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all disabled:opacity-50"
             >
                {processing ? 'Processing...' : 'Mark as Paid'}
             </button>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Breakdown Card */}
          <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Earnings Breakdown</h3>
             </div>
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-medium">Gross Merchandise Value (GMV)</span>
                   <span className="font-bold text-slate-900 dark:text-slate-100">₹{currentSettlement.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-medium">Platform Service Fee ({currentSettlement.commissionRate}%)</span>
                   <span className="font-bold text-red-500">- ₹{currentSettlement.commissionAmount.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                <div className="flex justify-between items-center">
                   <span className="text-sm font-black uppercase tracking-wider">Final Net Payout</span>
                   <span className="text-3xl font-black text-primary tracking-tight">₹{currentSettlement.payoutAmount.toLocaleString()}</span>
                </div>
             </div>
             {currentSettlement.status === 'Completed' && (
               <div className="px-6 py-4 bg-emerald-500/5 dark:bg-emerald-500/10 border-t border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-emerald-500">verified</span>
                     <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Payout Successful</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">Ref: {currentSettlement.transactionRef}</p>
                     </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">{currentSettlement.processedAt}</p>
               </div>
             )}
          </section>

          {/* Itemized Order List */}
          <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Itemized Audit Trail ({currentSettlement.totalOrders} Orders)</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                   <thead className="bg-slate-50/50 dark:bg-slate-950/20 font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                      <tr>
                         <th className="px-6 py-3">Order ID</th>
                         <th className="px-6 py-3">Date</th>
                         <th className="px-6 py-3 text-right">Order Value</th>
                         <th className="px-6 py-3 text-right">Commission</th>
                         <th className="px-6 py-3 text-right">Net Payout</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {currentSettlement.orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-colors">
                           <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{o.id}</td>
                           <td className="px-6 py-4 text-slate-500 font-medium">{o.date}</td>
                           <td className="px-6 py-4 text-right font-black">₹{o.amount}</td>
                           <td className="px-6 py-4 text-right text-red-400 font-bold">₹{o.commission}</td>
                           <td className="px-6 py-4 text-right text-primary font-black">₹{o.amount - o.commission}</td>
                        </tr>
                      ))}
                      {currentSettlement.orders.length === 0 && (
                        <tr>
                           <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-bold uppercase tracking-widest italic">
                              Complete data log available in master CSV report
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Payout Destination */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Beneficiary Bank</h3>
             <div className="space-y-5">
                {[
                   { label: 'A/C Holder', val: currentSettlement.bankDetails.accountHolder, icon: 'badge' },
                   { label: 'Account Number', val: currentSettlement.bankDetails.accountNo, icon: 'account_balance_wallet' },
                   { label: 'Bank Name', val: currentSettlement.bankDetails.bankName, icon: 'account_balance' },
                   { label: 'IFSC Code', val: currentSettlement.bankDetails.ifsc, icon: 'pin_invoke' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                     <span className="material-symbols-outlined text-slate-400 text-[18px]">{item.icon}</span>
                     <div className="min-w-0">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                        <p className="text-xs font-black truncate">{item.val}</p>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-md">
                <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400 leading-relaxed">
                   Bank credentials verified on onboard date. Payouts are batch-processed via NEFT/IMPS.
                </p>
             </div>
          </section>

          {/* Quick Stats for this Kitchen */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kitchen Performance</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/50">
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Avg Order Value</span>
                   <span className="text-sm font-black">₹{(currentSettlement.totalAmount / currentSettlement.totalOrders).toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/50">
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Platform Yield</span>
                   <span className="text-sm font-black text-red-500">₹{currentSettlement.commissionAmount}</span>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettlementDetails;

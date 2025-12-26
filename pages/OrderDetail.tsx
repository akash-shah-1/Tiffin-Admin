
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';

const OrderDetailSkeleton = () => (
  <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center gap-4">
        <div className="size-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-60 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
        <div className="h-60 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentOrder, loading, getOrder, updateStatus, saveNotes, resetOrder } = useOrders();
  const [adminNotes, setAdminNotes] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
    return () => {
      resetOrder();
    };
  }, [id, getOrder, resetOrder]);

  useEffect(() => {
    if (currentOrder?.adminNotes) {
      setAdminNotes(currentOrder.adminNotes);
    }
  }, [currentOrder]);

  const handleStatusChange = (status: any) => {
    if (id) updateStatus(id, status);
  };

  const handleCancelOrder = () => {
    if (id && cancelReason.trim()) {
      updateStatus(id, 'Cancelled');
      saveNotes(id, `${adminNotes}\n\n[Cancellation Reason]: ${cancelReason}`);
      setShowCancelModal(false);
      setCancelReason('');
    }
  };

  const handleSaveNotes = () => {
    if (id) saveNotes(id, adminNotes);
  };

  if (loading) {
    return <OrderDetailSkeleton />;
  }

  if (!currentOrder) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">Order Not Found</h2>
          <p className="text-sm text-slate-500">The requested record could not be retrieved from the directory.</p>
        </div>
        <button onClick={() => navigate('/orders')} className="px-6 py-2 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-md">
          Back to Queue
        </button>
      </div>
    );
  }

  const subtotal = currentOrder.itemsList.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{currentOrder.id}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Registered: {currentOrder.date} • {currentOrder.time}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentOrder.status !== 'Cancelled' && currentOrder.status !== 'Delivered' && (
            <button 
              onClick={() => setShowCancelModal(true)}
              className="h-10 px-6 rounded bg-red-500/10 text-red-600 border border-red-200 font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
              Cancel Order
            </button>
          )}
          {currentOrder.status !== 'Delivered' && currentOrder.status !== 'Cancelled' && (
            <button 
              onClick={() => handleStatusChange('Delivered')}
              className="h-10 px-6 rounded bg-primary text-white font-bold text-xs uppercase tracking-widest shadow shadow-primary/20 hover:bg-primary-hover transition-all"
            >
              Mark Delivered
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  Customer
                </h3>
                <div className="space-y-3">
                   <div className="flex justify-between items-start">
                     <p className="text-base font-bold text-slate-900 dark:text-slate-100">{currentOrder.customerName}</p>
                     <a href={`tel:${currentOrder.customerPhone}`} className="h-8 px-3 rounded bg-primary/10 text-primary text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all">
                       <span className="material-symbols-outlined text-[16px]">call</span> Call
                     </a>
                   </div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{currentOrder.customerAddress}</p>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">restaurant</span>
                  Kitchen
                </h3>
                <div className="space-y-3">
                   <div className="flex justify-between items-start">
                     <p className="text-base font-bold text-slate-900 dark:text-slate-100">{currentOrder.sellerName}</p>
                     <a href={`tel:${currentOrder.sellerPhone}`} className="h-8 px-3 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-slate-200 transition-all">
                       <span className="material-symbols-outlined text-[16px]">call</span> Contact
                     </a>
                   </div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">Merchant ID: {currentOrder.sellerId}</p>
                </div>
             </div>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Items</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50 dark:bg-slate-950/20 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <tr>
                        <th className="px-6 py-3">Item</th>
                        <th className="px-6 py-3 text-center">Qty</th>
                        <th className="px-6 py-3 text-right">Price</th>
                        <th className="px-6 py-3 text-right">Total</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {currentOrder.itemsList.map((item, idx) => (
                      <tr key={idx} className="text-sm font-medium">
                         <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">{item.name}</td>
                         <td className="px-6 py-4 text-center">{item.quantity}</td>
                         <td className="px-6 py-4 text-right">₹{item.price}</td>
                         <td className="px-6 py-4 text-right font-black">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2 mb-4">Payment Summary</h3>
             <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                   <span>Subtotal</span>
                   <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                   <span>Delivery Charges</span>
                   <span>₹{currentOrder.deliveryCharge}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <p className="text-sm font-bold uppercase tracking-widest">Total Amount</p>
                   <p className="text-2xl font-black text-primary">₹{currentOrder.amount}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 mt-2 border-t border-slate-50 dark:border-slate-800/50">
                   <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Method</p>
                     <p className="text-sm font-bold">{currentOrder.paymentMethod}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                       currentOrder.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                     }`}>{currentOrder.paymentStatus}</span>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Status Timeline</h3>
             <div className="space-y-6 relative ml-2">
                {currentOrder.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                     <div className="flex flex-col items-center">
                        <div className={`size-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          step.completed ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}>
                           {step.completed ? <span className="material-symbols-outlined text-[14px] font-black">check</span> : <div className="size-1.5 rounded-full bg-slate-200"></div>}
                        </div>
                        {idx < currentOrder.timeline.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 ${step.completed ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                        )}
                     </div>
                     <div className="pb-4">
                        <p className={`text-xs font-black uppercase tracking-widest ${step.completed ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>{step.status}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{step.time || 'Pending'}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 rounded border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">sticky_note_2</span>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal CRM Notes</h3>
             </div>
             <textarea 
               value={adminNotes}
               onChange={(e) => setAdminNotes(e.target.value)}
               className="w-full min-h-[120px] p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded focus:ring-1 focus:ring-primary transition-all resize-none font-medium"
               placeholder="Enter internal flags or notes..."
             />
             <button 
               onClick={handleSaveNotes}
               className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded hover:bg-slate-800 shadow-sm"
             >
               Save Notes
             </button>
          </section>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
             <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-red-600">
                   <span className="material-symbols-outlined">cancel</span>
                   <h3 className="text-lg font-bold">Terminate Order Process</h3>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">This action is irreversible and will notify the user and merchant immediately.</p>
                
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Cancellation Reason</label>
                   <textarea 
                     required
                     value={cancelReason}
                     onChange={(e) => setCancelReason(e.target.value)}
                     className="w-full p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary transition-all resize-none"
                     rows={3}
                     placeholder="State the reason for manual cancellation..."
                   />
                </div>

                <div className="flex gap-3 pt-2">
                   <button 
                     onClick={() => setShowCancelModal(false)}
                     className="flex-1 h-11 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold text-xs uppercase tracking-widest"
                   >
                     Back
                   </button>
                   <button 
                     onClick={handleCancelOrder}
                     disabled={!cancelReason.trim()}
                     className="flex-1 h-11 rounded bg-red-600 text-white font-bold text-xs uppercase tracking-widest disabled:opacity-50"
                   >
                     Confirm Terminate
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

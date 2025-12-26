
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentOrder, loading, getOrder, updateStatus, saveNotes, resetOrder } = useOrders();
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (id) getOrder(id);
    return () => { resetOrder(); };
  }, [id]);

  useEffect(() => {
    if (currentOrder?.adminNotes) setAdminNotes(currentOrder.adminNotes);
  }, [currentOrder]);

  const handleStatusChange = (status: any) => {
    if (id) updateStatus(id, status);
  };

  const handleSaveNotes = () => {
    if (id) saveNotes(id, adminNotes);
  };

  if (loading || !currentOrder) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{currentOrder.id}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Placed on {currentOrder.date} at {currentOrder.time}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentOrder.status !== 'Cancelled' && currentOrder.status !== 'Delivered' && (
            <button 
              onClick={() => handleStatusChange('Cancelled')}
              className="h-10 px-6 rounded-md bg-red-500/10 text-red-600 border border-red-200 font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
              Cancel Order
            </button>
          )}
          {currentOrder.status === 'Out for Delivery' && (
            <button 
              onClick={() => handleStatusChange('Delivered')}
              className="h-10 px-6 rounded-md bg-primary text-white font-bold text-xs uppercase tracking-widest shadow shadow-primary/20 hover:bg-primary-hover transition-all"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Status Alert */}
          <div className={`p-4 rounded-md border flex items-center justify-between ${
            currentOrder.status === 'Delivered' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700' :
            currentOrder.status === 'Cancelled' ? 'bg-red-500/5 border-red-500/20 text-red-700' :
            'bg-blue-500/5 border-blue-500/20 text-blue-700'
          }`}>
             <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">{
                  currentOrder.status === 'Delivered' ? 'check_circle' :
                  currentOrder.status === 'Cancelled' ? 'cancel' : 'info'
                }</span>
                <p className="text-sm font-bold uppercase tracking-widest">Current Status: {currentOrder.status}</p>
             </div>
             <p className="text-[10px] font-black opacity-50 uppercase tracking-tighter">Updated Just Now</p>
          </div>

          {/* Cards for Customer/Kitchen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Customer */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Customer Info</h3>
                <div className="space-y-3">
                   <p className="text-base font-bold text-slate-900 dark:text-slate-100">{currentOrder.customerName}</p>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{currentOrder.customerAddress}</p>
                   <div className="flex gap-2 pt-2">
                      <a href={`tel:${currentOrder.customerPhone}`} className="flex-1 h-9 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">call</span> Call Customer
                      </a>
                   </div>
                </div>
             </div>
             {/* Kitchen */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Kitchen Info</h3>
                <div className="space-y-3">
                   <p className="text-base font-bold text-slate-900 dark:text-slate-100">{currentOrder.sellerName}</p>
                   <p className="text-xs text-slate-500 font-medium">Verified Merchant Profile</p>
                   <div className="flex gap-2 pt-2">
                      <a href={`tel:${currentOrder.sellerPhone}`} className="flex-1 h-9 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">call</span> Contact Kitchen
                      </a>
                   </div>
                </div>
             </div>
          </div>

          {/* Order Items & Pricing */}
          <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billed Items</h3>
             </div>
             <div className="divide-y divide-slate-50 dark:divide-slate-800">
                {currentOrder.itemsList.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between text-sm">
                     <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary">
                           {item.quantity}x
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-300">{item.name}</p>
                     </div>
                     <p className="font-black">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-slate-50/50 dark:bg-slate-950/20 space-y-3">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                   <span>Subtotal</span>
                   <span>₹{(currentOrder.amount - currentOrder.deliveryCharge).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                   <span>Delivery Charge</span>
                   <span>₹{currentOrder.deliveryCharge}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                   <p className="text-sm font-bold uppercase tracking-widest">Total Bill</p>
                   <p className="text-2xl font-black text-primary">₹{currentOrder.amount.toLocaleString()}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Status & Timeline */}
        <div className="space-y-8">
          {/* Payment Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Payment Details</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Method</p>
                   <p className="text-xs font-black">{currentOrder.paymentMethod}</p>
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</p>
                   <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                     currentOrder.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                   }`}>
                      {currentOrder.paymentStatus}
                   </span>
                </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Delivery Progress</h3>
             <div className="space-y-6 relative">
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
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{step.time || 'Pending...'}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">sticky_note_2</span>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Admin Notes</h3>
             </div>
             <textarea 
               value={adminNotes}
               onChange={(e) => setAdminNotes(e.target.value)}
               className="w-full min-h-[100px] p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded focus:ring-1 focus:ring-primary transition-all resize-none"
               placeholder="Enter internal flags or notes about this delivery..."
             />
             <button 
               onClick={handleSaveNotes}
               className="w-full py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded hover:bg-slate-800 transition-all"
             >
               Save Notes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;


import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';

const ComplaintDetailSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto animate-pulse">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center gap-4">
        <div className="size-9 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
      <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-[400px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"></div>
        <div className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"></div>
      </div>
      <div className="space-y-6">
        <div className="h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"></div>
        <div className="h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"></div>
      </div>
    </div>
  </div>
);

const ComplaintDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentComplaint, getComplaint, setComplaintStatus, sendReply, resetSelection, loading, sending } = useComplaints();
  const [replyText, setReplyText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) getComplaint(id);
    return () => { resetSelection(); };
  }, [id, getComplaint, resetSelection]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentComplaint?.messages]);

  if (loading || !currentComplaint) {
    return <ComplaintDetailSkeleton />;
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendReply(currentComplaint.id, replyText, isInternal);
    setReplyText('');
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Support Ticket {currentComplaint.id}</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{currentComplaint.category} • Created {currentComplaint.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <select 
             value={currentComplaint.status}
             onChange={(e) => setComplaintStatus(currentComplaint.id, e.target.value as any)}
             className="h-10 px-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 focus:ring-primary shadow-sm"
           >
              <option value="Open">Status: Open</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Resolved">Status: Resolved</option>
           </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Conversation Thread */}
          <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px]">
             <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversation Log</h3>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {currentComplaint.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] space-y-1.5 ${m.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 px-1">
                           <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">{m.sender}</span>
                           <span className="text-[9px] text-slate-400 font-medium">{m.time}</span>
                           {m.isInternal && <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[8px] font-black uppercase border border-amber-500/20">Internal Note</span>}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                          m.sender === 'Admin' 
                            ? (m.isInternal ? 'bg-amber-50 dark:bg-amber-500/5 border border-amber-500/20 text-slate-700 dark:text-slate-300' : 'bg-primary text-white rounded-tr-sm shadow-md') 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                        }`}>
                           {m.text}
                        </div>
                     </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
             </div>
             
             {/* Reply Bar */}
             <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-4 px-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           checked={isInternal} 
                           onChange={(e) => setIsInternal(e.target.checked)} 
                           className="size-4 rounded border-slate-300 text-primary focus:ring-primary" 
                         />
                         <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-600 transition-colors">Internal Observation</span>
                      </label>
                   </div>
                   <div className="flex gap-2">
                      <input 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={isInternal ? "Add internal admin note..." : "Type reply to customer..."}
                        className="flex-1 h-11 px-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-1 focus:ring-primary shadow-sm"
                      />
                      <button 
                        type="submit"
                        disabled={sending || !replyText.trim()}
                        className="h-11 w-11 flex items-center justify-center rounded-md bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-hover disabled:opacity-50 transition-all"
                      >
                         <span className="material-symbols-outlined">{sending ? 'sync' : 'send'}</span>
                      </button>
                   </div>
                </div>
             </form>
          </section>
        </div>

        <div className="space-y-6">
          {/* Ticket Info Card */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Ticket Metadata</h3>
             <div className="space-y-4">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                   <p className="text-sm font-black text-slate-800 dark:text-slate-100">{currentComplaint.subject}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</p>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed">{currentComplaint.description}</p>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800/50"></div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                      <Link to={`/customer/${currentComplaint.customerId}`} className="text-xs font-black text-primary hover:underline">{currentComplaint.customerName}</Link>
                   </div>
                   {currentComplaint.orderId && (
                     <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Related Order</p>
                        <Link to={`/order/${currentComplaint.orderId}`} className="text-xs font-black text-primary hover:underline">{currentComplaint.orderId}</Link>
                     </div>
                   )}
                </div>
             </div>
          </section>

          {/* Quick Actions */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Engagement Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <a 
                  href={`tel:${currentComplaint.customerPhone}`}
                  className="flex flex-col items-center justify-center gap-1.5 h-20 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:text-primary transition-all shadow-sm group"
                >
                   <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">call</span>
                   <span className="text-[9px] font-black uppercase tracking-widest">Call User</span>
                </a>
                <button 
                  className="flex flex-col items-center justify-center gap-1.5 h-20 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:text-blue-500 transition-all shadow-sm group"
                >
                   <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-blue-500 transition-colors">history</span>
                   <span className="text-[9px] font-black uppercase tracking-widest">User History</span>
                </button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;

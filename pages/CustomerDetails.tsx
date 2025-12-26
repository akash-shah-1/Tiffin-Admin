
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { MOCK_ORDERS } from '../data/mockData';

const CustomerDetailSkeleton = () => (
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
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </header>
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
      </div>
    </section>
  </div>
);

const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, getProfile, updateProfile, handleToggleStatus, resetSelection, loading } = useUsers();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Orders' | 'Notes'>('Overview');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (id) getProfile(id);
    return () => { resetSelection(); };
  }, [id, getProfile, resetSelection]);

  useEffect(() => {
    if (currentUser?.adminNotes) setNotes(currentUser.adminNotes);
  }, [currentUser]);

  const handleSaveNotes = () => {
    if (currentUser) {
      updateProfile({ ...currentUser, adminNotes: notes });
    }
  };

  if (loading || !currentUser) {
    return <CustomerDetailSkeleton />;
  }

  const customerOrders = MOCK_ORDERS
    .filter(o => o.customerName.toLowerCase() === currentUser.name.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{currentUser.name}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">ID: {currentUser.id} • Registered: {currentUser.joinedAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleToggleStatus(currentUser.id, currentUser.status)}
            className={`h-10 px-6 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm transition-all border ${
              currentUser.status === 'Active' 
                ? 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/40 hover:bg-red-600 hover:text-white' 
                : 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            {currentUser.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
          <button 
            onClick={() => navigate(`/customer/edit/${currentUser.id}`)}
            className="h-10 px-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-all shadow-sm font-bold text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Edit Identity
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
            <div className="size-24 rounded-full mx-auto bg-cover bg-center border-2 border-slate-100 dark:border-slate-800 shadow-md" style={{ backgroundImage: `url("${currentUser.avatar}")` }}></div>
            <div>
              <h2 className="text-lg font-bold">{currentUser.name}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{currentUser.email}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-100 dark:border-slate-800/60 flex flex-col items-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Balance</p>
              <p className="text-xl font-black text-primary">₹{(currentUser.balance || 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Stored Addresses</h3>
             <div className="space-y-4">
                {currentUser.addresses?.map((addr, i) => (
                  <div key={i} className="flex gap-3">
                     <span className="material-symbols-outlined text-slate-400 text-[18px]">location_on</span>
                     <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{addr}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Lifetime Orders', val: customerOrders.length, icon: 'shopping_bag', color: 'text-primary' },
              { label: 'Total Volume', val: `₹${customerOrders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: 'payments', color: 'text-emerald-500' },
              { label: 'Last Activity', val: customerOrders[0]?.date || 'N/A', icon: 'event', color: 'text-blue-500' },
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
            {['Overview', 'Orders', 'Notes'].map((t) => (
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
              <div className="space-y-6">
                 <div className="p-6 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Recent Activity</h3>
                    <div className="space-y-4">
                       {customerOrders.length > 0 ? (
                         customerOrders.slice(0, 4).map((order) => (
                           <div 
                             key={order.id} 
                             onClick={() => navigate('/orders')}
                             className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary/50 cursor-pointer transition-all group"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold leading-none">{order.sellerName}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{order.date} • {order.itemsSummary}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black">₹{order.amount}</p>
                              </div>
                           </div>
                         ))
                       ) : (
                         <p className="text-center py-10 text-xs text-slate-400 font-bold uppercase tracking-widest">No recent transactions</p>
                       )}
                    </div>
                 </div>
              </div>
            )}
            {activeTab === 'Orders' && (
              <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[600px]">
                        <thead className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-4 py-3 font-bold uppercase tracking-widest text-slate-400">Order ID</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-widest text-slate-400">Date</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-widest text-slate-400">Kitchen</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-widest text-slate-400 text-right">Amount</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {customerOrders.map((order) => (
                            <tr key={order.id} onClick={() => navigate('/orders')} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors cursor-pointer group">
                                <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300">{order.id}</td>
                                <td className="px-4 py-3 text-slate-500 font-medium">{order.date}</td>
                                <td className="px-4 py-3 font-bold group-hover:text-primary transition-colors">{order.sellerName}</td>
                                <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                                    order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                }`}>
                                    {order.status}
                                </span>
                                </td>
                                <td className="px-4 py-3 font-black text-right">₹{order.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                 </div>
              </div>
            )}
            {activeTab === 'Notes' && (
              <div className="space-y-4">
                 <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Internal CRM logs..."
                      className="w-full min-h-[160px] p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:ring-1 focus:ring-primary transition-all resize-none font-medium"
                    />
                    <div className="flex justify-end">
                       <button onClick={handleSaveNotes} className="px-8 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                         Sync Notes
                       </button>
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

export default CustomerDetails;

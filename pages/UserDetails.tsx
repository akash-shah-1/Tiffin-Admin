
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">User Details</h1>
        <button className="size-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-all">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      {/* Profile Info */}
      <section className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="size-32 rounded-full p-1.5 border-4 border-primary/20 shadow-xl">
            <div className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/200/200?random=11")' }}></div>
          </div>
          <div className="absolute bottom-2 right-2 size-5 bg-primary rounded-full border-4 border-background-light dark:border-background-dark"></div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Rahul Sharma</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Customer</span>
            <span className="text-sm font-bold text-gray-400">#CUST-8821</span>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { icon: 'account_balance_wallet', label: 'Balance', value: '$45.00' },
          { icon: 'shopping_bag', label: 'Orders', value: '124' },
          { icon: 'schedule', label: 'Active', value: '2h ago' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm space-y-1">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">{stat.icon}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
            <span className="text-sm font-bold">{stat.value}</span>
          </div>
        ))}
      </section>

      {/* Subscription Card */}
      <section className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">card_membership</span>
            Subscription
          </h3>
          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Active</span>
        </div>
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Plan Type</p>
            <p className="text-sm font-bold">Monthly Veg Thali</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Next Delivery</p>
            <p className="text-sm font-bold">Tom, 12:30 PM</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Start Date</p>
            <p className="text-sm font-bold">Jan 01, 2024</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Renewal</p>
            <p className="text-sm font-bold">Feb 01, 2024</p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-white/5">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">contact_mail</span>
            Contact Info
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          {[
            { icon: 'mail', value: 'rahul.s@example.com', label: 'Email' },
            { icon: 'call', value: '+91 98765 43210', label: 'Phone' },
            { icon: 'location_on', value: '123, Green Park, Block B, New Delhi', label: 'Delivery Address' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{item.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Actions */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Admin Actions</h3>
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">Account Status</p>
            <p className="text-xs text-gray-500">Toggle to suspend user access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-background-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 font-bold text-sm shadow-sm active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
            Reset Password
          </button>
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm shadow-sm active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px]">delete</span>
            Delete User
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserDetails;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const { list, loading, currentType, changeSegment, handleToggleStatus } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Deactivated'>('All');

  const filteredUsers = list.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || u.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Identity Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Verify and manage user account credentials</p>
        </div>
        <button className="h-9 px-4 rounded bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          New Entry
        </button>
      </header>

      {/* Search & Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Search credentials..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-medium transition-all shadow-sm"
          />
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-950/40 rounded-md border border-slate-200 dark:border-slate-800/50">
          {['Customer', 'Seller'].map((s) => (
            <button
              key={s}
              onClick={() => changeSegment(s as any)}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${
                currentType === s ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s} Accounts
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        {['All', 'Active', 'Pending', 'Deactivated'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all border ${
              filter === f 
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Entry List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {filteredUsers.map((user) => (
              <div 
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-9 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url("${user.avatar}")` }}></div>
                  <div>
                    <p className={`text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors ${user.status === 'Deactivated' ? 'opacity-50 line-through' : ''}`}>{user.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-wide">#{user.id} • {user.sub} Tier</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                    user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                    user.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    {user.status}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.status === 'Active'} 
                      onChange={() => handleToggleStatus(user.id, user.status)}
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-40">
             <span className="material-symbols-outlined text-4xl mb-2">person_off</span>
             <p className="text-xs font-bold uppercase tracking-widest">No matching records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
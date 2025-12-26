
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types';

const CustomerForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, getProfile, updateProfile, saving, resetSelection } = useUsers();
  
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    addresses: [''],
    status: 'Active',
    balance: 0,
    adminNotes: ''
  });

  useEffect(() => {
    if (id) getProfile(id);
    return () => resetSelection();
  }, [id]);

  useEffect(() => {
    if (currentUser && id) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...(formData.addresses || [])];
    newAddresses[index] = value;
    setFormData(prev => ({ ...prev, addresses: newAddresses }));
  };

  const addAddressField = () => {
    setFormData(prev => ({ ...prev, addresses: [...(prev.addresses || []), ''] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate('/customers');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto pb-24 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{id ? 'Edit Customer Profile' : 'New Customer Entry'}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Lifecycle Directory & Identity Sync</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Identity Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Primary Phone</label>
              <input 
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Account Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="Active">Active</option>
                <option value="Deactivated">Deactivated</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Logistics & Billing</h3>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Delivery Addresses</label>
            {formData.addresses?.map((addr, idx) => (
              <div key={idx} className="flex gap-2">
                <input 
                  value={addr}
                  onChange={(e) => handleAddressChange(idx, e.target.value)}
                  placeholder={`Address ${idx + 1}`}
                  className="flex-1 h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            ))}
            <button 
              type="button"
              onClick={addAddressField}
              className="text-[10px] font-bold text-primary uppercase flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">add_circle</span>
              Add another address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Balance (₹)</label>
              <input 
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Notes (Private)</label>
            <textarea 
              name="adminNotes"
              value={formData.adminNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Internal record keeping..."
              className="w-full p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>
        </section>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 h-12 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={saving}
            className="flex-1 h-12 rounded bg-primary text-white font-bold text-xs uppercase tracking-widest shadow shadow-primary/20 hover:bg-primary-hover transition-all disabled:opacity-50"
          >
            {saving ? 'Processing...' : id ? 'Update Identity' : 'Register Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

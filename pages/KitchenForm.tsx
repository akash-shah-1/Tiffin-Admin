
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useKitchens } from '../hooks/useKitchens';
import { Kitchen } from '../types';

const KitchenForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentKitchen, getKitchen, persistKitchen, saving, resetSelection } = useKitchens();
  
  const [formData, setFormData] = useState<Partial<Kitchen>>({
    name: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    fssai: '',
    operatingHours: '09:00 AM - 09:00 PM',
    commissionRate: 15,
    adminNotes: ''
  });

  useEffect(() => {
    if (id) getKitchen(id);
    return () => resetSelection();
  }, [id]);

  useEffect(() => {
    if (currentKitchen && id) {
      setFormData(currentKitchen);
    }
  }, [currentKitchen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await persistKitchen(formData);
    navigate('/kitchens');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto pb-24 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{id ? 'Modify Kitchen Profile' : 'Onboard New Kitchen'}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Registry Credentials & Registry Sync</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Business Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Kitchen Brand Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Legal Owner Name</label>
              <input 
                required
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contact Phone</label>
              <input 
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contact Email</label>
              <input 
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operational Address</label>
            <textarea 
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Compliance & Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">FSSAI License No.</label>
              <input 
                required
                name="fssai"
                value={formData.fssai}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Platform Fee (%)</label>
              <input 
                type="number"
                name="commissionRate"
                value={formData.commissionRate}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Internal Admin Notes (Private)</label>
            <textarea 
              name="adminNotes"
              value={formData.adminNotes}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Needs inspection visit next month..."
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
            {saving ? 'Saving Profile...' : id ? 'Update Registry' : 'Confirm Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KitchenForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelivery } from '../hooks/useDelivery';
import { DeliveryPartner, VehicleType } from '../types';

const DeliveryPartnerForm: React.FC = () => {
  const navigate = useNavigate();
  const { persist, saving } = useDelivery();
  
  const [formData, setFormData] = useState<Partial<DeliveryPartner>>({
    name: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
    vehicleType: 'Bike',
    vehicleNumber: '',
    zones: [],
    serviceRadius: 5,
    commission: { type: 'Flat', value: 30 },
    documents: {
      aadhaar: { status: 'Pending', number: '' },
      license: { status: 'Pending', number: '', expiry: '' },
      rc: { status: 'Pending', number: '' },
      bank: { status: 'Pending', holder: '', bankName: '', accountNo: '', ifsc: '' }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
       const [section, key] = name.split('.');
       setFormData(prev => ({
         ...prev,
         [section]: { ...prev[section as keyof DeliveryPartner], [key]: value }
       }));
    } else {
       setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDocChange = (section: string, key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents!,
        [section]: { ...prev.documents![section as keyof typeof prev.documents], [key]: value }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await persist(formData);
    alert('Onboarding request submitted for verification!');
    navigate('/delivery');
  };

  const inputClass = "w-full h-10 px-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1";

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-32 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button onClick={() => navigate(-1)} className="size-10 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Partner Enrollment</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">KYC Verification & Fleet Registration</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b dark:border-slate-800 pb-3 flex items-center gap-2">
             <span className="material-symbols-outlined text-[20px]">person</span>
             Personal Identity
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                 <label className={labelClass}>Full Name</label>
                 <input required name="name" value={formData.name} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Contact Phone</label>
                 <input required name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Date of Birth</label>
                 <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Email Address (Optional)</label>
                 <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
           </div>
           <div className="space-y-1.5">
              <label className={labelClass}>Current Residential Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={`${inputClass} h-auto p-3 resize-none`} />
           </div>
        </section>

        {/* Vehicle & Docs */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b dark:border-slate-800 pb-3 flex items-center gap-2">
             <span className="material-symbols-outlined text-[20px]">badge</span>
             Compliance Documents
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">Aadhaar Card</p>
                    <span className="text-[9px] font-black text-amber-500 uppercase">Verification Pending</span>
                 </div>
                 <div className="space-y-1.5">
                    <label className={labelClass}>Aadhaar Number</label>
                    <input name="doc.aadhaar" value={formData.documents?.aadhaar.number} onChange={(e) => handleDocChange('aadhaar', 'number', e.target.value)} className={inputClass} placeholder="XXXX-XXXX-XXXX" />
                 </div>
                 <div className="flex gap-2">
                    <div className="flex-1 aspect-video rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
                       <span className="material-symbols-outlined text-slate-400">upload</span>
                       <span className="text-[8px] font-black uppercase text-slate-400">Front Image</span>
                    </div>
                    <div className="flex-1 aspect-video rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
                       <span className="material-symbols-outlined text-slate-400">upload</span>
                       <span className="text-[8px] font-black uppercase text-slate-400">Back Image</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">Driving License</p>
                    <span className="text-[9px] font-black text-amber-500 uppercase">Verification Pending</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                       <label className={labelClass}>License Number</label>
                       <input value={formData.documents?.license.number} onChange={(e) => handleDocChange('license', 'number', e.target.value)} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                       <label className={labelClass}>Valid Until</label>
                       <input type="date" value={formData.documents?.license.expiry} onChange={(e) => handleDocChange('license', 'expiry', e.target.value)} className={inputClass} />
                    </div>
                 </div>
                 <div className="aspect-[21/9] rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-slate-400">upload</span>
                    <span className="text-[8px] font-black uppercase text-slate-400">Upload Full License</span>
                 </div>
              </div>
           </div>

           <div className="pt-6 border-t dark:border-slate-800">
              <h4 className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200 mb-4">Vehicle Particulars</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-1.5">
                    <label className={labelClass}>Vehicle Type</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className={inputClass}>
                       <option value="Bike">Bike</option>
                       <option value="Scooter">Scooter</option>
                       <option value="Cycle">Cycle</option>
                    </select>
                 </div>
                 <div className="space-y-1.5">
                    <label className={labelClass}>Registration Number</label>
                    <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} className={inputClass} placeholder="DL-XX-XX-XXXX" />
                 </div>
                 <div className="space-y-1.5">
                    <label className={labelClass}>RC Document</label>
                    <div className="h-10 rounded border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                       <span className="material-symbols-outlined text-[16px] text-slate-400">upload</span>
                       <span className="text-[8px] font-black uppercase text-slate-400">RC Image</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Banking */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b dark:border-slate-800 pb-3 flex items-center gap-2">
             <span className="material-symbols-outlined text-[20px]">account_balance</span>
             Payout Credentials
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                 <label className={labelClass}>A/C Holder Name</label>
                 <input value={formData.documents?.bank.holder} onChange={(e) => handleDocChange('bank', 'holder', e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Bank Name</label>
                 <input value={formData.documents?.bank.bankName} onChange={(e) => handleDocChange('bank', 'bankName', e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Account Number</label>
                 <input value={formData.documents?.bank.accountNo} onChange={(e) => handleDocChange('bank', 'accountNo', e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>IFSC Code</label>
                 <input value={formData.documents?.bank.ifsc} onChange={(e) => handleDocChange('bank', 'ifsc', e.target.value)} className={inputClass} />
              </div>
           </div>
        </section>

        {/* Ops Config */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b dark:border-slate-800 pb-3 flex items-center gap-2">
             <span className="material-symbols-outlined text-[20px]">settings_accessibility</span>
             Operational Configuration
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                 <label className={labelClass}>Service Radius (km)</label>
                 <input type="number" name="serviceRadius" value={formData.serviceRadius} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                 <label className={labelClass}>Commission per Delivery (₹)</label>
                 <input type="number" name="commission.value" value={formData.commission?.value} onChange={(e) => setFormData(prev => ({ ...prev, commission: { ...prev.commission!, value: Number(e.target.value) } }))} className={inputClass} />
              </div>
           </div>
        </section>

        <div className="flex gap-4">
           <button type="button" onClick={() => navigate(-1)} className="flex-1 h-14 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Discard</button>
           <button type="submit" disabled={saving} className="flex-2 h-14 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50">
              {saving ? 'Syncing Profile...' : 'Submit Onboarding Package'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryPartnerForm;

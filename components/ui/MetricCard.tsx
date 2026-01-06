
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number | undefined;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  icon: string;
  iconColor?: string;
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, icon, iconColor = 'text-primary', loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#111827] p-6 rounded-lg border border-slate-200 dark:border-slate-800 animate-pulse">
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111827] p-4 md:p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[140px] transition-all hover:border-primary/30 group">
      <div className="flex items-center justify-between">
        <span className={`material-symbols-outlined ${iconColor} text-[20px] md:text-[24px] group-hover:scale-110 transition-transform`}>{icon}</span>
        {trend && (
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-black ${trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">{trend.label}</span>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <p className="text-xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 md:mt-2">{label}</p>
      </div>
    </div>
  );
};

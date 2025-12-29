
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions, onBack }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="size-10 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {actions}
      </div>
    </header>
  );
};

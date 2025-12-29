
import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  error: 'bg-red-500/10 text-red-600 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '', dot }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase border tracking-widest ${variantStyles[variant]} ${className}`}>
      {dot && <span className={`size-1.5 rounded-full ${variant === 'neutral' ? 'bg-slate-400' : 'bg-current'}`} />}
      {children}
    </span>
  );
};

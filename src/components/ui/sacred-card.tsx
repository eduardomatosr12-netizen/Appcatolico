import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SacredCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'accent';
  onClick?: () => void;
}

export function SacredCard({ children, className, variant = 'default', onClick }: SacredCardProps) {
  const variants = {
    default: 'bg-[#16161A] border border-[rgba(197,160,89,0.08)]',
    gradient: 'bg-gradient-to-br from-[#3D0A11] to-[#1A0508] border border-[rgba(197,160,89,0.15)]',
    accent: 'bg-[#5C0F1B]/20 border border-[#C5A059]/15',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-[24px] p-5 shadow-lg transition-all duration-300',
        'hover:border-[rgba(197,160,89,0.2)]',
        onClick && 'cursor-pointer',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function SacredCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('sacred-text-title', className)}>
      {children}
    </h3>
  );
}

export function SacredCardSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs text-[#8A8A8E] italic mt-0.5', className)}>
      {children}
    </p>
  );
}

export function SacredCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('sacred-text-body mt-3', className)}>
      {children}
    </div>
  );
}

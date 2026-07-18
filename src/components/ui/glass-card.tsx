import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  borderAccent?: 'gold' | 'burgundy' | 'none';
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  borderAccent = 'none',
  onClick,
}: GlassCardProps) {
  const accentBorder = {
    gold: 'border-[#C5A059]/40',
    burgundy: 'border-[#4A0E17]/60',
    none: 'border-white/5',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border bg-white/5 backdrop-blur-md p-6 shadow-lg transition-all duration-300',
        'hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(197,160,89,0.06)]',
        accentBorder[borderAccent],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function GlassCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('font-serif font-semibold text-lg text-[#C5A059]', className)}>
      {children}
    </h3>
  );
}

export function GlassCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('text-sm leading-relaxed text-gray-200', className)}>{children}</div>;
}

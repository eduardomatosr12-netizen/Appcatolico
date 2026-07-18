import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-[14px] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50';

  const variants = {
    primary: 'bg-[#5C0F1B] text-white hover:bg-[#7A1A28] border border-[#5C0F1B]/50',
    secondary: 'bg-white/10 text-[#F0F0F0] hover:bg-white/20 border border-white/10',
    ghost: 'text-[#8A8A8E] hover:bg-white/5 hover:text-white border border-transparent',
    outline: 'border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10',
    gold: 'bg-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/30 border border-[#C5A059]/30',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

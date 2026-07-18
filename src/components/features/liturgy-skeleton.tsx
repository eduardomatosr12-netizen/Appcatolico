'use client';

export function LiturgySkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#16161A] rounded-[24px] p-6 border border-white/[0.03] shadow-lg space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-white/5 rounded-lg" />
            <div className="h-3 w-20 bg-white/5 rounded-lg" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3 w-full bg-white/5 rounded-lg" />
            <div className="h-3 w-5/6 bg-white/5 rounded-lg" />
            <div className="h-3 w-4/6 bg-white/5 rounded-lg" />
            <div className="h-3 w-full bg-white/5 rounded-lg" />
            <div className="h-3 w-3/4 bg-white/5 rounded-lg" />
          </div>
        </div>
      ))}
      <div className="text-center pt-2">
        <span className="text-xs text-[#C5A059]/60 font-medium tracking-wider animate-pulse">
          Buscando textos sagrados...
        </span>
      </div>
    </div>
  );
}

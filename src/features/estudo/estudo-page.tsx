'use client';

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export function EstudoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#5C0F1B]/30 border border-[#C5A059]/20 flex items-center justify-center mb-6">
        <BookOpenIcon className="w-8 h-8 text-[#C5A059]" />
      </div>
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#C5A059] mb-2">
        Estudo
      </h1>
      <p className="text-[#8A8A8E] max-w-md">
        Em breve você terá acesso a conteúdos de estudo, meditação e reflexão para aprofundar sua fé.
      </p>
    </div>
  );
}
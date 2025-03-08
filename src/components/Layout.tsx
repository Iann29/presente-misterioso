import { ReactNode } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import FloatingHearts from './FloatingHearts';
import FloatingCats from './FloatingCats';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Ativa o scroll suave com Lenis
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100">
      {/* Efeito de corações flutuantes no fundo */}
      <FloatingHearts />
      
      {/* Nossos gatinhos flutuando com o scroll */}
      <FloatingCats />
      
      {/* Background com efeito de gradiente em movimento */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/30 via-purple-200/20 to-transparent pointer-events-none" />
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'unframer';

interface CatImage {
  name: string;
  path: string;
  initialPosition: {
    top: string;
    left?: string;
    right?: string;
  };
  rotationRange: [number, number];
  delay: number;
  direction: 'left' | 'right';
  size: number;
}

export default function FloatingCats() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Aplicando spring (amortecimento) ao scrollYProgress para suavizar o movimento
  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 50,   // Menor rigidez = movimento mais suave
    damping: 20,     // Mais amortecimento = menos oscilação
    mass: 1          // Massa padrão
  });

  // Aparecer somente depois de um breve atraso para não competir com o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Os gatos :)
  const cats: CatImage[] = [
    {
      name: 'Gigi',
      path: '/gatos/gigi.png',
      initialPosition: { top: '20%', left: '5%' },
      rotationRange: [-10, 10],
      delay: 0,
      direction: 'left',
      size: 110 // Tamanho original
    },
    {
      name: 'Kelvin',
      path: '/gatos/kelvin.png',
      initialPosition: { top: '50%', right: '5%', left: undefined },
      rotationRange: [5, -15],
      delay: 0.5,
      direction: 'right',
      size: 120 // Tamanho original
    },
    {
      name: 'Ramon',
      path: '/gatos/ramon.png',
      initialPosition: { top: '70%', left: '12%' },
      rotationRange: [-5, 15],
      delay: 0.2,
      direction: 'left',
      size: 100 // Tamanho original
    }
  ];

  if (!isVisible) return null;

  return (
    <>
      {cats.map((cat) => (
        <FloatingCat 
          key={cat.name} 
          cat={cat} 
          scrollProgress={smoothScrollY} 
        />
      ))}
    </>
  );
}

interface FloatingCatProps {
  cat: CatImage;
  scrollProgress: any;
}

function FloatingCat({ cat, scrollProgress }: FloatingCatProps) {
  // Transformar o scroll em movimento horizontal suave com menos sensibilidade
  const xMovement = useTransform(
    scrollProgress,
    [0, 1],
    cat.direction === 'left' ? [0, -30] : [0, 30] // Menos movimento para reduzir oscilação
  );
  
  // Movimento vertical com o scroll - reduzido para evitar tremulação
  const yMovement = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0, -10, 0] // Menos movimento para reduzir oscilação
  );
  
  // Rotação suave com o scroll - range reduzido
  const rotation = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [
      cat.rotationRange[0] * 0.7, // Reduzindo o ângulo para 70% do original
      (cat.rotationRange[0] + cat.rotationRange[1]) / 2 * 0.7,
      cat.rotationRange[1] * 0.7
    ]
  );

  // Aplicando springs adicionais aos movimentos para suavização extra
  const smoothX = useSpring(xMovement, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(yMovement, { stiffness: 40, damping: 20 });
  const smoothRotation = useSpring(rotation, { stiffness: 40, damping: 20 });

  return (
    <div 
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        ...cat.initialPosition,
        zIndex: 5, // Menor que o conteúdo principal
      }}
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: smoothRotation,
          width: cat.size,
          height: cat.size,
        }}
        animate={{ 
          y: [0, -5, 0], // Oscilação reduzida
        }}
        transition={{
          y: {
            duration: 5, // Mais lento para ser mais suave
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: cat.delay
          }
        }}
      >
        <div className="relative">
          <img 
            src={cat.path} 
            alt={cat.name}
            width={cat.size}
            height={cat.size}
            className="rounded-full object-cover shadow-lg"
            style={{ 
              border: '3px solid white',
              width: cat.size + 'px',
              height: cat.size + 'px',
              filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.15))',
            }}
          />
          <motion.div 
            className="absolute opacity-0 hover:opacity-100 bg-pink-500/80 text-white text-sm px-3 py-1 rounded-full -bottom-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ y: 5, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cat.name}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion } from 'unframer';
import { Heart } from 'lucide-react';

interface Heart {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartCount = 15;
  const colors = ['#ff69b4', '#ff1493', '#c71585', '#db7093', '#ffb6c1'];

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * containerWidth,
      size: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));

    setHearts(newHearts);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: "100vh", x: heart.x }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: "-100vh",
            rotate: [0, 10, -10, 0, 10]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: -50,
          }}
        >
          <Heart 
            size={24 * heart.size} 
            className="fill-current" 
            style={{ color: heart.color }}
          />
        </motion.div>
      ))}
    </div>
  );
}

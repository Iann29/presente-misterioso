import { ReactNode } from 'react';
import { motion } from 'unframer';
import { cn } from '../utils/cn';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedCardProps) {
  const directionMap = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          type: 'spring',
          bounce: 0.4,
          duration: 1,
          delay
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)"
      }}
      transition={{ duration: 0.3 }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}

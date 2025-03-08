import { motion } from 'unframer';
import { cn } from '../utils/cn';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  className,
  once = false,
  delay = 0.1,
  duration = 0.05,
}: AnimatedTextProps) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
      className={cn('', className)}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

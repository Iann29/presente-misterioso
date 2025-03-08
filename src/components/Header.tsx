import { motion } from 'unframer';
import { Heart } from 'lucide-react';
import AnimatedText from './AnimatedText';

export default function Header() {
  return (
    <header className="py-10 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 80 }}
            className="mb-4 relative"
          >
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-red-500 fill-red-500" strokeWidth={1.5} />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute inset-0 rounded-full bg-red-500/30 blur-xl z-[-1]"
            />
          </motion.div>

          <AnimatedText 
            text="Mel" 
            className="text-6xl md:text-8xl font-bold text-pink-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            once
            delay={0.4}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4"
          >
            <p className="text-xl md:text-2xl text-purple-700">
              Feliz Dia Internacional da Mulher
            </p>
            <p className="text-sm md:text-base text-pink-500 mt-1">
              08 de março de 2025
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Efeito decorativo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
    </header>
  );
}

import { motion } from 'unframer';
import AnimatedText from './AnimatedText';

export default function QuoteSection() {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto text-center px-8"
      >
        <div className="mb-6 flex justify-center">
          <span className="text-6xl text-pink-400">"</span>
        </div>
        
        <div className="text-2xl md:text-3xl italic text-purple-700 font-light leading-relaxed">
          <AnimatedText 
            text="Uma flor dura poucos dias," 
            className="mb-1"
            once
            delay={0.2}
            duration={0.03}
          />
          <AnimatedText 
            text="mas uma flor virtual dura para sempre..." 
            className="mt-1"
            once
            delay={0.35}
            duration={0.03}
          />
        </div>
        
        <div className="mt-6 flex justify-center">
          <span className="text-6xl text-pink-400">"</span>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-8"
        />
      </motion.div>
    </div>
  );
}

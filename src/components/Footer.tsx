import { motion } from 'unframer';
import { Heart } from 'lucide-react';
import AnimatedText from './AnimatedText';

export default function Footer() {
  return (
    <footer className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <Heart className="w-12 h-12 text-red-500 fill-red-500" strokeWidth={1.5} />
          </motion.div>
          
          <div className="text-xl md:text-2xl text-purple-800 font-medium">
            <AnimatedText 
              text="Obrigado por fazer parte da minha vida" 
              className="mb-1"
              once
              delay={0.2}
            />
            <AnimatedText 
              text="e por ser essa mulher incrível." 
              className="mt-1"
              once
              delay={0.35}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-4"
          >
            <p className="text-lg md:text-xl text-pink-600 font-medium">
              Te amo muito! ❤️
            </p>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60%" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-8"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mt-4"
          >
            Com todo meu amor, para você.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

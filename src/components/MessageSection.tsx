import { Sun, Moon, Music, Coffee, Heart, Star } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import { ReactNode } from 'react';

interface Message {
  icon: ReactNode;
  text: string;
  color: string;
}

export default function MessageSection() {
  const messages: Message[] = [
    {
      icon: <Sun className="text-yellow-500" size={24} />,
      text: "Você ilumina meus dias com seu sorriso",
      color: "from-yellow-400/20 to-yellow-200/10",
    },
    {
      icon: <Moon className="text-purple-500" size={24} />,
      text: "Acalma minhas noites com seu carinho",
      color: "from-purple-400/20 to-purple-200/10",
    },
    {
      icon: <Music className="text-blue-500" size={24} />,
      text: "É a melodia mais doce da minha vida",
      color: "from-blue-400/20 to-blue-200/10",
    },
    {
      icon: <Coffee className="text-amber-700" size={24} />,
      text: "Minha companheira de todas as horas",
      color: "from-amber-400/20 to-amber-200/10",
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      text: "O amor da minha vida, meu coração",
      color: "from-red-400/20 to-red-200/10",
    },
    {
      icon: <Star className="text-pink-500" size={24} />,
      text: "Minha estrela mais brilhante",
      color: "from-pink-400/20 to-pink-200/10",
    },
  ];

  return (
    <section className="py-12 flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedText 
            text="Para a mulher mais especial do mundo" 
            className="text-3xl md:text-4xl font-bold text-purple-800"
            once
          />
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {messages.map((message, index) => (
            <AnimatedCard 
              key={index}
              delay={index * 0.1} 
              direction={index % 2 === 0 ? 'left' : 'right'}
              className={`p-6 rounded-xl bg-white backdrop-blur-sm bg-opacity-70 shadow-xl border border-white/20 bg-gradient-to-br ${message.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/50 shadow-inner flex-shrink-0">
                  {message.icon}
                </div>
                <p className="text-lg text-gray-700 font-medium">
                  {message.text}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

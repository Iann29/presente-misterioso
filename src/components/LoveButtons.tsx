import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'unframer';
import { Heart } from 'lucide-react';

export default function LoveButtons() {
  const [loveCount, setLoveCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showNopeMessage, setShowNopeMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const nopeButtonRef = useRef(null);
  const nopeButtonControls = useAnimation();
  const heartCounter = useRef(0);
  const messageTimeoutRef = useRef(null);
  const messageCooldownRef = useRef(false);

  // Acompanhar a posição do mouse
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Fazer o botão "Não amo" fugir do mouse de forma mais eficaz
  useEffect(() => {
    if (!nopeButtonRef.current) return;
    
    const buttonRect = nopeButtonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calcular a distância entre o mouse e o centro do botão
    const distanceX = mousePosition.x - buttonCenterX;
    const distanceY = mousePosition.y - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Se o mouse estiver próximo, mover o botão na direção oposta
    if (distance < 150) {
      // Quanto mais perto, mais longe o botão foge
      const intensity = Math.max(0.5, 1 - distance / 150);
      
      // Mover na direção oposta com intensidade maior
      const moveX = -distanceX * intensity * 1.5;
      const moveY = -distanceY * intensity * 1.5;
      
      // Garantir que o botão fique visível na tela
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Ajustar posição para não sair da tela
      const constrainedX = Math.min(windowWidth - buttonRect.width - 20, Math.max(20, buttonCenterX + moveX)) - buttonCenterX;
      const constrainedY = Math.min(windowHeight - buttonRect.height - 20, Math.max(20, buttonCenterY + moveY)) - buttonCenterY;
      
      nopeButtonControls.start({
        x: constrainedX,
        y: constrainedY,
        transition: { type: 'spring', stiffness: 500, damping: 15 }
      });
    }
  }, [mousePosition, nopeButtonControls]);

  // Limpar timeouts quando o componente desmontar
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  // Função para mostrar a mensagem de "não amo" com cooldown
  const handleNopeButtonClick = () => {
    if (!messageCooldownRef.current) {
      setShowNopeMessage(true);
      messageCooldownRef.current = true;
      
      // Limpar qualquer timeout anterior
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      // Esconder a mensagem após 2 segundos
      messageTimeoutRef.current = setTimeout(() => {
        setShowNopeMessage(false);
        
        // Permitir nova mensagem após 1 segundo adicional (cooldown)
        setTimeout(() => {
          messageCooldownRef.current = false;
        }, 1000);
      }, 2000);
    }
  };

  // Função para criar corações quando clicar em "Te amo"
  const handleLoveClick = () => {
    setLoveCount((prev) => prev + 1);
    setShowMessage(true);
    
    // Limpar qualquer timeout anterior
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    // Esconder a mensagem após 2 segundos
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    
    // Limitar o número máximo de corações para evitar problemas de performance
    const maxHearts = 15;
    
    // Adicionar vários corações com posições aleatórias
    const newHearts = Array.from({ length: maxHearts }, () => ({
      id: heartCounter.current++,
      x: Math.random() * 200 - 100,  // Posição X aleatória (-100 a 100)
      y: Math.random() * 100 - 50    // Posição Y aleatória (-50 a 50)
    }));
    
    setHearts((prevHearts) => [...prevHearts, ...newHearts]);
    
    // Remover os corações após a animação
    setTimeout(() => {
      setHearts((prevHearts) => 
        prevHearts.filter(heart => !newHearts.some(newHeart => newHeart.id === heart.id))
      );
    }, 3000);
  };

  // Frases românticas que aparecem ao clicar em "Te amo"
  const loveMessages = [
    "Eu também te amo muito! 💖",
    "Você é a mulher mais incrível do mundo! 💕",
    "Cada dia ao seu lado é especial! 💘",
    "Você faz meu coração bater mais forte! 💓",
    "Você é o amor da minha vida! 💝",
    "Sou tão feliz por ter você! 💗",
    "Você é meu tudo! 💞",
    "Meu coração é seu para sempre! 💖",
    "Não consigo imaginar a vida sem você! 💕",
    "Você me faz querer ser melhor a cada dia! 💘"
  ];

  // Frases divertidas quando tenta clicar em "Não amo"
  const nopeMessages = [
    "Ops! Esse botão tem erro! 😏",
    "Haha! Não vai conseguir! 😜",
    "Esse botão não funciona! 😋",
    "Não adianta tentar! 😄",
    "Botão com defeito! 🤭",
    "Tento de novo, vai! 😝",
    "Quase pegou dessa vez! 😂",
    "Não tem como não me amar! 💁‍♀️",
    "Esse botão é só de enfeite! 😆",
    "Só existe amor aqui! ❤️"
  ];

  return (
    <div className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-8">
          Interação Especial 💓
        </h2>
        
        {/* Contador de "Te amo" */}
        <div className="text-center mb-4">
          <span className="inline-block bg-pink-100 text-pink-800 rounded-full px-4 py-1 text-sm font-medium">
            Declarações de amor: {loveCount}
          </span>
        </div>
        
        {/* Mensagens que aparecem ao interagir */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full bg-pink-500 text-white px-4 py-2 rounded-xl shadow-lg text-center z-10 min-w-[250px] whitespace-nowrap"
            >
              {loveMessages[Math.floor(Math.random() * loveMessages.length)]}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-pink-500"></div>
            </motion.div>
          )}
          
          {showNopeMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full bg-purple-500 text-white px-4 py-2 rounded-xl shadow-lg text-center z-10 min-w-[250px] whitespace-nowrap"
            >
              {nopeMessages[Math.floor(Math.random() * nopeMessages.length)]}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-purple-500"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animação de corações */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ 
                opacity: 1, 
                scale: 0, 
                x: 0, 
                y: 0,
              }}
              animate={{ 
                opacity: [1, 0.8, 0], 
                scale: [0, 1, 0.5], 
                x: heart.x, 
                y: -100 - heart.y,
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
            >
              <Heart fill="#ff6b9c" strokeWidth={0} size={15 + Math.random() * 20} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8 relative">
          {/* Botão "Te amo" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoveClick}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg text-lg font-bold flex items-center gap-2 transition-all hover:shadow-pink-300/50 hover:shadow-xl"
          >
            <Heart fill="white" className="h-5 w-5" /> Te amo!
          </motion.button>
          
          {/* Botão "Não amo" que foge do mouse */}
          <motion.div
            ref={nopeButtonRef}
            animate={nopeButtonControls}
            className="relative"
          >
            <button 
              onClick={handleNopeButtonClick}
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-xl shadow-lg text-lg font-bold transition-all"
            >
              Não amo
            </button>
          </motion.div>
        </div>
        
        <p className="text-center text-gray-500 mt-10 italic text-sm">
          Tente clicar nos dois botões... 🙃
        </p>
      </div>
    </div>
  );
}
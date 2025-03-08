import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import FlowerScene from './scenes/FlowerScene';
import MessageSection from './components/MessageSection';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import AnimatedCard from './components/AnimatedCard';
import LoadingScreen from './components/LoadingScreen';
import { motion } from 'unframer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para esconder o scrollbar durante o carregamento para evitar erros no Lenis
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Função para lidar com o término do carregamento
  const handleLoadingComplete = () => {
    document.body.style.overflow = '';
    setIsLoading(false);
  };

  return (
    <>
      {/* Tela de carregamento */}
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      {!isLoading && (
        <Layout>
          {/* Cabeçalho animado */}
          <Header />
          
          {/* Cena 3D com flores */}
          <section className="my-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FlowerScene />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-sm text-purple-600 italic mt-2"
            >
              Flores virtuais eternas para você ❤️
            </motion.div>
          </section>

          {/* Seção de mensagens animadas */}
          <MessageSection />
          
          {/* Imagem especial */}
          <section className="py-12 px-4">
            <AnimatedCard className="max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl" delay={0.2}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80"
                  alt="Flores românticas"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold"
                    >
                      Nosso amor floresce a cada dia
                    </motion.h2>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </section>

          {/* Seção de citação */}
          <QuoteSection />
          
          {/* Rodapé com mensagem final */}
          <Footer />
        </Layout>
      )}
    </>
  );
}

export default App;
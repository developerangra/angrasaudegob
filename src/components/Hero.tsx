import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <iframe 
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/PE8LXMRGg2o?si=ksnZ4uc38VUp6T6Y&autoplay=1&mute=1&controls=0&loop=1&playlist=PE8LXMRGg2o"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Telemedicina Angra Saúde
        </motion.h1>
        <motion.p 
          className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Atendimento médico online 24h, sem sair de casa para Titular+4 parentes de primeiro grau, 
          sendo cônjuge+pais ou filhos até 21 anos.
        </motion.p>
        <motion.div
          className="text-lg text-blue-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-semibold">Consultas Online Ilimitadas</p>
          <p>15 Especialistas à sua disposição</p>
        </motion.div>
        <motion.a 
          href="#cadastro"
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Cadastre-se Agora
        </motion.a>
      </div>
    </section>
  );
}
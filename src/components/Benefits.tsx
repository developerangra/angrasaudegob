import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Stethoscope, Clock, Users, Dog } from 'lucide-react';

const benefits = [
  {
    icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
    title: "Consultas Online",
    description: "Consultas médicas ilimitadas"
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-400" />,
    title: "24/7 Disponível",
    description: "Acesso a médicos a qualquer momento"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-400" />,
    title: "15 Especialistas",
    description: "Equipe médica altamente qualificada"
  },
  {
    icon: <Dog className="w-8 h-8 text-blue-400" />,
    title: "Consultas Veterinárias",
    description: "12 consultas/ano para até 3 pets"
  }
];

export function Benefits() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-black/30" id="beneficios">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Benefícios Exclusivos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-blue-200">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
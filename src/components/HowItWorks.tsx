import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Video, Stethoscope, ClipboardCheck } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-blue-400" />,
    title: "Cadastro",
    description: "Faça seu cadastro em nossa plataforma"
  },
  {
    icon: <Video className="w-8 h-8 text-blue-400" />,
    title: "Agendamento",
    description: "Escolha o horário da sua consulta"
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
    title: "Consulta",
    description: "Realize sua consulta online"
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-blue-400" />,
    title: "Acompanhamento",
    description: "Receba seu diagnóstico e prescrição"
  }
];

export function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} id="como-funciona" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-blue-200">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
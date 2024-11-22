import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function PromoSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>👨‍👩‍👧‍👦</span> EXCLUSIVO PARA OS IRMÃOS DO GOB-RS
          </h2>
          <h3 className="text-xl text-blue-200 mb-6">Plano Familiar Angra Saúde – Seu Passaporte para Tranquilidade e Bem-Estar!</h3>
          
          <p className="text-blue-100 mb-6">
            Imagina poder cuidar de toda sua família – incluindo cunhada, filhos, pais e até seus pets – com o que há de mais moderno em telemedicina, sem pagar nada nos primeiros 60 dias? Esse é o presente que o GOB-RS, em parceria com a Angra Saúde, trouxe especialmente para você, irmão maçom.
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-blue-200 mb-3">🔹 Como funciona?</h4>
            <p className="text-blue-100 mb-4">
              Basta preencher um cadastro rápido com seus dados, e automaticamente você terá acesso ao plano familiar da Angra Saúde. São 60 dias de uso ilimitado para você e sua família experimentarem o atendimento 24/7 em 15 especialidades médicas, sem custo.
            </p>
            <p className="text-blue-100">
              Gostou do serviço? Continue aproveitando tudo isso por apenas R$ 59,90/mês para até 5 familiares de primeiro grau. Inclui:
            </p>
            <ul className="list-none space-y-2 mt-3 text-blue-100">
              <li>• Filhos até 21 anos</li>
              <li>• Acesso a 15 especialidades médicas sem limite de consultas</li>
              <li>• 12 consultas veterinárias por ano para até 3 pets</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-blue-200 mb-3">🔹 Por que esse plano é para você?</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Tranquilidade:</strong> Saiba que sua família está sempre cuidada, com acesso a médicos de qualidade a qualquer hora.</span>
              </li>
              <li className="flex items-start gap-2 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Economia:</strong> Apenas R$ 59,90 para toda a família após o período gratuito – valor que paga saúde para todos!</span>
              </li>
              <li className="flex items-start gap-2 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Flexibilidade:</strong> Teste sem compromisso e descubra por que todos estão aderindo ao plano Angra Saúde.</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              Atenção, irmãos!
            </h4>
            <p className="text-yellow-100">
              Essa oferta é válida apenas para cadastros realizados em novembro. É a sua chance de garantir a segurança e o bem-estar de quem você mais ama.
            </p>
          </div>

          <div className="text-center">
            <a 
              href="#cadastro"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
            >
              👉 Cadastre-se Agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
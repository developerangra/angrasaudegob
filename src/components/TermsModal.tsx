import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
}

export function TermsModal({ isOpen, onClose, formData }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Termo de Adesão e Licenciamento</h3>
          <button onClick={onClose} className="text-white hover:text-blue-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <p>Por este instrumento particular, de um lado: <strong>ANGRA SAÚDE INTERMEDIAÇÃO DE SERVIÇOS SPE LTDA</strong>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº 57.585.518/0001-51, com sede na Rua Marandaia, 424 - conj. 1, São Paulo/SP, CEP: 02513-000, neste ato representada por seu sócio e administrador, Sr. ALCEU ALVES PASSOS, brasileiro, casado, empresário, portador da Cédula de Identidade RG nº 37.82935-8, inscrito no CPF/MF sob o nº 939.548.939-53, e-mail: alceu@angrasaude.com.br, adiante denominada <strong>LICENCIANTE</strong>; e de outro lado:</p>
          
          <p><strong>{formData.name}</strong>, brasileiro(a), portador(a) da cédula de identidade RG nº {formData.rg}, inscrita no CPF/MF nº {formData.cpf} residente na {formData.street}, {formData.number}, {formData.complement}, {formData.neighborhood}, {formData.city}, {formData.state}, {formData.cep}, endereço eletrônico: {formData.email}, doravante referida como <strong>ADERENTE</strong>.</p>

          <h4>1. DEFINIÇÕES</h4>
          <p>1.1. LICENCIANTE é a detentora dos direitos de comercialização e distribuição direta ou indiretamente, da licença de uso da tecnologia, para acesso aos produtos e serviços em telemedicina, disponibilizados ao USUÁRIO FINAL.</p>
          
          <h4>2. OBJETO</h4>
          <p>2.1. Este termo regulamenta a adesão e o licenciamento do uso de tecnologia de comunicação interativa, que disponibiliza ao USUÁRIO FINAL cadastrado na plataforma on-line, o acesso a: i) tele consultas médicas; ii) orientação médica; iii) mediante agendamento, tele consultas médicas com especialistas; iv) até 12 (doze) consultas veterinárias por ano para até 3 (três) animais de estimação, além de conteúdos diários e benefícios exclusivos.</p>
        </div>
      </div>
    </div>
  );
}
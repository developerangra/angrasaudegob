import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { TermsModal } from './TermsModal';
import { fetchAddressByCep } from '../lib/api/viaCep';
import { supabase } from '../lib/supabase';
import { ixcApi } from '../lib/api/ixc';
import { sendEmail } from '../api/send-email';

interface FormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  gender: string;
  paymentMethod: string;
  acceptTerms: boolean;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birthDate: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    gender: '',
    paymentMethod: '',
    acceptTerms: false
  });

  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, cep }));

    if (cep.length === 8) {
      try {
        setLoading(true);
        const address = await fetchAddressByCep(cep);
        setFormData(prev => ({
          ...prev,
          street: address.logradouro,
          neighborhood: address.bairro,
          city: address.localidade,
          state: address.uf,
          complement: address.complemento
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Por favor, digite o endereço manualmente.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Por favor, aceite os termos de adesão para continuar.');
      return;
    }

    try {
      setLoading(true);

      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from('registrations')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      // Create customer in IXC
      const customerData = {
        razao: formData.name,
        cnpj_cpf: formData.cpf,
        telefone: formData.phone,
        email: formData.email,
        status: 'A'
      };

      const customerId = await ixcApi.createCustomer(customerData);

      // Send email notification
      await sendEmail(
        'vendas@angrasaude.com.br',
        'Novo Cadastro na Telemedicina',
        `
          Novo cadastro na Telemedicina:
          Nome: ${formData.name}
          Email: ${formData.email}
          Telefone: ${formData.phone}
          CPF: ${formData.cpf}
          RG: ${formData.rg}
          Data de Nascimento: ${formData.birthDate}
          CEP: ${formData.cep}
          Endereço: ${formData.street}, ${formData.number}
          Complemento: ${formData.complement}
          Bairro: ${formData.neighborhood}
          Cidade: ${formData.city}
          Estado: ${formData.state}
          Gênero: ${formData.gender}
          Forma de Pagamento: ${formData.paymentMethod}
        `
      );

      alert('Cadastro enviado com sucesso! Em breve entraremos em contato.');
    } catch (error) {
      console.error('Erro ao processar cadastro:', error);
      alert('Erro ao enviar cadastro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:border-purple-500";
  const labelClasses = "block text-blue-200 mb-2";

  return (
    <section id="cadastro" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Cadastre-se Agora</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClasses}>Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Telefone/WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cpf" className={labelClasses}>CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  required
                  className={inputClasses}
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="rg" className={labelClasses}>RG</label>
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  required
                  className={inputClasses}
                  value={formData.rg}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="birthDate" className={labelClasses}>Data de Nascimento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                  className={inputClasses}
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cep" className={labelClasses}>CEP</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  required
                  className={inputClasses}
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label htmlFor="street" className={labelClasses}>Rua</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  required
                  className={inputClasses}
                  value={formData.street}
                  onChange={handleChange}
                  readOnly={loading}
                />
              </div>
              <div>
                <label htmlFor="number" className={labelClasses}>Número</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  required
                  className={inputClasses}
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="complement" className={labelClasses}>Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  className={inputClasses}
                  value={formData.complement}
                  onChange={handleChange}
                  readOnly={loading}
                />
              </div>
              <div>
                <label htmlFor="neighborhood" className={labelClasses}>Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  required
                  className={inputClasses}
                  value={formData.neighborhood}
                  onChange={handleChange}
                  readOnly={loading}
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClasses}>Cidade</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className={inputClasses}
                  value={formData.city}
                  onChange={handleChange}
                  readOnly={loading}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelClasses}>Estado</label>
                <select
                  id="state"
                  name="state"
                  required
                  className={inputClasses}
                  value={formData.state}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div>
                <label htmlFor="gender" className={labelClasses}>Gênero</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className={inputClasses}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                  <option value="N">Prefiro não informar</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentMethod" className={labelClasses}>Forma de Pagamento</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  className={inputClasses}
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="pix">PIX à vista</option>
                  <option value="boleto">Parcelado no Boleto</option>
                  <option value="cartao">Parcelado no Cartão</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="w-4 h-4 text-blue-600"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="acceptTerms" className="text-blue-200">
                Li e aceito os{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-blue-400 hover:underline"
                >
                  termos de adesão
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Enviando...' : 'Enviar Cadastro'}</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>

      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        formData={formData}
      />
    </section>
  );
}
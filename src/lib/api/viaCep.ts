import axios from 'axios';

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchAddressByCep(cep: string): Promise<ViaCEPResponse> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido');
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
}
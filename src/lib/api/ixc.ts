import axios from 'axios';

const IXC_API_URL = 'https://api.ixc.net.br/v1';

const getConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(import.meta.env.VITE_IXC_TOKEN)}`,
    'ixcsoft': 'listar'
  }
});

export const ixcApi = {
  async createCustomer(customerData: any) {
    try {
      const response = await axios.post(
        `${IXC_API_URL}/cliente`, 
        customerData, 
        getConfig()
      );
      return response.data.id;
    } catch (error) {
      console.error('Error creating customer in IXC:', error);
      throw error;
    }
  }
};
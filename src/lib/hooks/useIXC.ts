import { useState, useCallback } from 'react';
import { ixcApi, Customer, ServiceOrder, Contract } from '../api/ixc';

export function useIXC() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchCustomers = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const customers = await ixcApi.searchCustomers(query);
      return customers;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCustomerWithContract = useCallback(async (
    customerData: Partial<Customer>,
    contractData: Partial<Contract>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const customerId = await ixcApi.createCustomer(customerData);
      const fullContractData = {
        ...contractData,
        cliente_id: customerId
      };
      const contractId = await ixcApi.createContract(fullContractData);
      return { customerId, contractId };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerDetails = useCallback(async (customerId: number) => {
    setLoading(true);
    setError(null);
    try {
      const [customer, contracts, serviceOrders] = await Promise.all([
        ixcApi.getCustomer(customerId),
        ixcApi.getContracts(customerId),
        ixcApi.getServiceOrders(customerId)
      ]);
      return { customer, contracts, serviceOrders };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    searchCustomers,
    createCustomerWithContract,
    getCustomerDetails
  };
}
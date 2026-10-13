import initial from '../data/customers.json';
import { useCustomerData } from './useCustomerData';
import useOrders from './useOrders';
import { withCustomerOrders } from '../utils/customerOrders';
export default function useLinkedCustomers() {
  const [customers, setCustomers, error] = useCustomerData('customers', initial);
  const { orders, warning } = useOrders();
  return [customers.map(customer => withCustomerOrders(customer, orders)), setCustomers, error || warning];
}

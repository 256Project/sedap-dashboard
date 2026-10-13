import seed from '../data/orders.json';
import useStoredData from './useStoredData';
import { changeOrderStatus, statusLabels } from '../utils/orders';

export default function useOrders() {
  const [orders, setOrders, warning] = useStoredData('sedap.sherzod.orders.v1', seed,
    order => order && typeof order.id === 'string' && order.customer?.name && order.customer?.address && order.customer?.phone && Number.isFinite(order.customer?.lat) && Number.isFinite(order.customer?.lng) && Number.isFinite(order.deliveryFee) && Number.isFinite(Date.parse(order.date)) && Object.hasOwn(statusLabels, order.status) && Array.isArray(order.items) && order.items.every(item => item.name && Number.isFinite(item.price) && Number.isFinite(item.quantity)) && Array.isArray(order.history) && order.history.every(item => Object.hasOwn(statusLabels, item.status) && Number.isFinite(Date.parse(item.at))));
  const updateStatus = (id, status) => setOrders(rows => rows.map(order => order.id === id ? changeOrderStatus(order, status) : order));
  return { orders, updateStatus, warning };
}

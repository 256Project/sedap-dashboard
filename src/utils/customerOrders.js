import { orderTotal } from './orders.js';
export function linkOrder(order, seed, customers) {
  const customerId = order.customerId || seed.find(item => item.id === order.id)?.customerId;
  const customer = customers.find(item => item.id === customerId);
  return { ...order, customerId, customer: customer ? { ...order.customer, name: customer.name, phone: customer.phone, address: customer.address } : order.customer };
}
export function withCustomerOrders(customer, orders) {
  const linked = orders.filter(order => order.customerId === customer.id);
  if (!linked.length) return customer;
  const history = new Map((customer.history || []).map(order => [order.id, order]));
  for (const order of linked) history.set(order.id, { id: order.id, date: order.date, items: order.items, total: orderTotal(order), status: order.status, linked: true });
  const all = [...history.values()];
  return { ...customer, history: all, orders: all.length, spent: all.filter(order => order.status !== 'cancelled').reduce((sum, order) => sum + order.total, 0) };
}

export function migrateCustomers(saved, initial) {
  const ids = new Set(saved.map(customer => customer.id));
  return [...saved, ...initial.filter(customer => customer.source === 'order-integration' && !ids.has(customer.id))];
}

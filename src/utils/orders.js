export const statusLabels = { new: 'Yangi', preparing: 'Tayyorlanmoqda', delivered: 'Yetkazildi', cancelled: 'Bekor qilindi' };
export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));
export const orderTotal = order => order.items.reduce((sum, item) => sum + item.quantity * item.price, 0) + order.deliveryFee;
export const currency = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
export function filterOrders(orders, { query = '', status = 'all', sort = 'newest' } = {}) {
  const search = query.trim().toLocaleLowerCase();
  return orders.filter(order => (status === 'all' || order.status === status) && `${order.id} ${order.customer.name} ${order.customer.address}`.toLocaleLowerCase().includes(search))
    .sort((a, b) => (sort === 'oldest' ? 1 : -1) * (new Date(a.date) - new Date(b.date)));
}
export function changeOrderStatus(order, status, at = new Date().toISOString()) {
  const allowed = { new: ['preparing', 'cancelled'], preparing: ['delivered', 'cancelled'], delivered: [], cancelled: [] };
  if (!allowed[order.status]?.includes(status)) return order;
  return { ...order, status, history: [...order.history, { status, at }] };
}

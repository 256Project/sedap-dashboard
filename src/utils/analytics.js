import { matchesFood, normalizedName, tashkentDay } from './foods.js';
import { orderTotal } from './orders.js';
const dayMs = 86400000;
export function analyticsReport(orders, customers, foods, period, reference) {
  const endDate = new Date(reference + 'T00:00:00Z');
  if (!Number.isFinite(endDate.getTime()) || endDate.toISOString().slice(0, 10) !== reference) return null;
  const startDate = new Date(endDate);
  if (period === 'week') startDate.setUTCDate(startDate.getUTCDate() - 6);
  if (period === 'month') startDate.setUTCDate(1);
  const start = startDate.toISOString().slice(0, 10);
  const length = period === 'day' ? 24 : Math.round((endDate - startDate) / dayMs) + 1;
  const series = Array.from({ length }, (_, index) => {
    const key = period === 'day' ? String(index).padStart(2, '0') : new Date(startDate.getTime() + index * dayMs).toISOString().slice(0, 10);
    return { key, name: period === 'day' ? key + ':00' : key.slice(5), revenue: 0, orders: 0, newCustomers: 0, customers: 0 };
  });
  const inRange = value => { const day = tashkentDay(value); return day >= start && day <= reference; };
  const bucketFor = value => period === 'day' ? new Date(Date.parse(value) + 5 * 3600000).toISOString().slice(11, 13) : tashkentDay(value);
  const bucketMap = new Map(series.map(point => [point.key, point]));
  const products = new Map();
  let revenue = 0, orderCount = 0, delivered = 0;
  for (const order of orders) {
    if (!inRange(order.date)) continue;
    orderCount++;
    const bucket = bucketMap.get(bucketFor(order.date));
    if (bucket) bucket.orders++;
    if (order.status !== 'delivered') continue;
    const total = orderTotal(order); revenue += total; delivered++;
    if (bucket) bucket.revenue += total;
    for (const item of order.items) {
      const food = foods.find(food => matchesFood(item.name, food));
      const key = food?.id || normalizedName(item.name);
      const product = products.get(key) || { id: key, foodId: food?.id, name: food?.name || item.name, image: food?.image, quantity: 0, revenue: 0 };
      product.quantity += item.quantity; product.revenue += item.quantity * item.price;
      products.set(key, product);
    }
  }
  let cumulative = customers.filter(customer => tashkentDay(customer.createdAt) < start).length;
  let newCustomers = 0;
  for (const customer of customers) {
    if (!inRange(customer.createdAt)) continue;
    newCustomers++;
    // Registrations without a time are counted at midnight of their calendar day.
    const key = period === 'day' && /^\d{4}-\d{2}-\d{2}$/.test(customer.createdAt) ? '00' : bucketFor(customer.createdAt);
    const bucket = bucketMap.get(key);
    if (bucket) bucket.newCustomers++;
  }
  for (const point of series) { cumulative += point.newCustomers; point.customers = cumulative; }
  return { start, end: reference, revenue, orderCount, delivered, newCustomers, totalCustomers: cumulative, series, bestSellers: [...products.values()].sort((a, b) => b.quantity - a.quantity || b.revenue - a.revenue).slice(0, 5) };
}

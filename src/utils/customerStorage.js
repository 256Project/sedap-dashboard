import { migrateCustomers } from './customerOrders.js';
const text = value => typeof value === 'string';
const number = value => Number.isFinite(value) && value >= 0;
const date = value => text(value) && Number.isFinite(Date.parse(value));
const statuses = new Set(['new', 'preparing', 'delivered', 'cancelled']);
const item = value => value && text(value.name) && number(value.price) && Number.isInteger(value.quantity) && value.quantity > 0;
const historyOrder = value => value && text(value.id) && date(value.date) && number(value.total) && statuses.has(value.status) && Array.isArray(value.items) && value.items.every(item);
const validators = {
  customers: value => value && text(value.id) && text(value.name) && text(value.phone) && text(value.address) && date(value.createdAt) && number(value.balance) && Number.isInteger(value.orders) && value.orders >= 0 && number(value.spent) && Array.isArray(value.history) && value.history.every(historyOrder),
  reviews: value => value && text(value.id) && text(value.customerId) && text(value.customer) && text(value.food) && text(value.text) && date(value.date) && Number.isInteger(value.rating) && value.rating >= 1 && value.rating <= 5 && (value.reply == null || (text(value.reply.text) && date(value.reply.date))),
  conversations: value => value && text(value.id) && text(value.customerId) && text(value.name) && Number.isInteger(value.unread) && value.unread >= 0 && Array.isArray(value.messages) && value.messages.every(message => message && text(message.id) && ['admin', 'customer'].includes(message.sender) && text(message.text) && date(message.time))
};
export const customerStorageKey = key => key === 'customers' ? 'sedap-amirbek-v2-customers' : 'sedap-amirbek-v1-' + key;
export function validCollection(key, value) {
  return !!validators[key] && Array.isArray(value) && value.every(validators[key]) && new Set(value.map(row => row.id)).size === value.length;
}
export function loadCustomerCollection(key, initial, storage) {
  try {
    const raw = storage.getItem(customerStorageKey(key));
    if (raw !== null) {
      const saved = JSON.parse(raw);
      if (!validCollection(key, saved)) throw new Error('Invalid saved data');
      return { data: saved, warning: '' };
    }
    if (key === 'customers') {
      const legacy = storage.getItem('sedap-amirbek-v1-customers');
      if (legacy !== null) {
        const saved = JSON.parse(legacy);
        if (!validCollection(key, saved)) throw new Error('Invalid legacy data');
        return { data: migrateCustomers(saved, initial), warning: '' };
      }
    }
    return { data: initial, warning: '' };
  } catch {
    return { data: initial, warning: 'Saqlangan ma’lumotni o‘qib bo‘lmadi. Demo ma’lumot ko‘rsatildi.' };
  }
}

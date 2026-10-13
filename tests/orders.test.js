import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterOrders, orderTotal, changeOrderStatus } from '../src/utils/orders.js';
const orders = JSON.parse(readFileSync(new URL('../src/data/orders.json', import.meta.url), 'utf8'));

test('orders can be searched by ID, customer and address together with status', () => {
  assert.equal(filterOrders(orders, { query: ' 1001 ', status: 'new' })[0].id, '1001');
  assert.equal(filterOrders(orders, { query: 'MALIKA' })[0].customer.name, 'Malika Rasulova');
  assert.ok(filterOrders(orders, { query: 'Chilonzor' }).length > 0);
  assert.equal(filterOrders(orders, { query: '1001', status: 'delivered' }).length, 0);
  assert.equal(filterOrders(orders, { query: 'missing' }).length, 0);
});
test('date sorting does not mutate the original array', () => {
  const ids = orders.map(order => order.id);
  const sorted = filterOrders(orders, { sort: 'oldest' });
  for (let index = 1; index < sorted.length; index++) assert.ok(new Date(sorted[index].date) >= new Date(sorted[index - 1].date));
  assert.deepEqual(orders.map(order => order.id), ids);
});
test('order total includes quantities and delivery', () => {
  assert.equal(orderTotal({ items: [{ price: 12.5, quantity: 2 }, { price: 3, quantity: 3 }], deliveryFee: 2 }), 36);
});
test('accepting and delivering preserves the timeline and rejects invalid transitions', () => {
  const order = orders[0];
  const accepted = changeOrderStatus(order, 'preparing', '2026-10-13T12:00:00Z');
  assert.equal(order.status, 'new');
  assert.equal(accepted.history.length, order.history.length + 1);
  assert.deepEqual(accepted.history.at(-1), { status: 'preparing', at: '2026-10-13T12:00:00Z' });
  assert.equal(changeOrderStatus(order, 'delivered'), order);
  const delivered = changeOrderStatus(accepted, 'delivered');
  assert.equal(delivered.status, 'delivered');
  assert.equal(changeOrderStatus(delivered, 'cancelled'), delivered);
  const cancelled = changeOrderStatus(accepted, 'cancelled');
  assert.equal(cancelled.status, 'cancelled');
  assert.equal(changeOrderStatus(cancelled, 'new'), cancelled);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { selectCustomers, validateCustomer, customerSummary, selectReviews } from '../src/utils/customers.js';
const customers = JSON.parse(readFileSync(new URL('../src/data/customers.json', import.meta.url)));
const reviews = JSON.parse(readFileSync(new URL('../src/data/reviews.json', import.meta.url)));

test('customer search combines name, phone and address; sorting does not mutate data', () => {
  const original = customers.map(c => c.id);
  assert.equal(selectCustomers(customers, '  AZIZ  ')[0].name, 'Aziz Karimov');
  assert.equal(selectCustomers(customers, customers[0].phone).length, 1);
  assert.ok(selectCustomers(customers, 'samarkand').every(c => c.address.startsWith('Samarkand')));
  const sorted = selectCustomers(customers, '', 'spent');
  assert.ok(sorted.every((c, i) => i === 0 || sorted[i - 1].spent >= c.spent));
  assert.deepEqual(customers.map(c => c.id), original);
  assert.equal(selectCustomers(customers, 'missing customer').length, 0);
});
test('customer validation rejects empty, malformed and duplicate phone numbers', () => {
  assert.equal(Object.keys(validateCustomer({ name: '', phone: '', address: '' }, customers)).length, 3);
  assert.ok(validateCustomer({ name: 'Guest', phone: 'abc123456789', address: 'Tashkent' }, customers).phone);
  assert.ok(validateCustomer({ name: 'Guest', phone: customers[0].phone.replace(/ /g, ''), address: 'Tashkent' }, customers).phone);
  assert.deepEqual(validateCustomer({ name: 'Guest', phone: '+998 99 999 99 99', address: 'Tashkent, 15' }, customers), {});
});
test('monthly purchases and favorites exclude cancelled orders and separate years', () => {
  const order = (date, status, quantity) => ({ date, status, total: quantity * 10, items: [{ name: 'Pizza', quantity, price: 10 }] });
  const summary = customerSummary({ history: [order('2025-01-02', 'delivered', 2), order('2026-02-01', 'delivered', 3), order('2026-02-03', 'cancelled', 20)] });
  assert.equal(summary.year, 2026);
  assert.equal(summary.months[0].amount, 0);
  assert.equal(summary.months[1].amount, 30);
  assert.equal(summary.favorites[0].quantity, 5);
  assert.deepEqual(customerSummary({ history: [] }).favorites, []);
});
test('demo customer totals agree with history and all reviews reference customers', () => {
  for (const c of customers) {
    assert.equal(c.orders, c.history.length);
    assert.equal(c.spent, c.history.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0));
    assert.equal(customerSummary(c).months.reduce((sum, month) => sum + month.amount, 0), c.spent);
  }
  assert.ok(reviews.every(r => customers.some(c => c.id === r.customerId)));
});
test('review search and rating filters work together', () => {
  const results = selectReviews(reviews, '  CHICKEN  ', '5');
  assert.ok(results.length > 0);
  assert.ok(results.every(r => r.rating === 5 && r.food.toLowerCase().includes('chicken')));
  assert.equal(selectReviews(reviews, 'does not exist', 'all').length, 0);
});

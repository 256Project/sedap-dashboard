import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsReport } from '../src/utils/analytics.js';
const order = (date, status, quantity = 1) => ({ date, status, deliveryFee: 2, items: [{ id: 'shared-id', name: 'Burger', quantity, price: 10 }] });
const orders = [order('2026-09-30T21:30:00Z', 'delivered', 2), order('2026-10-01T09:00:00+05:00', 'cancelled'), order('2026-09-30T00:00:00Z', 'delivered')];
const customers = [{ createdAt: '2025-01-01' }, { createdAt: '2026-10-01' }, { createdAt: '2026-10-01T22:00:00Z' }];
test('analytics observes Toshkent midnight, delivered revenue and all order statuses', () => {
  const report = analyticsReport(orders, customers, [], 'day', '2026-10-01');
  assert.equal(report.series.length, 24);
  assert.equal(report.orderCount, 2);
  assert.equal(report.delivered, 1);
  assert.equal(report.revenue, 22);
  assert.equal(report.series[2].revenue, 22);
  assert.equal(report.newCustomers, 1);
  assert.equal(report.totalCustomers, 2);
  assert.equal(report.bestSellers[0].revenue, 20);
});
test('week crosses months and cumulative customer growth retains earlier registrations', () => {
  const report = analyticsReport(orders, customers, [], 'week', '2026-10-02');
  assert.equal(report.start, '2026-09-26');
  assert.equal(report.series.length, 7);
  assert.equal(report.newCustomers, 2);
  assert.equal(report.totalCustomers, 3);
  assert.equal(report.series[0].customers, 1);
  assert.equal(report.series.reduce((sum, point) => sum + point.revenue, 0), report.revenue);
});
test('month report, renamed menu links, empty periods and invalid dates', () => {
  const report = analyticsReport(orders, customers, [{ id: 'renamed', name: 'New Burger', aliases: ['Burger'] }], 'month', '2026-10-02');
  assert.equal(report.start, '2026-10-01');
  assert.equal(report.series.length, 2);
  assert.equal(report.bestSellers[0].foodId, 'renamed');
  assert.equal(report.bestSellers[0].name, 'New Burger');
  assert.equal(analyticsReport([], customers, [], 'day', '2026-11-01').revenue, 0);
  assert.equal(analyticsReport(orders, customers, [], 'day', ''), null);
  assert.equal(analyticsReport(orders, customers, [], 'day', '2026-02-30'), null);
});

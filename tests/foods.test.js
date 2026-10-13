import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { foodRecord, foodSales, foodRating, foodReviews, matchesFood, selectFoods, validateFood } from '../src/utils/foods.js';
import { migrateFoodImages } from '../src/utils/foodImages.js';
const read = name => JSON.parse(readFileSync(new URL('../src/data/' + name + '.json', import.meta.url)));
const foods = read('foods');
test('photo migration preserves edits, uploads and deleted dishes', () => {
  const saved = [{ ...foods[0], name: 'My burger', price: 19, image: '/images/foods/burger.svg' }, { ...foods[7], image: '/images/foods/pizza.svg' }, { ...foods[1], image: 'data:image/png;base64,custom' }];
  const result = migrateFoodImages(saved, foods);
  assert.equal(result.length, 3);
  assert.equal(result[0].name, 'My burger');
  assert.equal(result[0].price, 19);
  assert.equal(result[0].image, foods[0].image);
  assert.equal(result[1].image, foods[7].image);
  assert.equal(result[2].image, saved[2].image);
});
const values = { name: 'New meal', category: 'Main course', price: '12.50', description: 'A fresh meal with vegetables.', ingredients: 'Rice, chicken', image: '/images/foods/steak.svg' };
test('menu categories, search and offline images are usable', () => {
  assert.ok(selectFoods(foods, ' CHICKEN ', 'Burger').length);
  assert.equal(selectFoods(foods, 'no match', 'all').length, 0);
  assert.ok(selectFoods(foods, '', 'Pizza').every(food => food.category === 'Pizza'));
  for (const food of foods) assert.ok(existsSync(new URL('../public' + food.image, import.meta.url)));
});
test('food form rejects blank fields, bad prices, missing images and name collisions', () => {
  assert.deepEqual(validateFood(values, foods), {});
  for (const price of ['', '-1', '0', '0.001', '1.234', 'NaN', '10001']) assert.ok(validateFood({ ...values, price }, foods).price);
  assert.ok(validateFood({ ...values, name: foods[0].name.toUpperCase() }, foods).name);
  assert.ok(validateFood({ ...values, image: '', ingredients: ', ,', description: '' }, foods).image);
  assert.ok(validateFood({ ...values, ingredients: ', ,' }, foods).ingredients);
});
test('renaming preserves old reviews and sales without trusting reused legacy item IDs', () => {
  const previous = foods[0];
  const updated = foodRecord({ ...values, name: 'Chef Chicken Burger' }, previous);
  assert.equal(updated.id, previous.id);
  assert.ok(matchesFood(previous.name, updated));
  assert.ok(!matchesFood('Caesar Salad', updated));
  const reviews = [{ food: 'chicken burger', rating: 5 }, { food: 'Caesar Salad', rating: 1 }];
  assert.equal(foodRating(updated, reviews).average, 5);
  assert.equal(foodReviews(updated, reviews).length, 1);
  assert.ok(validateFood({ ...values, name: previous.name }, [updated]).name);
  assert.deepEqual(foodRating(updated, []), { count: 0, average: 0 });
});
test('food sales use delivered line items and local months, preserving historical prices', () => {
  const item = (name, quantity, price) => ({ id: 'food-1', name, quantity, price });
  const order = (date, status, items) => ({ date, status, deliveryFee: 10, items });
  const orders = [order('2026-09-30T21:00:00Z', 'delivered', [item('Chicken Burger', 2, 8), item('Caesar Salad', 4, 7)]), order('2026-10-02T10:00:00Z', 'cancelled', [item('Chicken Burger', 99, 8)]), order('2026-09-01T10:00:00Z', 'delivered', [item('Chicken Burger', 3, 8)])];
  assert.deepEqual(foodSales({ ...foods[0], price: 100 }, orders, '2026-10-13'), { quantity: 2, revenue: 16 });
  assert.deepEqual(foodSales(foods[0], orders, '2026-11-01'), { quantity: 0, revenue: 0 });
});

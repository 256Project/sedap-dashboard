import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validCollection, loadCustomerCollection, customerStorageKey } from '../src/utils/customerStorage.js';
const seed = name => JSON.parse(readFileSync(new URL('../src/data/' + name + '.json', import.meta.url), 'utf8'));
const storage = entries => ({ getItem: key => Object.hasOwn(entries,key) ? entries[key] : null });
test('current seeds and deliberately empty collections are accepted', () => {
  for (const key of ['customers', 'reviews', 'conversations']) { assert.equal(validCollection(key,seed(key)),true); assert.equal(validCollection(key,[]),true); }
  const result=loadCustomerCollection('customers',seed('customers'),storage({[customerStorageKey('customers')]:'[]'}));
  assert.deepEqual(result.data,[]); assert.equal(result.warning,'');
});
test('malformed storage falls back with a warning without modifying storage', () => {
  for (const key of ['customers','reviews','conversations']) for (const raw of ['not-json','null','{}','[null]','[{"id":"broken"}]']) {
    const initial=seed(key); const entries={[customerStorageKey(key)]:raw};
    const result=loadCustomerCollection(key,initial,storage(entries));
    assert.equal(result.data,initial); assert.ok(result.warning); assert.equal(entries[customerStorageKey(key)],raw);
  }
});
test('nested dates, history, replies and messages are validated before rendering', () => {
  const c=seed('customers')[0], r=seed('reviews')[0], chat=seed('conversations')[0];
  assert.equal(validCollection('customers',[{...c,history:[{...c.history[0],date:'invalid'}]}]),false);
  assert.equal(validCollection('reviews',[{...r,reply:{text:'Reply',date:'invalid'}}]),false);
  assert.equal(validCollection('reviews',[{...r,rating:7}]),false);
  assert.equal(validCollection('conversations',[{...chat,messages:[null]}]),false);
  assert.equal(validCollection('conversations',[{...chat,messages:[]}]),true);
  assert.equal(validCollection('customers',[c,c]),false);
});
test('valid legacy customer storage migrates while preserving deletions and user additions', () => {
  const initial=seed('customers');const saved=initial.filter(c=>!c.source&&c.id!=='CUS-001');
  saved.push({...initial[0],id:'added-user',name:'Added user',history:[]});
  const result=loadCustomerCollection('customers',initial,storage({'sedap-amirbek-v1-customers':JSON.stringify(saved)}));
  assert.equal(result.warning,'');assert.ok(result.data.some(c=>c.id==='added-user'));assert.ok(!result.data.some(c=>c.id==='CUS-001'));assert.ok(result.data.some(c=>c.source==='order-integration'));
});
test('storage access errors are recoverable', () => {
  const initial=seed('reviews');const result=loadCustomerCollection('reviews',initial,{getItem(){throw new Error('Denied')}});
  assert.equal(result.data,initial);assert.ok(result.warning);
});

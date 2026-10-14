import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import useStoredData from '../src/hooks/useStoredData.js';
test('back-to-back hook updates retain both changes before React rerenders', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const writes = [];
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => null, setItem: (_, value) => writes.push(JSON.parse(value)) } });
  try {
    function Harness() {
      const [data, update] = useStoredData('test-orders', [], value => typeof value === 'number');
      if (!data.length) {
        update(previous => [...previous, 1]);
        update(previous => [...previous, 2]);
      }
      return createElement('output', null, data.join(','));
    }
    assert.equal(renderToString(createElement(Harness)), '<output>1,2</output>');
    assert.deepEqual(writes.at(-1), [1, 2]);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  }
});

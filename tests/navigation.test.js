import test from 'node:test';
import assert from 'node:assert/strict';
import { isMenuActive } from '../src/utils/navigation.js';
test('detail menus match real IDs instead of only demo',()=>{for(const section of ['orders','customers','foods']){assert.equal(isMenuActive('/'+section+'/123','/'+section+'/demo'),true);assert.equal(isMenuActive('/'+section,'/'+section+'/demo'),false);assert.equal(isMenuActive('/'+section+'/123','/'+section),false);}});
test('food creation is not a food detail and editing remains in detail',()=>{assert.equal(isMenuActive('/foods/new','/foods/demo'),false);assert.equal(isMenuActive('/foods/42/edit','/foods/demo'),true);assert.equal(isMenuActive('/foods/42/unknown','/foods/demo'),false);});
test('top-level menu allows trailing slash without matching prefixes',()=>{assert.equal(isMenuActive('/wallet/','/wallet'),true);assert.equal(isMenuActive('/wallet-other','/wallet'),false);});

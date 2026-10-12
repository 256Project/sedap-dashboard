import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLogin, authenticateDemo, safeDestination } from '../src/utils/auth.js';
const account={email:'admin@sedap.uz',password:'Sedap123!'};
test('login validates empty and malformed input',()=>{assert.ok(validateLogin('', '').email);assert.ok(validateLogin('', '').password);assert.ok(validateLogin('admin@', 'secret').email);assert.deepEqual(validateLogin(account.email,account.password),{});});
test('demo login requires matching credentials',()=>{assert.equal(authenticateDemo(' ADMIN@SEDAP.UZ ',account.password,account),true);assert.equal(authenticateDemo(account.email,'wrong',account),false);assert.equal(authenticateDemo('other@sedap.uz',account.password,account),false);});
test('redirect accepts internal paths and rejects external or login destinations',()=>{assert.equal(safeDestination('/wallet?status=pending'),'/wallet?status=pending');for(const path of [undefined,'https://example.com','//example.com','/login','/login?next=/wallet','/\\example.com'])assert.equal(safeDestination(path),'/dashboard');});

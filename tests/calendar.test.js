import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarDays, dayKey, parseDay, moveCalendar, validateEvent } from '../src/utils/calendar.js';

test('month grid covers the whole month and begins on Monday', () => {
  for (let month = 0; month < 12; month++) {
    const days = calendarDays(new Date(2026, month, 15, 12), 'month');
    assert.equal(days[0].getDay(), 1);
    assert.equal(days.length % 7, 0);
    assert.ok(days.some(day => dayKey(day) === dayKey(new Date(2026, month, 1, 12))));
    assert.ok(days.some(day => dayKey(day) === dayKey(new Date(2026, month + 1, 0, 12))));
  }
});
test('week/day views and navigation handle month and year boundaries', () => {
  assert.equal(calendarDays(parseDay('2026-10-18'), 'week').map(dayKey)[0], '2026-10-12');
  assert.deepEqual(calendarDays(parseDay('2026-10-18'), 'day').map(dayKey), ['2026-10-18']);
  assert.equal(dayKey(moveCalendar(parseDay('2026-01-31'), 'month', 1)), '2026-02-28');
  assert.equal(dayKey(moveCalendar(parseDay('2026-12-31'), 'day', 1)), '2027-01-01');
  assert.equal(dayKey(moveCalendar(parseDay('2026-01-03'), 'week', -1)), '2025-12-27');
});
test('event validation rejects empty titles, impossible dates and reversed times', () => {
  const valid = { title: 'Meeting', date: '2026-10-13', start: '10:00', end: '11:00', color: 'green' };
  assert.equal(validateEvent(valid), '');
  for (const values of [{ title: '  ' }, { date: '2026-02-30' }, { date: '' }, { start: '25:00' }, { end: '09:00' }, { end: '10:00' }, { color: 'unknown' }]) assert.ok(validateEvent({ ...valid, ...values }));
});

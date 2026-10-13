export const eventColors = { green: 'Yashil', blue: 'Ko‘k', purple: 'Binafsha', orange: 'To‘q sariq' };
export const dayKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const parseDay = key => new Date(key + 'T12:00:00');
export function addDays(date, amount) { const next = new Date(date); next.setDate(next.getDate() + amount); return next; }
export function calendarDays(date, view) {
  if (view === 'day') return [new Date(date)];
  const first = view === 'month' ? new Date(date.getFullYear(), date.getMonth(), 1, 12) : new Date(date);
  const start = addDays(first, -((first.getDay() + 6) % 7));
  const count = view === 'week' ? 7 : Math.ceil((((first.getDay() + 6) % 7) + new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) / 7) * 7;
  return Array.from({ length: count }, (_, index) => addDays(start, index));
}
export function moveCalendar(date, view, step) {
  if (view !== 'month') return addDays(date, step * (view === 'week' ? 7 : 1));
  const next = new Date(date.getFullYear(), date.getMonth() + step, 1, 12);
  next.setDate(Math.min(date.getDate(), new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()));
  return next;
}
export function validateEvent(event) {
  if (!event.title?.trim()) return 'Tadbir nomini kiriting.';
  if (event.title.trim().length > 100) return 'Tadbir nomi 100 belgidan oshmasin.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date || '') || !Number.isFinite(parseDay(event.date).getTime()) || dayKey(parseDay(event.date)) !== event.date) return 'To‘g‘ri sana tanlang.';
  if (![event.start, event.end].every(time => /^([01]\d|2[0-3]):[0-5]\d$/.test(time || '')) || event.end <= event.start) return 'Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak.';
  if (!Object.hasOwn(eventColors, event.color)) return 'Tadbir rangini tanlang.';
  return '';
}

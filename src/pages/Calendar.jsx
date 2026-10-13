import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { Card, Button, Input, Select, Tabs, Modal } from '../components/ui';
import seed from '../data/events.json';
import useStoredData from '../hooks/useStoredData';
import { eventColors, dayKey, parseDay, calendarDays, moveCalendar, validateEvent } from '../utils/calendar';
import '../styles/orders.css';

const weekdays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
const dateLabel = date => date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
export default function Calendar() {
  const [events, setEvents, warning] = useStoredData('sedap.sherzod.events.v1', seed, event => event && typeof event.id === 'string' && !validateEvent(event));
  const [focus, setFocus] = useState(() => new Date());
  const [view, setView] = useState('month');
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const days = calendarDays(focus, view);
  const today = dayKey(new Date());
  const upcoming = events.filter(event => event.date > today || (event.date === today && event.end > new Date().toTimeString().slice(0, 5))).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)).slice(0, 6);
  function openEvent(event) { setDraft({ ...event }); setError(''); setDeleteOpen(false); }
  function createEvent(date = dayKey(focus)) { openEvent({ title: '', date, start: '10:00', end: '11:00', color: 'green', description: '' }); }
  function close() { setDraft(null); setDeleteOpen(false); }
  function save(event) {
    event.preventDefault();
    const message = validateEvent(draft);
    if (message) { setError(message); return; }
    const record = { ...draft, title: draft.title.trim(), id: draft.id || crypto.randomUUID() };
    setEvents(rows => draft.id ? rows.map(item => item.id === draft.id ? record : item) : [...rows, record]);
    setFocus(parseDay(draft.date));
    close();
  }
  const update = (key, value) => setDraft({ ...draft, [key]: value });
  return <section className="orders-page">
    <div className="page-heading"><div><h1>Calendar</h1><p>Restoran tadbirlari va uchrashuvlar.</p></div><Button onClick={() => createEvent()}><Plus size={18} /> Tadbir qo‘shish</Button></div>
    {warning && <p role="status" className="form-error">{warning}</p>}
    <div className="calendar-layout"><Card className="calendar-card">
      <div className="calendar-toolbar"><div className="order-actions"><Button variant="secondary" aria-label="Oldingi davr" onClick={() => setFocus(moveCalendar(focus, view, -1))}><ChevronLeft size={18} /></Button><Button variant="secondary" onClick={() => setFocus(new Date())}>Bugun</Button><Button variant="secondary" aria-label="Keyingi davr" onClick={() => setFocus(moveCalendar(focus, view, 1))}><ChevronRight size={18} /></Button></div><h2 aria-live="polite">{view === 'month' ? focus.toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' }) : view === 'week' ? `${dateLabel(days[0])} – ${dateLabel(days[6])}` : dateLabel(focus)}</h2><Tabs label="Kalendar ko‘rinishi" options={[{ value: 'month', label: 'Oy' }, { value: 'week', label: 'Hafta' }, { value: 'day', label: 'Kun' }]} value={view} onChange={setView} /></div>
      <div className="calendar-scroll"><div className={'calendar-grid ' + view}>
        {view !== 'day' && weekdays.map(day => <div className="calendar-weekday" key={day}>{day}</div>)}
        {days.map(day => { const key = dayKey(day); const dayEvents = events.filter(event => event.date === key).sort((a, b) => a.start.localeCompare(b.start)); return <div className={'calendar-cell ' + (day.getMonth() !== focus.getMonth() ? 'outside ' : '') + (key === today ? 'today' : '')} key={key}>
          <button className="calendar-date" aria-label={dateLabel(day) + ': tadbir qo‘shish'} onClick={() => createEvent(key)}>{view === 'day' ? dateLabel(day) : day.getDate()}<Plus size={13} /></button>
          {dayEvents.map(event => <button className={'calendar-event ' + event.color} key={event.id} onClick={() => openEvent(event)}><span>{event.start}–{event.end}</span><strong>{event.title}</strong>{view === 'day' && <span>{event.description}</span>}</button>)}
          {!dayEvents.length && view === 'day' && <p className="order-muted">Bu kunda tadbir yo‘q. Yangi tadbir qo‘shing.</p>}
        </div>; })}
      </div></div>
    </Card><aside className="order-stack"><Card title="Yaqin tadbirlar" description="Bugundan boshlab"><div className="upcoming-events">{upcoming.length ? upcoming.map(event => <button key={event.id} className={'upcoming-event ' + event.color} onClick={() => openEvent(event)}><CalendarDays size={21} /><span><strong>{event.title}</strong><small>{dateLabel(parseDay(event.date))}</small><small><Clock size={12} />{event.start}–{event.end}</small></span></button>) : <p className="order-muted">Yaqin tadbirlar yo‘q.</p>}</div></Card><Card title="Tadbir ranglari"><div className="calendar-legend">{Object.entries(eventColors).map(([color, label]) => <span key={color}><i className={color} />{label}</span>)}</div></Card></aside></div>
    <Modal open={draft !== null} onClose={close} title={draft?.id ? 'Tadbirni tahrirlash' : 'Yangi tadbir'}>{draft && <form className="event-form" onSubmit={save} noValidate>
      <Input label="Tadbir nomi" value={draft.title} maxLength={100} onChange={event => update('title', event.target.value)} required />
      <Input label="Sana" type="date" value={draft.date} onChange={event => update('date', event.target.value)} required />
      <div className="event-times"><Input label="Boshlanish" type="time" value={draft.start} onChange={event => update('start', event.target.value)} required /><Input label="Tugash" type="time" value={draft.end} onChange={event => update('end', event.target.value)} required /></div>
      <Select label="Rang" options={Object.entries(eventColors).map(([value, label]) => ({ value, label }))} value={draft.color} onChange={event => update('color', event.target.value)} />
      <Input label="Tavsif" value={draft.description || ''} maxLength={500} onChange={event => update('description', event.target.value)} />
      {error && <p role="alert" className="form-error">{error}</p>}
      {deleteOpen ? <div className="event-delete" role="group" aria-label="O‘chirishni tasdiqlash"><p>Bu tadbir o‘chirilsinmi?</p><div className="order-actions"><Button variant="secondary" onClick={() => setDeleteOpen(false)}>Orqaga</Button><Button variant="danger" onClick={() => { setEvents(rows => rows.filter(event => event.id !== draft.id)); close(); }}>Ha, o‘chirish</Button></div></div> : <div className="order-actions"><Button type="submit">Saqlash</Button><Button variant="secondary" onClick={close}>Yopish</Button>{draft.id && <Button variant="danger" onClick={() => setDeleteOpen(true)}>O‘chirish</Button>}</div>}
    </form>}</Modal>
  </section>;
}

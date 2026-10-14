import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MessageCircle } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { CustomerAvatar, CustomerHeading, StorageNotice } from '../components/customers/CustomerUI';
import initial from '../data/conversations.json';
import { useCustomerData } from '../hooks/useCustomerData';
const time = value => new Intl.DateTimeFormat('uz-UZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' }).format(new Date(value));
const day = value => new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Tashkent' }).format(new Date(value));
export default function Chat() {
  const [conversations, setConversations, storageError] = useCustomerData('conversations', initial);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');
  const [drafts, setDrafts] = useState({});
  const bottom = useRef(null);
  const active = conversations.find(c => c.id === activeId);
  const draft = drafts[activeId] || '';
  const filtered = conversations.filter(c => c.name.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => (b.messages.at(-1)?.time || '').localeCompare(a.messages.at(-1)?.time || ''));
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'nearest' }); }, [activeId, active?.messages.length]);
  function openConversation(c) {
    setActiveId(c.id);
    setConversations(previous => previous.map(item => item.id === c.id ? { ...item, unread: 0 } : item));
  }
  function send(event) {
    event.preventDefault();
    if (!active || !draft.trim()) return;
    const message = { id: crypto.randomUUID(), sender: 'admin', text: draft.trim(), time: new Date().toISOString() };
    setConversations(previous => previous.map(c => c.id === activeId ? { ...c, messages: [...c.messages, message] } : c));
    setDrafts(previous => ({ ...previous, [activeId]: '' }));
  }
  return <section className="customer-page"><CustomerHeading title="Chat" description="Keep the conversation going." /><StorageNotice message={storageError} />
    <Card className="customer-chat"><aside className="customer-conversations" aria-label="Suhbatlar"><div className="customer-chat-list-heading"><h2>Messages</h2><span className="customer-unread" aria-label="Jami o‘qilmagan xabarlar">{conversations.reduce((sum, c) => sum + c.unread, 0)}</span></div><Input aria-label="Suhbat qidirish" placeholder="Suhbat qidirish…" value={query} onChange={event => setQuery(event.target.value)} /><div className="customer-conversation-list">{filtered.map(c => <button key={c.id} className={`customer-conversation ${activeId === c.id ? 'selected' : ''}`} aria-pressed={activeId === c.id} onClick={() => openConversation(c)}><CustomerAvatar name={c.name} /><span className="customer-conversation-copy"><strong>{c.name}</strong><small>{c.messages.at(-1)?.text || 'Hali xabarlar yo‘q.'}</small></span><span className="customer-conversation-meta"><time dateTime={c.messages.at(-1)?.time}>{c.messages.length ? time(c.messages.at(-1).time) : '—'}</time>{c.unread > 0 && <span className="customer-unread" aria-label={`${c.unread} ta o‘qilmagan xabar`}>{c.unread}</span>}</span></button>)}{!filtered.length && <p className="customer-empty">Suhbat topilmadi.</p>}</div></aside>
    <div className="customer-chat-main">{active ? <><header className="customer-chat-header"><div className="customer-person"><CustomerAvatar name={active.name} /><div><h2>{active.name}</h2><small>Customer conversation</small></div></div><Link to={`/customers/${active.customerId}`} className="ui-button secondary">Profil</Link></header><div className="customer-messages" role="log" aria-label={`${active.name} bilan yozishmalar`} aria-live="polite">{active.messages.map((message, index) => <div key={message.id}>{(index === 0 || day(message.time) !== day(active.messages[index - 1].time)) && <div className="customer-message-date">{day(message.time)}</div>}<div className={`customer-message ${message.sender}`}><span className="sr-only">{message.sender === 'admin' ? 'Siz' : active.name}: </span><p>{message.text}</p><time dateTime={message.time}>{time(message.time)}</time></div></div>)}<div ref={bottom} /></div><form className="customer-composer" onSubmit={send}><label className="sr-only" htmlFor="chat-message">Xabar yozish</label><textarea id="chat-message" rows={2} maxLength={2000} placeholder="Xabar yozing…" value={draft} onChange={event => setDrafts(previous => ({ ...previous, [activeId]: event.target.value }))} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(event); } }} /><Button type="submit" disabled={!draft.trim()} aria-label="Xabar yuborish"><Send size={18} /><span>Yuborish</span></Button></form></> : <div className="customer-chat-empty"><MessageCircle size={48} /><h2>Suhbatni tanlang</h2><p>Xabarlarni ko‘rish uchun mijozni tanlang.</p></div>}</div></Card>
  </section>;
}

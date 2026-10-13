import { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { Card, Button, Input, Select, Modal, Pagination } from '../components/ui';
import { CustomerAvatar, CustomerHeading, StorageNotice, Stars } from '../components/customers/CustomerUI';
import initial from '../data/reviews.json';
import { useCustomerData } from '../hooks/useCustomerData';
import { selectReviews } from '../utils/customers';
import { date } from '../utils/format';
export default function Reviews() {
  const [reviews, setReviews, storageError] = useCustomerData('reviews', initial);
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState('all');
  const [page, setPage] = useState(1);
  const [replying, setReplying] = useState(null);
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const filtered = selectReviews(reviews, query, rating).sort((a, b) => b.date.localeCompare(a.date));
  const average = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  const pageSize = 6;
  function saveReply(event) {
    event.preventDefault();
    if (!reply.trim()) { setError('Javob matnini kiriting.'); return; }
    setReviews(previous => previous.map(r => r.id === replying.id ? { ...r, reply: { text: reply.trim(), date: new Date().toISOString() } } : r));
    setReplying(null); setNotice('Javob saqlandi.');
  }
  return <section className="customer-page"><CustomerHeading title="Reviews" description="Listen to your guests. Keep getting better." /><StorageNotice message={storageError} /><p role="status" className="customer-status">{notice}</p>
    <div className="customer-review-top"><Card className="customer-rating-summary"><div><span className="customer-rating-number">{average}<small>/ 5</small></span><Stars rating={Math.round(Number(average))} /><p>{reviews.length} customer reviews</p></div><div className="customer-rating-bars">{[5, 4, 3, 2, 1].map(value => { const count = reviews.filter(r => r.rating === value).length; return <div key={value}><span>{value} <Star size={12} /></span><progress aria-label={`${value} yulduzli sharhlar`} value={count} max={reviews.length || 1} /><small>{count}</small></div>; })}</div></Card><Card className="customer-review-note"><MessageSquare size={28} /><h2>Customer feedback</h2><p>Har bir fikr xizmatni yaxshilash imkoniyatidir.</p><strong>{reviews.filter(r => !r.reply).length} ta sharh javob kutmoqda</strong></Card></div>
    <Card><div className="customer-filters"><Input aria-label="Sharh qidirish" placeholder="Mijoz, taom yoki sharh…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /><Select aria-label="Reyting filtri" value={rating} onChange={event => { setRating(event.target.value); setPage(1); }} options={[{ value: 'all', label: 'Barcha reytinglar' }, ...[5, 4, 3, 2, 1].map(value => ({ value: String(value), label: `${value} yulduz` }))]} /></div>
    <div className="customer-review-grid">{filtered.slice((page - 1) * pageSize, page * pageSize).map(r => <article className="customer-review" key={r.id}><div className="customer-review-header"><div className="customer-person"><CustomerAvatar name={r.customer} /><div><h3>{r.customer}</h3><time dateTime={r.date}>{date(r.date)}</time></div></div><Stars rating={r.rating} /></div><span className="customer-food-tag">{r.food}</span><p className="customer-review-text">{r.text}</p>{r.reply && <div className="customer-reply"><strong>Sedap javobi</strong><p>{r.reply.text}</p><time dateTime={r.reply.date}>{date(r.reply.date)}</time></div>}<Button variant="secondary" onClick={() => { setReplying(r); setReply(r.reply?.text || ''); setError(''); }}>{r.reply ? 'Javobni tahrirlash' : 'Javob yozish'}</Button></article>)}</div>{!filtered.length && <p className="customer-empty">Sharh topilmadi. Qidiruv yoki filtrni o‘zgartiring.</p>}<Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} /></Card>
    <Modal open={!!replying} onClose={() => setReplying(null)} title="Sharhga javob"><form className="customer-form" onSubmit={saveReply}><p><strong>{replying?.customer}</strong>: {replying?.text}</p><label htmlFor="review-reply">Javobingiz</label><textarea id="review-reply" className="customer-textarea" rows={5} maxLength={2000} value={reply} onChange={event => setReply(event.target.value)} aria-invalid={!!error} aria-describedby={error ? 'reply-error' : undefined} />{error && <p id="reply-error" role="alert" className="field-error">{error}</p>}<div className="customer-actions"><Button variant="secondary" onClick={() => setReplying(null)}>Bekor qilish</Button><Button type="submit">Javobni saqlash</Button></div></form></Modal>
  </section>;
}

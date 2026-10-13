import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Users, ShoppingBag, Wallet } from 'lucide-react';
import { Card, Button, Input, Select, Table, Modal, Pagination } from '../components/ui';
import { CustomerAvatar, CustomerHeading, StorageNotice } from '../components/customers/CustomerUI';

import useLinkedCustomers from '../hooks/useLinkedCustomers';
import { selectCustomers, validateCustomer } from '../utils/customers';
import { money, number } from '../utils/format';
const emptyForm = { name: '', phone: '', address: '' };
export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers, storageError] = useLinkedCustomers();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const filtered = selectCustomers(customers, query, sort);
  const pageSize = 6;
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / pageSize)));
  function add(event) {
    event.preventDefault();
    const nextErrors = validateCustomer(form, customers); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setCustomers(previous => [...previous, { id: crypto.randomUUID(), name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(), orders: 0, spent: 0, balance: 0, createdAt: new Date().toISOString(), history: [] }]);
    setAdding(false); setQuery(''); setSort('newest'); setPage(1); setNotice('Mijoz qo‘shildi.');
  }
  const columns = [
    { key: 'name', label: 'Customer', render: (name, row) => <span className="customer-person"><CustomerAvatar name={name} /><span><strong>{name}</strong><small>#{row.id.slice(0, 8)}</small></span></span> },
    { key: 'phone', label: 'Phone' }, { key: 'address', label: 'Address' },
    { key: 'orders', label: 'Orders', render: number }, { key: 'spent', label: 'Total spent', render: money },
    { key: 'actions', label: 'Actions', render: (_, row) => <Button variant="danger" aria-label={`${row.name}ni o‘chirish`} onClick={() => setDeleting(row)}><Trash2 size={16} /></Button> },
  ];
  return <section className="customer-page"><CustomerHeading title="Customer" description="Know your customers. Make every visit count."><Button onClick={() => { setForm(emptyForm); setErrors({}); setAdding(true); }}><Plus size={18} />Mijoz qo‘shish</Button></CustomerHeading>
    <StorageNotice message={storageError} /><p role="status" className="customer-status">{notice}</p>
    <div className="customer-stats">{[[Users, 'Total customers', number(customers.length)], [ShoppingBag, 'Total orders', number(customers.reduce((sum, c) => sum + c.orders, 0))], [Wallet, 'Total purchases', money(customers.reduce((sum, c) => sum + c.spent, 0))]].map(([Icon, label, value]) => <Card key={label} className="customer-stat"><span className="customer-stat-icon"><Icon size={26} /></span><div><small>{label}</small><strong>{value}</strong></div></Card>)}</div>
    <Card title="Customer list" description="All your guests in one place"><div className="customer-filters"><Input aria-label="Mijoz qidirish" placeholder="Ism, telefon yoki manzil…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /><Select aria-label="Mijozlarni saralash" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }} options={[{ value: 'name', label: 'Ism: A–Z' }, { value: 'newest', label: 'Eng yangi mijozlar' }, { value: 'orders', label: 'Buyurtmalar: ko‘pdan kamga' }, { value: 'spent', label: 'Xarid: ko‘pdan kamga' }]} /></div><Table caption="Mijozlar ro‘yxati" columns={columns} data={filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)} onRowClick={c => navigate(`/customers/${c.id}`)} /><Pagination page={currentPage} pageSize={pageSize} total={filtered.length} onChange={setPage} /></Card>
    <Modal open={adding} onClose={() => setAdding(false)} title="Mijoz qo‘shish"><form onSubmit={add} className="customer-form" noValidate>{[['name', 'Ism', 'text'], ['phone', 'Telefon', 'tel'], ['address', 'Manzil', 'text']].map(([key, label, type]) => <Input key={key} label={label} type={type} value={form[key]} error={errors[key]} maxLength={key === 'address' ? 200 : 80} required onChange={event => setForm(previous => ({ ...previous, [key]: event.target.value }))} />)}<div className="customer-actions"><Button variant="secondary" onClick={() => setAdding(false)}>Bekor qilish</Button><Button type="submit">Saqlash</Button></div></form></Modal>
    <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Mijozni o‘chirish"><p><strong>{deleting?.name}</strong> mijozini o‘chirishni tasdiqlang.</p><div className="customer-actions"><Button variant="secondary" onClick={() => setDeleting(null)}>Bekor qilish</Button><Button variant="danger" onClick={() => { setCustomers(previous => previous.filter(c => c.id !== deleting.id)); setDeleting(null); setNotice('Mijoz o‘chirildi.'); }}>O‘chirish</Button></div></Modal>
  </section>;
}

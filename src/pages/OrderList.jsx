import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { Card, Button, Badge, Input, Select, Table, Pagination, Modal } from '../components/ui';
import useOrders from '../hooks/useOrders';
import { filterOrders, orderTotal, currency, statusLabels, statusOptions } from '../utils/orders';
import { date } from '../utils/format';
import '../styles/orders.css';

export default function OrderList() {
  const navigate = useNavigate();
  const { orders, updateStatus, warning } = useOrders();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [cancelId, setCancelId] = useState(null);
  const filtered = filterOrders(orders, { query, status, sort });
  const pageSize = 8;
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / pageSize)));
  const columns = [
    { key: 'id', label: 'Order ID', render: id => <strong>#{id}</strong> },
    { key: 'date', label: 'Sana', render: value => date(value) },
    { key: 'customer', label: 'Mijoz', render: customer => <strong>{customer.name}</strong> },
    { key: 'address', label: 'Manzil', render: (_, order) => order.customer.address },
    { key: 'total', label: 'Summa', render: (_, order) => currency(orderTotal(order)) },
    { key: 'status', label: 'Status', render: value => <Badge status={value}>{statusLabels[value]}</Badge> },
    { key: 'actions', label: 'Amallar', render: (_, order) => <div className="order-actions">
      {order.status === 'new' && <Button variant="secondary" onClick={() => updateStatus(order.id, 'preparing')}>Qabul qilish</Button>}
      {['new', 'preparing'].includes(order.status) && <Button variant="danger" onClick={() => setCancelId(order.id)}>Bekor qilish</Button>}
      {['delivered', 'cancelled'].includes(order.status) && <span className="order-muted">Yakunlangan</span>}
    </div> }
  ];
  return <section className="orders-page">
    <div className="page-heading"><div><h1>Order List</h1><p>Buyurtmalarni kuzating va boshqaring.</p></div><span className="issue-tag">{orders.length} ta buyurtma</span></div>
    <div className="order-stats">{statusOptions.map(option => <Card key={option.value}><span className={'order-stat-icon ' + option.value}><ShoppingBag size={22} /></span><div><strong>{orders.filter(order => order.status === option.value).length}</strong><p>{option.label}</p></div></Card>)}</div>
    {warning && <p role="status" className="form-error">{warning}</p>}
    <Card title="Buyurtmalar" description="Demo ma’lumotlar · USD">
      <div className="transaction-filters"><div className="transaction-search"><Search size={18} /><Input aria-label="Buyurtma qidirish" placeholder="ID, mijoz yoki manzil…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></div>
        <Select aria-label="Buyurtma statusi" options={[{ value: 'all', label: 'Barcha statuslar' }, ...statusOptions]} value={status} onChange={event => { setStatus(event.target.value); setPage(1); }} />
        <Select aria-label="Sana bo‘yicha saralash" options={[{ value: 'newest', label: 'Avval yangi' }, { value: 'oldest', label: 'Avval eski' }]} value={sort} onChange={event => { setSort(event.target.value); setPage(1); }} />
      </div>
      <Table caption="Buyurtmalar ro‘yxati" columns={columns} data={filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)} onRowClick={order => navigate('/orders/' + order.id)} />
      <Pagination page={currentPage} pageSize={pageSize} total={filtered.length} onChange={setPage} />
    </Card>
    <Modal open={cancelId !== null} onClose={() => setCancelId(null)} title="Buyurtmani bekor qilish"><p>#{cancelId} buyurtmani bekor qilasizmi?</p><div className="order-actions"><Button variant="secondary" onClick={() => setCancelId(null)}>Orqaga</Button><Button variant="danger" onClick={() => { updateStatus(cancelId, 'cancelled'); setCancelId(null); }}>Bekor qilish</Button></div></Modal>
  </section>;
}

import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, ShoppingBag, Wallet } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Table, Badge, Pagination } from '../components/ui';
import { CustomerAvatar, CustomerHeading, StorageNotice } from '../components/customers/CustomerUI';
import initial from '../data/customers.json';
import { useCustomerData } from '../hooks/useCustomerData';
import { customerSummary } from '../utils/customers';
import { date, money } from '../utils/format';
export default function CustomerDetail() {
  const { id } = useParams();
  const [customers, , storageError] = useCustomerData('customers', initial);
  const [page, setPage] = useState(1);
  const customer = id === 'demo' ? customers[0] : customers.find(item => item.id === id);
  if (!customer) return <section className="customer-page"><CustomerHeading title="Mijoz topilmadi" description="Bu mijoz o‘chirilgan yoki manzil noto‘g‘ri." /><Link className="ui-button secondary" to="/customers">Mijozlar ro‘yxatiga qaytish</Link></section>;
  const summary = customerSummary(customer);
  const history = [...customer.history].sort((a, b) => b.date.localeCompare(a.date));
  const currentPage = Math.min(page, Math.max(1, Math.ceil(history.length / 5)));
  const columns = [{ key: 'id', label: 'Order ID' }, { key: 'date', label: 'Date', render: date }, { key: 'items', label: 'Foods', render: items => items.map(item => `${item.name} × ${item.quantity}`).join(', ') }, { key: 'total', label: 'Total', render: money }, { key: 'status', label: 'Status', render: status => <Badge status={status} /> }];
  return <section className="customer-page"><CustomerHeading title="Customer Detail" description="A closer look at your guest."><Link to="/customers" className="ui-button secondary"><ArrowLeft size={17} />Mijozlar</Link></CustomerHeading><StorageNotice message={storageError} />
    <div className="customer-detail-grid"><div className="customer-detail-side"><Card className="customer-profile"><CustomerAvatar name={customer.name} large /><h2>{customer.name}</h2><p className="customer-muted">Customer since {date(customer.createdAt)}</p><div className="customer-contact"><p><Phone size={17} /><a href={`tel:${customer.phone.replace(/\s/g, '')}`}>{customer.phone}</a></p><p><MapPin size={17} />{customer.address}</p></div><div className="customer-profile-totals"><span><ShoppingBag size={18} />{customer.orders} orders</span><strong>{money(customer.spent)} spent</strong></div></Card><Card className="customer-balance"><Wallet size={26} /><p>Available balance</p><strong>{money(customer.balance)}</strong><small>Customer wallet · USD</small></Card></div>
    <div className="customer-detail-main"><Card title="Most ordered foods" description="Your customer’s favorites"><div className="customer-favorites">{summary.favorites.length ? summary.favorites.map((food, index) => <div key={food.name}><span className="customer-food-rank">0{index + 1}</span><div><h3>{food.name}</h3><p>{food.quantity} ordered</p></div><strong>{money(food.total)}</strong></div>) : <p className="customer-empty">Hali buyurtmalar yo‘q.</p>}</div></Card>
    <Card title="Monthly purchases" description={`Purchases in ${summary.year} · USD`}><div className="customer-chart" role="img" aria-label={`${summary.year} yil uchun oylik xarid grafigi`}><ResponsiveContainer width="100%" height="100%"><AreaChart data={summary.months} margin={{ left: 0, right: 10, top: 15, bottom: 5 }}><defs><linearGradient id="customerSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00b074" stopOpacity={0.3} /><stop offset="100%" stopColor="#00b074" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#f0eef5" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis width={42} tickLine={false} axisLine={false} /><Tooltip formatter={value => money(value)} /><Area dataKey="amount" name="Purchases" type="monotone" stroke="#00b074" strokeWidth={3} fill="url(#customerSpend)" /></AreaChart></ResponsiveContainer></div><details className="customer-chart-data"><summary>Oylik summalarni ko‘rish</summary><ul>{summary.months.map(month => <li key={month.name}>{month.name}: {money(month.amount)}</li>)}</ul></details></Card></div></div>
    <Card title="Order history" description="All orders for this customer"><Table columns={columns} data={history.slice((currentPage - 1) * 5, currentPage * 5)} caption={`${customer.name} buyurtmalari`} /><Pagination page={currentPage} pageSize={5} total={history.length} onChange={setPage} /></Card>
  </section>;
}

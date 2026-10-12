import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard, Search } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, Badge, Input, Select, Table, Pagination } from '../components/ui';
import data from '../data/wallet.json';
import { money, date } from '../utils/format';
const statusOptions = [{
  value: 'all',
  label: 'Barcha statuslar'
}, {
  value: 'completed',
  label: 'Completed'
}, {
  value: 'pending',
  label: 'Pending'
}, {
  value: 'failed',
  label: 'Failed'
}];
export default function Wallet() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const filtered = data.transactions.filter(row => (status === 'all' || row.status === status) && (type === 'all' || row.type === type) && (row.id + ' ' + row.name + ' ' + row.date).toLowerCase().includes(query.toLowerCase()));
  const pageSize = 6;
  const totalIncome = data.flow.reduce((total, row) => total + row.income, 0);
  const totalExpense = data.flow.reduce((total, row) => total + row.expense, 0);
  const columns = [{
    key: 'id',
    label: 'Transaction ID',
    render: value => <strong>{value}</strong>
  }, {
    key: 'name',
    label: 'Description'
  }, {
    key: 'date',
    label: 'Date',
    render: value => date(value)
  }, {
    key: 'amount',
    label: 'Amount',
    render: (value, row) => <strong className={row.type === 'income' ? 'amount-income' : 'amount-expense'}>{row.type === 'income' ? '+' : '−'}{money(value)}</strong>
  }, {
    key: 'status',
    label: 'Status',
    render: value => <Badge status={value} />
  }];
  return <section><div className="page-heading"><div><h1>Wallet</h1><p>Your balance and transactions, at a glance.</p></div><span className="issue-tag">USD</span></div><div className="wallet-upper"><div className="wallet-summary"><section className="balance-card"><div className="balance-top"><span>Current Balance</span><CreditCard size={30} /></div><strong>{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data.balance)}</strong><div className="card-number">{data.cardNumber}</div><div className="balance-bottom"><div><small>CARD HOLDER</small><p>{data.cardHolder}</p></div><div><small>VALID THRU</small><p>{data.expiry}</p></div></div></section><div className="wallet-totals"><Card><span className="mini-icon income"><ArrowDownLeft size={21} /></span><p>Total Income</p><strong>{money(totalIncome)}</strong><small>This week</small></Card><Card><span className="mini-icon expense"><ArrowUpRight size={21} /></span><p>Total Expense</p><strong>{money(totalExpense)}</strong><small>This week</small></Card></div></div><Card title="Wallet Activity" description="Income and expenses · this week"><div className="chart-box wallet-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.flow}><defs><linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00b074" stopOpacity={0.22} /><stop offset="100%" stopColor="#00b074" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#f0eef5" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis width={45} tickLine={false} axisLine={false} /><Tooltip formatter={value => money(value)} /><Legend /><Area type="monotone" dataKey="income" name="Income" stroke="#00b074" strokeWidth={3} fill="url(#incomeGradient)" /><Area type="monotone" dataKey="expense" name="Expense" stroke="#ff5b5b" strokeWidth={3} fill="transparent" /></AreaChart></ResponsiveContainer></div></Card></div><Card title="Transaction History" description="Recent payments and expenses"><div className="transaction-filters"><div className="transaction-search"><Search size={18} /><Input aria-label="Tranzaksiya qidirish" placeholder="Search transactions…" value={query} onChange={event => {
            setQuery(event.target.value);
            setPage(1);
          }} /></div><Select aria-label="Tranzaksiya turi" options={[{
          value: 'all',
          label: 'Kirim va chiqim'
        }, {
          value: 'income',
          label: 'Kirim'
        }, {
          value: 'expense',
          label: 'Chiqim'
        }]} value={type} onChange={event => {
          setType(event.target.value);
          setPage(1);
        }} /><Select aria-label="Status filtri" options={statusOptions} value={status} onChange={event => {
          setStatus(event.target.value);
          setPage(1);
        }} /></div><Table caption="Wallet tranzaksiyalari" columns={columns} data={filtered.slice((page - 1) * pageSize, page * pageSize)} /><Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} /></Card></section>;
}

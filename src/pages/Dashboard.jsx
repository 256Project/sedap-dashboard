import { useState } from 'react';
import { ClipboardList, Truck, XCircle, DollarSign, ArrowUpRight, ArrowDownRight, CalendarDays } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, Tabs } from '../components/ui';
import data from '../data/dashboard.json';
import { money, number } from '../utils/format';
const options = [{
  value: 'day',
  label: 'Kun'
}, {
  value: 'week',
  label: 'Hafta'
}, {
  value: 'month',
  label: 'Oy'
}];
const stats = [['orders', 'Total Orders', ClipboardList], ['delivered', 'Total Delivered', Truck], ['cancelled', 'Total Cancelled', XCircle], ['revenue', 'Total Revenue', DollarSign]];
export default function Dashboard() {
  const [period, setPeriod] = useState('week');
  const current = data.periods[period];
  return <section><div className="page-heading"><div><h1>Dashboard</h1><p>Hi, Akbar. Welcome back to Sedap Admin!</p></div><div className="period-control"><CalendarDays size={19} /><Tabs options={options} value={period} onChange={setPeriod} label="Statistika davri" /></div></div><div className="stats-grid">{stats.map(([key, label, Icon]) => <Card key={key} className="stat-card"><div className={'stat-icon ' + key}><Icon size={33} /></div><div><strong className="stat-value">{key === 'revenue' ? money(current.stats[key]) : number(current.stats[key])}</strong><p>{label}</p><small className={current.changes[key] >= 0 ? 'trend-up' : 'trend-down'}>{current.changes[key] >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(current.changes[key])}% <span>vs previous period</span></small></div></Card>)}</div><div className="dashboard-upper"><Card title="Pie Chart" description="Performance overview"><div className="donut-grid">{current.pies.map(item => <div className="donut-item" key={item.name}><div className="donut-chart" role="img" aria-label={item.name + ': ' + item.value + '%'}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{
                    value: item.value
                  }, {
                    value: 100 - item.value
                  }]} dataKey="value" innerRadius="72%" outerRadius="96%" startAngle={90} endAngle={-270} stroke="none"><Cell fill={item.color} /><Cell fill={item.color + '22'} /></Pie></PieChart></ResponsiveContainer><strong>{item.value}%</strong></div><p>{item.name}</p></div>)}</div></Card><Card title="Chart Order" description="Orders during the selected period"><div className="chart-box"><ResponsiveContainer width="100%" height="100%"><AreaChart data={current.orders}><defs><linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2d9cdb" stopOpacity={0.25} /><stop offset="100%" stopColor="#2d9cdb" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#f0eef5" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis width={42} tickLine={false} axisLine={false} /><Tooltip /><Area type="monotone" dataKey="orders" name="Orders" stroke="#2d9cdb" strokeWidth={3} fill="url(#orderGradient)" /></AreaChart></ResponsiveContainer></div></Card></div><div className="dashboard-lower"><Card title="Total Revenue" description="Monthly revenue · two-year comparison"><div className="chart-box chart-tall"><ResponsiveContainer width="100%" height="100%"><LineChart data={current.revenue}><CartesianGrid vertical={false} stroke="#f0eef5" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis width={46} tickFormatter={value => value >= 1000 ? value / 1000 + 'k' : value} tickLine={false} axisLine={false} /><Tooltip formatter={value => money(value)} /><Legend /><Line type="monotone" dataKey="previous" name={String(data.previousYear)} stroke="#2d9cdb" strokeWidth={3} dot={false} /><Line type="monotone" dataKey="current" name={String(data.currentYear)} stroke="#ff5b5b" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div></Card><Card title="Customer Map" description="Customers by weekday"><div className="chart-box chart-tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={current.customers}><CartesianGrid vertical={false} stroke="#f0eef5" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis width={35} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="customers" name="Customers" fill="#ff5b5b" radius={[5, 5, 0, 0]} maxBarSize={23} /></BarChart></ResponsiveContainer></div></Card></div></section>;
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Users, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Input, Table, Tabs } from '../components/ui';
import { FoodHeading, FoodImage, FoodNotice } from '../components/foods/FoodUI';
import useFoods from '../hooks/useFoods';
import useOrders from '../hooks/useOrders';
import { useCustomerData } from '../hooks/useCustomerData';
import customersSeed from '../data/customers.json';
import { analyticsReport } from '../utils/analytics';
import { tashkentDay } from '../utils/foods';
import { currency } from '../utils/orders';

function AnalyticsChart({ title, description, series, field, color, kind = 'area' }) {
  const Chart = kind === 'bar' ? BarChart : kind === 'line' ? LineChart : AreaChart;
  return <Card title={title} description={description}><div className="food-analytics-chart" role="img" aria-label={title}><ResponsiveContainer width="100%" height="100%"><Chart data={series} margin={{ left: 0, right: 12, top: 10, bottom: 4 }}><CartesianGrid vertical={false} stroke="#eeedf2" /><XAxis dataKey="name" tickLine={false} axisLine={false} minTickGap={18} /><YAxis width={48} tickLine={false} axisLine={false} allowDecimals={field === 'revenue'} /><Tooltip formatter={value => field === 'revenue' ? currency(value) : value} />{kind === 'bar' ? <Bar dataKey={field} name={title} fill={color} radius={[5, 5, 0, 0]} /> : kind === 'line' ? <Line type="monotone" dataKey={field} name={title} stroke={color} strokeWidth={3} dot={false} /> : <Area type="monotone" dataKey={field} name={title} stroke={color} strokeWidth={3} fill={color} fillOpacity={.12} />}</Chart></ResponsiveContainer></div></Card>;
}
export default function Analytics() {
  const { foods, warning: foodWarning } = useFoods();
  const { orders, warning: orderWarning } = useOrders();
  const [customers, , customerWarning] = useCustomerData('customers', customersSeed);
  const [period, setPeriod] = useState('week');
  const [reference, setReference] = useState(() => tashkentDay(new Date().toISOString()));
  const report = analyticsReport(orders, customers, foods, period, reference);
  const stats = report ? [[DollarSign, 'Revenue', currency(report.revenue)], [ShoppingBag, 'Orders', report.orderCount], [CheckCircle2, 'Delivered', report.delivered], [Users, 'New customers', report.newCustomers]] : [];
  return <section className="foods-page"><FoodHeading title="Analytics" description="Your restaurant, by the numbers." /><FoodNotice message={foodWarning || orderWarning || customerWarning} /><Card className="foods-toolbar analytics-toolbar"><Tabs label="Analitika davri" value={period} onChange={setPeriod} options={[{ value: 'day', label: 'Kun' }, { value: 'week', label: 'Hafta' }, { value: 'month', label: 'Oy' }]} /><Input label="Hisobot sanasi" type="date" value={reference} onChange={event => setReference(event.target.value)} /><p>{report ? `${report.start} — ${report.end}` : 'To‘g‘ri sana tanlang'}<small>Toshkent vaqti · USD</small></p></Card>
    {report ? <><div className="food-analytics-stats">{stats.map(([Icon, label, value]) => <Card key={label}><span className="food-stat-icon"><Icon size={25} /></span><div><strong>{value}</strong><p>{label}</p></div></Card>)}</div><div className="food-analytics-main"><AnalyticsChart title="Revenue" description="Yetkazilgan buyurtmalar summasi, yetkazish haqi bilan" series={report.series} field="revenue" color="#00b074" /><Card title="Best selling foods" description="Yetkazilgan buyurtmalardagi porsiyalar soni"><div className="food-bestsellers">{report.bestSellers.map((food, index) => <div key={food.id}><span className="food-rank">{index + 1}</span><FoodImage src={food.image} name={food.name} /><div>{food.foodId ? <Link to={'/foods/' + food.foodId}>{food.name}</Link> : <strong>{food.name}</strong>}<p>{food.quantity} ta · {currency(food.revenue)}</p></div></div>)}</div>{!report.bestSellers.length && <p className="food-empty">Bu davrda yetkazilgan buyurtmalar yo‘q.</p>}</Card></div><div className="food-analytics-bottom"><AnalyticsChart title="Orders" description="Barcha holatlardagi buyurtmalar" series={report.series} field="orders" color="#2d9cdb" kind="bar" /><AnalyticsChart title="Customer growth" description="Davr oxiriga qadar ro‘yxatdan o‘tgan jami mijozlar" series={report.series} field="customers" color="#ff9f43" kind="line" /></div><Card title="Report data" description="Grafiklarning aniq qiymatlari"><Table caption="Analitika ma’lumotlari" columns={[{ key: 'name', label: period === 'day' ? 'Soat' : 'Sana' }, { key: 'revenue', label: 'Revenue', render: currency }, { key: 'orders', label: 'Orders' }, { key: 'newCustomers', label: 'New customers' }, { key: 'customers', label: 'Total customers' }]} data={report.series} rowKey="key" /></Card></> : <Card><p className="food-empty">Hisobot uchun to‘g‘ri sana tanlang.</p></Card>}
  </section>;
}

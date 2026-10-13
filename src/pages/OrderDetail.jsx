import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, UserRound, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge, Table, Modal } from '../components/ui';
import useOrders from '../hooks/useOrders';
import { orderTotal, currency, statusLabels } from '../utils/orders';
import { date } from '../utils/format';
import '../styles/orders.css';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders, updateStatus, warning } = useOrders();
  const order = id === 'demo' ? orders[0] : orders.find(row => row.id === id);
  const [cancelOpen, setCancelOpen] = useState(false);
  if (!order) return <Card title="Buyurtma topilmadi"><p>Bu ID bilan buyurtma mavjud emas.</p><Link className="order-back" to="/orders"><ArrowLeft size={18} /> Buyurtmalarga qaytish</Link></Card>;
  const { customer } = order;
  const bbox = [customer.lng - .015, customer.lat - .01, customer.lng + .015, customer.lat + .01].join(',');
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${customer.lat},${customer.lng}`;
  return <section className="orders-page">
    <Link className="order-back" to="/orders"><ArrowLeft size={18} /> Buyurtmalar</Link>
    <div className="page-heading"><div><h1>Order Detail #{order.id}</h1><p>{date(order.date)}</p></div><Badge status={order.status}>{statusLabels[order.status]}</Badge></div>
    {warning && <p role="status" className="form-error">{warning}</p>}
    <div className="order-detail-grid"><div className="order-stack">
      <Card title="Mijoz"><div className="order-customer"><span className="avatar"><UserRound size={26} /></span><div><h3>{customer.name}</h3><p>Mijoz ma’lumotlari</p></div></div><p className="order-contact"><Phone size={17} /><a href={'tel:' + customer.phone.replace(/\s/g, '')}>{customer.phone}</a></p><p className="order-contact"><MapPin size={17} />{customer.address}</p></Card>
      <Card title="Holat tarixi"><ol className="order-timeline">{order.history.map((item, index) => <li key={index}><CheckCircle2 size={20} /><div><strong>{statusLabels[item.status]}</strong><time dateTime={item.at}>{new Date(item.at).toLocaleString('uz-UZ')}</time></div></li>)}</ol></Card>
    </div><div className="order-stack">
      <Card title="Buyurtma tarkibi"><Table caption="Buyurtmadagi taomlar" columns={[{ key: 'name', label: 'Taom' }, { key: 'quantity', label: 'Soni' }, { key: 'price', label: 'Narxi', render: currency }, { key: 'total', label: 'Jami', render: (_, item) => currency(item.price * item.quantity) }]} data={order.items} /><div className="order-totals"><p><span>Yetkazish</span><span>{currency(order.deliveryFee)}</span></p><p><strong>Jami</strong><strong>{currency(orderTotal(order))}</strong></p></div><div className="order-actions">{order.status === 'new' && <Button onClick={() => updateStatus(order.id, 'preparing')}>Qabul qilish</Button>}{order.status === 'preparing' && <Button onClick={() => updateStatus(order.id, 'delivered')}>Yetkazildi deb belgilash</Button>}{['new', 'preparing'].includes(order.status) && <Button variant="danger" onClick={() => setCancelOpen(true)}>Bekor qilish</Button>}</div></Card>
      <Card title="Yetkazish manzili" description={customer.address}><iframe className="order-map" title={'Yetkazish manzili: ' + customer.address} src={mapUrl} loading="lazy" referrerPolicy="no-referrer" /><a className="order-back" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${customer.lat}&mlon=${customer.lng}#map=16/${customer.lat}/${customer.lng}`}>Xaritani ochish <MapPin size={16} /></a></Card>
    </div></div>
    <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Buyurtmani bekor qilish"><p>#{order.id} buyurtmani bekor qilasizmi?</p><div className="order-actions"><Button variant="secondary" onClick={() => setCancelOpen(false)}>Orqaga</Button><Button variant="danger" onClick={() => { updateStatus(order.id, 'cancelled'); setCancelOpen(false); }}>Bekor qilish</Button></div></Modal>
  </section>;
}

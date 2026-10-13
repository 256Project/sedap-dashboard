import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, ShoppingBag, DollarSign } from 'lucide-react';
import { Card, Button, Modal, Input } from '../components/ui';
import { FoodHeading, FoodImage, FoodNotice, FoodRating } from '../components/foods/FoodUI';
import { CustomerAvatar, Stars } from '../components/customers/CustomerUI';
import useFoods from '../hooks/useFoods';
import useOrders from '../hooks/useOrders';
import { useCustomerData } from '../hooks/useCustomerData';
import reviewsSeed from '../data/reviews.json';
import { foodRating, foodReviews, foodSales, tashkentDay } from '../utils/foods';
import { currency } from '../utils/orders';
import { date } from '../utils/format';
export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { foods, saveFoods, warning } = useFoods();
  const { orders, warning: orderWarning } = useOrders();
  const [reviews, , reviewWarning] = useCustomerData('reviews', reviewsSeed);
  const [deleting, setDeleting] = useState(false);
  const [month, setMonth] = useState(() => tashkentDay(new Date().toISOString()).slice(0, 7));
  const food = id === 'demo' ? foods[0] : foods.find(food => food.id === id);
  if (!food) return <section className="foods-page"><FoodHeading title="Taom topilmadi" description="Bu taom o‘chirilgan yoki manzil noto‘g‘ri." /><Link to="/foods" className="ui-button secondary">Menyuga qaytish</Link></section>;
  const entries = foodReviews(food, reviews).sort((a, b) => b.date.localeCompare(a.date));
  const sales = foodSales(food, orders, month + '-01');
  function remove() {
    if (saveFoods(previous => previous.filter(item => item.id !== food.id))) navigate('/foods', { state: { notice: 'Taom menyudan o‘chirildi.' } });
    else setDeleting(false);
  }
  return <section className="foods-page"><FoodHeading title="Food Detail" description="Every ingredient. Every detail."><Link to="/foods" className="ui-button secondary"><ArrowLeft size={17} />Menyu</Link></FoodHeading><FoodNotice message={warning || orderWarning || reviewWarning} />{location.state?.notice && <p role="status" className="food-success">{location.state.notice}</p>}
    <div className="food-detail-grid"><Card className="food-detail-image-card"><FoodImage src={food.image} name={food.name} /></Card><Card className="food-detail-copy"><span className="food-category">{food.category}</span><h2>{food.name}</h2><FoodRating {...foodRating(food, reviews)} /><strong className="food-detail-price">{currency(food.price)}</strong><p>{food.description}</p><h3>Tarkibi</h3><ul className="food-ingredients">{food.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul><div className="food-editor-actions"><Link className="ui-button primary" to={'/foods/' + food.id + '/edit'}><Pencil size={17} />Tahrirlash</Link><Button variant="danger" onClick={() => setDeleting(true)}><Trash2 size={17} />O‘chirish</Button></div></Card></div>
    <Card title="Sales performance" description="Faqat yetkazilgan buyurtmalar; taom daromadiga yetkazish haqi kirmaydi." action={<Input label="Hisobot oyi" type="month" value={month} onChange={event => { if (event.target.value) setMonth(event.target.value); }} />}><div className="food-sales-stats"><div><span className="food-stat-icon"><ShoppingBag size={24} /></span><div><strong>{sales.quantity}</strong><p>Sotilgan porsiyalar</p></div></div><div><span className="food-stat-icon blue"><DollarSign size={24} /></span><div><strong>{currency(sales.revenue)}</strong><p>Taomdan tushgan daromad</p></div></div></div></Card>
    <Card title="Customer reviews" description={`${entries.length} ta sharh`}><div className="food-detail-reviews">{entries.map(review => <article key={review.id}><div className="food-review-heading"><div className="customer-person"><CustomerAvatar name={review.customer} /><div><strong>{review.customer}</strong><small>{date(review.date)}</small></div></div><Stars rating={review.rating} /></div><p>{review.text}</p>{review.reply && <div className="food-review-reply"><strong>Sedap javobi</strong><p>{review.reply.text}</p></div>}</article>)}</div>{!entries.length && <p className="food-empty">Bu taomga hali sharh yozilmagan.</p>}</Card>
    <Modal open={deleting} onClose={() => setDeleting(false)} title="Taomni o‘chirish"><p><strong>{food.name}</strong> taomini menyudan o‘chirasizmi? Oldingi buyurtmalar va sharhlar tarixda saqlanadi.</p><div className="food-editor-actions"><Button variant="secondary" onClick={() => setDeleting(false)}>Bekor qilish</Button><Button variant="danger" onClick={remove}>O‘chirishni tasdiqlash</Button></div></Modal>
  </section>;
}

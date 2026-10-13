import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Card, Input, Select, Tabs, Pagination } from '../components/ui';
import { FoodHeading, FoodImage, FoodNotice, FoodRating } from '../components/foods/FoodUI';
import useFoods from '../hooks/useFoods';
import { useCustomerData } from '../hooks/useCustomerData';
import reviewsSeed from '../data/reviews.json';
import { categories, selectFoods, foodRating } from '../utils/foods';
import { currency } from '../utils/orders';
export default function Foods() {
  const { foods, warning } = useFoods();
  const [reviews] = useCustomerData('reviews', reviewsSeed);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const location = useLocation();
  const filtered = selectFoods(foods, query, category);
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 6)));
  return <section className="foods-page"><FoodHeading title="Foods" description="A menu worth coming back for."><Link to="/foods/new" className="ui-button primary"><Plus size={18} />Taom qo‘shish</Link></FoodHeading><FoodNotice message={warning} />{location.state?.notice && <p role="status" className="food-success">{location.state.notice}</p>}
    <Card className="foods-toolbar"><Input aria-label="Taom qidirish" placeholder="Taom nomi yoki tavsifi…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /><Select aria-label="Taom kategoriyasi" value={category} onChange={event => { setCategory(event.target.value); setPage(1); }} options={[{ value: 'all', label: 'Barcha kategoriyalar' }, ...categories.map(value => ({ value, label: value }))]} /><Tabs label="Taomlar ko‘rinishi" value={view} onChange={setView} options={[{ value: 'grid', label: <><LayoutGrid size={16} /><span>Setka</span></> }, { value: 'list', label: <><List size={16} /><span>Ro‘yxat</span></> }]} /></Card>
    <div className={'foods-collection ' + view}>{filtered.slice((currentPage - 1) * 6, currentPage * 6).map(food => <Link to={'/foods/' + food.id} className="food-menu-card" key={food.id}><FoodImage src={food.image} name={food.name} /><div className="food-card-copy"><span className="food-category">{food.category}</span><h2>{food.name}</h2><p>{food.description}</p><div className="food-card-bottom"><strong>{currency(food.price)}</strong><FoodRating {...foodRating(food, reviews)} /></div></div></Link>)}</div>
    {!filtered.length && <Card><div className="food-empty"><h2>Taom topilmadi</h2><p>Qidiruv yoki kategoriya filtrini o‘zgartiring, yoki yangi taom qo‘shing.</p></div></Card>}<Pagination page={currentPage} pageSize={6} total={filtered.length} onChange={setPage} />
  </section>;
}

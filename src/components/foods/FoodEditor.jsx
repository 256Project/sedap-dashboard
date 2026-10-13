import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Card, Button, Input, Select, Modal } from '../ui';
import { FoodHeading, FoodImage, FoodNotice } from './FoodUI';
import useFoods from '../../hooks/useFoods';
import { categories, foodRecord, validateFood } from '../../utils/foods';

async function readImage(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('JPG, PNG yoki WebP rasm tanlang.');
  if (file.size > 3 * 1024 * 1024) throw new Error('Rasm 3 MB dan oshmasin.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('Rasmni ochib bo‘lmadi.')); image.src = url; });
    if (image.naturalWidth * image.naturalHeight > 25000000) throw new Error('Rasm o‘lchami juda katta. Kichikroq rasm tanlang.');
    const ratio = Math.min(1, 900 / image.naturalWidth, 650 / image.naturalHeight);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio)); canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext('2d'); context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', .8);
  } finally { URL.revokeObjectURL(url); }
}
export default function FoodEditor({ editing = false }) {
  const { id } = useParams();
  const { foods, saveFoods, warning } = useFoods();
  const existing = editing ? foods.find(food => food.id === id) : null;
  const navigate = useNavigate();
  const [form, setForm] = useState(() => ({ name: existing?.name || '', category: existing?.category || '', price: existing ? String(existing.price) : '', description: existing?.description || '', ingredients: existing?.ingredients.join(', ') || '', image: existing?.image || '' }));
  const [errors, setErrors] = useState({});
  const [confirming, setConfirming] = useState(false);
  const [uploading, setUploading] = useState(false);
  const uploadVersion = useRef(0);
  if (editing && !existing) return <section className="foods-page"><FoodHeading title="Taom topilmadi" description="Bu taom o‘chirilgan yoki manzil noto‘g‘ri." /><Link to="/foods" className="ui-button secondary">Menyuga qaytish</Link></section>;
  const change = (field, value) => setForm(previous => ({ ...previous, [field]: value }));
  async function upload(event) {
    const file = event.target.files?.[0]; if (!file) return;
    const version = ++uploadVersion.current;
    setUploading(true); setErrors(previous => ({ ...previous, image: '' }));
    try { const image = await readImage(file); if (version === uploadVersion.current) change('image', image); }
    catch (error) { if (version === uploadVersion.current) setErrors(previous => ({ ...previous, image: error.message })); }
    finally { if (version === uploadVersion.current) setUploading(false); event.target.value = ''; }
  }
  function save() {
    const record = foodRecord(form, existing);
    if (saveFoods(previous => editing ? previous.map(food => food.id === id ? record : food) : [...previous, record])) navigate('/foods/' + record.id, { state: { notice: editing ? 'Taom tahrirlandi.' : 'Taom qo‘shildi.' } });
    else setConfirming(false);
  }
  function submit(event) {
    event.preventDefault(); if (uploading) return;
    const next = validateFood(form, foods, existing?.id); setErrors(next);
    if (Object.keys(next).length) return;
    if (editing) setConfirming(true); else save();
  }
  return <section className="foods-page"><FoodHeading title={editing ? 'Taomni tahrirlash' : 'Taom qo‘shish'} description="Make something your guests will love."><Link to={existing ? '/foods/' + id : '/foods'} className="ui-button secondary"><ArrowLeft size={17} />Orqaga</Link></FoodHeading><FoodNotice message={warning} /><form className="food-editor-grid" onSubmit={submit} noValidate>
    <Card title="Taom haqida"><div className="food-form-fields"><Input label="Taom nomi" required maxLength={80} value={form.name} error={errors.name} onChange={event => change('name', event.target.value)} /><div className="food-form-pair"><Select label="Kategoriya" required value={form.category} onChange={event => change('category', event.target.value)} aria-describedby={errors.category ? 'food-category-error' : undefined} options={[{ value: '', label: 'Kategoriya tanlang' }, ...categories.map(value => ({ value, label: value }))]} /><Input label="Narx (USD)" type="number" min="0.01" max="10000" step="0.01" required value={form.price} error={errors.price} onChange={event => change('price', event.target.value)} /></div>{errors.category && <p className="field-error" id="food-category-error">{errors.category}</p>}
    <div className="food-text-field"><label htmlFor="food-description">Tavsif</label><textarea id="food-description" rows={4} maxLength={1000} value={form.description} onChange={event => change('description', event.target.value)} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'food-description-error' : undefined} />{errors.description && <p className="field-error" id="food-description-error">{errors.description}</p>}</div><Input label="Tarkibi (vergul bilan ajrating)" required maxLength={500} value={form.ingredients} error={errors.ingredients} onChange={event => change('ingredients', event.target.value)} /><div className="food-editor-actions"><Link to={existing ? '/foods/' + id : '/foods'} className="ui-button secondary">Bekor qilish</Link><Button type="submit" disabled={uploading}>{uploading ? 'Rasm tayyorlanmoqda…' : 'Saqlash'}</Button></div></div></Card>
    <Card title="Taom rasmi" description="JPG, PNG yoki WebP · 3 MB gacha"><FoodImage key={form.image} src={form.image} name={form.name || 'Taom rasmi'} className="food-upload-preview" /><label className="food-upload-label" htmlFor="food-image-upload"><Upload size={20} />Rasm yuklash</label><input id="food-image-upload" aria-label="Taom rasmini yuklash" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} aria-invalid={!!errors.image} aria-describedby={errors.image ? 'food-image-error' : undefined} />{errors.image && <p className="field-error" id="food-image-error" role="alert">{errors.image}</p>}<p className="food-muted">Rasm menyu va taom tafsilotida ko‘rsatiladi.</p></Card>
    </form><Modal open={confirming} onClose={() => setConfirming(false)} title="O‘zgarishlarni saqlash"><p><strong>{form.name}</strong> taomidagi o‘zgarishlarni saqlaysizmi?</p><div className="food-editor-actions"><Button variant="secondary" onClick={() => setConfirming(false)}>Bekor qilish</Button><Button onClick={save}>Tasdiqlash</Button></div></Modal>
  </section>;
}

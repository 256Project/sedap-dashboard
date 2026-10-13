export const categories = ['Burger', 'Pizza', 'Salad', 'Main course', 'Dessert', 'Drink'];
export const normalizedName = name => String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
export function matchesFood(name, food) {
  return [food.name, ...(food.aliases || [])].some(alias => normalizedName(alias) === normalizedName(name));
}
export function selectFoods(foods, query = '', category = 'all') {
  return foods.filter(food => (category === 'all' || food.category === category) && `${food.name} ${food.description}`.toLowerCase().includes(query.trim().toLowerCase()));
}
export function foodReviews(food, reviews) { return reviews.filter(review => matchesFood(review.food, food)); }
export function foodRating(food, reviews) {
  const entries = foodReviews(food, reviews);
  return { count: entries.length, average: entries.length ? entries.reduce((sum, review) => sum + review.rating, 0) / entries.length : 0 };
}
export function validateFood(values, foods, id) {
  const errors = {};
  const name = values.name.trim();
  if (name.length < 2 || name.length > 80) errors.name = 'Nom 2–80 belgidan iborat bo‘lsin.';
  else if (foods.some(food => food.id !== id && matchesFood(name, food))) errors.name = 'Bu nomdagi taom mavjud.';
  if (!categories.includes(values.category)) errors.category = 'Kategoriya tanlang.';
  const price = Number(values.price);
  if (!String(values.price).trim() || !Number.isFinite(price) || price < .01 || price > 10000 || Math.abs(price * 100 - Math.round(price * 100)) > 1e-7) errors.price = 'Narx 0.01–10 000 USD, ko‘pi bilan 2 kasr xonali bo‘lsin.';
  if (values.description.trim().length < 10) errors.description = 'Tavsif kamida 10 belgidan iborat bo‘lsin.';
  if (!values.ingredients.split(',').some(item => item.trim())) errors.ingredients = 'Taom tarkibini kiriting.';
  if (!values.image) errors.image = 'Taom rasmini yuklang.';
  return errors;
}
export function foodRecord(values, previous = null) {
  return { id: previous?.id || crypto.randomUUID(), name: values.name.trim(), category: values.category, price: Math.round(Number(values.price) * 100) / 100, description: values.description.trim(), ingredients: values.ingredients.split(',').map(item => item.trim()).filter(Boolean), image: values.image, aliases: [...new Set([...(previous?.aliases || []), ...(previous && normalizedName(previous.name) !== normalizedName(values.name) ? [previous.name] : [])])] };
}
export const tashkentDay = value => {
  // Date-only values represent a local calendar day; timestamps use UTC+05:00.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Date(Date.parse(value) + 5 * 60 * 60 * 1000).toISOString().slice(0, 10);
};
export function foodSales(food, orders, reference) {
  let quantity = 0, revenue = 0;
  for (const order of orders) {
    if (order.status !== 'delivered' || tashkentDay(order.date).slice(0, 7) !== reference.slice(0, 7)) continue;
    for (const item of order.items) if (matchesFood(item.name, food)) { quantity += item.quantity; revenue += item.quantity * item.price; }
  }
  return { quantity, revenue };
}

export function selectCustomers(customers, query = '', sort = 'name') {
  const search = query.trim().toLowerCase();
  return customers.filter(c => `${c.name} ${c.phone} ${c.address}`.toLowerCase().includes(search)).sort((a, b) => {
    if (sort === 'orders' || sort === 'spent') return b[sort] - a[sort] || a.name.localeCompare(b.name);
    if (sort === 'newest') return b.createdAt.localeCompare(a.createdAt);
    return a.name.localeCompare(b.name);
  });
}
export function validateCustomer(values, customers) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Ism kamida 2 belgidan iborat bo‘lsin.';
  const phone = values.phone.replace(/\D/g, '');
  if (!/^\+?[\d\s()-]+$/.test(values.phone.trim()) || phone.length < 9 || phone.length > 15) errors.phone = 'To‘g‘ri telefon raqamini kiriting.';
  else if (customers.some(c => c.phone.replace(/\D/g, '') === phone)) errors.phone = 'Bu telefon raqamli mijoz mavjud.';
  if (values.address.trim().length < 5) errors.address = 'To‘liq manzilni kiriting.';
  return errors;
}
export function customerSummary(customer) {
  const history = customer.history || [];
  const foods = new Map();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(name => ({ name, amount: 0 }));
  const year = history.length ? Math.max(...history.map(order => Number(order.date.slice(0, 4)))) : new Date().getFullYear();
  for (const order of history) {
    if (order.status === 'cancelled') continue;
    if (Number(order.date.slice(0, 4)) === year) months[Number(order.date.slice(5, 7)) - 1].amount += order.total;
    for (const item of order.items) {
      const food = foods.get(item.name) || { name: item.name, quantity: 0, total: 0 };
      food.quantity += item.quantity; food.total += item.quantity * item.price;
      foods.set(item.name, food);
    }
  }
  return { year, months, favorites: [...foods.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 3) };
}
export function selectReviews(reviews, query, rating) {
  return reviews.filter(r => (rating === 'all' || r.rating === Number(rating)) && `${r.customer} ${r.food} ${r.text}`.toLowerCase().includes(query.trim().toLowerCase()));
}

import { useRef, useState } from 'react';
import initial from '../data/foods.json';
import { categories } from '../utils/foods';
const key = 'sedap-salah-v1-foods';
const valid = food => food && typeof food.id === 'string' && typeof food.name === 'string' && categories.includes(food.category) && Number.isFinite(food.price) && food.price > 0 && typeof food.description === 'string' && Array.isArray(food.ingredients) && food.ingredients.every(item => typeof item === 'string') && typeof food.image === 'string' && Array.isArray(food.aliases) && food.aliases.every(item => typeof item === 'string');
function load() {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { foods: initial, warning: '' };
    const saved = JSON.parse(raw);
    if (Array.isArray(saved) && saved.every(valid)) return { foods: saved, warning: '' };
    return { foods: initial, warning: 'Saqlangan menyu noto‘g‘ri. Demo menyu ko‘rsatildi.' };
  } catch { return { foods: initial, warning: 'Saqlangan menyuni o‘qib bo‘lmadi. Demo menyu ko‘rsatildi.' }; }
}
export default function useFoods() {
  const [state, setState] = useState(load);
  const current = useRef(state.foods);
  function saveFoods(update) {
    const next = typeof update === 'function' ? update(current.current) : update;
    try {
      localStorage.setItem(key, JSON.stringify(next));
      current.current = next;
      setState({ foods: next, warning: '' });
      return true;
    } catch {
      setState(previous => ({ ...previous, warning: 'Menyu saqlanmadi. Brauzer xotirasini tekshiring yoki kichikroq rasm yuklang.' }));
      return false;
    }
  }
  return { foods: state.foods, saveFoods, warning: state.warning };
}

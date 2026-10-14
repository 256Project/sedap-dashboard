import { useRef, useState } from 'react';

export default function useStoredData(key, initial, validate) {
  const [warning, setWarning] = useState('');
  const [data, setData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return Array.isArray(saved) && saved.every(validate) ? saved : initial;
    } catch { return initial; }
  });
  const current = useRef(data);
  function update(next) {
    const value = typeof next === 'function' ? next(current.current) : next;
    current.current = value;
    try { localStorage.setItem(key, JSON.stringify(value)); setWarning(''); }
    catch { setWarning('Brauzerda saqlash imkoni bo‘lmadi. O‘zgarish faqat shu sahifada saqlanadi.'); }
    setData(value);
  }
  return [data, update, warning];
}

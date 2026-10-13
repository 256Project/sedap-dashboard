import { useCallback, useRef, useState } from 'react';
export function useCustomerData(key, initial) {
  const storageKey = `sedap-amirbek-v1-${key}`;
  const [data, setData] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(storageKey)); return Array.isArray(saved) ? saved : initial; }
    catch { return initial; }
  });
  const current = useRef(data);
  const [storageError, setStorageError] = useState('');
  const updateData = useCallback(update => {
    const next = typeof update === 'function' ? update(current.current) : update;
    current.current = next;
    // Write before rendering so an immediate reload cannot lose the change.
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setStorageError(''); }
    catch { setStorageError('Brauzerda saqlash imkoni bo‘lmadi. O‘zgarishlar faqat shu sahifada saqlanadi.'); }
    setData(next);
  }, [storageKey]);
  return [data, updateData, storageError];
}

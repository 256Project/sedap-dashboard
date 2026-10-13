import { migrateCustomers } from '../utils/customerOrders';
import { useCallback, useRef, useState } from 'react';
export function useCustomerData(key, initial) {
  const storageKey = key === 'customers' ? 'sedap-amirbek-v2-customers' : `sedap-amirbek-v1-${key}`;
  const [data, setData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (Array.isArray(saved)) return saved;
      if (key === 'customers') {
        const legacy = JSON.parse(localStorage.getItem('sedap-amirbek-v1-customers'));
        if (Array.isArray(legacy)) return migrateCustomers(legacy, initial);
      }
      return initial;
    }
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

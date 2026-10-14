import { useCallback, useRef, useState } from 'react';
import { customerStorageKey, loadCustomerCollection } from '../utils/customerStorage';
export function useCustomerData(key, initial) {
  const storageKey = customerStorageKey(key);
  const [state, setState] = useState(() => loadCustomerCollection(key, initial, { getItem: name => localStorage.getItem(name) }));
  const current = useRef(state.data);
  const updateData = useCallback(update => {
    const next = typeof update === 'function' ? update(current.current) : update;
    current.current = next;
    let warning = '';
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { warning = 'Brauzerda saqlash imkoni bo‘lmadi. O‘zgarishlar faqat shu sahifada saqlanadi.'; }
    setState({ data: next, warning });
  }, [storageKey]);
  return [state.data, updateData, state.warning];
}

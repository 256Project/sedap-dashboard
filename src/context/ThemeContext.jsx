import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(null);
const key = 'sedap-theme';
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try { const saved = localStorage.getItem(key); return ['light', 'dark', 'system'].includes(saved) ? saved : 'light'; }
    catch { return 'light'; }
  });
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [warning, setWarning] = useState('');
  const theme = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const update = event => setSystemDark(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  function changeMode(next) {
    if (!['light', 'dark', 'system'].includes(next)) return;
    setMode(next);
    try { localStorage.setItem(key, next); setWarning(''); }
    catch { setWarning('Rejim shu oynada o‘zgardi, lekin brauzer xotirasiga saqlanmadi.'); }
  }
  return <ThemeContext.Provider value={{ mode, theme, changeMode, warning }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);

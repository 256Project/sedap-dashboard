import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches);
  const sidebarRef = useRef(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => { setMobile(media.matches); if (!media.matches) setOpen(false); };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!open || !mobile) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(sidebarRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]') || []).filter(element => element.getClientRects().length > 0);
    focusable()[0]?.focus();
    const handleKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) return;
      if (event.shiftKey && (document.activeElement === first || !sidebarRef.current?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !sidebarRef.current?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [open, mobile]);
  return <div className="app-shell"><a className="skip-link" href="#main-content">Asosiy qismga o‘tish</a><Sidebar open={open} onClose={() => setOpen(false)} sidebarRef={sidebarRef} mobile={mobile}/><div className="workspace" inert={open && mobile ? true : undefined}><Header onMenu={() => setOpen(value => !value)} menuOpen={open}/><main id="main-content" className="main-content"><Outlet/></main></div></div>;
}

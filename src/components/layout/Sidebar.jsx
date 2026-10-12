import { NavLink, useLocation } from 'react-router-dom';
import { isMenuActive } from '../../utils/navigation';
import { LayoutDashboard, ListOrdered, ClipboardList, Users, ChartNoAxesCombined, Star, Utensils, Soup, UserRound, CalendarDays, MessagesSquare, Wallet, X } from 'lucide-react';
const items = [['Dashboard', '/dashboard', LayoutDashboard], ['Order List', '/orders', ListOrdered], ['Order Detail', '/orders/demo', ClipboardList], ['Customer', '/customers', Users], ['Analytics', '/analytics', ChartNoAxesCombined], ['Reviews', '/reviews', Star], ['Foods', '/foods', Utensils], ['Food Detail', '/foods/demo', Soup], ['Customer Detail', '/customers/demo', UserRound], ['Calendar', '/calendar', CalendarDays], ['Chat', '/chat', MessagesSquare], ['Wallet', '/wallet', Wallet]];
export default function Sidebar({
  open,
  onClose
}) {
  const {
    pathname
  } = useLocation();
  return <><button className={'sidebar-backdrop ' + (open ? 'visible' : '')} onClick={onClose} aria-label="Menyuni yopish" tabIndex={open ? 0 : -1} /><aside id="main-sidebar" className={'sidebar ' + (open ? 'is-open' : '')}><div className="brand-row"><NavLink to="/dashboard" className="brand" onClick={onClose}>Sedap<span>.</span><small>Modern Admin Dashboard</small></NavLink><button className="icon-button close-menu" onClick={onClose} aria-label="Menyuni yopish"><X /></button></div><nav aria-label="Asosiy menyu">{items.map(([label, to, Icon]) => <NavLink key={label} to={to} end onClick={onClose} aria-current={isMenuActive(pathname, to) ? 'page' : false} className={'nav-item ' + (isMenuActive(pathname, to) ? 'active' : '')}><Icon size={21} /><span>{label}</span></NavLink>)}</nav><div className="sidebar-footer"><strong>Sedap Restaurant Admin</strong><p>Restoraningizni bir joydan boshqaring.</p><small>© {new Date().getFullYear()} Sedap</small></div></aside></>;
}

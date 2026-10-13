import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, Bell, Mail, Menu, ChevronDown, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
export default function Header({
  onMenu,
  menuOpen
}) {
  const {
    user,
    logout
  } = useAuth();
  const { theme, changeMode } = useTheme();
  const [notice, setNotice] = useState(false);
  const [profile, setProfile] = useState(false);
  const [query, setQuery] = useState('');
  return <header className="header"><button className="icon-button mobile-menu" onClick={onMenu} aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"} aria-controls="main-sidebar" aria-expanded={menuOpen}><Menu /></button><div className="search-wrap"><Search size={20} /><input type="search" aria-label="Sahifa qidirish" placeholder="Search here" value={query} onChange={e => setQuery(e.target.value)} />{query && <div className="header-popover search-results">{[['Dashboard', '/dashboard'], ['Order List', '/orders'], ['Customer', '/customers'], ['Analytics', '/analytics'], ['Reviews', '/reviews'], ['Foods', '/foods'], ['Calendar', '/calendar'], ['Chat', '/chat'], ['Wallet', '/wallet'], ['Sozlamalar', '/settings']].filter(([label]) => label.toLowerCase().includes(query.toLowerCase())).map(([label, to]) => <Link key={to} to={to} onClick={() => setQuery('')}>{label}</Link>)}<button onClick={() => setQuery('')}>Qidiruvni yopish</button></div>}</div><div className="header-actions"><button className="icon-button theme-toggle" aria-label={theme === 'dark' ? 'Kunduzgi rejimga o‘tish' : 'Tungi rejimga o‘tish'} onClick={() => changeMode(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={21} /> : <Moon size={21} />}</button><Link to="/settings" className="icon-button settings-button" aria-label="Sozlamalar"><Settings size={21} /></Link><div className="popover-wrap"><button className="icon-button notification-button" aria-label="Bildirishnomalar" aria-expanded={notice} onClick={() => {
          setNotice(!notice);
          setProfile(false);
        }}><Bell size={21} /></button>{notice && <div className="header-popover"><strong>Bildirishnomalar</strong><p>Hozircha bildirishnomalar yo‘q.</p></div>}</div><Link to="/chat" className="icon-button message-button" aria-label="Xabarlar"><Mail size={21} /></Link><div className="profile-wrap"><button className="profile-button" onClick={() => {
          setProfile(!profile);
          setNotice(false);
        }} aria-expanded={profile}><span className="profile-copy">Hello, <strong>{user?.name || 'Akbar'}</strong></span><span className="avatar">AK</span><ChevronDown size={15} /></button>{profile && <div className="header-popover"><strong>Akbar</strong><p>Jamoa sardori</p><button onClick={logout}>Chiqish</button></div>}</div></div></header>;
}

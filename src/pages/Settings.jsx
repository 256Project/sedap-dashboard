import { Sun, Moon, Monitor, Check, UserRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
export default function Settings() {
  const { mode, changeMode, warning } = useTheme();
  const { user } = useAuth();
  return <><div className="page-heading"><div><h1>Sozlamalar</h1><p>Sayt ko‘rinishini o‘zingizga moslang.</p></div></div>
    <section className="ui-card settings-card" aria-labelledby="appearance-title"><h2 id="appearance-title">Ko‘rinish</h2><p>Kunduzgi yoki tungi rejimni tanlang. Tanlovingiz avtomatik saqlanadi.</p>
      <div className="theme-options" role="group" aria-label="Sayt rejimi">{[['light', 'Kunduzgi', 'Yorug‘ fon va to‘q matn.', Sun], ['dark', 'Tungi', 'To‘q fon va yorug‘ matn.', Moon], ['system', 'Tizimga mos', 'Qurilmangiz rejimiga ergashadi.', Monitor]].map(([value, label, description, Icon]) => <button key={value} className={'theme-option ' + (mode === value ? 'selected' : '')} aria-pressed={mode === value} onClick={() => changeMode(value)}><span className="theme-option-top"><Icon size={25} />{mode === value && <Check size={20} />}</span><strong>{label}</strong><span>{description}</span></button>)}</div>
      <p role="status" className={warning ? 'form-error' : 'settings-status'}>{warning || 'Joriy rejim: ' + ({ light: 'Kunduzgi', dark: 'Tungi', system: 'Tizimga mos' }[mode])}</p>
    </section><section className="ui-card settings-card" aria-labelledby="account-title"><h2 id="account-title"><UserRound size={21} /> Hisob</h2><dl className="settings-account"><div><dt>Ism</dt><dd>{user?.name}</dd></div><div><dt>Email</dt><dd>{user?.email}</dd></div></dl></section></>;
}

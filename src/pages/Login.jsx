import Brand from '../components/Brand';
import { validateLogin, safeDestination } from '../utils/auth';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Utensils, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const {
    user,
    login
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const from = location.state?.from;
  const destination = safeDestination(from);
  if (user) return <Navigate to={destination} replace />;
  function submit(event) {
    event.preventDefault();
    const next = validateLogin(email, password);
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (!login(email, password)) {
      setErrors({
        form: 'Email yoki parol noto‘g‘ri.'
      });
      return;
    }
    navigate(destination, {
      replace: true
    });
  }
  return <main className="login-page"><section className="login-story"><a className="brand" href="/"><Brand /></a><div><span className="story-icon"><Utensils size={48} /></span><h1>Great food.<br />Better business.</h1><p>Restoraningizning har bir kunini bir joydan boshqaring.</p></div><small>Modern Restaurant Admin Dashboard</small></section><section className="login-form-wrap"><form className="login-form" noValidate onSubmit={submit}><span className="eyebrow">WELCOME BACK</span><h1>Panelga kirish</h1><p>Davom etish uchun hisobingizga kiring.</p><Input label="Email" type="email" autoComplete="username" placeholder="admin@sedap.uz" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} /><div className="password-field"><Input label="Parol" type={visible ? 'text' : 'password'} autoComplete="current-password" placeholder="Parolingiz" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} /><button className="password-toggle" type="button" aria-label={visible ? 'Parolni yashirish' : 'Parolni ko‘rsatish'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>{errors.form && <p role="alert" className="form-error">{errors.form}</p>}<Button type="submit">Kirish <ArrowRight size={18} /></Button><div className="demo-hint"><strong>Demo hisob</strong><p>Email: admin@sedap.uz<br />Parol: Sedap123!</p><small>Bu demo panel. Haqiqiy hisob ma’lumotlarini kiritmang.</small></div></form></section></main>;
}

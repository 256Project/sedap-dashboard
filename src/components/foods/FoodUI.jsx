import { useState } from 'react';
import { Star, Utensils } from 'lucide-react';
import '../../styles/foods.css';
import { assetUrl } from '../../utils/assets';
export function FoodHeading({ title, description, children }) { return <div className="page-heading food-heading"><div><h1>{title}</h1><p>{description}</p></div>{children}</div>; }
export function FoodNotice({ message }) { return message ? <p role="alert" className="food-notice">{message}</p> : null; }
export function FoodImage({ src, name, className = '' }) {
  const [failed, setFailed] = useState(false);
  return failed || !src ? <div className={'food-image-fallback ' + className} role="img" aria-label={name}><Utensils size={48} /></div> : <img className={'food-image ' + className} src={assetUrl(src)} alt={name} onError={() => setFailed(true)} loading="lazy" />;
}
export function FoodRating({ average, count }) { return <span className="food-rating"><Star size={16} fill="#ffbb24" color="#ffbb24" /><strong>{count ? average.toFixed(1) : '—'}</strong><small>({count} sharh)</small></span>; }

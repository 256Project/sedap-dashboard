import '../styles/brand.css';
import { assetUrl } from '../utils/assets';
export default function Brand({ tagline = false }) {
  return <span className="sedap-brand"><img src={assetUrl('/brand/sedap-mark.svg')} alt="" width="42" height="42" /><span className="sedap-brand-copy"><span className="sedap-wordmark">Sedap<span>.</span></span>{tagline && <small>Modern Admin Dashboard</small>}</span></span>;
}

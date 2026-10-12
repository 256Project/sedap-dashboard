import { Construction } from 'lucide-react';
export default function PlaceholderPage({ title, owner, issue }) {
  return <section><div className="page-heading"><div><h1>{title}</h1><p>Sedap restoran boshqaruv paneli</p></div><span className="issue-tag">#{issue}</span></div><div className="placeholder"><span className="placeholder-icon"><Construction size={32}/></span><h2>{title}</h2><p>Bu sahifa uchun karkas tayyor.</p><p>Mas’ul: <strong>{owner}</strong></p></div></section>;
}

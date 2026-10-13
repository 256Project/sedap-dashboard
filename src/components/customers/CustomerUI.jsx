import '../../styles/customers.css';
export function CustomerAvatar({ name, large = false }) {
  return <span aria-hidden="true" className={`customer-avatar ${large ? 'large' : ''}`}>{name.split(' ').map(part => part[0]).slice(0, 2).join('')}</span>;
}
export function CustomerHeading({ title, description, children }) {
  return <div className="page-heading customer-heading"><div><h1>{title}</h1><p>{description}</p></div>{children}</div>;
}
export function StorageNotice({ message }) {
  return message ? <p role="alert" className="customer-notice">{message}</p> : null;
}
export function Stars({ rating }) {
  return <span className="customer-stars" aria-label={`${rating} / 5 yulduz`}>{'★'.repeat(rating)}<span>{'★'.repeat(5 - rating)}</span></span>;
}

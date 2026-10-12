import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
export function Card({
  title,
  description,
  action,
  children,
  className = '',
  ...props
}) {
  return <section className={'ui-card ' + className} {...props}>{(title || action) && <div className="card-heading"><div>{title && <h2>{title}</h2>}{description && <p>{description}</p>}</div>{action}</div>}{children}</section>;
}
export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return <button type={type} className={'ui-button ' + variant + ' ' + className} {...props}>{children}</button>;
}
const statusLabels = {
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  preparing: 'Preparing',
  new: 'New'
};
export function Badge({
  status = 'new',
  children
}) {
  return <span className={'ui-badge ' + status}>{children || statusLabels[status] || status}</span>;
}
export function Input({
  label,
  error,
  id,
  className = '',
  ...props
}) {
  const uid = useId();
  const fieldId = id || uid;
  return <div className={'ui-field ' + className}>{label && <label htmlFor={fieldId}>{label}</label>}<input id={fieldId} aria-invalid={!!error} aria-describedby={error ? fieldId + '-error' : undefined} {...props} />{error && <p id={fieldId + '-error'} className="field-error">{error}</p>}</div>;
}
export function Select({
  label,
  id,
  options,
  className = '',
  ...props
}) {
  const uid = useId();
  return <div className={'ui-field ' + className}>{label && <label htmlFor={id || uid}>{label}</label>}<select id={id || uid} {...props}>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>;
}
export function Table({
  columns,
  data,
  rowKey = 'id',
  emptyMessage = 'Ma’lumot topilmadi',
  onRowClick,
  caption = 'Ma’lumotlar jadvali'
}) {
  return <div className="table-scroll"><table className="ui-table"><caption className="sr-only">{caption}</caption><thead><tr>{columns.map(column => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead><tbody>{data.length ? data.map(row => <tr key={row[rowKey]} className={onRowClick ? "clickable-row" : undefined} onClick={onRowClick ? event => {
          if (!event.target.closest("button, a, input, select, textarea, label, [role=button], [data-no-row-click]")) onRowClick(row);
        } : undefined}>{columns.map((column, index) => <td key={column.key}>{onRowClick && index === 0 ? <button className="table-row-link" onClick={() => onRowClick(row)}>{column.render ? column.render(row[column.key], row) : row[column.key]}</button> : column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>) : <tr><td colSpan={columns.length} className="table-empty">{emptyMessage}</td></tr>}</tbody></table></div>;
}
export function Pagination({
  page,
  pageSize,
  total,
  onChange
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return <nav className="pagination" aria-label="Sahifalash"><span>{total ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, total)} / {total}</span><div><Button variant="secondary" aria-label="Oldingi sahifa" disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={17} /></Button><span aria-live="polite">{page} / {pages}</span><Button variant="secondary" aria-label="Keyingi sahifa" disabled={page >= pages} onClick={() => onChange(page + 1)}><ChevronRight size={17} /></Button></div></nav>;
}
export function Tabs({
  options,
  value,
  onChange,
  label = 'Ko‘rinish'
}) {
  return <div className="ui-tabs" role="group" aria-label={label}>{options.map(option => <button type="button" key={option.value} className={value === option.value ? 'selected' : ''} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>;
}
export function Modal({
  open,
  onClose,
  title,
  children
}) {
  const dialog = useRef(null);
  const heading = useId();
  const closeCallback = useRef(onClose);
  useEffect(() => {
    closeCallback.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    const close = event => {
      event.preventDefault();
      closeCallback.current();
    };
    element.addEventListener('cancel', close);
    return () => {
      element.removeEventListener('cancel', close);
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);
  if (!open) return null;
  return createPortal(<dialog ref={dialog} className="ui-modal" aria-labelledby={heading} onClick={event => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }
  }}><div className="card-heading"><h2 id={heading}>{title}</h2><button type="button" className="icon-button" aria-label="Yopish" onClick={onClose}><X size={20} /></button></div>{children}</dialog>, document.body);
}

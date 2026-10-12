export function isMenuActive(pathname, destination) {
  const path = pathname.replace(/\/$/, '');
  if (!destination.endsWith('/demo')) return path === destination;
  const base = destination.slice(0, -5);
  if (!path.startsWith(base + '/')) return false;
  const [id, action, extra] = path.slice(base.length + 1).split('/');
  if (!id || id === 'new') return false;
  return !action || base === '/foods' && action === 'edit' && extra === undefined;
}

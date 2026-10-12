export function validateLogin(email, password) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'To‘g‘ri email manzil kiriting.';
  if (!password) errors.password = 'Parolni kiriting.';
  return errors;
}
export function authenticateDemo(email, password, account) {
  return email.trim().toLowerCase() === account.email && password === account.password;
}
export function safeDestination(from) {
  return typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') && !from.includes('\\') && !from.startsWith('/login') ? from : '/dashboard';
}

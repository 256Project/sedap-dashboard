import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
const ComponentExamples = lazy(() => import('./pages/ComponentExamples'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OrderList = lazy(() => import('./pages/OrderList'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const CustomerList = lazy(() => import('./pages/CustomerList'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Foods = lazy(() => import('./pages/Foods'));
const FoodDetail = lazy(() => import('./pages/FoodDetail'));
const CustomerDetail = lazy(() => import('./pages/CustomerDetail'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Chat = lazy(() => import('./pages/Chat'));
const Wallet = lazy(() => import('./pages/Wallet'));
const FoodCreate = lazy(() => import('./pages/FoodCreate'));
const FoodEdit = lazy(() => import('./pages/FoodEdit'));
const Settings = lazy(() => import('./pages/Settings'));
export default function App() {
  return <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Sahifa yuklanmoqda…</div>}><Routes><Route path="/login" element={<Login />} /><Route element={<RequireAuth />}><Route element={<AppLayout />}><Route index element={<Navigate to="/dashboard" replace />} /><Route path="/settings" element={<Settings />} /><Route path="/components" element={<ComponentExamples />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/orders" element={<OrderList />} /><Route path="/orders/:id" element={<OrderDetail />} /><Route path="/customers" element={<CustomerList />} /><Route path="/analytics" element={<Analytics />} /><Route path="/reviews" element={<Reviews />} /><Route path="/foods" element={<Foods />} /><Route path="/foods/:id" element={<FoodDetail />} /><Route path="/customers/:id" element={<CustomerDetail />} /><Route path="/calendar" element={<Calendar />} /><Route path="/chat" element={<Chat />} /><Route path="/wallet" element={<Wallet />} /><Route path="/foods/new" element={<FoodCreate />} /><Route path="/foods/:id/edit" element={<FoodEdit />} /><Route path="*" element={<NotFound />} /></Route></Route></Routes></Suspense>;
}

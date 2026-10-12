import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import OrderDetail from './pages/OrderDetail';
import CustomerList from './pages/CustomerList';
import Analytics from './pages/Analytics';
import Reviews from './pages/Reviews';
import Foods from './pages/Foods';
import FoodDetail from './pages/FoodDetail';
import CustomerDetail from './pages/CustomerDetail';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Wallet from './pages/Wallet';
import FoodCreate from './pages/FoodCreate';
import FoodEdit from './pages/FoodEdit';
export default function App() { return <Routes><Route path="/login" element={<Login/>}/><Route element={<AppLayout/>}><Route index element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/orders" element={<OrderList/>}/><Route path="/orders/:id" element={<OrderDetail/>}/><Route path="/customers" element={<CustomerList/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/foods" element={<Foods/>}/><Route path="/foods/:id" element={<FoodDetail/>}/><Route path="/customers/:id" element={<CustomerDetail/>}/><Route path="/calendar" element={<Calendar/>}/><Route path="/chat" element={<Chat/>}/><Route path="/wallet" element={<Wallet/>}/><Route path="/foods/new" element={<FoodCreate/>}/><Route path="/foods/:id/edit" element={<FoodEdit/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>; }

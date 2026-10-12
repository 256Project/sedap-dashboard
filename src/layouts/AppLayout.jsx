import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
export default function AppLayout() { const [open,setOpen]=useState(false); const location=useLocation(); useEffect(()=>{setOpen(false)},[location.pathname]); useEffect(()=>{if(!open)return; const previous=document.body.style.overflow; document.body.style.overflow='hidden'; const close=e=>{if(e.key==='Escape')setOpen(false)}; document.addEventListener('keydown',close); return ()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',close)}},[open]); return <div className="app-shell"><a className="skip-link" href="#main-content">Asosiy qismga o‘tish</a><Sidebar open={open} onClose={()=>setOpen(false)}/><div className="workspace"><Header onMenu={()=>setOpen(!open)} menuOpen={open}/><main id="main-content" className="main-content"><Outlet/></main></div></div>; }

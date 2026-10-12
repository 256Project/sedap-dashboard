# Sedap — restoran admin paneli

Shablon: https://themeforest.net/item/sedap-modern-restaurant-admin-dashboard-xd-template/31129012

Stek: React + Vite, React Router, Tailwind CSS, grafiklar uchun Recharts. Ma'lumotlar hozircha `src/data/*.json` dan olinadi (backend yo'q).

## Kim nima qiladi

| Kim | Qism | Sahifalar |
|---|---|---|
| **Akbar** (komilovakbar700) — jamoa sardori | Karkas va umumiy qism | Loyihani yaratish, routing, Sidebar, Header, ranglar va shriftlar, umumiy komponentlar (Card, Button, Table, Badge, Modal), **Login**, **Dashboard**, **Wallet** |
| **Sherzod** (maxsudovsherzod540) | Buyurtmalar | **Order List** (jadval, status bo'yicha filtr, qidiruv, sahifalash), **Order Detail**, **Calendar** |
| **Amirbek** (amirbek1288) | Mijozlar | **Customer List**, **Customer Detail**, **Reviews**, **Chat** |
| **Salahitdinov** (usalahitdinov2) | Menyu va tahlil | **Foods** (taomlar kartochkalari, qo'shish/tahrirlash), **Food Detail**, taom qo'shish/tahrirlash, **Analytics** |

Har kim o'z sahifasi uchun `src/data/` da o'z JSON faylini yaratadi: `orders.json`, `customers.json`, `reviews.json`, `foods.json`.

Vazifalar ro'yxati: [tasks.md](tasks.md). Batafsil vazifalar: https://github.com/256Project/sedap-dashboard/issues (har kimning o'z yorlig'i bor: akbar, sherzod, amirbek, salah)

## Tartib

1. **1-kun:** Akbar karkasni `main` ga qo'yadi (routing + Sidebar + bo'sh sahifalar). Qolganlar shu vaqt namunadagi o'z sahifalarini o'rganib, JSON ma'lumot tayyorlaydi.
2. **1-hafta:** har kim o'z birinchi sahifasini qiladi.
3. **2-hafta:** qolgan sahifalar.
4. **3-hafta:** telefon uchun moslash, xatolarni tuzatish, deploy (Vercel).

## Qoidalar

- `main` ga to'g'ridan-to'g'ri push qilinmaydi. Har kim o'z branchida ishlaydi: `sherzod/orders`, `amirbek/customers` va h.k.
- Ish tayyor bo'lsa — Pull Request ochiladi, Akbar ko'rib chiqib merge qiladi.
- Umumiy komponentlarni (Card, Button, Table) faqat Akbar o'zgartiradi; kerak bo'lsa unga yoziladi.
- Commit xabarlari qisqa va tushunarli: `Order List: status filtri qo'shildi`.

## Ishga tushirish

Node.js 20.19+ yoki 22.12+ talab qilinadi (Node 24 ham mos).

```bash
npm install
npm run dev
```

Production tekshiruvi: `npm run build`, keyin `npm run preview`.

## Karkas tuzilmasi

- `src/pages/` — har bir sahifa uchun alohida komponent.
- `src/layouts/AppLayout.jsx` — Sidebar, Header va sahifa kontenti.
- `src/components/layout/` — Sidebar va Header (Akbar).
- `src/components/` — umumiy komponentlar (Akbar).
- `src/styles/index.css` — Tailwind, ranglar va Barlow shrifti.
- `src/data/` — mas’ullar yaratadigan JSON ma’lumotlar.
- `src/App.jsx` — umumiy routing (o‘zgarishlar Akbar bilan kelishiladi).

## Sahifa yo‘llari

| Yo‘l | Komponent | Mas’ul |
|---|---|---|
| /dashboard | Dashboard | Akbar |
| /orders | OrderList | Sherzod |
| /orders/:id | OrderDetail | Sherzod |
| /customers | CustomerList | Amirbek |
| /analytics | Analytics | Salahitdinov |
| /reviews | Reviews | Amirbek |
| /foods | Foods | Salahitdinov |
| /foods/:id | FoodDetail | Salahitdinov |
| /customers/:id | CustomerDetail | Amirbek |
| /calendar | Calendar | Sherzod |
| /chat | Chat | Amirbek |
| /wallet | Wallet | Akbar |
| /foods/new | FoodCreate | Salahitdinov |
| /foods/:id/edit | FoodEdit | Salahitdinov |
| /login | Login | Akbar |

Tafsilot sahifalaridagi `:id` haqiqiy yozuv identifikatori bilan almashtiriladi. Sidebar vaqtincha `demo` IDga yo‘naltiradi. Taom yaratish: `/foods/new`; tahrirlash: `/foods/:id/edit`.

Hozirgi bosqich: routing va layout karkasi. Sahifalar placeholder; autentifikatsiya #8 vazifada qo‘shiladi. Ranglar: primary `#00b074`, canvas `#f3f2f7`, text `#464255`. Barlow Google Fonts orqali yuklanadi, tarmoq bo‘lmasa sans-serif ishlaydi. Ikonkalar Lucide.

Vercel uchun SPA rewrite `vercel.json`da tayyorlangan; deploy hali bajarilmagan.

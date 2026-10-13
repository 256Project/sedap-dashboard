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

Login, Dashboard, Wallet, Order List, Order Detail, Calendar, Customer List, Customer Detail, Reviews va Chat sahifalari amalga oshirilgan. Foods va Analytics sahifalari hozircha placeholder. Ranglar: primary `#00b074`, canvas `#f3f2f7`, text `#464255`. Barlow Google Fonts orqali yuklanadi, tarmoq bo‘lmasa sans-serif ishlaydi. Ikonkalar Lucide.

Vercel uchun SPA rewrite `vercel.json`da tayyorlangan; deploy hali bajarilmagan.

## Demo kirish

- Email: `admin@sedap.uz`
- Parol: `Sedap123!`

Backend yo‘qligi sababli bu faqat frontend demo autentifikatsiya. Sessiya `sessionStorage`da saqlanadi, tab yopilganda tugaydi. Haqiqiy autentifikatsiya server orqali alohida amalga oshirilishi kerak. Chiqish Header profil menyusida. Himoyalangan sahifaga kirilganda Login ochiladi va muvaffaqiyatli kirishdan keyin oldingi sahifaga qaytiladi.

## Umumiy komponentlar

Import: `import { Card, Button, Badge, Table, Modal, Input, Select, Pagination, Tabs } from '../components/ui';`

Har bir komponentning interaktiv misoli: `/components`. Misol kodi: `src/pages/ComponentExamples.jsx`. Jamoa a’zolari ushbu komponentlardan foydalanishi kerak; o‘zgarishlar Akbar orqali.

- Card: `title`, `description`, `action`, `children`.
- Button: `variant=primary|secondary|danger`, `onClick`, `disabled`. Forma uchun `type="submit"`.
- Badge: `status` yoki maxsus `children`.
- Input: `label`, `value`, `onChange`, `error`.
- Select: `options=[{value,label}]`, `value`, `onChange`.
- Table: `columns=[{key,label,render?}]`, `data`, `rowKey` (default: id), `onRowClick`. Qator yoki birinchi ustundagi tugma tafsilotni ochadi. Qatordagi boshqa tugmalar navigatsiya qilmaydi.
- Modal: `open`, `onClose`, `title`, `children`. Native dialog fokusni ichkarida ushlab turadi.
- Pagination: `page` (1 dan), `pageSize`, `total`, `onChange`. Filtr o‘zgarsa sahifani 1 ga qaytaring.
- Tabs: `options=[{value,label}]`, `value`, `onChange`.

## Akbarning JSON ma’lumotlari

- `dashboard.json`: day/week/month statistika, uchta donut, buyurtmalar, ikki yil daromadi va haftalik mijozlar. Davr tanlash barcha ko‘rsatkichlarni yangilaydi.
- `wallet.json`: balans, haftalik kirim/chiqim, tranzaksiyalar. Qidiruv, status va kirim/chiqim filtrlari, sahifalash mavjud. Valyuta: USD (dizayn demosiga mos).
- `auth.json`: faqat demo hisob ma’lumotlari.

## Tekshirish

### Sherzod: buyurtmalar va kalendar

`/orders`, `/orders/:id` va `/calendar` sahifalari tayyor. Sidebar’dagi `/orders/demo` birinchi demo buyurtmani ochadi; mavjud bo‘lmagan ID uchun tushunarli xabar ko‘rsatiladi.

- `src/data/orders.json`: 20 ta buyurtma, mijozlar, taomlar, yetkazish haqi, demo koordinatalar va holat tarixi. Summa USD’da.
- `src/data/events.json`: kalendar uchun boshlang‘ich tadbirlar.
- Buyurtma holati va tadbirlar `localStorage`da alohida `sedap.sherzod.orders.v1` / `sedap.sherzod.events.v1` kalitlarida saqlanadi. Sahifa yangilanganda saqlangan ma’lumot ishlatiladi. Boshlang‘ich JSON’ga qaytish uchun shu ikkita kalitni brauzer DevTools orqali o‘chiring.
- Buyurtma: yangi → tayyorlanmoqda → yetkazildi; yangi yoki tayyorlanayotgan buyurtma bekor qilinishi mumkin. Yakunlangan holat o‘zgarmaydi. Bekor qilish va tadbirni o‘chirish tasdiqlanadi.
- Kalendar bugungi sana bilan ochiladi. Sana yoki `+` belgisi tadbir yaratadi, mavjud tadbir tahrirlash modalini ochadi. Bir kunlik tadbirning tugash vaqti boshlanishidan keyin bo‘lishi kerak.
- Xarita OpenStreetMap orqali yuklanadi va internet talab qiladi. Manzil va koordinatalar demo ma’lumotlar; geokodlash yoki backend ulanmagan.

PowerShell `npm.ps1`ni bloklasa, `npm.cmd run dev` ishlating. Vite konfiguratsiyasini yuklashda ushbu agent muhitida `Access is denied` kuzatildi; `npm.cmd run dev -- --configLoader native` va `npm.cmd run build -- --configLoader native` ishladi (Node 24).

Tekshiruv natijalari: [docs/sherzod-checklist.md](docs/sherzod-checklist.md).

`npm test` — login, navigatsiya, buyurtma filtrlari/statuslari, kalendar, mijoz qidiruvi/saralashi/validatsiyasi, xarid statistikasi va sharh filtrlari tekshiruvlari.
`npm run build` — production build.

Brauzerda: Login xatolari, muvaffaqiyatli kirish, oldingi sahifaga qaytish, logout, Dashboard davrlari, Wallet filtr/sahifalash, `/components` modali va 375/768/1440 px ko‘rinishlarni tekshiring.

Agent muhitida 3 ta test o‘tdi va JSX transform tekshirildi. Vite build fayl ruxsatlari/timeout sabab yakunlanmadi; brauzer va mobil tekshiruvlar hali bajarilmagan.

Foydalanuvchi lokal brauzerda panelni tekshirib, ishlashini tasdiqladi. Production build va barcha mobil o‘lchamlar tekshiruvi alohida bajariladi.

Keyingi kod ko‘rigida haqiqiy ID uchun faol menyu, jadval qatorini bosish va Modal callback barqarorligi tuzatildi. Login va navigatsiya uchun jami 6 ta test mavjud.

Mobil tekshiruv ro‘yxati: [docs/mobile-checklist.md](docs/mobile-checklist.md). Mobil/planshet tuzatishlari yozildi; vizual tekshiruv hali kutilmoqda.

## Amirbek — mijozlar, sharhlar va chat

- `/customers`: 12 ta demo mijoz, qidiruv, saralash, sahifalash, validatsiyali qo‘shish va tasdiqlash orqali o‘chirish.
- `/customers/:id`: profil, balans, sevimli taomlar, buyurtmalar tarixi va oylik xarid grafigi. `/customers/demo` birinchi mavjud mijozni ochadi; noma’lum yoki o‘chirilgan ID uchun bo‘sh holat mavjud.
- `/reviews`: reyting kartochkasi, yulduzlar, qidiruv, reyting filtri, sahifalash, javob yozish va tahrirlash.
- `/chat`: suhbat qidiruvi, o‘qilmaganlar, yozishmalar va xabar yuborish. Enter yuboradi, Shift+Enter yangi qator qo‘shadi. Har bir suhbatning qoralamasi navigatsiya qilinmaguncha alohida saqlanadi.

Boshlang‘ich ma’lumotlar: `customers.json`, `reviews.json`, `conversations.json`. O‘zgarishlar shu brauzerning `localStorage`ida `sedap-amirbek-v1-*` kalitlari bilan saqlanadi; boshqa qurilma yoki foydalanuvchi bilan sinxronlanmaydi. Chat frontend demo, xabarlar haqiqiy mijozga yuborilmaydi. localStorage yozish xatosi foydalanuvchiga ko‘rsatiladi.

Amirbekning to‘rtta sahifasi 375/768/1440 px o‘lchamlarda tekshirildi, 11 ta test va production build o‘tdi. [Tekshiruv qaydlari](docs/amirbek-checklist.md). Vite katta JS bundle haqida ogohlantiradi; build muvaffaqiyatli yakunlanadi. Deploy hali bajarilmagan.

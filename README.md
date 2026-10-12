# Sedap — restoran admin paneli

Namuna: https://themeforest.net/item/sedap-modern-restaurant-admin-dashboard-xd-template/31129012

Stek: React + Vite, React Router, Tailwind CSS, grafiklar uchun Recharts. Ma'lumotlar hozircha `src/data/*.json` dan olinadi (backend yo'q).

## Kim nima qiladi

| Kim | Qism | Sahifalar |
|---|---|---|
| **Akbar** (komilovakbar700) — jamoa sardori | Karkas va umumiy qism | Loyihani yaratish, routing, Sidebar, Header, ranglar va shriftlar, umumiy komponentlar (Card, Button, Table, Badge, Modal), **Dashboard** sahifasi |
| **Sherzod** (maxsudovsherzod540) | Buyurtmalar | **Order List** (jadval, status bo'yicha filtr, qidiruv, sahifalash), **Order Detail** |
| **Amirbek** (amirbek1288) | Mijozlar | **Customer List**, **Customer Detail**, **Reviews** (sharhlar ro'yxati, reyting) |
| **Salahitdinov** (usalahitdinov2) | Menyu va tahlil | **Foods** (taomlar kartochkalari, qo'shish/tahrirlash), **Food Detail**, **Analytics** (grafiklar) |

Har kim o'z sahifasi uchun `src/data/` da o'z JSON faylini yaratadi: `orders.json`, `customers.json`, `reviews.json`, `foods.json`.

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

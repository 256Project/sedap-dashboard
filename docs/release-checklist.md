# Yakuniy tekshiruv va Vercel

Branch: akbar/final-checks. Main to‘g‘ridan-to‘g‘ri o‘zgartirilmaydi; PR orqali birlashtiriladi.

## Bajarilgan

- [x] 32 ta avtomatik test o‘tdi.
- [x] Barcha sahifalar React.lazy + Suspense orqali alohida yuklanadi.
- [x] 8 ta menyu fotosurati 1000x667 JPEGga siqildi: 22 044 320 baytdan 1 122 971 baytga (~94.9%).
- [x] Eski PNG va SVG yo‘llari saqlangan menyuda moslashtiriladi; upload va taom tahrirlari saqlanadi.

## Merge oldidan

- [x] Production build native config loader bilan o‘tdi (1m35s). Asosiy JS: 282.19 kB; eng katta chunk: 366.67 kB. 500 kB ogohlantirish yo‘q.
- [ ] Login → Dashboard → barcha menyular: sahifa yuklanishi va qayta yuklash.
- [ ] Foods: 8 ta yangi JPEG rasmi, qidiruv, filtr, yaratish/tahrirlash va oldingi upload.
- [ ] Buyurtma → mijoz → buyurtma, status va tarix mosligi.
- [ ] Reviews javobi va Chat xabarlari sahifa yangilanganda saqlanishi.
- [ ] 375/768/1440 px va dark/light/system mavzularida barcha sahifalar.
- [ ] Original Sedap namunasi bilan yakuniy dizayn taqqoslash.

## Vercel

- [ ] PRni main ga merge qilish.
- [ ] Vercelda 256Project/sedap-dashboard reposini import qilish, production branch main.
- [ ] Vite loyihasi: npm run build, output dist.
- [ ] Vercelda VITE_PAGES=true qo‘yilmasin (bu faqat GitHub Pages uchun).
- [ ] Deploydan keyin /login, /orders/1001 va /foods/demo yo‘llarini to‘g‘ridan-to‘g‘ri ochish/yangilash.
- [ ] Demo Login, rasmlar va grafiklarni jonli saytda tekshirish.
- [ ] Haqiqiy deploy havolasini README ga qo‘shish va #22 ni yakunlash.

Vercel deploy hozircha bajarilmadi.

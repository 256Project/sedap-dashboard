# Sherzod — buyurtmalar va kalendar tekshiruvi

Sana: 2026-10-13. Branch: `sherzod-orders`.

## Avtomatik tekshiruv

- [x] `npm.cmd test`: 13/13 test o‘tdi (avvalgi 6 ta va 7 ta yangi).
- [x] Buyurtma qidiruvi/status filtri, sana saralashi va miqdor/yetkazish bilan jami summa.
- [x] Status ketma-ketligi, yakunlangan holat himoyasi va timeline saqlanishi.
- [x] Kalendar oy chegaralari, dushanbadan boshlanadigan hafta, kun ko‘rinishi, yil/oy almashishi.
- [x] Tadbirning bo‘sh nomi, noto‘g‘ri sanasi, vaqti va rangi tekshirildi.
- [x] `npm.cmd run build -- --configLoader native`: production build o‘tdi.
- [x] `git diff --check`.

Oddiy `npm.cmd run build` agent sandboxida esbuild konfiguratsiyani yuklayotganda `Access is denied` bilan to‘xtadi. Native config loader bilan build muvaffaqiyatli. Vite mavjud umumiy JS bundle uchun 500 kB ogohlantirish berdi.

## Edge brauzeri

- [x] Order List 8 qator bilan ochilishi va tafsilot tugmasi orqali navigatsiya.
- [x] Qabul qilish → tayyorlanmoqda va yetkazildi holatlari sahifani qayta yuklashdan keyin saqlanishi.
- [x] Mavjud bo‘lmagan ID uchun fallback.
- [x] Modalda tadbir yaratish, tahrirlash va qayta yuklaganda saqlanishi.
- [x] Tadbir o‘chirishni tasdiqlash va yozuvning saqlangan ma’lumotdan o‘chishi.
- [x] Hafta 7 kun, kun ko‘rinishi 1 kun bilan ochilishi.
- [x] Order List, Order Detail va Calendar 375/768/1440 px kenglikda sahifa tashqarisiga chiqmaydi; jadval va oy/hafta kalendari o‘z ichida gorizontal aylantiriladi.
- [x] Ushbu amallar davomida JavaScript runtime exception kuzatilmadi.

## Qo‘lda ko‘rib chiqish uchun

- [ ] Original Sedap namunasi bilan to‘liq vizual taqqoslash.
- [ ] Tarmoq mavjud bo‘lganda OpenStreetMap xaritasining yuklanishi va marker.
- [ ] Mobil qurilmada sensorli aylantirish va virtual klaviatura.
- [ ] Klaviaturada modal, Escape va fokusning qaytishini alohida tekshirish (Akbarning umumiy Modal komponenti ishlatiladi).

Umumiy komponentlar, routing, Sidebar/Header va boshqa jamoa a’zolari sahifalari o‘zgartirilmagan. GitHub’ga push yoki PR ochilmadi.

# Kod ko‘rigi — 2026-10-14

Branch: akbar/code-review. Boshlang‘ich commit: c555005.

## Topilgan va tuzatilgan

- Mijozlar, sharhlar va suhbatlar localStorage’dan faqat array ekanligi bilan qabul qilinar edi. Endi ichki yozuvlar, sana, reyting, xabarlar va takrorlangan IDlar tekshiriladi. Noto‘g‘ri ma’lumot asl storage yozuvini o‘chirmasdan demo + ogohlantirishga o‘tadi.
- Mijozlarning v1 → v2 migratsiyasi ham tekshiriladi; foydalanuvchi qo‘shgan yozuvlar va oldingi o‘chirishlar saqlanadi.
- Bo‘sh xabarlar ro‘yxati bo‘lgan suhbat saralash va oxirgi xabarni ko‘rsatishda xato chiqarardi. Bo‘sh suhbat uchun matn va sana fallbacki qo‘shildi.
- Buyurtma/tadbir hookining ketma-ket yangilanishlari eski render qiymatidan hisoblanishi mumkin edi. Joriy ma’lumot ref orqali olinadi.
- Buyurtma sahifalarida mijoz storage xatosi ham ko‘rsatiladi.

## Tekshiruv

- 38 ta test o‘tdi; 6 ta yangi test buzilgan ma’lumotlar, nested sanalar, bo‘sh ro‘yxatlar, migratsiya va storage ruxsat xatosini va React hookidagi ketma-ket yangilanishni tekshiradi.
- O‘zgargan JSX/JS transformi va git diff --check o‘tdi.
- Production build native config loader bilan muvaffaqiyatli tugadi (2m6s). Eng katta JS chunk 366.67 kB; 500 kB ogohlantirish yo‘q.
- Ushbu tuzatishlar brauzerda hali tekshirilmagan.

## Yangi pushlar

Agent muhitida GitHub ulanishi ishlamadi. Origin ref’lari foydalanuvchi git fetch origin --prune bajargach qayta solishtiriladi. Fetch bajarilmaguncha eng yangi remote kod ko‘rib chiqilgan deb hisoblanmaydi.

Deploy foydalanuvchi so‘rovi bilan hozircha kechiktirilgan.

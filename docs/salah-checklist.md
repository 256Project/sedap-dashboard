# Salahitdinov — menyu va Analytics tekshiruvi

2026-10-13. #18–#21 vazifalari.

- [x] 8 ta demo taom: mahalliy SVG rasm, nom, kategoriya, narx va sharhlardan hisoblangan reyting.
- [x] Qidiruv + kategoriya filtri; setka/ro‘yxat; sahifalash; kartochkadan tafsilotga o‘tish.
- [x] Bo‘sh maydonlar, noto‘g‘ri narx, takroriy nom va rasm tekshiruvlari.
- [x] TXT yuklash rad etildi; PNG yuklash va yangi taom yaratish tekshirildi.
- [x] Yaratilgan taom rasm va qiymatlari bilan reload’dan keyin saqlandi.
- [x] Tahrirlash tasdiqlash oynasi; yangi nom va narx reload’dan keyin saqlandi.
- [x] O‘chirish tasdiqlash oynasi; test taomi o‘chirildi, reload’dan keyin qidiruvda qolmadi.
- [x] Taom tafsiloti: tarkibi, sharhlar, shu oydagi yetkazilgan porsiyalar va tushum.
- [x] Analytics: kun (24 soat), hafta (7 kun), oyning tanlangan sanagacha bo‘lgan qismi.
- [x] Revenue, Orders, Customer growth va best sellers bir xil buyurtmalar/mijozlar manbasidan olinadi.
- [x] 375/768/1440 px: Foods, Food Detail, yaratish/tahrirlash, Analytics, Customer va Orders. Sahifa tashqarisiga gorizontal overflow va buzilgan rasmlar aniqlanmadi.
- [x] Sedap logosi yuklandi; favicon linki mavjud; mahalliy SVG fayllar build ichida mavjud.
- [x] `npm test`: 29 ta test.
- [x] `npm run build`: muvaffaqiyatli, katta bundle haqida Vite ogohlantirishi mavjud.

Ma’lumotlar frontend demo sifatida brauzerda saqlanadi. Menyu uchun `sedap-salah-v1-foods` ishlatiladi; mijozlar, buyurtmalar va sharhlar mavjud kalitlardan olinadi. Saqlash xatosida forma yopilmaydi va xabar ko‘rsatiladi. Rasm JPG/PNG/WebP, 3 MB gacha; yuklangan rasm 900×650 chegaraga kichraytirilib, JPEG sifatida saqlanadi.

Buyurtmalarda `food-1` kabi eski IDlar turli taomlar uchun qayta ishlatilgani sababli statistika normalizatsiyalangan nom va saqlangan oldingi nomlar orqali bog‘langan. Taom nomi/narxi tahrirlanganda oldingi buyurtma narxlari va sharhlar saqlanadi. Menyudan o‘chirish buyurtmalar tarixini o‘chirmaydi. Bekor qilingan, yangi va tayyorlanayotgan buyurtmalar tushumga kiritilmaydi. Analytics daromadi yetkazish haqini o‘z ichiga oladi; taom daromadi faqat o‘sha taom summasi. Sana chegaralari Toshkent vaqtida olinadi.

Chegaralar: backend, haqiqiy upload serveri, qurilmalararo sinxronlash va deploy mavjud emas. XD fayli bilan piksel darajasidagi taqqoslash va haqiqiy telefon klaviaturasi ochilgandagi ko‘rinish tekshirilmagan. Demo taom rasmlari shu repo uchun yaratilgan SVG illustratsiyalar.

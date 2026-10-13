# Vazifalar (tasks)

**Shablon:** [Sedap — Modern Restaurant Admin Dashboard](https://themeforest.net/item/sedap-modern-restaurant-admin-dashboard-xd-template/31129012) — barcha sahifalar shu namunadagidek bo'lishi kerak.

Bajarilgan punktga `[x]` qo'yiladi. Har bir vazifa GitHub Issues da ham bor: https://github.com/256Project/sedap-dashboard/issues

## Akbar

### 1. Loyiha karkasi (#5)
- [x] Loyiha yaratish, papkalar tuzilmasi
- [x] Routing: barcha sahifalar uchun yo'l (bo'sh sahifa bo'lsa ham)
- [ ] Ranglar, shriftlar, ikonkalar namunadagidek
- [x] README ga ishga tushirish buyrug'i

### 2. Layout: Sidebar va Header (#6)
- [x] Sidebar: logotip, menyu (Dashboard, Order List, Order Detail, Customer, Analytics, Reviews, Foods, Food Detail, Customer Detail, Calendar, Chat, Wallet), faol punkt ajratilgan
- [x] Header: qidiruv, bildirishnomalar, xabarlar, profil
- [x] Telefonda sidebar yashirinadi, tugma bilan ochiladi

### 3. Umumiy komponentlar (#7)
- [x] Card, Button, Badge (status), Table, Modal, Input, Select, Pagination, Tabs
- [x] Har biriga qisqa misol
- [ ] Boshqalar shu komponentlarni ishlatadi

### 4. Login sahifasi (#8)
- [x] Email va parol bilan kirish formasi
- [x] Xato xabarlari
- [x] Kirmagan foydalanuvchi panelga kira olmaydi

### 5. Dashboard (#9)
- [x] 4 ta statistika kartochkasi: jami buyurtmalar, yetkazilgan, bekor qilingan, daromad
- [x] Pie chart (umumiy, mijozlar o'sishi, daromad)
- [x] Chart Order: kunlik buyurtmalar grafigi
- [x] Total Revenue: oylar bo'yicha 2 yil taqqoslash
- [x] Customer Map: haftalik ustunli grafik
- [x] Davr tanlash: kun / hafta / oy

### 6. Wallet (#10)
- [x] Balans kartochkasi
- [x] Kirim/chiqim grafigi
- [x] Tranzaksiyalar ro'yxati: sana, summa, status, filtr

### 18. Yakuniy: telefon uchun moslash va deploy (#22)
- [ ] Har bir sahifa telefonda tekshiriladi (hamma o'z sahifasini)
- [ ] Xatolar tuzatiladi
- [ ] Vercel ga deploy, havola README ga

## Sherzod

### 7. Order List (#11)
- [ ] Buyurtmalar jadvali: ID, sana, mijoz, manzil, summa, status
- [ ] Status bo'yicha filtr (yangi, tayyorlanmoqda, yetkazildi, bekor qilindi)
- [ ] Qidiruv va sana bo'yicha saralash
- [ ] Sahifalash
- [ ] Qatorda menyu: qabul qilish / bekor qilish
- [ ] Qatorni bosganda Order Detail ochiladi

### 8. Order Detail (#12)
- [ ] Mijoz kartochkasi: ism, telefon, manzil
- [ ] Buyurtma tarkibi: taom, soni, narxi, jami
- [ ] Buyurtma holati tarixi (timeline)
- [ ] Xaritada yetkazish manzili
- [ ] Statusni o'zgartirish tugmalari

### 9. Calendar (#13)
- [ ] Oy / hafta / kun ko'rinishi
- [ ] Tadbir qo'shish, tahrirlash, o'chirish (modal)
- [ ] Tadbir rangini tanlash
- [ ] Yaqin tadbirlar ro'yxati yonida

## Amirbek

### 10. Customer List (#14)
- [x] Mijozlar jadvali: ism, telefon, manzil, buyurtmalar soni, jami xarid
- [x] Qidiruv, saralash, sahifalash
- [x] Mijoz qo'shish va o'chirish
- [x] Qatorni bosganda Customer Detail ochiladi

### 11. Customer Detail (#15)
- [x] Profil kartochkasi va balans
- [x] Eng ko'p buyurtma qilgan taomlari
- [x] Buyurtmalar tarixi jadvali
- [x] Oylik xarid grafigi

### 12. Reviews (#16)
- [x] Sharhlar ro'yxati: mijoz, taom, reyting (yulduzlar), matn, sana
- [x] Reyting bo'yicha filtr va qidiruv
- [x] Sharhga javob yozish
- [x] O'rtacha reyting kartochkasi

### 13. Chat (#17)
- [x] Chap tomonda suhbatlar ro'yxati, o'qilmaganlar soni
- [x] O'ng tomonda yozishmalar
- [x] Xabar yozish va yuborish
- [x] Suhbatlar bo'yicha qidiruv

Amirbekning to‘rtta sahifasi 375/768/1440 px o‘lchamlarda brauzerda tekshirildi. Mijoz qo‘shish/o‘chirish, sharhga javob va chat xabarlari qayta yuklanganda saqlanishi tekshirildi. Ma’lumotlar frontend demo: JSON + localStorage, backend va real vaqt chat mavjud emas. Tekshiruv tafsilotlari: [docs/amirbek-checklist.md](docs/amirbek-checklist.md).

## Salahitdinov

### 14. Foods (#18)
- [ ] Taomlar kartochkalari: rasm, nom, kategoriya, narx, reyting
- [ ] Kategoriya bo'yicha filtr va qidiruv
- [ ] Ro'yxat / setka ko'rinishi
- [ ] Kartochkani bosganda Food Detail ochiladi

### 15. Taom qo'shish va tahrirlash (#19)
- [ ] Forma: nom, kategoriya, narx, tavsif, rasm yuklash
- [ ] Maydonlarni tekshirish (bo'sh, noto'g'ri narx)
- [ ] Tahrirlash va o'chirish (tasdiqlash bilan)

### 16. Food Detail (#20)
- [ ] Katta rasm, nom, narx, tavsif, tarkibi
- [ ] Sotuv statistikasi: bu oy nechta sotildi, daromad
- [ ] Shu taom sharhlari
- [ ] Tahrirlash tugmasi

### 17. Analytics (#21)
- [ ] Daromad grafigi (kun / hafta / oy)
- [ ] Eng ko'p sotilgan taomlar
- [ ] Buyurtmalar soni grafigi
- [ ] Mijozlar soni o'sishi
- [ ] Davr tanlash

> Akbar paneli: komponentlar, Login, Dashboard va Wallet kodi yozildi. 3 ta login testi o‘tdi. Production build va brauzer/mobil tekshiruvlari ushbu muhitda yakunlanmadi; merge oldidan tekshiriladi.

> Foydalanuvchi lokal brauzerda ishlashini tasdiqladi. Deploy hali bajarilmagan.

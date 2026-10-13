# GitHub Pages va Google

`node scripts/build-pages.mjs` GitHub Pages uchun `dist/pages` papkasini tayyorlaydi. Ochiq tanishtiruv sahifasi `/sedap-dashboard/`da, demo panel `/sedap-dashboard/app/#/login`da ishlaydi. HashRouter statik hostingda ichki sahifalarni qayta ochishni qo‘llaydi. Rasmlar Vite base manziliga moslanadi.

Saytning tayyor fayllari `gh-pages` branchiga yuklanadi. Repo administratori Settings → Pages → Deploy from a branch → gh-pages → /(root) → Save orqali hostingni yoqishi kerak. Bu ruxsat ulangan hisobda mavjud emas.

Hosting ochilgach, Google Search Console’da `https://256project.github.io/sedap-dashboard/` URL prefix sifatida qo‘shiladi. Egalik HTML fayl yoki meta tag bilan tasdiqlanadi; tasdiq qiymatini Google beradi. So‘ng sitemap.xml yuboriladi va asosiy URL uchun Request indexing tanlanadi. Google indekslashni va muddatni kafolatlamaydi. Admin demo qidiruv uchun mo‘ljallanmagan; qidiruvga ochiq tanishtiruv sahifasi yuboriladi.

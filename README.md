# İstasyon 1896

Karşıyaka, İzmir'in artisan kahve ve fırın istasyonu için tasarlanmış premium statik tanıtım sitesi.

> *Bir istasyon, bir durak, ve hayatın en güzel ânı.*

## Stack

Saf statik web — build adımı yok.

- HTML5 (semantic, single page)
- Modern CSS (custom props, glassmorphism, IntersectionObserver reveals)
- Vanilla JS (smooth scroll, parallax, live status pill)
- Google Fonts: Cormorant Garamond + Inter
- Görseller: Unsplash CDN, hero video lokal

## Çalıştırma

```bash
cd istasyon-1896
python3 -m http.server 4173
# veya
npx serve .
```

Tarayıcıdan: <http://localhost:4173/index.html>

## Deploy

Vercel'e deploy etmek için:

```bash
vercel deploy
```

Statik olduğu için Netlify, GitHub Pages, Cloudflare Pages — herhangi bir static host çalışır.

## Yapı

```
.
├── index.html              # ana sayfa (single page)
├── styles.css              # tüm stiller
├── script.js               # interaktivite
├── media/
│   └── hero.mp4            # hero arka plan videosu
├── tasarım.txt             # Google Stitch master prompt
├── chatgpt2.txt            # site içi görseller için image promptları
└── chagp2landing.txt       # landing page mockup + hero + showcase promptları
```

## Bölümler

1. **Nav** — sticky glass nav bar, live AÇIK/KAPALI pill
2. **Hero** — sinematik video arka plan, italik serif başlık
3. **Hikâye** — 1896 outline numeral + üç günlük zaman kartı
4. **Lezzetler** — asimetrik bento grid (FOOD / SNACKS / DRINKS)
5. **Atmosfer** — yatay sürüklenebilir mermer fotoğraf strip'i
6. **Instagram** — @istasyon.1896 grid
7. **Ziyaret** — özel SVG harita + adres/saatler glass kartı
8. **Rezervasyon** — WhatsApp + telefon CTA
9. **Footer** — wordmark, sosyal ikonlar, 4 kolon

## İletişim

- Adres: İmbatlı, 1825. Sk. No:17, Karşıyaka / İzmir
- Telefon: 0533 074 32 35
- Saatler: Pzt–Cmt 07:00–23:00 · Pazar 07:00–22:00
- Instagram: [@istasyon.1896](https://www.instagram.com/istasyon.1896/)

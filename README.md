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

### Vercel / Netlify / Cloudflare Pages
```bash
vercel deploy
```
Statik olduğu için herhangi bir static host çalışır.

### Docker (Ubuntu / VDS)

Container içinde nginx:alpine ile **port 3000**'de yayın yapar.

```bash
# clone ya da rsync ile sunucuya at
git clone https://github.com/emreozyoruk/istasyon-1896.git
cd istasyon-1896

# tek komut
docker compose up -d

# ya da manuel
docker build -t istasyon-1896 .
docker run -d -p 3000:3000 --name istasyon-1896 --restart unless-stopped istasyon-1896
```

Site yayında: `http://<sunucu-ip>:3000`

Image ~58 MB. Healthcheck dahil. Gzip + cache header'ları yapılandırılmış. Hero video için byte-range (mp4 modülü) açık.

```bash
# logları izle
docker logs -f istasyon-1896

# durdur / başlat
docker compose down
docker compose up -d

# güncelleme (yeni commit sonrası)
git pull && docker compose up -d --build
```

Reverse-proxy (Nginx / Caddy / Traefik) ile 80/443'e bağlamak istersen:

```nginx
# /etc/nginx/sites-available/istasyon
server {
    listen 80;
    server_name istasyon1896.com www.istasyon1896.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Sonra `certbot --nginx -d istasyon1896.com` ile SSL.

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

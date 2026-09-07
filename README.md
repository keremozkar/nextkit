# Frontend Joe · Pattern Lab

Instagram [@frontendjoe](https://www.instagram.com/frontendjoe) + yüksek yıldızlı UI kit’lerini tek yerde toplar:

- **React Bits** — 171 bileşen, 4 grup (Text Animations · Animations · Components · Backgrounds)
  - React gallery: `/kits/`
  - Next gallery: `/kits-next/`
- **Premium Logins** — Joe Login 3/4 ruhunda 10 React/Next-uyumlu auth referansı (`/premium-logins/`)
- ★ **Favoriler** (localStorage)
- Canlı önizleme + **Copy kod** / **Copy uyarla prompt**
- Arama: **tüm katalogda** (ör. `login`)
- Cursor **MD skill**

> Instagram scrape yok. Kaynaklar GitHub’dan yerelleştirildi.

## Çalıştır

### Docker (önerilen)

```bash
docker compose up --build -d
```

Aç: [http://127.0.0.1:43127](http://127.0.0.1:43127)

### Lokal (Vite)

```bash
npm install
npm run build:kits   # React Bits
npm run build:next   # Next Bits static export
npm run dev
```

Port: **43127**

## Ne için?

Beğendiğin micro-interaction’ı **örnek alıp kendi markana uydurmak** için. Birebir dump değil.

1. Soldan demo seç → canlı önizleme
2. **Copy uyarla prompt** → Cursor’a yapıştır
3. Skill: `public/skills/frontendjoe-patterns/SKILL.md`

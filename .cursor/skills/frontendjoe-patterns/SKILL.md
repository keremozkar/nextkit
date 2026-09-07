---
name: frontendjoe-patterns
description: Adapt frontendjoe (Instagram @frontendjoe) open-source CSS/JS UI patterns into your own projects. Use when the user wants Instagram-style micro-interactions, buttons, loaders, switches, navbars, sidebars, logins, or says "frontendjoe gibi", "şu reel gibi", or wants to copy a Pattern Lab demo as reference—not a verbatim dump.
---

# Frontend Joe Patterns — uyarla, kopyalama dump’ı yapma

Kaynaklar (Instagram’daki gönderilerin açık hali):

- https://github.com/frontend-joe/css-reels — Instagram reels
- https://github.com/frontend-joe/css-components
- https://github.com/frontend-joe/css-navbars
- https://github.com/frontend-joe/es6-components
- https://github.com/frontend-joe/js-components
- https://www.instagram.com/frontendjoe

Bu repodaki **Pattern Lab** canlı HTML önizleme + Copy komutları sunar (`npm run dev`).

## Ne zaman kullan

- Kullanıcı bir frontendjoe / Instagram CSS reel’ini **örnek** gösterip kendi UI’sine uydurmak istiyor
- “Copy kod / Copy uyarla prompt” ile gelen referansı uyguluyorsun
- Micro-interaction, loader, custom checkbox/switch, burger, floating input, dark dashboard chrome

## Altın kural

1. **Pattern’i al** (motion, yapı, state: hover / checked / open)
2. **Markayı değiştir** (renk, font, radius, spacing, copy)
3. **Birebir HTML dump yapma** — aynı etkileşim dilini kendi bileşen API’ne taşı

## Görsel dil (referans — kendi temana map et)

| Token | Joe’da sık | Senin işin |
| --- | --- | --- |
| Surface | `#14171a`, `#333037` | `--surface` |
| Accent | `#8f44fd` | `--brand` |
| Text | `#f9f9f9` / muted white | `--text` / `--muted` |
| Motion | `cubic-bezier(0.87, 0, 0.13, 1)`, 0.2–0.35s | aynı easing ailesi |
| Type | Poppins / Euclid | proje fontu |

## Copy komutları (Pattern Lab)

- **Copy kod** — aktif sekme (veya CSS) kaynağı
- **Copy uyarla prompt** — Cursor’a yapıştırılacak uyarlama brief’i
- **Copy hepsi** — HTML + CSS + JS + uyarlama prompt

Prompt gelince: dosyaları aynen yapıştırma; brief’teki teknikleri mevcut stack’te (React/Vue/vanilla) yeniden kur.

## Kategori cheat-sheet

### Buttons
- İki katman (`original` / `letters`), `overflow: hidden`, hover’da `translateY`
- Harf stagger: `nth-child` + `transition-delay`
- Icon morph: absolute SVG kopyaları

### Loaders
- SVG `stroke-dashoffset` “yolda gezinen” stroke
- `--uib-speed`, `--uib-color`, `--uib-size`
- Stagger: `animation-delay: calc(var(--uib-speed) / -N * i)`

### Inputs
- Floating label: `:focus` / `:valid` + label transform
- İkon absolute; clear/search için minimal JS class toggle

### Switches / checkboxes
- Native input gizle; kardeş `.slider` / box’ı `:checked` ile animasyonla
- Knob: `::before` + `translateX`; bazen inset `box-shadow` ile ay ikonu

### Burgers
- Tek el + `::before` / `::after`; `.open` ile X morph
- JS sadece `classList.toggle`

### Navbars / sidebars / menus
- Sticky/flex header; mobilde drawer
- Sidebar: width/translate + label fade; tek `.collapsed` class

### Logins / signups / cards / footers
- Split hero + form; floating labels; hover-lift cards; multi-column footers

### Carousels / accordions / GSAP
- Track `translateX(index)`; accordion’da `grid-template-rows: 0fr → 1fr`
- GSAP: transform/opacity; ScrollTrigger sparingly

## Uygulama checklist

- [ ] Canlı önizlemede etkileşimi anladın mı?
- [ ] Hangi state’ler var? (`:hover`, `:checked`, `.open`, keyframes)
- [ ] CSS değişkenleri marka token’larına map edildi mi?
- [ ] Reduced motion / focus-visible eklendi mi?
- [ ] Gereksiz DOM/SVG şişmesi budandı mı?

## Örnek kullanıcı dili → davranış

**Kullanıcı:** “frontendjoe buttons part-1’deki signup butonu gibi ama yeşil ve bizim font”

**Sen:** Letter-stagger + sliding overlay pattern’ini koru; `#8f44fd` → marka yeşili; Poppins → proje fontu; bileşeni mevcut Button API’sine entegre et.

**Kullanıcı:** “Copy uyarla prompt” yapıştırır

**Sen:** Prompt’taki teknik listesini uygula; kaynak HTML’i olduğu gibi commit etme.

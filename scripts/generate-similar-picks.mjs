#!/usr/bin/env node
/**
 * Premium “benzer” açık kaynak referans demoları + catalog entries.
 * Joe Login 3/4 + React Bits motion ruhuna yakın stil.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'similar')
fs.mkdirSync(outDir, { recursive: true })

const picks = [
  {
    slug: '01-magic-shimmer-cta',
    title: 'Similar · Magic UI Shimmer CTA',
    category: 'Buttons',
    blurb: 'Magic UI shimmer button ruhu — premium CTA, React/Next copy-paste.',
    source: 'https://github.com/magicuidesign/magicui',
    stars: 22000,
    tags: ['magic-ui', 'button', 'motion', 'react', 'next'],
  },
  {
    slug: '02-aceternity-spotlight-card',
    title: 'Similar · Aceternity Spotlight Card',
    category: 'Cards',
    blurb: 'Aceternity tarzı spotlight/hover kart — SaaS landing premiumluğu.',
    source: 'https://ui.aceternity.com/',
    stars: 28000,
    tags: ['aceternity', 'card', 'spotlight', 'react', 'next'],
  },
  {
    slug: '03-cult-tilt-card',
    title: 'Similar · Cult UI Tilt Card',
    category: 'Cards',
    blurb: 'Cult UI / design-engineer tilt kart — soft 3D, marka paneli.',
    source: 'https://github.com/nolly-studio/cult-ui',
    stars: 5800,
    tags: ['cult-ui', 'tilt', 'card', 'react', 'next'],
  },
  {
    slug: '04-split-auth-pro',
    title: 'Similar · Split Auth Pro',
    category: 'Auth',
    blurb: 'Joe Login 3/4’ün üst seviye hali: split flip + glass + SSO.',
    source: 'https://ui.shadcn.com/blocks/authentication',
    stars: 88000,
    tags: ['login', 'auth', 'shadcn', 'react', 'next'],
  },
  {
    slug: '05-number-ticker',
    title: 'Similar · Number Ticker',
    category: 'Motion',
    blurb: 'Magic UI Number Ticker / CountUp benzeri — metrik vitrinleri için.',
    source: 'https://magicui.design',
    stars: 22000,
    tags: ['countup', 'ticker', 'motion', 'react', 'next'],
  },
  {
    slug: '06-beam-border',
    title: 'Similar · Border Beam',
    category: 'Effects',
    blurb: 'Dönen ışık kenar (Border Beam) — kart/CTA vurgusu.',
    source: 'https://magicui.design',
    stars: 22000,
    tags: ['beam', 'border', 'effect', 'react', 'next'],
  },
  {
    slug: '07-marquee-row',
    title: 'Similar · Logo Marquee',
    category: 'Motion',
    blurb: 'Sonsuz marquee satırı — social proof / logo cloud.',
    source: 'https://magicui.design',
    stars: 22000,
    tags: ['marquee', 'logo', 'motion', 'react', 'next'],
  },
  {
    slug: '08-bento-glow',
    title: 'Similar · Bento Glow',
    category: 'Cards',
    blurb: 'Bento grid + glow hover — modern SaaS feature paneli.',
    source: 'https://ui.aceternity.com/',
    stars: 28000,
    tags: ['bento', 'grid', 'aceternity', 'react', 'next'],
  },
  {
    slug: '09-otp-glass',
    title: 'Similar · OTP Glass Auth',
    category: 'Auth',
    blurb: 'Cam yüzey OTP — Better Auth / Auth.js UI’ya yakın premium verify.',
    source: 'https://www.better-auth.com/',
    stars: 15000,
    tags: ['otp', 'auth', 'login', 'react', 'next'],
  },
  {
    slug: '10-mobile-auth-sheet',
    title: 'Similar · Mobile Auth Sheet',
    category: 'Auth',
    blurb: 'Mobil bottom-sheet auth — RN Web / Next mobile-first.',
    source: 'https://github.com/rnr-org/react-native-reusables',
    stars: 5000,
    tags: ['mobile', 'auth', 'sheet', 'react-native', 'next'],
  },
  {
    slug: '11-gradient-text',
    title: 'Similar · Gradient Text',
    category: 'Motion',
    blurb: 'Animasyonlu gradient yazı — hero headline premiumluğu.',
    source: 'https://magicui.design',
    stars: 22000,
    tags: ['text', 'gradient', 'motion', 'react', 'next'],
  },
  {
    slug: '12-social-oauth-stack',
    title: 'Similar · Social OAuth Stack',
    category: 'Auth',
    blurb: 'Social-first auth stack — Google/GitHub/Apple, SaaS onboarding.',
    source: 'https://ui.shadcn.com/blocks/authentication',
    stars: 88000,
    tags: ['oauth', 'social', 'login', 'react', 'next'],
  },
]

function page(title, bodyCss, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
:root{--bg:#07080b;--ink:#eef1f6;--muted:#8b93a7;--line:rgb(255 255 255/.1);--a:#3d6bff;--b:#6ee7b7;--font:"Instrument Sans",system-ui,sans-serif}
*{box-sizing:border-box}body{margin:0;min-height:100vh;font-family:var(--font);color:var(--ink);background:radial-gradient(800px 420px at 15% -10%,rgb(61 107 255/.28),transparent 55%),radial-gradient(700px 400px at 90% 0,rgb(110 231 183/.12),transparent 50%),var(--bg)}
button,input{font:inherit;color:inherit}
${bodyCss}
</style>
</head>
<body>${bodyHtml}</body>
</html>`
}

const builders = {
  '01-magic-shimmer-cta': () =>
    page(
      'Shimmer CTA',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.btn{position:relative;overflow:hidden;border:0;border-radius:999px;padding:14px 28px;font-weight:700;background:#0a0a0a;cursor:pointer}
.btn::before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgb(255 255 255/.55),transparent 70%);transform:translateX(-120%);animation:shimmer 2.4s infinite}
@keyframes shimmer{to{transform:translateX(120%)}}
.btn span{position:relative;z-index:1}`,
      `<div class="stage"><button class="btn" type="button"><span>Get started — Magic style</span></button></div>`,
    ),
  '02-aceternity-spotlight-card': () =>
    page(
      'Spotlight Card',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.card{width:min(360px,100%);border-radius:18px;padding:24px;border:1px solid var(--line);background:rgb(18 20 26/.9);position:relative;overflow:hidden}
.spot{pointer-events:none;position:absolute;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgb(61 107 255/.35),transparent 65%);transform:translate(-50%,-50%);left:var(--x,50%);top:var(--y,40%);opacity:.9}
h2{margin:0 0 8px;position:relative}p{margin:0;color:var(--muted);position:relative;line-height:1.5}`,
      `<div class="stage"><div class="card" id="c"><div class="spot" id="s"></div><h2>Spotlight Card</h2><p>Aceternity ruhu — imleç ışığı kartı tarar. React’te onMouseMove + CSS variables.</p></div></div>
<script>const c=document.getElementById('c');c.onmousemove=e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')}</script>`,
    ),
  '03-cult-tilt-card': () =>
    page(
      'Tilt Card',
      `.stage{min-height:100vh;display:grid;place-items:center;perspective:900px;padding:24px}
.card{width:min(320px,100%);height:200px;border-radius:18px;border:1px solid var(--line);background:linear-gradient(145deg,#12141a,#1a1030);padding:22px;transform-style:preserve-3d;transition:transform .12s ease-out}
h2{margin:0 0 8px}p{margin:0;color:var(--muted)}`,
      `<div class="stage"><div class="card" id="t"><h2>Cult Tilt</h2><p>Soft 3D tilt — design-engineer kartı.</p></div></div>
<script>const t=document.getElementById('t');t.onmousemove=e=>{const r=t.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;t.style.transform=\`rotateX(\${(-y*10).toFixed(2)}deg) rotateY(\${(x*12).toFixed(2)}deg)\`};t.onmouseleave=()=>t.style.transform='rotateX(0) rotateY(0)'</script>`,
    ),
  '04-split-auth-pro': () =>
    page(
      'Split Auth Pro',
      `.layout{min-height:100vh;display:grid;grid-template-columns:1.05fr 1fr}
.cover{padding:40px;background:linear-gradient(160deg,#1d4ed8,#0f172a 55%,#042f2e);display:flex;flex-direction:column;justify-content:space-between}
.cover h1{font-size:clamp(1.8rem,3vw,2.6rem);margin:0;max-width:11ch;line-height:1.08}
.panel{display:grid;place-items:center;padding:28px}
.card{width:min(360px,100%);display:grid;gap:10px}
input,button{width:100%;border-radius:12px;border:1px solid var(--line);background:#10131a;padding:12px}
button{background:linear-gradient(90deg,var(--a),#14b8a6);border:0;font-weight:700;cursor:pointer}
@media(max-width:800px){.layout{grid-template-columns:1fr}.cover{min-height:180px}}`,
      `<div class="layout"><aside class="cover"><div>◆ Nova</div><div><h1>Auth that feels expensive</h1><p style="opacity:.75">Joe Login 3/4 → React/Next premium split.</p></div><p style="opacity:.5;font-size:.85rem">shadcn · Better Auth</p></aside>
<section class="panel"><div class="card"><h2 style="margin:0">Sign in</h2><input placeholder="Email"/><input type="password" placeholder="Password"/><button type="button">Continue</button></div></section></div>`,
    ),
  '05-number-ticker': () =>
    page(
      'Number Ticker',
      `.stage{min-height:100vh;display:grid;place-items:center;text-align:center}
.n{font-size:clamp(3rem,10vw,5.5rem);font-weight:700;letter-spacing:-.04em}
.l{color:var(--muted);margin-top:8px}`,
      `<div class="stage"><div class="n" id="n">0</div><div class="l">Active users · Number Ticker</div></div>
<script>const el=document.getElementById('n');const to=12840;const t0=performance.now();function frame(t){const p=Math.min(1,(t-t0)/1800);el.textContent=Math.floor(to*(1-Math.pow(1-p,3))).toLocaleString('en-US');if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)</script>`,
    ),
  '06-beam-border': () =>
    page(
      'Border Beam',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.wrap{position:relative;width:min(380px,100%);border-radius:18px;padding:1.5px;overflow:hidden}
.wrap::before{content:"";position:absolute;inset:-40%;background:conic-gradient(from var(--a,0deg),transparent,#3d6bff,transparent 30%);animation:spin 3s linear infinite}
@keyframes spin{to{--a:360deg}}@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}
.inner{position:relative;border-radius:17px;background:#0e1016;padding:28px}
h2{margin:0 0 8px}p{margin:0;color:var(--muted)}`,
      `<div class="stage"><div class="wrap"><div class="inner"><h2>Border Beam</h2><p>Dönen ışık kenar — Magic UI Border Beam referansı.</p></div></div></div>`,
    ),
  '07-marquee-row': () =>
    page(
      'Marquee',
      `.stage{min-height:100vh;display:grid;align-content:center;gap:24px;overflow:hidden}
.row{display:flex;gap:28px;width:max-content;animation:marquee 18s linear infinite;opacity:.85}
.row span{font-size:1.1rem;font-weight:600;letter-spacing:.04em;white-space:nowrap;color:var(--muted)}
@keyframes marquee{to{transform:translateX(-50%)}}
h1{text-align:center;margin:0 0 8px;font-size:1.4rem}`,
      `<div class="stage"><h1>Trusted by teams</h1><div class="row"><span>Vercel</span><span>Linear</span><span>Notion</span><span>Stripe</span><span>Figma</span><span>Raycast</span><span>Vercel</span><span>Linear</span><span>Notion</span><span>Stripe</span><span>Figma</span><span>Raycast</span></div></div>`,
    ),
  '08-bento-glow': () =>
    page(
      'Bento Glow',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.grid{width:min(720px,100%);display:grid;grid-template-columns:1.2fr 1fr;gap:12px}
.cell{border:1px solid var(--line);border-radius:16px;padding:18px;background:#10131a;min-height:120px;transition:border-color .2s,box-shadow .2s}
.cell:hover{border-color:rgb(61 107 255/.5);box-shadow:0 0 40px rgb(61 107 255/.15)}
.cell.tall{grid-row:span 2;min-height:252px}
h3{margin:0 0 6px}p{margin:0;color:var(--muted);font-size:.9rem}
@media(max-width:640px){.grid{grid-template-columns:1fr}.cell.tall{grid-row:auto}}`,
      `<div class="stage"><div class="grid"><div class="cell tall"><h3>Featured</h3><p>Bento + glow hover — Aceternity/Magic landing paneli.</p></div><div class="cell"><h3>Fast</h3><p>Ship UI faster.</p></div><div class="cell"><h3>Motion</h3><p>Framer-ready.</p></div></div></div>`,
    ),
  '09-otp-glass': () =>
    page(
      'OTP Glass',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.card{width:min(400px,100%);border-radius:20px;padding:28px;background:rgb(16 18 24/.75);border:1px solid rgb(255 255 255/.14);backdrop-filter:blur(16px);text-align:center;display:grid;gap:14px}
.otp{display:flex;gap:8px;justify-content:center}
.otp input{width:44px;height:52px;text-align:center;font-size:1.25rem;font-weight:700;border-radius:12px;border:1px solid var(--line);background:#0b0c0f}
button{border:0;border-radius:12px;padding:12px;background:#fff;color:#07080b;font-weight:700;cursor:pointer}`,
      `<div class="stage"><div class="card"><h2 style="margin:0">Verify email</h2><p style="margin:0;color:var(--muted)">6 haneli kod</p><div class="otp" id="o"><input maxlength="1"/><input maxlength="1"/><input maxlength="1"/><input maxlength="1"/><input maxlength="1"/><input maxlength="1"/></div><button type="button">Confirm</button></div></div>
<script>const is=[...document.querySelectorAll('#o input')];is.forEach((el,i)=>{el.addEventListener('input',()=>{if(el.value&&is[i+1])is[i+1].focus()});el.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!el.value&&is[i-1])is[i-1].focus()})});is[0].focus()</script>`,
    ),
  '10-mobile-auth-sheet': () =>
    page(
      'Mobile Auth Sheet',
      `.phone{min-height:100vh;max-width:420px;margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;background:linear-gradient(180deg,#111827,#07080b)}
.sheet{background:#12141a;border:1px solid var(--line);border-radius:22px 22px 16px 16px;padding:22px 18px calc(18px + env(safe-area-inset-bottom));display:grid;gap:10px}
input,button{min-height:48px;border-radius:14px;border:1px solid var(--line);background:#0b0c0f;padding:12px 14px}
button{background:var(--a);border:0;font-weight:700}`,
      `<div class="phone"><div class="sheet"><h2 style="margin:0">Welcome back</h2><p style="margin:0;color:var(--muted)">Mobile sheet auth</p><input placeholder="Email"/><input type="password" placeholder="Password"/><button type="button">Sign in</button></div></div>`,
    ),
  '11-gradient-text': () =>
    page(
      'Gradient Text',
      `.stage{min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px}
.h{font-size:clamp(2.2rem,7vw,4rem);font-weight:800;letter-spacing:-.04em;line-height:1.05;background:linear-gradient(90deg,#60a5fa,#a78bfa,#34d399,#60a5fa);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:flow 4s linear infinite}
@keyframes flow{to{background-position:200% center}}
p{color:var(--muted)}`,
      `<div class="stage"><div class="h">Ship premium motion</div><p>Gradient text · Magic UI / React Bits ailesi</p></div>`,
    ),
  '12-social-oauth-stack': () =>
    page(
      'Social OAuth',
      `.stage{min-height:100vh;display:grid;place-items:center;padding:24px}
.card{width:min(380px,100%);border-radius:18px;border:1px solid var(--line);background:#10131a;padding:24px;display:grid;gap:10px;text-align:center}
button{border:1px solid var(--line);border-radius:12px;background:#0b0c0f;padding:12px;cursor:pointer;font-weight:500}
.or{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;color:var(--muted);font-size:.8rem}
.or::before,.or::after{content:"";height:1px;background:var(--line)}
input{border:1px solid var(--line);border-radius:12px;background:#0b0c0f;padding:12px}
.primary{background:#fff;color:#07080b;border:0;font-weight:700}`,
      `<div class="stage"><div class="card"><h2 style="margin:0">Continue</h2><button type="button">Google</button><button type="button">GitHub</button><button type="button">Apple</button><div class="or">or email</div><input placeholder="you@company.com"/><button class="primary" type="button">Continue with email</button></div></div>`,
    ),
}

const items = []
for (const p of picks) {
  const dir = path.join(outDir, p.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), builders[p.slug]())
  items.push({
    id: `similar-${p.slug}`,
    kind: 'local',
    group: 'similar',
    groupLabel: 'Benzer · Önerilen',
    groupOrder: 1.2,
    stack: 'react/next',
    category: p.category,
    title: p.title,
    blurb: p.blurb,
    preview: `/similar/${p.slug}/index.html`,
    previewMode: 'iframe',
    liveUrl: `/similar/${p.slug}/index.html`,
    source: p.source,
    stars: p.stars,
    tags: p.tags,
    files: {
      html: `/similar/${p.slug}/index.html`,
      css: null,
      js: null,
      allCss: [],
      allJs: [],
    },
  })
}

// mobile stubs — phone-framed references
const mobileDir = path.join(root, 'public', 'mobile-kits')
fs.mkdirSync(mobileDir, { recursive: true })
const mobilePicks = [
  {
    slug: 'rn-reusables-auth',
    title: 'Mobile · RN Reusables Auth',
    category: 'Auth',
    blurb: 'react-native-reusables tarzı mobil auth — shadcn ruhu RN’de.',
    source: 'https://github.com/rnr-org/react-native-reusables',
    stars: 5000,
  },
  {
    slug: 'gluestack-form',
    title: 'Mobile · gluestack Form',
    category: 'Forms',
    blurb: 'gluestack-ui form / input stack — erişilebilir mobil form.',
    source: 'https://github.com/gluestack/gluestack-ui',
    stars: 4000,
  },
  {
    slug: 'nativewind-sheet',
    title: 'Mobile · NativeWind Sheet',
    category: 'Sheets',
    blurb: 'NativeWind + bottom sheet pattern — Tailwind RN.',
    source: 'https://www.nativewind.dev/',
    stars: 6000,
  },
]
const mobileItems = []
for (const m of mobilePicks) {
  const dir = path.join(mobileDir, m.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    page(
      m.title,
      `.phone{min-height:100vh;max-width:390px;margin:0 auto;padding:20px 16px;display:flex;flex-direction:column;gap:12px;justify-content:center;background:#05070a}
.badge{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--b)}
h1{margin:0;font-size:1.6rem}p{margin:0;color:var(--muted);line-height:1.45}
.box{border:1px solid var(--line);border-radius:16px;padding:16px;background:#10131a;display:grid;gap:8px}
input,button{min-height:44px;border-radius:12px;border:1px solid var(--line);background:#0b0c0f;padding:10px 12px}
button{background:var(--a);border:0;font-weight:700}`,
      `<div class="phone"><div class="badge">Mobile kit</div><h1>${m.title.replace('Mobile · ', '')}</h1><p>${m.blurb}</p><div class="box"><input placeholder="Email"/><input type="password" placeholder="Password"/><button type="button">Continue</button></div><p style="font-size:.8rem">Kaynak: ${m.source}</p></div>`,
    ),
  )
  mobileItems.push({
    id: `mobile-${m.slug}`,
    kind: 'local',
    group: 'mobile',
    groupLabel: 'Mobil · React Native',
    groupOrder: 2,
    stack: 'react-native',
    category: m.category,
    title: m.title,
    blurb: m.blurb,
    preview: `/mobile-kits/${m.slug}/index.html`,
    previewMode: 'iframe',
    liveUrl: `/mobile-kits/${m.slug}/index.html`,
    source: m.source,
    stars: m.stars,
    tags: ['mobile', 'react-native', m.category.toLowerCase()],
    files: { html: `/mobile-kits/${m.slug}/index.html`, css: null, js: null, allCss: [], allJs: [] },
  })
}

const catalogPath = path.join(root, 'public', 'catalog.json')
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
catalog.items = [
  ...catalog.items.filter((i) => !String(i.id).startsWith('similar-') && !String(i.id).startsWith('mobile-')),
  ...items,
  ...mobileItems,
]
catalog.meta = { ...(catalog.meta || {}), similarCount: items.length, mobileCount: mobileItems.length }
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n')

const manifestPath = path.join(root, 'public', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
if (!manifest.groups.some((g) => g.id === 'similar')) {
  manifest.groups.push({ id: 'similar', label: 'Benzer · Önerilen', order: 1.2 })
  manifest.groups.sort((a, b) => a.order - b.order)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
}

console.log('similar', items.length, 'mobile', mobileItems.length, 'catalog', catalog.items.length)

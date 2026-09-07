#!/usr/bin/env node
/**
 * Joe Login 3/4 tarzı (split flip / sliding forms) premium React/Next-uyumlu
 * referans demoları üretir ve catalog.json'a ekler.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'premium-logins')
fs.mkdirSync(outDir, { recursive: true })

const demos = [
  {
    slug: '01-split-flip-glass',
    title: 'Premium Login · Split Flip Glass',
    blurb: 'Joe Login 3’ün modern cam/gradient versiyonu — kayan hero + form flip. React/Next’e kolay uyarlanır.',
    tags: ['login', 'split', 'flip', 'glass', 'react', 'next'],
  },
  {
    slug: '02-dual-slide-panels',
    title: 'Premium Login · Dual Slide Panels',
    blurb: 'Joe Login 4 ruhu: iki form paneli + kayan arka plan katmanları. Sign in / Sign up geçişi.',
    tags: ['login', 'slide', 'register', 'react', 'next'],
  },
  {
    slug: '03-shadcn-centered',
    title: 'Premium Login · Centered Card',
    blurb: 'shadcn login-01 tarzı ortalanmış kart — email/şifre + sosyal. Next App Router’a birebir uyar.',
    tags: ['login', 'shadcn', 'card', 'react', 'next'],
  },
  {
    slug: '04-cover-split',
    title: 'Premium Login · Cover Split',
    blurb: 'shadcn login-02: sol marka paneli + sağ form. B2B SaaS’ın klasik premium auth düzeni.',
    tags: ['login', 'split', 'saas', 'react', 'next'],
  },
  {
    slug: '05-social-first',
    title: 'Premium Login · Social First',
    blurb: 'OAuth öncelikli — Google/GitHub/Apple + “email ile devam”. Minimal, yüksek dönüşüm.',
    tags: ['login', 'oauth', 'social', 'react', 'next'],
  },
  {
    slug: '06-magic-link',
    title: 'Premium Login · Magic Link',
    blurb: 'Şifresiz magic link / OTP akışı. Better Auth / Auth.js ile Next’te yaygın pattern.',
    tags: ['login', 'magic-link', 'otp', 'react', 'next'],
  },
  {
    slug: '07-otp-verify',
    title: 'Premium Login · OTP Verify',
    blurb: '6 haneli OTP doğrulama ekranı — premium spacing, otomatik odak geçişi.',
    tags: ['login', 'otp', 'verify', 'react', 'next'],
  },
  {
    slug: '08-brand-bleed',
    title: 'Premium Login · Brand Bleed',
    blurb: 'Tam yükseklik marka görseli + yüzen form kartı. Landing ↔ auth geçişi için.',
    tags: ['login', 'brand', 'hero', 'react', 'next'],
  },
  {
    slug: '09-floating-labels',
    title: 'Premium Login · Floating Labels',
    blurb: 'Floating label input’lar, soft motion, dark luxury yüzey. React controlled input’lara map edilir.',
    tags: ['login', 'form', 'a11y', 'react', 'next'],
  },
  {
    slug: '10-mobile-stack',
    title: 'Premium Login · Mobile Stack',
    blurb: 'Mobil-first dikey auth: büyük dokunma alanları, sticky CTA, safe-area. RN Web / Next mobile için.',
    tags: ['login', 'mobile', 'responsive', 'react', 'next'],
  },
]

function shell(title, bodyCss, bodyHtml, extraJs = '') {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0b0c0f;
      --surface: #12141a;
      --ink: #eef1f6;
      --muted: #8b93a7;
      --line: rgb(255 255 255 / 10%);
      --accent: #3d6bff;
      --accent-2: #6ee7b7;
      --danger: #ff6b7a;
      --radius: 18px;
      --font: "Instrument Sans", system-ui, sans-serif;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      font-family: var(--font);
      color: var(--ink);
      background:
        radial-gradient(900px 500px at 10% -10%, rgb(61 107 255 / 28%), transparent 55%),
        radial-gradient(700px 420px at 90% 0%, rgb(110 231 183 / 12%), transparent 50%),
        var(--bg);
      min-height: 100vh;
    }
    button, input { font: inherit; color: inherit; }
    a { color: var(--accent-2); }
    ${bodyCss}
  </style>
</head>
<body>
${bodyHtml}
<script>
${extraJs}
</script>
</body>
</html>`
}

const builders = {
  '01-split-flip-glass': () =>
    shell(
      'Split Flip Glass',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        position: relative; width: min(720px, 100%); height: 460px;
        border-radius: var(--radius); overflow: hidden;
        background: rgb(18 20 26 / 80%);
        border: 1px solid var(--line);
        backdrop-filter: blur(18px);
        box-shadow: 0 30px 80px rgb(0 0 0 / 45%);
      }
      .panel {
        position: absolute; inset: 0 auto 0 0; width: 50%;
        background: linear-gradient(135deg, #3d6bff, #1e3a8a 55%, #0f766e);
        transition: transform .55s cubic-bezier(.22,1,.36,1);
        z-index: 2;
      }
      .card.signin .panel { transform: translateX(100%); }
      .hero, .form {
        position: absolute; width: 50%; height: 100%; padding: 36px 28px;
        display: grid; align-content: center; gap: 12px;
        opacity: 0; visibility: hidden; transition: .45s ease;
      }
      .hero.active, .form.active { opacity: 1; visibility: visible; }
      .hero { color: white; z-index: 3; }
      .hero.signup { left: 0; }
      .hero.signin { right: 0; text-align: right; }
      .form.signup { right: 0; }
      .form.signin { left: 0; }
      h2 { margin: 0; font-size: 1.6rem; }
      p { margin: 0; color: rgb(255 255 255 / 80%); line-height: 1.45; font-size: .95rem; }
      .form p { color: var(--muted); }
      form { display: grid; gap: 10px; margin-top: 8px; }
      input {
        border: 1px solid var(--line); background: rgb(0 0 0 / 25%);
        border-radius: 12px; padding: 12px 14px; outline: none;
      }
      input:focus { border-color: rgb(61 107 255 / 60%); }
      .btn {
        border: 0; border-radius: 999px; padding: 12px 18px; cursor: pointer;
        background: white; color: #0b0c0f; font-weight: 600;
      }
      .hero .btn { background: rgb(255 255 255 / 14%); color: white; border: 1px solid rgb(255 255 255 / 25%); }
      .sso { display: flex; gap: 8px; }
      .sso button {
        flex: 1; border-radius: 10px; border: 1px solid var(--line);
        background: rgb(255 255 255 / 4%); padding: 10px; cursor: pointer;
      }
      @media (max-width: 700px) {
        .card { height: auto; min-height: 560px; }
        .panel, .hero, .form { width: 100%; }
        .panel { height: 38%; inset: 0 0 auto 0; }
        .card.signin .panel { transform: translateY(163%); }
        .hero.signup, .form.signin { top: 0; height: 38%; }
        .hero.signin, .form.signup { top: 38%; height: 62%; }
        .hero.signin { text-align: left; }
      }
      `,
      `
      <div class="stage">
        <div class="card" id="card">
          <div class="panel"></div>
          <div class="hero signup active">
            <h2>Tekrar hoş geldin</h2>
            <p>Yatırımlarını ve son hareketlerini tek ekranda gör.</p>
            <button class="btn" type="button" data-mode="signin">Giriş yap</button>
          </div>
          <div class="form signup active">
            <h2>Hesap oluştur</h2>
            <div class="sso">
              <button type="button">Google</button>
              <button type="button">GitHub</button>
            </div>
            <p>veya e-posta ile</p>
            <form onsubmit="return false">
              <input placeholder="Ad soyad" autocomplete="name" />
              <input type="email" placeholder="E-posta" autocomplete="email" />
              <input type="password" placeholder="Şifre" autocomplete="new-password" />
              <button class="btn" type="submit">Kayıt ol</button>
            </form>
          </div>
          <div class="hero signin">
            <h2>Yeni misin?</h2>
            <p>Birkaç saniyede başla — premium auth akışı.</p>
            <button class="btn" type="button" data-mode="signup">Kayıt ol</button>
          </div>
          <div class="form signin">
            <h2>Giriş yap</h2>
            <form onsubmit="return false">
              <input type="email" placeholder="E-posta" autocomplete="email" />
              <input type="password" placeholder="Şifre" autocomplete="current-password" />
              <button class="btn" type="submit">Giriş</button>
            </form>
          </div>
        </div>
      </div>
      `,
      `
      const card = document.getElementById('card');
      document.querySelectorAll('[data-mode]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.mode;
          card.classList.toggle('signin', mode === 'signin');
          card.querySelectorAll('.hero, .form').forEach((el) => {
            el.classList.toggle('active', el.classList.contains(mode));
          });
        });
      });
      `,
    ),

  '02-dual-slide-panels': () =>
    shell(
      'Dual Slide Panels',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        position: relative; width: min(680px, 100%); height: 420px;
        border-radius: var(--radius); overflow: hidden; background: #10131a;
        border: 1px solid var(--line);
      }
      .bg {
        position: absolute; inset: 0 auto 0 0; width: 50%;
        background: linear-gradient(160deg, #1d4ed8, #0f172a);
        transition: transform .55s cubic-bezier(.22,1,.36,1);
      }
      .bg.b2 { background: linear-gradient(160deg, #0f766e, #042f2e); opacity: .0; }
      .card.signup .bg.b1 { transform: translateX(100%); }
      .card.signup .bg.b2 { opacity: 1; transform: translateX(100%); }
      .form {
        position: absolute; top: 0; bottom: 0; width: 50%; padding: 40px 32px;
        display: grid; align-content: center; gap: 10px;
        transition: transform .55s cubic-bezier(.22,1,.36,1), opacity .35s;
      }
      .form.signin { left: 0; }
      .form.signup { right: 0; opacity: .35; pointer-events: none; }
      .card.signup .form.signin { opacity: .35; pointer-events: none; }
      .card.signup .form.signup { opacity: 1; pointer-events: auto; }
      h2 { margin: 0 0 8px; }
      input, button {
        width: 100%; border-radius: 12px; border: 1px solid var(--line);
        background: rgb(255 255 255 / 4%); padding: 12px 14px;
      }
      button.primary {
        background: linear-gradient(90deg, #3d6bff, #22c55e);
        border: 0; font-weight: 600; cursor: pointer; margin-top: 6px;
      }
      .switch { color: var(--muted); font-size: .9rem; cursor: pointer; margin-top: 8px; }
      .switch em { color: var(--ink); font-style: normal; font-weight: 600; }
      @media (max-width: 680px) {
        .card { height: auto; }
        .bg { display: none; }
        .form { position: relative; width: 100%; }
        .form.signup { display: none; }
        .card.signup .form.signin { display: none; }
        .card.signup .form.signup { display: grid; opacity: 1; pointer-events: auto; }
      }
      `,
      `
      <div class="stage">
        <div class="card" id="card">
          <div class="bg b1"></div>
          <div class="bg b2"></div>
          <div class="form signin">
            <h2>Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button class="primary" type="button">Sign in</button>
            <p class="switch" data-to="signup">Hesabın yok mu? <em>Sign up</em></p>
          </div>
          <div class="form signup">
            <h2>Register</h2>
            <input placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button class="primary" type="button">Create account</button>
            <p class="switch" data-to="signin">Zaten üye misin? <em>Sign in</em></p>
          </div>
        </div>
      </div>
      `,
      `
      const card = document.getElementById('card');
      document.querySelectorAll('[data-to]').forEach((el) => {
        el.addEventListener('click', () => {
          card.classList.toggle('signup', el.dataset.to === 'signup');
        });
      });
      `,
    ),

  '03-shadcn-centered': () =>
    shell(
      'Centered Card',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .wrap { width: min(380px, 100%); display: grid; gap: 18px; }
      .brand { display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; }
      .logo { width: 28px; height: 28px; border-radius: 8px; background: var(--accent); display: grid; place-items: center; }
      .card {
        background: var(--surface); border: 1px solid var(--line); border-radius: 16px;
        padding: 28px 24px; display: grid; gap: 14px;
      }
      h1 { margin: 0; font-size: 1.35rem; text-align: center; }
      .sub { margin: 0; text-align: center; color: var(--muted); font-size: .9rem; }
      label { display: grid; gap: 6px; font-size: .85rem; color: var(--muted); }
      input {
        border: 1px solid var(--line); background: #0b0c0f; border-radius: 10px;
        padding: 11px 12px; color: var(--ink);
      }
      .row { display: flex; justify-content: space-between; align-items: center; font-size: .85rem; }
      .primary {
        border: 0; border-radius: 10px; padding: 11px; background: white; color: #0b0c0f;
        font-weight: 600; cursor: pointer;
      }
      .ghost {
        border: 1px solid var(--line); border-radius: 10px; padding: 11px;
        background: transparent; cursor: pointer;
      }
      .foot { text-align: center; color: var(--muted); font-size: .85rem; }
      `,
      `
      <div class="stage">
        <div class="wrap">
          <div class="brand"><span class="logo">◆</span> Acme Inc</div>
          <div class="card">
            <h1>Hesabına giriş yap</h1>
            <p class="sub">E-posta ve şifrenle devam et</p>
            <label>E-posta<input type="email" placeholder="you@company.com" /></label>
            <label>Şifre<input type="password" placeholder="••••••••" /></label>
            <div class="row"><span></span><a href="#">Şifremi unuttum</a></div>
            <button class="primary" type="button">Giriş yap</button>
            <button class="ghost" type="button">Google ile devam</button>
          </div>
          <p class="foot">Hesabın yok mu? <a href="#">Kayıt ol</a></p>
        </div>
      </div>
      `,
    ),

  '04-cover-split': () =>
    shell(
      'Cover Split',
      `
      .layout {
        min-height: 100vh; display: grid; grid-template-columns: 1.05fr 1fr;
      }
      .cover {
        position: relative; overflow: hidden;
        background:
          linear-gradient(160deg, rgb(15 23 42 / 40%), rgb(2 6 23 / 85%)),
          radial-gradient(circle at 30% 20%, #60a5fa, transparent 45%),
          radial-gradient(circle at 70% 70%, #34d399, transparent 40%),
          #0f172a;
        padding: 40px; display: flex; flex-direction: column; justify-content: space-between;
      }
      .cover h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); margin: 0; max-width: 12ch; line-height: 1.1; }
      .cover p { color: rgb(255 255 255 / 72%); max-width: 36ch; }
      .panel { display: grid; place-items: center; padding: 32px; background: #0b0c0f; }
      .card { width: min(360px, 100%); display: grid; gap: 12px; }
      h1 { margin: 0; font-size: 1.5rem; }
      .muted { color: var(--muted); margin: 0 0 8px; }
      input, button {
        width: 100%; border-radius: 11px; border: 1px solid var(--line);
        background: var(--surface); padding: 12px; 
      }
      button.primary { background: var(--accent); border: 0; font-weight: 600; cursor: pointer; }
      @media (max-width: 860px) {
        .layout { grid-template-columns: 1fr; }
        .cover { min-height: 220px; }
      }
      `,
      `
      <div class="layout">
        <aside class="cover">
          <div class="brand">◆ Nova</div>
          <div>
            <h2>Ship auth that feels expensive</h2>
            <p>Split cover + form — shadcn login-02 / B2B SaaS classic.</p>
          </div>
          <p style="opacity:.55;font-size:.85rem">React · Next · Hono UI</p>
        </aside>
        <section class="panel">
          <div class="card">
            <h1>Welcome back</h1>
            <p class="muted">Sign in to your workspace</p>
            <input type="email" placeholder="Work email" />
            <input type="password" placeholder="Password" />
            <button class="primary" type="button">Continue</button>
            <p class="muted" style="text-align:center">or <a href="#">create an account</a></p>
          </div>
        </section>
      </div>
      `,
    ),

  '05-social-first': () =>
    shell(
      'Social First',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        width: min(400px, 100%); background: var(--surface); border: 1px solid var(--line);
        border-radius: 20px; padding: 28px; display: grid; gap: 12px; text-align: center;
      }
      h1 { margin: 0; font-size: 1.45rem; }
      p { margin: 0; color: var(--muted); }
      .providers { display: grid; gap: 10px; margin-top: 8px; }
      .providers button {
        border: 1px solid var(--line); border-radius: 12px; background: #0b0c0f;
        padding: 12px; cursor: pointer; font-weight: 500;
      }
      .or { display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; color: var(--muted); font-size: .8rem; }
      .or::before, .or::after { content: ""; height: 1px; background: var(--line); }
      input { border: 1px solid var(--line); border-radius: 12px; background: #0b0c0f; padding: 12px; text-align: left; }
      .primary { border: 0; border-radius: 12px; padding: 12px; background: white; color: #0b0c0f; font-weight: 600; cursor: pointer; }
      `,
      `
      <div class="stage">
        <div class="card">
          <h1>Devam et</h1>
          <p>Tercih ettiğin hesapla saniyeler içinde giriş</p>
          <div class="providers">
            <button type="button">Google ile devam</button>
            <button type="button">GitHub ile devam</button>
            <button type="button">Apple ile devam</button>
          </div>
          <div class="or">veya e-posta</div>
          <input type="email" placeholder="you@email.com" />
          <button class="primary" type="button">E-posta ile devam</button>
        </div>
      </div>
      `,
    ),

  '06-magic-link': () =>
    shell(
      'Magic Link',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        width: min(420px, 100%); border-radius: 22px; padding: 32px 28px;
        background: linear-gradient(180deg, rgb(255 255 255 / 6%), rgb(255 255 255 / 2%));
        border: 1px solid var(--line); display: grid; gap: 14px;
      }
      .badge {
        width: fit-content; font-size: .75rem; letter-spacing: .08em; text-transform: uppercase;
        color: var(--accent-2); border: 1px solid rgb(110 231 183 / 30%);
        border-radius: 999px; padding: 6px 10px;
      }
      h1 { margin: 0; font-size: 1.55rem; }
      p { margin: 0; color: var(--muted); line-height: 1.5; }
      input, button { border-radius: 12px; padding: 13px 14px; border: 1px solid var(--line); }
      input { background: #0b0c0f; }
      button { background: var(--accent); border: 0; font-weight: 600; cursor: pointer; }
      .note { font-size: .85rem; color: var(--muted); }
      `,
      `
      <div class="stage">
        <div class="card">
          <span class="badge">Passwordless</span>
          <h1>Magic link gönder</h1>
          <p>E-postana tek kullanımlık giriş bağlantısı gelir. Better Auth / Auth.js ile Next’te standart.</p>
          <input type="email" placeholder="work@company.com" />
          <button type="button">Linki gönder</button>
          <p class="note">Spam klasörünü de kontrol et. Link 15 dk geçerli.</p>
        </div>
      </div>
      `,
    ),

  '07-otp-verify': () =>
    shell(
      'OTP Verify',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        width: min(420px, 100%); background: var(--surface); border: 1px solid var(--line);
        border-radius: 20px; padding: 30px; display: grid; gap: 16px; text-align: center;
      }
      h1 { margin: 0; }
      p { margin: 0; color: var(--muted); }
      .otp { display: flex; gap: 10px; justify-content: center; }
      .otp input {
        width: 48px; height: 56px; text-align: center; font-size: 1.35rem; font-weight: 600;
        border-radius: 12px; border: 1px solid var(--line); background: #0b0c0f;
      }
      button {
        border: 0; border-radius: 12px; padding: 12px; background: white; color: #0b0c0f;
        font-weight: 600; cursor: pointer;
      }
      `,
      `
      <div class="stage">
        <div class="card">
          <h1>Kodu gir</h1>
          <p>you@company.com adresine 6 haneli kod gönderdik</p>
          <div class="otp" id="otp">
            <input maxlength="1" inputmode="numeric" /><input maxlength="1" inputmode="numeric" />
            <input maxlength="1" inputmode="numeric" /><input maxlength="1" inputmode="numeric" />
            <input maxlength="1" inputmode="numeric" /><input maxlength="1" inputmode="numeric" />
          </div>
          <button type="button">Doğrula</button>
          <p><a href="#">Tekrar gönder</a></p>
        </div>
      </div>
      `,
      `
      const inputs = [...document.querySelectorAll('#otp input')];
      inputs.forEach((input, i) => {
        input.addEventListener('input', () => {
          if (input.value && inputs[i + 1]) inputs[i + 1].focus();
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !input.value && inputs[i - 1]) inputs[i - 1].focus();
        });
      });
      inputs[0]?.focus();
      `,
    ),

  '08-brand-bleed': () =>
    shell(
      'Brand Bleed',
      `
      .stage {
        min-height: 100vh; display: grid; place-items: center; padding: 24px;
        background:
          linear-gradient(120deg, rgb(11 12 15 / 55%), rgb(11 12 15 / 85%)),
          radial-gradient(circle at 20% 30%, #2563eb, transparent 35%),
          radial-gradient(circle at 80% 20%, #14b8a6, transparent 30%),
          #020617;
      }
      .card {
        width: min(400px, 100%); border-radius: 24px; padding: 28px;
        background: rgb(12 14 20 / 78%); border: 1px solid rgb(255 255 255 / 14%);
        backdrop-filter: blur(20px); display: grid; gap: 12px;
        box-shadow: 0 40px 100px rgb(0 0 0 / 45%);
      }
      .eyebrow { letter-spacing: .14em; text-transform: uppercase; font-size: .72rem; color: var(--accent-2); }
      h1 { margin: 0; font-size: 1.7rem; }
      p { margin: 0; color: var(--muted); }
      input, button { border-radius: 12px; padding: 12px; border: 1px solid var(--line); background: rgb(0 0 0 / 35%); }
      button { background: linear-gradient(90deg, #3d6bff, #14b8a6); border: 0; font-weight: 600; cursor: pointer; }
      `,
      `
      <div class="stage">
        <div class="card">
          <div class="eyebrow">Atlas</div>
          <h1>Markanı taşıyan auth</h1>
          <p>Full-bleed atmosfer + yüzen form — landing’den auth’a soft geçiş.</p>
          <input type="email" placeholder="E-posta" />
          <input type="password" placeholder="Şifre" />
          <button type="button">Workspace’e gir</button>
        </div>
      </div>
      `,
    ),

  '09-floating-labels': () =>
    shell(
      'Floating Labels',
      `
      .stage { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card {
        width: min(400px, 100%); background: #0e1016; border: 1px solid var(--line);
        border-radius: 18px; padding: 28px; display: grid; gap: 18px;
      }
      h1 { margin: 0; font-size: 1.4rem; }
      .field { position: relative; }
      .field input {
        width: 100%; border: 1px solid var(--line); background: transparent;
        border-radius: 12px; padding: 18px 14px 10px; outline: none;
      }
      .field label {
        position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        color: var(--muted); pointer-events: none; transition: .18s ease;
      }
      .field input:focus, .field input:not(:placeholder-shown) { border-color: rgb(61 107 255 / 55%); }
      .field input:focus + label,
      .field input:not(:placeholder-shown) + label {
        top: 10px; transform: none; font-size: .7rem; color: var(--accent-2);
      }
      button {
        border: 0; border-radius: 12px; padding: 12px; background: white; color: #0b0c0f;
        font-weight: 600; cursor: pointer;
      }
      `,
      `
      <div class="stage">
        <div class="card">
          <h1>Giriş</h1>
          <div class="field">
            <input id="email" placeholder=" " type="email" />
            <label for="email">E-posta</label>
          </div>
          <div class="field">
            <input id="pass" placeholder=" " type="password" />
            <label for="pass">Şifre</label>
          </div>
          <button type="button">Devam</button>
        </div>
      </div>
      `,
    ),

  '10-mobile-stack': () =>
    shell(
      'Mobile Stack',
      `
      .phone {
        min-height: 100vh; max-width: 420px; margin: 0 auto;
        display: flex; flex-direction: column; padding: 28px 20px calc(20px + env(safe-area-inset-bottom));
        background: #07080b;
      }
      .top { flex: 1; display: grid; align-content: end; gap: 10px; padding-bottom: 28px; }
      h1 { margin: 0; font-size: 2rem; line-height: 1.1; }
      p { margin: 0; color: var(--muted); }
      .sheet {
        display: grid; gap: 12px; padding-top: 8px;
      }
      input, button {
        width: 100%; min-height: 52px; border-radius: 14px; border: 1px solid var(--line);
        background: #12141a; padding: 14px 16px; font-size: 1rem;
      }
      button.primary {
        background: var(--accent); border: 0; font-weight: 700; position: sticky; bottom: 0;
      }
      .links { display: flex; justify-content: space-between; color: var(--muted); font-size: .9rem; }
      `,
      `
      <div class="phone">
        <div class="top">
          <h1>Merhaba<br/>tekrar</h1>
          <p>Mobil-first auth — büyük dokunma alanları, sticky CTA.</p>
        </div>
        <div class="sheet">
          <input type="email" placeholder="E-posta" />
          <input type="password" placeholder="Şifre" />
          <div class="links"><a href="#">Şifremi unuttum</a><a href="#">Kayıt</a></div>
          <button class="primary" type="button">Giriş yap</button>
        </div>
      </div>
      `,
    ),
}

const items = []
for (const d of demos) {
  const dir = path.join(outDir, d.slug)
  fs.mkdirSync(dir, { recursive: true })
  const html = builders[d.slug]()
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  // React uyarlama notu — Copy panel için
  const reactHint = `// ${d.title}
// React/Next uyarlama iskeleti (örnek):
export function LoginScreen() {
  // Joe Login 3/4 motion: panel translate + opacity toggle
  // shadcn: npx shadcn@latest add login-01 .. login-05
  return null
}
`
  fs.writeFileSync(path.join(dir, 'react-adapt.tsx'), reactHint)
  items.push({
    id: `premium-login-${d.slug}`,
    kind: 'local',
    group: 'premium-logins',
    groupLabel: 'Premium · Logins (React/Next)',
    groupOrder: 1.5,
    stack: 'react/next',
    category: 'Logins',
    title: d.title,
    blurb: d.blurb,
    preview: `/premium-logins/${d.slug}/index.html`,
    previewMode: 'iframe',
    liveUrl: `/premium-logins/${d.slug}/index.html`,
    source: 'https://ui.shadcn.com/blocks/authentication + Joe Login 3/4 patterns',
    stars: null,
    tags: d.tags,
    files: {
      html: `/premium-logins/${d.slug}/index.html`,
      css: null,
      js: `/premium-logins/${d.slug}/react-adapt.tsx`,
      allCss: [],
      allJs: [`/premium-logins/${d.slug}/react-adapt.tsx`],
    },
  })
}

// Patch catalog.json
const catalogPath = path.join(root, 'public', 'catalog.json')
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
catalog.items = [
  ...catalog.items.filter((i) => !String(i.id).startsWith('premium-login-')),
  ...items,
]
catalog.meta = {
  ...(catalog.meta || {}),
  premiumLogins: items.length,
  premiumLoginsPath: '/premium-logins/',
}
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n')

// Patch manifest groups
const manifestPath = path.join(root, 'public', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const hasGroup = manifest.groups.some((g) => g.id === 'premium-logins')
if (!hasGroup) {
  manifest.groups.push({
    id: 'premium-logins',
    label: 'Premium · Logins (React/Next)',
    order: 1.5,
  })
  manifest.groups.sort((a, b) => a.order - b.order)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
}

console.log('Wrote', items.length, 'premium logins →', outDir)
console.log('Catalog items now:', catalog.items.length)

import './style.css'
import { howItWorksFor } from './howItWorks'

type DemoFiles = {
  html: string
  css: string | null
  js: string | null
  allCss?: string[]
  allJs?: string[]
}

type Demo = {
  id: string
  collection: string
  collectionLabel: string
  category: string
  part: string
  path: string
  title: string
  preview: string
  files: DemoFiles
  source: string
}

type Manifest = {
  attribution: string
  instagram: string
  website?: string
  sources: { id: string; label: string; url: string }[]
  count: number
  demos: Demo[]
}

type Tab = 'live' | 'html' | 'css' | 'js' | 'how'

const app = document.querySelector<HTMLDivElement>('#app')!

let manifest: Manifest | null = null
let activeId: string | null = null
let activeTab: Tab = 'live'
let collectionFilter = 'all'
let query = ''
const codeCache = new Map<string, string>()

function esc(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function filteredDemos(): Demo[] {
  if (!manifest) return []
  const q = query.trim().toLowerCase()
  return manifest.demos.filter((d) => {
    if (collectionFilter !== 'all' && d.collection !== collectionFilter) return false
    if (!q) return true
    return (
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.collectionLabel.toLowerCase().includes(q) ||
      d.path.toLowerCase().includes(q)
    )
  })
}

function activeDemo(): Demo | null {
  const list = filteredDemos()
  return list.find((d) => d.id === activeId) ?? list[0] ?? null
}

async function loadText(url: string): Promise<string> {
  if (codeCache.has(url)) return codeCache.get(url)!
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not load ${url}`)
  const text = await res.text()
  codeCache.set(url, text)
  return text
}

async function loadTabCode(demo: Demo, tab: Exclude<Tab, 'live' | 'how'>): Promise<string> {
  if (tab === 'html') return loadText(demo.files.html)
  if (tab === 'css') {
    const files = demo.files.allCss?.length
      ? demo.files.allCss
      : demo.files.css
        ? [demo.files.css]
        : []
    if (!files.length) return '/* No CSS file in this demo */'
    const parts = await Promise.all(
      files.map(async (f) => `/* ===== ${f} ===== */\n${await loadText(f)}`),
    )
    return parts.join('\n\n')
  }
  const files = demo.files.allJs?.length
    ? demo.files.allJs
    : demo.files.js
      ? [demo.files.js]
      : []
  if (!files.length) return '// No JavaScript — this one is CSS-only'
  const parts = await Promise.all(
    files.map(async (f) => `// ===== ${f} =====\n${await loadText(f)}`),
  )
  return parts.join('\n\n')
}

function adaptPrompt(demo: Demo): string {
  const how = howItWorksFor(demo.category, demo.collection)
  return [
    `Referans: frontendjoe "${demo.title}" (${demo.collectionLabel}).`,
    `Kaynak: ${demo.source} → ${demo.path}`,
    `Önizleme path: ${demo.preview}`,
    '',
    'İstediğim: Bu tasarımı/motion fikrini kendi projeme UYARLA — birebir kopyalama.',
    `Kategori özeti: ${how.summary}`,
    'Teknikler:',
    ...how.techniques.map((t) => `- ${t}`),
    '',
    'Kurallar:',
    '- Marka renkleri, font ve spacing bizim tasarıma ait olsun',
    '- Pattern/interaction aynı kalsın (hover, toggle, stagger, stroke animasyonu vb.)',
    '- Gereksiz bağımlılık ekleme; mümkünse saf CSS + az JS',
    '- Erişilebilirlik: focus states, reduced-motion’a saygı',
  ].join('\n')
}

async function clipboardWrite(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

function flashButton(btn: HTMLButtonElement | null, label = 'Kopyalandı') {
  if (!btn) return
  const prev = btn.textContent
  btn.textContent = label
  setTimeout(() => {
    btn.textContent = prev
  }, 1300)
}

function renderShell() {
  const demo = activeDemo()
  const demos = filteredDemos()
  const sources = manifest?.sources ?? []

  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <strong>Frontend Joe · Pattern Lab</strong>
          <span>Canlı HTML önizleme + kod · beğendiğini kopyala, kendi projene uyarla</span>
        </div>
        <div class="topbar-actions">
          <a class="ghost-btn" href="${manifest?.instagram ?? 'https://www.instagram.com/frontendjoe'}" target="_blank" rel="noreferrer">Instagram</a>
          <a class="ghost-btn" href="https://github.com/frontend-joe" target="_blank" rel="noreferrer">GitHub</a>
          <a class="primary-btn" href="/skills/frontendjoe-patterns/SKILL.md" target="_blank" rel="noreferrer">MD Skill</a>
        </div>
      </header>

      <aside class="sidebar">
        <input class="search" type="search" placeholder="Ara: button, login, sidebar…" value="${esc(query)}" />
        <div class="filters">
          <button type="button" class="filter-btn ${collectionFilter === 'all' ? 'active' : ''}" data-collection="all">Hepsi (${manifest?.count ?? 0})</button>
          ${sources
            .map((s) => {
              const count = manifest?.demos.filter((d) => d.collection === s.id).length ?? 0
              return `<button type="button" class="filter-btn ${collectionFilter === s.id ? 'active' : ''}" data-collection="${esc(s.id)}">${esc(s.label)} (${count})</button>`
            })
            .join('')}
        </div>
        <p class="meta-line">${demos.length} demo · tıkla → canlı HTML</p>
        <div class="demo-list">
          ${
            demos.length
              ? demos
                  .map(
                    (d) => `
              <button type="button" class="demo-item ${demo?.id === d.id ? 'active' : ''}" data-id="${esc(d.id)}">
                <span class="title">${esc(d.title)}</span>
                <span class="sub">${esc(d.collectionLabel)} · ${esc(d.category)}</span>
              </button>`,
                  )
                  .join('')
              : `<p class="meta-line">Sonuç yok — filtreyi temizle.</p>`
          }
        </div>
      </aside>

      <section class="main">
        ${
          demo
            ? `
          <div class="detail-head">
            <div>
              <h1>${esc(demo.title)}</h1>
              <p>${esc(demo.collectionLabel)} · <a href="${esc(demo.source)}" target="_blank" rel="noreferrer">kaynak repo</a> · örnek al, markana uydur.</p>
            </div>
            <div class="copy-row">
              <button type="button" class="primary-btn" id="copy-code-btn" title="Aktif sekmedeki kodu kopyala">Copy kod</button>
              <button type="button" class="ghost-btn" id="copy-prompt-btn" title="Cursor'a yapıştırılacak uyarlama prompt'u">Copy uyarla prompt</button>
              <button type="button" class="ghost-btn" id="copy-all-btn" title="HTML+CSS+JS birlikte">Copy hepsi</button>
              <a class="ghost-btn" href="${esc(demo.preview)}" target="_blank" rel="noreferrer">Önizlemeyi aç</a>
            </div>
          </div>
          <div class="tabs-bar">
            ${(['live', 'how', 'html', 'css', 'js'] as Tab[])
              .map(
                (t) =>
                  `<button type="button" class="tab ${activeTab === t ? 'active' : ''}" data-tab="${t}">${
                    t === 'live' ? 'Canlı HTML' : t === 'how' ? 'Nasıl / Uyarla' : t.toUpperCase()
                  }</button>`,
              )
              .join('')}
          </div>
          <div class="preview-wrap" id="preview-pane">
            <iframe title="${esc(demo.title)}" src="${esc(demo.preview)}" loading="lazy"></iframe>
          </div>
          <div class="panel">
            <div class="panel-toolbar">
              <span id="panel-label">${activeTab === 'live' ? 'önizleme + özet' : activeTab}</span>
              <button type="button" class="ghost-btn" id="copy-panel-btn">Copy</button>
            </div>
            <div id="panel-body" class="${activeTab === 'how' || activeTab === 'live' ? 'how-view' : 'code-view'}">Yükleniyor…</div>
          </div>`
            : `<div class="empty">Manifest yüklenemedi veya demo yok.</div>`
        }
      </section>
    </div>
  `

  bindEvents()
  void fillPanel()
}

function bindEvents() {
  app.querySelector<HTMLInputElement>('.search')?.addEventListener('input', (e) => {
    query = (e.target as HTMLInputElement).value
    if (!filteredDemos().some((d) => d.id === activeId)) {
      activeId = filteredDemos()[0]?.id ?? null
    }
    renderShell()
  })

  app.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      collectionFilter = btn.dataset.collection || 'all'
      activeId = filteredDemos()[0]?.id ?? null
      activeTab = 'live'
      renderShell()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('.demo-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeId = btn.dataset.id || null
      activeTab = 'live'
      renderShell()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = (btn.dataset.tab as Tab) || 'live'
      void fillPanel()
      app.querySelectorAll<HTMLButtonElement>('.tab').forEach((t) => {
        t.classList.toggle('active', t.dataset.tab === activeTab)
      })
      const label = app.querySelector('#panel-label')
      if (label) label.textContent = activeTab === 'live' ? 'önizleme + özet' : activeTab
    })
  })

  app.querySelector<HTMLButtonElement>('#copy-panel-btn')?.addEventListener('click', () => {
    void copyActivePanel(app.querySelector('#copy-panel-btn'))
  })
  app.querySelector<HTMLButtonElement>('#copy-code-btn')?.addEventListener('click', () => {
    void copyCodeSmart(app.querySelector('#copy-code-btn'))
  })
  app.querySelector<HTMLButtonElement>('#copy-prompt-btn')?.addEventListener('click', async () => {
    const demo = activeDemo()
    if (!demo) return
    const ok = await clipboardWrite(adaptPrompt(demo))
    flashButton(app.querySelector('#copy-prompt-btn'), ok ? 'Prompt kopyalandı' : 'Kopyalanamadı')
  })
  app.querySelector<HTMLButtonElement>('#copy-all-btn')?.addEventListener('click', () => {
    void copyAllSources(app.querySelector('#copy-all-btn'))
  })
}

async function copyActivePanel(btn: HTMLButtonElement | null) {
  const demo = activeDemo()
  if (!demo) return
  let text = ''
  if (activeTab === 'how' || activeTab === 'live') {
    text = adaptPrompt(demo)
  } else {
    text = await loadTabCode(demo, activeTab)
  }
  const ok = await clipboardWrite(text)
  flashButton(btn, ok ? 'Kopyalandı' : 'Kopyalanamadı')
}

async function copyCodeSmart(btn: HTMLButtonElement | null) {
  const demo = activeDemo()
  if (!demo) return
  const tab = activeTab === 'live' || activeTab === 'how' ? 'css' : activeTab
  const text = await loadTabCode(demo, tab)
  const ok = await clipboardWrite(text)
  flashButton(btn, ok ? `${tab.toUpperCase()} kopyalandı` : 'Kopyalanamadı')
}

async function copyAllSources(btn: HTMLButtonElement | null) {
  const demo = activeDemo()
  if (!demo) return
  const [html, css, js] = await Promise.all([
    loadTabCode(demo, 'html'),
    loadTabCode(demo, 'css'),
    loadTabCode(demo, 'js'),
  ])
  const text = [
    `/* ${demo.title} — ${demo.source} */`,
    '',
    '<!-- HTML -->',
    html,
    '',
    '/* CSS */',
    css,
    '',
    '// JS',
    js,
    '',
    '---',
    adaptPrompt(demo),
  ].join('\n')
  const ok = await clipboardWrite(text)
  flashButton(btn, ok ? 'Hepsi kopyalandı' : 'Kopyalanamadı')
}

async function fillPanel() {
  const demo = activeDemo()
  const body = app.querySelector('#panel-body')
  if (!demo || !body) return

  if (activeTab === 'live' || activeTab === 'how') {
    const how = howItWorksFor(demo.category, demo.collection)
    body.className = 'how-view'
    body.innerHTML = `
      <h3>${activeTab === 'live' ? 'Canlı HTML yukarıda' : `${esc(demo.category)} — nasıl çalışıyor?`}</h3>
      <p>${esc(how.summary)}</p>
      <ul>${how.techniques.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="adapt">
        <strong>Copy komutları:</strong>
        <code>Copy kod</code> aktif/CSS kaynağı ·
        <code>Copy uyarla prompt</code> Cursor’a yapıştır ·
        <code>Copy hepsi</code> HTML+CSS+JS+prompt
      </div>
      <div class="adapt" style="margin-top:10px">
        <strong>Kendi projene:</strong>
        Pattern’i al, marka renk/font/spacing’i değiştir. Birebir dump değil — “şu hover gibi” diye örnek göster.
      </div>
    `
    return
  }

  body.className = 'code-view'
  try {
    body.textContent = await loadTabCode(demo, activeTab)
  } catch (err) {
    body.className = 'status-error'
    body.textContent = err instanceof Error ? err.message : 'Load failed'
  }
}

async function boot() {
  app.innerHTML = `<div class="empty">Demolar yükleniyor…</div>`
  try {
    const res = await fetch('/manifest.json')
    if (!res.ok) throw new Error('manifest.json okunamadı')
    manifest = (await res.json()) as Manifest
    activeId = manifest.demos[0]?.id ?? null
    renderShell()
  } catch (err) {
    app.innerHTML = `<div class="status-error">${esc(err instanceof Error ? err.message : 'Boot failed')}</div>`
  }
}

void boot()

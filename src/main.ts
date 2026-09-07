import './style.css'
import { howItWorksFor } from './howItWorks'

type DemoFiles = {
  html: string
  css: string | null
  js: string | null
  allCss?: string[]
  allJs?: string[]
}

type Item = {
  id: string
  kind: 'local' | 'external'
  group: string
  groupLabel: string
  groupOrder: number
  category: string
  title: string
  blurb?: string
  preview: string
  previewMode: 'iframe' | 'external'
  liveUrl?: string
  source: string
  stars?: number | null
  stack?: string
  collection?: string
  collectionLabel?: string
  path?: string
  part?: string
  files?: DemoFiles
  tags?: string[]
}

type Group = { id: string; label: string; order: number }

type Manifest = {
  favoritesKey: string
  groups: Group[]
  demos: Item[]
  attribution: string
  instagram: string
}

type Catalog = { favoritesKey: string; items: Item[] }

type Tab = 'live' | 'html' | 'css' | 'js' | 'how'

const app = document.querySelector<HTMLDivElement>('#app')!
const FAV_KEY = 'pattern-lab-favorites-v1'

let items: Item[] = []
let groups: Group[] = []
let activeId: string | null = null
let activeTab: Tab = 'live'
let activeGroup = 'copy-paste'
let activeCategory = 'all'
let query = ''
let favorites = new Set<string>()
const codeCache = new Map<string, string>()
const openGroups = new Set<string>(['favorites', 'copy-paste', 'mobile', 'flowbite', 'joe-reels'])

function esc(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY)
    favorites = new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    favorites = new Set()
  }
}

function saveFavorites() {
  localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]))
}

function toggleFavorite(id: string) {
  if (favorites.has(id)) favorites.delete(id)
  else favorites.add(id)
  saveFavorites()
}

function starLabel(n?: number | null) {
  if (n == null) return ''
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k★`
  return `${n}★`
}

function filteredItems(): Item[] {
  const q = query.trim().toLowerCase()
  return items.filter((it) => {
    if (activeGroup === 'favorites') {
      if (!favorites.has(it.id)) return false
    } else if (it.group !== activeGroup) {
      return false
    }
    if (activeCategory !== 'all' && it.category !== activeCategory) return false
    if (!q) return true
    const hay = [it.title, it.category, it.groupLabel, it.blurb, it.source, ...(it.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}

function categoriesForGroup(groupId: string): string[] {
  const pool =
    groupId === 'favorites'
      ? items.filter((i) => favorites.has(i.id))
      : items.filter((i) => i.group === groupId)
  return [...new Set(pool.map((i) => i.category))].sort()
}

function activeItem(): Item | null {
  const list = filteredItems()
  return list.find((i) => i.id === activeId) ?? list[0] ?? null
}

async function loadText(url: string) {
  if (codeCache.has(url)) return codeCache.get(url)!
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not load ${url}`)
  const text = await res.text()
  codeCache.set(url, text)
  return text
}

async function loadTabCode(item: Item, tab: 'html' | 'css' | 'js') {
  if (item.kind !== 'local' || !item.files) {
    return `// External kit — kaynak: ${item.source}\n// Canlı demo: ${item.preview}`
  }
  if (tab === 'html') return loadText(item.files.html)
  if (tab === 'css') {
    const files = item.files.allCss?.length
      ? item.files.allCss
      : item.files.css
        ? [item.files.css]
        : []
    if (!files.length) return '/* No CSS file */'
    return (await Promise.all(files.map(async (f) => `/* ${f} */\n${await loadText(f)}`))).join(
      '\n\n',
    )
  }
  const files = item.files.allJs?.length
    ? item.files.allJs
    : item.files.js
      ? [item.files.js]
      : []
  if (!files.length) return '// No JavaScript — CSS/HTML only or external kit'
  return (await Promise.all(files.map(async (f) => `// ${f}\n${await loadText(f)}`))).join('\n\n')
}

function adaptPrompt(item: Item) {
  const how = howItWorksFor(item.category, item.collection)
  return [
    `Referans: ${item.title}${item.stars ? ` (${starLabel(item.stars)})` : ''}`,
    `Grup: ${item.groupLabel} · kategori: ${item.category}`,
    `Kaynak: ${item.source}`,
    `Demo: ${item.preview}`,
    item.blurb ? `Özet: ${item.blurb}` : '',
    '',
    'İstediğim: Bu UI/motion fikrini kendi React/Next (veya Hono API + UI) / mobil projeme UYARLA — birebir dump yok.',
    `Pattern özeti: ${how.summary}`,
    'Teknikler:',
    ...how.techniques.map((t) => `- ${t}`),
    '',
    'Kurallar: marka renk/font/spacing bizim; mobil-first; a11y + reduced-motion.',
  ]
    .filter(Boolean)
    .join('\n')
}

async function clipboardWrite(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

function flash(btn: HTMLElement | null, label: string) {
  if (!btn) return
  const prev = btn.textContent
  btn.textContent = label
  setTimeout(() => {
    btn.textContent = prev
  }, 1200)
}

function countInGroup(groupId: string) {
  if (groupId === 'favorites') return favorites.size
  return items.filter((i) => i.group === groupId).length
}

function render() {
  const item = activeItem()
  const list = filteredItems()
  const cats = categoriesForGroup(activeGroup)

  app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <strong>Pattern Lab</strong>
        <span>Kategorili referanslar · yıldızla favorile · uyarla</span>
      </div>
      <div class="topbar-actions">
        <span class="chip">${favorites.size} favori</span>
        <a class="ghost-btn" href="/skills/frontendjoe-patterns/SKILL.md" target="_blank" rel="noreferrer">Skill</a>
      </div>
    </header>

    <aside class="sidebar">
      <input class="search" type="search" placeholder="Ara…" value="${esc(query)}" />

      <div class="group-nav">
        ${groups
          .map((g) => {
            const open = openGroups.has(g.id) || activeGroup === g.id
            const count = countInGroup(g.id)
            const isActive = activeGroup === g.id
            return `
            <div class="group-block ${isActive ? 'active' : ''}">
              <button type="button" class="group-head" data-group="${esc(g.id)}" data-toggle-group="${esc(g.id)}">
                <span>${esc(g.label)}</span>
                <span class="count">${count}</span>
              </button>
              ${
                open && isActive
                  ? `<div class="cat-list">
                      <button type="button" class="cat-btn ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">Tümü</button>
                      ${cats
                        .map(
                          (c) =>
                            `<button type="button" class="cat-btn ${activeCategory === c ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`,
                        )
                        .join('')}
                    </div>`
                  : ''
              }
            </div>`
          })
          .join('')}
      </div>

      <p class="meta-line">${list.length} öğe</p>
      <div class="demo-list">
        ${
          list.length
            ? list
                .map((it) => {
                  const fav = favorites.has(it.id)
                  return `
              <div class="demo-row ${item?.id === it.id ? 'active' : ''}">
                <button type="button" class="star-btn ${fav ? 'on' : ''}" data-star="${esc(it.id)}" title="Favorilere ekle/çıkar">${fav ? '★' : '☆'}</button>
                <button type="button" class="demo-item" data-id="${esc(it.id)}">
                  <span class="title">${esc(it.title)}</span>
                  <span class="sub">${esc(it.category)}${it.stars ? ` · ${esc(starLabel(it.stars))}` : ''}${it.kind === 'external' ? ' · external' : ''}</span>
                </button>
              </div>`
                })
                .join('')
            : `<p class="meta-line">${activeGroup === 'favorites' ? 'Henüz favori yok — ★ ile ekle.' : 'Bu filtrede sonuç yok.'}</p>`
        }
      </div>
    </aside>

    <section class="main">
      ${
        item
          ? `
        <div class="detail-head">
          <div>
            <h1>${esc(item.title)} <button type="button" class="star-inline ${favorites.has(item.id) ? 'on' : ''}" data-star="${esc(item.id)}" title="Favori">${favorites.has(item.id) ? '★' : '☆'}</button></h1>
            <p>${esc(item.groupLabel)} · ${esc(item.category)}${item.stars ? ` · ${esc(starLabel(item.stars))} GitHub` : ''} · <a href="${esc(item.source)}" target="_blank" rel="noreferrer">kaynak</a></p>
            ${item.blurb ? `<p class="blurb">${esc(item.blurb)}</p>` : ''}
          </div>
          <div class="copy-row">
            <button type="button" class="primary-btn" id="copy-prompt-btn">Copy uyarla prompt</button>
            ${item.kind === 'local' ? `<button type="button" class="ghost-btn" id="copy-code-btn">Copy kod</button><button type="button" class="ghost-btn" id="copy-all-btn">Copy hepsi</button>` : ''}
            <a class="ghost-btn" href="${esc(item.liveUrl || item.preview)}" target="_blank" rel="noreferrer">Yeni sekmede aç</a>
          </div>
        </div>
        <div class="tabs-bar">
          ${(['live', 'how', 'html', 'css', 'js'] as Tab[])
            .map(
              (t) =>
                `<button type="button" class="tab ${activeTab === t ? 'active' : ''}" data-tab="${t}">${
                  t === 'live' ? 'Canlı' : t === 'how' ? 'Nasıl / Uyarla' : t.toUpperCase()
                }</button>`,
            )
            .join('')}
        </div>
        <div class="preview-wrap ${item.kind === 'external' ? 'preview-external' : ''}">
          <div class="preview-chrome">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="preview-url">${esc(item.liveUrl || item.preview)}</span>
          </div>
          <iframe
            title="${esc(item.title)}"
            src="${esc(item.preview)}"
            loading="eager"
            referrerpolicy="no-referrer-when-downgrade"
            allow="fullscreen; clipboard-read; clipboard-write"
          ></iframe>
        </div>
        <div class="panel">
          <div class="panel-toolbar">
            <span id="panel-label">${activeTab}</span>
            <button type="button" class="ghost-btn" id="copy-panel-btn">Copy</button>
          </div>
          <div id="panel-body" class="how-view">Yükleniyor…</div>
        </div>`
          : `<div class="empty">Öğe seç veya favorilere ekle.</div>`
      }
    </section>
  </div>`

  bind()
  void fillPanel()
}

function bind() {
  app.querySelector<HTMLInputElement>('.search')?.addEventListener('input', (e) => {
    query = (e.target as HTMLInputElement).value
    render()
  })

  app.querySelectorAll<HTMLButtonElement>('[data-group]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const g = btn.dataset.group!
      activeGroup = g
      openGroups.add(g)
      activeCategory = 'all'
      activeId = null
      activeTab = 'live'
      render()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      activeCategory = btn.dataset.cat || 'all'
      activeId = null
      render()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeId = btn.dataset.id || null
      activeTab = 'live'
      render()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('[data-star]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = btn.dataset.star!
      toggleFavorite(id)
      render()
    })
  })

  app.querySelectorAll<HTMLButtonElement>('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = (btn.dataset.tab as Tab) || 'live'
      app.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', (t as HTMLElement).dataset.tab === activeTab))
      void fillPanel()
    })
  })

  app.querySelector('#copy-prompt-btn')?.addEventListener('click', async () => {
    const it = activeItem()
    if (!it) return
    flash(app.querySelector('#copy-prompt-btn'), (await clipboardWrite(adaptPrompt(it))) ? 'Kopyalandı' : 'Hata')
  })

  app.querySelector('#copy-code-btn')?.addEventListener('click', async () => {
    const it = activeItem()
    if (!it) return
    const tab = activeTab === 'live' || activeTab === 'how' ? 'css' : activeTab
    flash(app.querySelector('#copy-code-btn'), (await clipboardWrite(await loadTabCode(it, tab))) ? 'Kopyalandı' : 'Hata')
  })

  app.querySelector('#copy-all-btn')?.addEventListener('click', async () => {
    const it = activeItem()
    if (!it) return
    const [html, css, js] = await Promise.all([
      loadTabCode(it, 'html'),
      loadTabCode(it, 'css'),
      loadTabCode(it, 'js'),
    ])
    const text = `<!-- ${it.title} -->\n${html}\n\n/* CSS */\n${css}\n\n// JS\n${js}\n\n---\n${adaptPrompt(it)}`
    flash(app.querySelector('#copy-all-btn'), (await clipboardWrite(text)) ? 'Kopyalandı' : 'Hata')
  })

  app.querySelector('#copy-panel-btn')?.addEventListener('click', async () => {
    const body = app.querySelector('#panel-body')
    flash(app.querySelector('#copy-panel-btn'), (await clipboardWrite(body?.textContent ?? '')) ? 'Kopyalandı' : 'Hata')
  })
}

async function fillPanel() {
  const item = activeItem()
  const body = app.querySelector('#panel-body')
  const label = app.querySelector('#panel-label')
  if (!item || !body) return
  if (label) label.textContent = activeTab

  if (activeTab === 'live' || activeTab === 'how') {
    const how = howItWorksFor(item.category, item.collection)
    body.className = 'how-view'
    body.innerHTML = `
      <h3>${activeTab === 'live' ? 'Önizleme / referans' : 'Nasıl uyarlanır?'}</h3>
      <p>${esc(item.blurb || how.summary)}</p>
      <ul>${how.techniques.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="adapt">
        <strong>★ Favori:</strong> yıldızla kaydet ·
        <strong>Copy uyarla prompt:</strong> Cursor’a yapıştır ·
        Stack: React / Next / Hono UI / mobil-first.
      </div>`
    return
  }

  body.className = 'code-view'
  try {
    body.textContent = await loadTabCode(item, activeTab)
  } catch (err) {
    body.className = 'status-error'
    body.textContent = err instanceof Error ? err.message : 'Load failed'
  }
}

async function boot() {
  app.innerHTML = `<div class="empty">Katalog yükleniyor…</div>`
  loadFavorites()
  try {
    const [mRes, cRes] = await Promise.all([fetch('/manifest.json'), fetch('/catalog.json')])
    if (!mRes.ok) throw new Error('manifest.json okunamadı')
    const manifest = (await mRes.json()) as Manifest
    const catalog = cRes.ok ? ((await cRes.json()) as Catalog) : { favoritesKey: FAV_KEY, items: [] }

    groups = [...manifest.groups].sort((a, b) => a.order - b.order)
    const local: Item[] = manifest.demos.map((d) => ({ ...d, kind: d.kind || 'local' }))
    items = [...catalog.items, ...local]

    if (!items.some((i) => i.group === activeGroup)) activeGroup = 'copy-paste'
    activeId = filteredItems()[0]?.id ?? null
    render()
  } catch (err) {
    app.innerHTML = `<div class="status-error">${esc(err instanceof Error ? err.message : 'Boot failed')}</div>`
  }
}

void boot()

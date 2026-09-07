import { Component, Suspense, lazy, useMemo, type ReactNode } from 'react'
import { HashRouter, Routes, Route, Link, useParams, useSearchParams } from 'react-router-dom'
import registry from './react-bits-registry.json'
import { demoProps } from './previewDefaults'

type RegItem = {
  id: string
  name: string
  title: string
  group: string
  groupLabel: string
  importPath: string
  file: string
}

const items = registry.items as RegItem[]

/** Vite lazy modules for every component file */
const modules = import.meta.glob('./vendor/react-bits/content/**/*.{jsx,tsx}')

const GROUP_ORDER = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] as const

function groupItems(group: string) {
  return items.filter((i) => i.group === group)
}

class ErrorBox extends Component<{ name: string; children: ReactNode }, { err?: string }> {
  state = { err: undefined as string | undefined }
  static getDerivedStateFromError(e: Error) {
    return { err: e?.message || String(e) }
  }
  render() {
    if (this.state.err) {
      return (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 max-w-lg">
          <div className="font-semibold mb-1">{this.props.name} yüklenemedi</div>
          <code className="text-xs opacity-80 break-all">{this.state.err}</code>
        </div>
      )
    }
    return this.props.children
  }
}

function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="demo-shell">
      <div className="demo-label">{title}</div>
      {children}
    </div>
  )
}

function resolveModule(item: RegItem) {
  // importPath like ./vendor/... from src; glob keys are relative to this file (src/)
  const key = item.importPath.startsWith('./') ? item.importPath : `./${item.importPath}`
  const alt = `./${item.file}`
  return modules[key] || modules[alt]
}

function DemoStage({ item }: { item: RegItem }) {
  const loader = resolveModule(item)
  if (!loader) {
    return <div className="text-white/50 text-sm">Modül bulunamadı: {item.file}</div>
  }

  const Lazy = useMemo(
    () =>
      lazy(async () => {
        const mod: any = await loader()
        const Comp = mod.default || mod[item.name] || Object.values(mod)[0]
        return {
          default: function Wrapped() {
            return <SmartPreview Comp={Comp} item={item} />
          },
        }
      }),
    [item.id],
  )

  const tall = item.group === 'Backgrounds'
  return (
    <Shell title={`React Bits · ${item.title}`}>
      <div
        className={
          tall
            ? 'relative w-full max-w-5xl h-[70vh] overflow-hidden rounded-2xl border border-white/10'
            : 'relative w-full max-w-3xl min-h-[240px] grid place-items-center'
        }
      >
        <ErrorBox name={item.title}>
          <Suspense fallback={<div className="text-white/40 text-sm">Yükleniyor…</div>}>
            <Lazy />
          </Suspense>
        </ErrorBox>
      </div>
    </Shell>
  )
}

function SmartPreview({ Comp, item }: { Comp: any; item: RegItem }) {
  const props = demoProps(item)

  if (item.group === 'Backgrounds') {
    return (
      <div className="absolute inset-0">
        <Comp {...props} />
      </div>
    )
  }

  if (item.group === 'TextAnimations') {
    return (
      <div className="text-center px-4">
        <Comp {...props} />
      </div>
    )
  }

  // Components + Animations — wrap with a simple stage
  return (
    <div className="p-6 grid place-items-center min-h-[280px]">
      <Comp {...props}>
        <div style={{ padding: 12 }}>
          <strong>{item.title}</strong>
          <p style={{ opacity: 0.65, marginTop: 8, fontSize: 14 }}>Yerel demo sahnesi</p>
        </div>
      </Comp>
    </div>
  )
}

function Gallery() {
  const [params, setParams] = useSearchParams()
  const activeGroup = params.get('g') || 'all'
  const q = (params.get('q') || '').toLowerCase()

  const visible = items.filter((i) => {
    const inGroup = activeGroup === 'all' || i.group === activeGroup
    const inQuery = !q || i.title.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || i.groupLabel.toLowerCase().includes(q)
    return inGroup && inQuery
  })

  return (
    <div className="min-h-screen p-5 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold m-0">React Bits · tüm bileşenler</h1>
        <p className="text-white/55 mt-2 mb-5">
          {registry.count} parça · 4 grup · kaynak koddan yerel render
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => {
              const next = new URLSearchParams(params)
              next.set('g', 'all')
              setParams(next)
            }}
            className={`rounded-full px-3 py-1.5 text-sm border cursor-pointer ${
              activeGroup === 'all' ? 'bg-[#8f44fd]/25 border-[#8f44fd]/50 text-white' : 'bg-white/5 border-white/10 text-white/70'
            }`}
          >
            Tümü ({items.length})
          </button>
          {GROUP_ORDER.map((g) => {
            const label = items.find((i) => i.group === g)?.groupLabel || g
            const count = groupItems(g).length
            const on = activeGroup === g
            return (
              <button
                key={g}
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(params)
                  next.set('g', g)
                  setParams(next)
                }}
                className={`rounded-full px-3 py-1.5 text-sm border cursor-pointer ${
                  on ? 'bg-[#8f44fd]/25 border-[#8f44fd]/50 text-white' : 'bg-white/5 border-white/10 text-white/70'
                }`}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>

        <input
          value={params.get('q') || ''}
          onChange={(e) => {
            const next = new URLSearchParams(params)
            if (e.target.value) next.set('q', e.target.value)
            else next.delete('q')
            setParams(next)
          }}
          placeholder="Tümünde ara…"
          className="w-full max-w-md mb-5 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-[#8f44fd]/50"
        />

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {visible.map((i) => (
            <Link
              key={i.id}
              to={`/demo/${i.id}`}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white no-underline hover:border-[#8f44fd]/45"
            >
              <div className="font-medium">{i.title}</div>
              <div className="text-xs text-white/40 mt-1">{i.groupLabel}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function DemoRoute() {
  const { id } = useParams()
  const item = items.find((i) => i.id === id)
  if (!item) {
    return (
      <Shell title="Bulunamadı">
        <Link to="/" className="text-[#8f44fd]">
          Gallery
        </Link>
      </Shell>
    )
  }
  return (
    <div>
      <div className="fixed top-3 right-3 z-30 flex gap-2">
        <Link to={`/?g=${item.group}`} className="demo-label no-underline">
          ← {item.groupLabel}
        </Link>
      </div>
      <DemoStage item={item} />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/demo/:id" element={<DemoRoute />} />
      </Routes>
    </HashRouter>
  )
}

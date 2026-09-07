'use client'

import { useEffect, useMemo, useState, Component, type ReactNode, Suspense, lazy } from 'react'
import Link from 'next/link'
import registry from '../../../react-bits-registry.json'

type RegItem = {
  id: string
  name: string
  title: string
  group: string
  groupLabel: string
}

const items = registry.items as RegItem[]

class ErrorBox extends Component<{ name: string; children: ReactNode }, { err?: string }> {
  state = { err: undefined as string | undefined }
  static getDerivedStateFromError(e: Error) {
    return { err: e?.message || String(e) }
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ border: '1px solid rgba(255,80,80,.4)', padding: 16, borderRadius: 12, color: '#fecaca' }}>
          <strong>{this.props.name}</strong>
          <div style={{ fontSize: 12, marginTop: 8 }}>{this.state.err}</div>
        </div>
      )
    }
    return this.props.children
  }
}

function SmartPreview({ Comp, item }: { Comp: any; item: RegItem }) {
  if (item.group === 'Backgrounds') {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <Comp className="w-full h-full" />
      </div>
    )
  }
  if (item.group === 'TextAnimations') {
    return (
      <div style={{ textAlign: 'center', padding: 16 }}>
        <Comp text="React Bits" className="text-4xl font-semibold">
          React Bits
        </Comp>
      </div>
    )
  }
  return (
    <div style={{ padding: 24, display: 'grid', placeItems: 'center', minHeight: 280 }}>
      <Comp className="max-w-md">
        <div style={{ padding: 12 }}>
          <strong>{item.title}</strong>
          <p style={{ opacity: 0.65, marginTop: 8, fontSize: 14 }}>Next demo sahnesi</p>
        </div>
      </Comp>
    </div>
  )
}

export default function DemoClient({ id }: { id: string }) {
  const item = items.find((i) => i.id === id)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const Lazy = useMemo(() => {
    if (!mounted || !item) return null
    return lazy(async () => {
      const { loaders } = await import('../../../demoLoaders')
      const loader = loaders[id]
      if (!loader) throw new Error('Loader yok')
      const mod: any = await loader()
      const Comp = mod.default || mod[item.name] || Object.values(mod)[0]
      return {
        default: function Wrap() {
          return <SmartPreview Comp={Comp} item={item} />
        },
      }
    })
  }, [id, item, mounted])

  if (!item) {
    return (
      <main style={{ padding: 24, background: '#0c0d10', color: '#fff', minHeight: '100vh' }}>
        Bulunamadı <Link href="/">Gallery</Link>
      </main>
    )
  }

  const tall = item.group === 'Backgrounds'

  return (
    <main style={{ minHeight: '100vh', background: '#0c0d10', color: '#fff', padding: 24 }}>
      <Link href="/" style={{ color: '#c4b5fd', textDecoration: 'none', fontSize: 13 }}>
        ← {item.groupLabel}
      </Link>
      <h1 style={{ fontSize: 22, margin: '12px 0 20px' }}>Next · {item.title}</h1>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 960,
          height: tall ? '70vh' : undefined,
          minHeight: tall ? undefined : 280,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,.1)',
          overflow: 'hidden',
          display: tall ? 'block' : 'grid',
          placeItems: 'center',
          margin: '0 auto',
          background: '#111',
        }}
      >
        {!mounted || !Lazy ? (
          <div style={{ color: '#9aa3b2' }}>Yükleniyor…</div>
        ) : (
          <ErrorBox name={item.title}>
            <Suspense fallback={<div style={{ color: '#9aa3b2' }}>Yükleniyor…</div>}>
              <Lazy />
            </Suspense>
          </ErrorBox>
        )}
      </div>
    </main>
  )
}

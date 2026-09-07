'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import registry from '../react-bits-registry.json'

type RegItem = {
  id: string
  name: string
  title: string
  group: string
  groupLabel: string
}

const items = registry.items as RegItem[]
const GROUP_ORDER = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] as const

export default function GalleryClient() {
  const [group, setGroup] = useState<string>('Components')
  const [q, setQ] = useState('')

  const visible = useMemo(() => {
    return items.filter((i) => {
      if (i.group !== group) return false
      if (!q) return true
      const s = q.toLowerCase()
      return i.title.toLowerCase().includes(s) || i.name.toLowerCase().includes(s)
    })
  }, [group, q])

  return (
    <main style={{ minHeight: '100vh', padding: 24, background: '#0c0d10', color: '#f4f6f8' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>React Bits · Next</h1>
        <p style={{ color: '#9aa3b2', marginTop: 8 }}>
          {registry.count} bileşen · aynı kaynak · Next.js static export
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' }}>
          {GROUP_ORDER.map((g) => {
            const label = items.find((i) => i.group === g)?.groupLabel || g
            const count = items.filter((i) => i.group === g).length
            const on = group === g
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                style={{
                  borderRadius: 999,
                  padding: '6px 12px',
                  border: on ? '1px solid rgba(143,68,253,.5)' : '1px solid rgba(255,255,255,.12)',
                  background: on ? 'rgba(143,68,253,.25)' : 'rgba(255,255,255,.05)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara…"
          style={{
            width: '100%',
            maxWidth: 420,
            marginBottom: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(0,0,0,.3)',
            color: '#fff',
            padding: '8px 12px',
          }}
        />
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
          {visible.map((i) => (
            <Link
              key={i.id}
              href={`/demo/${i.id}`}
              style={{
                display: 'block',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,.1)',
                background: 'rgba(255,255,255,.04)',
                padding: '12px 14px',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600 }}>{i.title}</div>
              <div style={{ fontSize: 12, color: '#7d8694', marginTop: 4 }}>{i.groupLabel}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

#!/usr/bin/env node
/**
 * React Bits component kaynaklarını public altına kopyalar
 * ve catalog.json files alanlarını Copy için doldurur.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const srcRoot = path.join(root, 'kits-app/src/vendor/react-bits/content')
const pubRoot = path.join(root, 'public/react-bits-src')
const registryPath = path.join(root, 'kits-app/src/react-bits-registry.json')
const catalogPath = path.join(root, 'public/catalog.json')

fs.rmSync(pubRoot, { recursive: true, force: true })
fs.mkdirSync(pubRoot, { recursive: true })
execSync(`cp -a "${srcRoot}/." "${pubRoot}/"`)

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))

const byId = new Map(registry.items.map((i) => [i.id, i]))

let patched = 0
for (const item of catalog.items) {
  if (!String(item.id).startsWith('rb-')) continue
  const shortId = item.id.replace(/^rb-/, '')
  const reg = byId.get(shortId)
  if (!reg) continue

  // file like vendor/react-bits/content/TextAnimations/ASCIIText/ASCIIText.jsx
  const rel = reg.file.replace(/^vendor\/react-bits\/content\//, '')
  const abs = path.join(pubRoot, rel)
  const dir = path.dirname(abs)
  const base = path.basename(abs, path.extname(abs))
  const cssCand = path.join(dir, `${base}.css`)
  const publicJs = `/react-bits-src/${rel.replace(/\\/g, '/')}`
  const publicCss = fs.existsSync(cssCand)
    ? `/react-bits-src/${path.relative(pubRoot, cssCand).replace(/\\/g, '/')}`
    : null

  // Sibling files in same folder (tsx/jsx/css)
  const siblings = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(jsx|tsx|js|ts|css)$/i.test(f))
    : []
  const allJs = siblings
    .filter((f) => /\.(jsx|tsx|js|ts)$/i.test(f))
    .map((f) => `/react-bits-src/${path.relative(pubRoot, path.join(dir, f)).replace(/\\/g, '/')}`)
  const allCss = siblings
    .filter((f) => /\.css$/i.test(f))
    .map((f) => `/react-bits-src/${path.relative(pubRoot, path.join(dir, f)).replace(/\\/g, '/')}`)

  item.kind = 'local'
  item.files = {
    html: publicJs, // JSX kaynağı HTML sekmesinde de görünsün (tek dosya shortcut)
    css: publicCss,
    js: publicJs,
    allCss,
    allJs,
  }
  item.blurb = `${reg.groupLabel} — kaynak .jsx/.css kopyalanabilir · React + Next`
  item.tags = [...new Set([...(item.tags || []), 'copy-paste', 'source', reg.group])]
  patched++
}

catalog.meta = {
  ...(catalog.meta || {}),
  reactBitsSource: '/react-bits-src/',
  reactBitsCount: patched,
}
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n')
console.log('Copied sources →', pubRoot)
console.log('Patched catalog entries:', patched)

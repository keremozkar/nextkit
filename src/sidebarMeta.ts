/** Human category labels + sidebar sections for Pattern Lab */

export const CAT_LABELS: Record<string, string> = {
  logins: 'Giriş / Login',
  signups: 'Kayıt',
  navbars: 'Navbar',
  sidebars: 'Sidebar',
  footers: 'Footer',
  cards: 'Kartlar',
  buttons: 'Butonlar',
  loaders: 'Loader',
  burgers: 'Burger menü',
  checkboxes: 'Checkbox',
  switches: 'Switch',
  inputs: 'Input',
  dropdowns: 'Dropdown',
  menus: 'Menü',
  modals: 'Modal',
  accordions: 'Accordion',
  carousels: 'Carousel',
  parallax: 'Parallax',
  dashboards: 'Dashboard',
  widgets: 'Widget',
  tricks: 'Trick',
  examples: 'Örnek',
  svgs: 'SVG',
  tooltips: 'Tooltip',
  libraries: 'Library',
  tables: 'Tablo',
  banners: 'Banner',
  controls: 'Kontrol',
  gsap: 'GSAP',
  scrolling: 'Scroll',
  sliders: 'Slider',
  Logins: 'Giriş / Login',
  'Text Animations': 'Yazı animasyonları',
  Animations: 'Animasyonlar',
  Components: 'Bileşenler',
  Backgrounds: 'Arka planlar',
  Motion: 'Motion',
  Auth: 'Auth',
  Buttons: 'Butonlar',
  Cards: 'Kartlar',
  Effects: 'Efektler',
}

export function catLabel(raw: string) {
  return CAT_LABELS[raw] || raw.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export type Section = { id: string; label: string; groupIds: string[] }

export const GROUP_SECTIONS: Section[] = [
  { id: 'you', label: 'Senin alanın', groupIds: ['favorites', 'all'] },
  { id: 'kits', label: 'Motion & Auth', groupIds: ['copy-paste', 'premium-logins', 'similar'] },
  { id: 'joe', label: 'Joe Harrison', groupIds: ['joe-reels', 'joe-css', 'joe-sidebars', 'joe-es6', 'joe-js'] },
  { id: 'mobile', label: 'Mobil', groupIds: ['mobile'] },
]

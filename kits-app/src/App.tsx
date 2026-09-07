import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import SpotlightCard from './vendor/react-bits/SpotlightCard/SpotlightCard.jsx'
import GlassIcons from './vendor/react-bits/GlassIcons/GlassIcons.jsx'
import Folder from './vendor/react-bits/Folder/Folder.jsx'
import BounceCards from './vendor/react-bits/BounceCards/BounceCards.jsx'
import GradientText from './vendor/react-bits/GradientText/GradientText.jsx'
import BlurText from './vendor/react-bits/BlurText/BlurText.jsx'
import Dock from './vendor/react-bits/Dock/Dock.jsx'
import { AnimatedShinyText } from './vendor/magicui/animated-shiny-text'
import { InteractiveHoverButton } from './vendor/magicui/interactive-hover-button'
import { Marquee } from './vendor/magicui/marquee'
import { BorderBeam } from './vendor/magicui/border-beam'
import { TextShimmer } from './vendor/motion/text-shimmer'
import { Tilt } from './vendor/motion/tilt'
import { Home, Settings, Search, User, Mail, File, Heart } from 'lucide-react'

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="demo-shell">
      <div className="demo-label">{title}</div>
      {children}
    </div>
  )
}

function SpotlightDemo() {
  return (
    <Shell title="React Bits · SpotlightCard">
      <SpotlightCard className="max-w-md" spotlightColor="rgba(143, 68, 253, 0.35)">
        <h2 style={{ margin: 0, fontSize: 28 }}>Spotlight Card</h2>
        <p style={{ color: '#9aa3b2', marginTop: 12 }}>
          Fareyi kartın üzerinde gezdir — spotlight efekti yerel kopyadan çalışıyor.
        </p>
      </SpotlightCard>
    </Shell>
  )
}

function GlassIconsDemo() {
  const items = [
    { icon: <Home size={22} />, color: 'blue', label: 'Home' },
    { icon: <Settings size={22} />, color: 'purple', label: 'Settings' },
    { icon: <Mail size={22} />, color: 'red', label: 'Mail' },
    { icon: <Heart size={22} />, color: 'orange', label: 'Fav' },
    { icon: <Search size={22} />, color: 'green', label: 'Search' },
    { icon: <User size={22} />, color: 'indigo', label: 'Profile' },
  ]
  return (
    <Shell title="React Bits · GlassIcons">
      <GlassIcons items={items} className="grid" />
    </Shell>
  )
}

function FolderDemo() {
  return (
    <Shell title="React Bits · Folder">
      <Folder
        color="#8f44fd"
        size={1.4}
        items={[
          <div key="1" style={{ padding: 8 }}>Docs</div>,
          <div key="2" style={{ padding: 8 }}>Assets</div>,
          <div key="3" style={{ padding: 8 }}>Code</div>,
        ]}
      />
    </Shell>
  )
}

function BounceDemo() {
  const images = [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  ]
  return (
    <Shell title="React Bits · BounceCards">
      <BounceCards images={images} containerWidth={500} containerHeight={280} enableHover />
    </Shell>
  )
}

function GradientDemo() {
  return (
    <Shell title="React Bits · GradientText">
      <GradientText colors={['#5227FF', '#FF9FFC', '#8f44fd']} animationSpeed={6} showBorder>
        Pattern Lab Motion
      </GradientText>
    </Shell>
  )
}

function BlurDemo() {
  return (
    <Shell title="React Bits · BlurText">
      <BlurText text="Blur in on scroll reveal" animateBy="words" direction="top" className="text-4xl font-semibold" />
    </Shell>
  )
}

function DockDemo() {
  const items = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => undefined },
    { icon: <Search size={18} />, label: 'Search', onClick: () => undefined },
    { icon: <File size={18} />, label: 'Files', onClick: () => undefined },
    { icon: <Settings size={18} />, label: 'Settings', onClick: () => undefined },
  ]
  return (
    <Shell title="React Bits · Dock">
      <div style={{ minHeight: 180, displayContent: 'end' }}>
        <Dock items={items} />
      </div>
    </Shell>
  )
}

function ShinyDemo() {
  return (
    <Shell title="Magic UI · Animated Shiny Text">
      <AnimatedShinyText className="text-2xl">✨ Introducing Magic UI patterns</AnimatedShinyText>
    </Shell>
  )
}

function HoverBtnDemo() {
  return (
    <Shell title="Magic UI · Interactive Hover Button">
      <InteractiveHoverButton className="bg-white text-black border-white/20">
        Get Started
      </InteractiveHoverButton>
    </Shell>
  )
}

function MarqueeDemo() {
  const items = ['React', 'Next.js', 'Hono', 'Mobile', 'Tailwind', 'Motion']
  return (
    <Shell title="Magic UI · Marquee">
      <div className="relative w-full max-w-2xl overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {items.map((t) => (
            <span key={t} className="mx-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </Shell>
  )
}

function BorderBeamDemo() {
  return (
    <Shell title="Magic UI · Border Beam">
      <div className="relative h-48 w-80 rounded-2xl border border-white/10 bg-[#14171a] p-6">
        <BorderBeam size={80} duration={8} colorFrom="#8f44fd" colorTo="#ffaa40" />
        <h3 className="m-0 text-xl">Border Beam</h3>
        <p className="mt-3 text-sm text-white/60">Kenarda dolaşan ışık demeti — yerel kopya.</p>
      </div>
    </Shell>
  )
}

function ShimmerDemo() {
  return (
    <Shell title="Motion Primitives · Text Shimmer">
      <TextShimmer className="text-3xl font-semibold" duration={1.2}>
        Shipping beautiful interfaces
      </TextShimmer>
    </Shell>
  )
}

function TiltDemo() {
  return (
    <Shell title="Motion Primitives · Tilt">
      <Tilt rotationFactor={12} className="rounded-2xl">
        <div className="h-44 w-72 rounded-2xl border border-white/10 bg-gradient-to-br from-[#8f44fd]/40 to-[#14171a] p-6 shadow-2xl">
          <h3 className="m-0 text-xl">Tilt card</h3>
          <p className="mt-3 text-sm text-white/70">3D perspective on mouse move.</p>
        </div>
      </Tilt>
    </Shell>
  )
}

function MobileMock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Shell title={title}>
      <div className="w-[280px] rounded-[2rem] border border-white/15 bg-black p-3 shadow-2xl">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#0f1115]">
          <div className="flex items-center justify-between px-4 py-3 text-xs text-white/50">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          {children}
        </div>
      </div>
    </Shell>
  )
}

function MobileReusables() {
  return (
    <MobileMock title="Mobile visual · RN Reusables style">
      <div className="space-y-3 p-4">
        <h2 className="m-0 text-lg">Components</h2>
        <button className="w-full rounded-xl bg-[#8f44fd] py-3 text-sm font-semibold">Primary Button</button>
        <button className="w-full rounded-xl border border-white/15 py-3 text-sm">Secondary</button>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">Input / Form field</div>
        <div className="flex items-center justify-between rounded-xl border border-white/10 p-3 text-sm">
          <span>Notifications</span>
          <span className="h-6 w-10 rounded-full bg-[#8f44fd] p-1"><span className="block h-4 w-4 translate-x-4 rounded-full bg-white" /></span>
        </div>
      </div>
    </MobileMock>
  )
}

function MobileGluestack() {
  return (
    <MobileMock title="Mobile visual · gluestack style">
      <div className="space-y-3 p-4">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 p-4">
          <div className="text-xs text-white/60">Balance</div>
          <div className="mt-1 text-2xl font-semibold">$12,480</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Send', 'Request', 'Cards', 'More'].map((t) => (
            <button key={t} className="rounded-xl border border-white/10 bg-white/5 py-4 text-sm">{t}</button>
          ))}
        </div>
      </div>
    </MobileMock>
  )
}

function MobileNativeBase() {
  return (
    <MobileMock title="Mobile visual · NativeBase style">
      <div className="p-4">
        <div className="mb-3 text-sm text-white/50">Feed</div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-3 rounded-xl border border-white/10 p-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#8f44fd]/50" />
              <div className="text-sm">User {i}</div>
            </div>
            <div className="h-20 rounded-lg bg-white/5" />
          </div>
        ))}
      </div>
    </MobileMock>
  )
}

const demos: Record<string, { title: string; el: React.ReactNode }> = {
  'react-bits-spotlight': { title: 'SpotlightCard', el: <SpotlightDemo /> },
  'react-bits-glass-icons': { title: 'GlassIcons', el: <GlassIconsDemo /> },
  'react-bits-folder': { title: 'Folder', el: <FolderDemo /> },
  'react-bits-bounce': { title: 'BounceCards', el: <BounceDemo /> },
  'react-bits-gradient': { title: 'GradientText', el: <GradientDemo /> },
  'react-bits-blur': { title: 'BlurText', el: <BlurDemo /> },
  'react-bits-dock': { title: 'Dock', el: <DockDemo /> },
  'magicui-shiny': { title: 'Shiny Text', el: <ShinyDemo /> },
  'magicui-hover-btn': { title: 'Hover Button', el: <HoverBtnDemo /> },
  'magicui-marquee': { title: 'Marquee', el: <MarqueeDemo /> },
  'magicui-border-beam': { title: 'Border Beam', el: <BorderBeamDemo /> },
  'motion-shimmer': { title: 'Text Shimmer', el: <ShimmerDemo /> },
  'motion-tilt': { title: 'Tilt', el: <TiltDemo /> },
  'mobile-reusables': { title: 'RN Reusables look', el: <MobileReusables /> },
  'mobile-gluestack': { title: 'gluestack look', el: <MobileGluestack /> },
  'mobile-nativebase': { title: 'NativeBase look', el: <MobileNativeBase /> },
}

function DemoRoute() {
  const { id } = useParams()
  const demo = id ? demos[id] : null
  if (!demo) {
    return (
      <Shell title="Not found">
        <p>Demo yok: {id}</p>
        <Link to="/" className="text-[#8f44fd]">
          Gallery
        </Link>
      </Shell>
    )
  }
  return <>{demo.el}</>
}

function Gallery() {
  return (
    <div className="demo-shell" style={{ alignContent: 'start', gap: 16 }}>
      <div className="demo-label">Local kit visuals</div>
      <h1 className="m-0 text-3xl font-semibold">Yerel görsel demolar</h1>
      <p className="m-0 max-w-xl text-center text-white/60">
        Kaynak kitlerden kopyalanmış bileşenler — proxy yok, burada render.
      </p>
      <div className="mt-4 grid w-full max-w-3xl gap-2 sm:grid-cols-2">
        {Object.entries(demos).map(([id, d]) => (
          <Link
            key={id}
            to={`/demo/${id}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white no-underline hover:border-[#8f44fd]/50"
          >
            {d.title}
            <div className="text-xs text-white/40">{id}</div>
          </Link>
        ))}
      </div>
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

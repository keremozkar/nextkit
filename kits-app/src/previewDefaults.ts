/** Sensible demo props so React Bits components don't crash without required inputs */
export function demoProps(item: { id: string; name: string; group: string; title: string }) {
  const name = item.name
  const baseText = 'React Bits'

  const byName: Record<string, Record<string, unknown>> = {
    CountUp: { to: 1000, from: 0, duration: 2, separator: ',', className: 'text-5xl font-semibold' },
    Counter: { value: 1234, fontSize: 64, textColor: '#fff' },
    BlurText: { text: baseText, className: 'text-4xl font-semibold' },
    SplitText: { text: baseText, className: 'text-4xl font-semibold' },
    GradientText: { children: baseText, className: 'text-4xl font-semibold' },
    DecryptedText: { text: baseText, className: 'text-4xl font-semibold' },
    FuzzyText: { text: baseText },
    GlitchText: { children: baseText },
    ShinyText: { text: baseText, className: 'text-4xl font-semibold' },
    TextType: { text: ['React Bits', 'Motion UI', 'Copy & Adapt'], className: 'text-4xl font-semibold' },
    RotatingText: { texts: ['React', 'Bits', 'Motion'], className: 'text-4xl font-semibold' },
    TrueFocus: { sentence: 'React Bits Motion', className: 'text-4xl' },
    CircularText: { text: 'REACT BITS • MOTION • ', spinDuration: 20 },
    CurvedLoop: { marqueeText: 'React Bits · Motion · ', className: 'text-2xl' },
    ScrollFloat: { children: baseText },
    ScrollReveal: { children: baseText },
    ScrollVelocity: { texts: ['React Bits', 'Motion UI'] },
    TextPressure: { text: baseText },
    TextCursor: { text: baseText },
    TextLoop: { texts: ['React', 'Bits', 'Motion'] },
    VariableProximity: { label: baseText, fromFontVariationSettings: "'wght' 400", toFontVariationSettings: "'wght' 900" },
    ASCIIText: { text: baseText },
    FallingText: { text: baseText },
    FoldText: { text: baseText },
    EchoText: { text: baseText },
    DepthText: { text: baseText },
    MaskedHeading: { text: baseText },
    ParticleText: { text: baseText },
    ScrambledText: { text: baseText },
    Shuffle: { text: baseText },
    SplitFlapText: { text: baseText },
    StrokeText: { text: baseText },
    WarpText: { text: baseText },
  }

  if (byName[name]) return byName[name]

  if (item.group === 'TextAnimations') {
    return { text: baseText, className: 'text-4xl font-semibold', children: baseText }
  }

  if (item.group === 'Backgrounds') {
    return { className: 'w-full h-full' }
  }

  return { className: 'max-w-md' }
}

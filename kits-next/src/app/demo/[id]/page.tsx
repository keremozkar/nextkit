import DemoClient from './DemoClient'
import ids from '../../../demoIds.json'

export function generateStaticParams() {
  return (ids as string[]).map((id) => ({ id }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DemoClient id={id} />
}

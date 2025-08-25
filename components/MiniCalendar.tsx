'use client'
import events from '@/data/events.json'
import Link from 'next/link'

const byMonth = (iso: string) => iso.slice(0,7)
const currentMonth = new Date().toISOString().slice(0,7)

export default function MiniCalendar() {
  const featured = events.filter(e => byMonth(e.date) === currentMonth).slice(0, 5)

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Este mês</h3>
        <Link href="/eventos" className="text-sm" style={{
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>ver todos</Link>
      </div>
      <ul className="mt-3 space-y-2">
        {featured.length === 0 && <li className="text-[color:var(--muted)] text-sm">Sem eventos cadastrados.</li>}
        {featured.map(e => (
          <li key={e.id} className="flex items-center gap-3">
            <div className="chip">{new Date(e.date).getDate().toString().padStart(2,'0')}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{e.title}</div>
              <div className="text-xs text-[color:var(--muted)]">{e.time ?? '—'} • {e.location ?? 'T Group'}</div>
            </div>
            <span className="text-[10px] text-[color:var(--muted)]">{e.type ?? ''}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

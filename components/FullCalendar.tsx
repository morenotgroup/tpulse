'use client'
import { useMemo, useState } from 'react'
import events from '@/data/events.json'

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export default function FullCalendar() {
  const [cursor, setCursor] = useState(new Date())
  const y = cursor.getFullYear()
  const m = cursor.getMonth()
  const dim = daysInMonth(y, m)
  const ym = `${y}-${String(m+1).padStart(2,'0')}`
  const monthEvents = events.filter(e => e.date.startsWith(ym))

  const grid = useMemo(() => Array.from({length: dim}).map((_,i) => {
    const day = i+1
    const ds = `${ym}-${String(day).padStart(2,'0')}`
    return {
      day,
      items: monthEvents.filter(e => e.date === ds)
    }
  }), [ym, dim, monthEvents])

  const next = () => setCursor(new Date(y, m+1, 1))
  const prev = () => setCursor(new Date(y, m-1, 1))

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="text-sm text-[color:var(--accent2)]">◀</button>
        <div className="font-semibold">{cursor.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</div>
        <button onClick={next} className="text-sm text-[color:var(--accent2)]">▶</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-[color:var(--muted)] mb-1">
        {['S','T','Q','Q','S','S','D'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map(cell => (
          <div key={cell.day} className="min-h-16 rounded-lg border border-white/10 p-1">
            <div className="text-xs text-[color:var(--muted)]">{String(cell.day).padStart(2,'0')}</div>
            <div className="space-y-1 mt-1">
              {cell.items.map(it => (
                <div key={it.id} className="text-[10px] leading-tight p-1 rounded-md bg-white/5">
                  <div className="font-medium">{it.title}</div>
                  <div className="opacity-60">{it.time ?? '—'}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="chip">Todos</span>
        <span className="chip">G&amp;C</span>
        <span className="chip">Palestra</span>
        <span className="chip">HappyHour</span>
        <span className="chip">Onboarding</span>
      </div>
    </div>
  )
}

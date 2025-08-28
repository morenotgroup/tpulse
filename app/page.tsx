'use client'

import Image from 'next/image'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MiniCalendar from '@/components/MiniCalendar'
import { useEffect, useState } from 'react'

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() + w.slice(1))
    .join(' ')
}

function firstFromFullName(full: string) {
  const clean = titleCase(full.trim().replace(/\s+/g, ' '))
  const parts = clean.split(' ').filter(Boolean)
  const blacklist = new Set(['De','Da','Do','Dos','Das','E'])
  for (const p of parts) if (!blacklist.has(p)) return p
  return parts[0] || 'Colaborador(a)'
}

function firstFromEmail(email: string) {
  const user = email.split('@')[0] || ''
  const tokens = user.split(/[._-]+/).filter(Boolean)
  return tokens.length ? titleCase(tokens[0]) : 'Colaborador(a)'
}

function useFirstName() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' })
        const json = await res.json()
        const u = json?.user
        if (u?.name) {
          setName(firstFromFullName(u.name))
          return
        }
        if (u?.email) {
          setName(firstFromEmail(u.email))
          return
        }
      } catch {}
      const local = localStorage.getItem('tg_user_name')
      if (local) setName(local)
    })()
  }, [])

  return name
}

type NavLink = { href: string; label: string; emoji: string }

const links: ReadonlyArray<NavLink> = [
  { href: '/eventos',     label: 'Eventos',           emoji: '📅' },
  { href: '/almoco',      label: 'Check-in Almoço',   emoji: '🍽️' },
  { href: '/nf',          label: 'NF Express',        emoji: '🧾' },
  { href: '/beneficios',  label: 'Benefícios',        emoji: '🎁' },
  { href: '/capacitar',   label: 'Capacitar',         emoji: '🎓' },
  { href: '/manuais',     label: 'Manuais',           emoji: '📚' },
  { href: '/wallpapers',  label: 'Wallpapers',        emoji: '🖼️' },
] as const

export default function Home() {
  const firstName = useFirstName()

  return (
    <>
      <header className="px-4 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold">
              Bem-vindo(a), <span className="title-neon">{firstName || '...'}</span> 👋
            </h1>
            <p className="text-sm text-[color:var(--muted)]">A casa do T Group no seu celular.</p>
          </div>

          {!firstName && (
            <Link href="/login" className="btn px-3 py-1 text-sm">
              Entrar
            </Link>
          )}
        </div>
      </header>

      <section className="px-4">
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 card">
          <Image src="/hero.jpg" alt="T Group" fill priority className="object-cover" />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.35)' }} />
        </div>
      </section>

      <section className="px-4 mt-4">
        <MiniCalendar />
      </section>

      <section className="px-4 mt-4 grid grid-cols-2 gap-3 pb-24">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card active:scale-95">
            <div className="text-2xl">{l.emoji}</div>
            <div className="mt-2 font-semibold">{l.label}</div>
            <div className="text-xs text-[color:var(--muted)]">Acessar</div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MiniCalendar from '@/components/MiniCalendar'
import type { Route } from 'next'

function useUserName() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const qn = params?.get('nome')
  if (qn && typeof window !== 'undefined') {
    localStorage.setItem('tg_user_name', qn)
  }
  const stored = typeof window !== 'undefined' ? localStorage.getItem('tg_user_name') : null
  return qn || stored || 'Colaborador(a)'
}

type NavLink = { href: Route; label: string; emoji: string }

const links: ReadonlyArray<NavLink> = [
  { href: '/eventos',     label: 'Eventos',           emoji: '📅' },
  { href: '/almoco',      label: 'Check-in Almoço',   emoji: '🍽️' },
  { href: '/nf',          label: 'NF Express',        emoji: '🧾' },
  { href: '/beneficios',  label: 'Benefícios',        emoji: '🎁' },
  { href: '/capacitar',   label: 'Capacitar',         emoji: '🎓' },
  { href: '/manuais',     label: 'Manuais',           emoji: '📚' },
  { href: '/wallpapers',  label: 'Wallpapers',        emoji: '🖼️' }
] as const

export default function Home() {
  const nome = useUserName()

  return (
    <>
      <header className="px-4 pt-6 pb-3">
        <h1 className="text-[22px] font-semibold">
          Bem-vinda(o), <span className="title-neon">{nome}</span> 👋
        </h1>
        <p className="text-sm text-[color:var(--muted)]">A casa do T Group no seu celular.</p>
      </header>

      {/* Hero “liquid glass” com foto */}
      <section className="px-4">
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 card">
          <Image src="/hero.jpg" alt="T Group" fill priority className="object-cover" />
          <div className="absolute inset-0 pointer-events-none"
               style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.35)' }} />
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

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MiniCalendar from '@/components/MiniCalendar'

/* -------------------- helpers de nome -------------------- */
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
  const blacklist = new Set(['De', 'Da', 'Do', 'Dos', 'Das', 'E'])
  for (const p of parts) if (!blacklist.has(p)) return p
  return parts[0] || 'Colaborador(a)'
}

function firstFromEmail(email: string) {
  const user = (email || '').split('@')[0] || ''
  const tokens = user.split(/[._-]+/).filter(Boolean)
  return tokens.length ? titleCase(tokens[0]) : 'Colaborador(a)'
}

/* -------------------- hook de primeiro nome -------------------- */
function useFirstName() {
  const [name, setName] = useState('Colaborador(a)')

  // 1) captura ?nome= da URL e guarda localmente
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const qn = params.get('nome')
    if (qn) {
      localStorage.setItem('tg_user_name', qn)
      setName(firstFromFullName(qn))
    }
  }, [])

  // 2) tenta pegar a sessão da API (NextAuth) e extrai name/email
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' })
        if (res.ok) {
          const json = await res.json()
          const user = json?.user
          if (user?.name) {
            setName(firstFromFullName(user.name))
            return
          }
          if (user?.email) {
            setName(firstFromEmail(user.email))
            return
          }
        }
      } catch {
        // segue para os fallbacks
      }

      // 3) fallback localStorage
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('tg_user_name')
        if (local) {
          setName(firstFromFullName(local))
          return
        }
      }
    })()
  }, [])

  return name
}

/* -------------------- dados dos cards -------------------- */
type NavLink = { href: string; label: string; emoji: string }

const links: ReadonlyArray<NavLink> = [
  { href: '/eventos',    label: 'Eventos',         emoji: '📅' },
  { href: '/almoco',     label: 'Check-in Almoço', emoji: '🍽️' },
  { href: '/nf',         label: 'NF Express',      emoji: '🧾' },
  { href: '/beneficios', label: 'Benefícios',      emoji: '🎁' },
  { href: '/capacitar',  label: 'Capacitar',       emoji: '🎓' },
  { href: '/manuais',    label: 'Manuais',         emoji: '📚' },
  { href: '/wallpapers', label: 'Wallpapers',      emoji: '🖼️' },
] as const

/* -------------------- página -------------------- */
export default function Home() {
  const primeiroNome = useFirstName()

  return (
    <>
      <header className="px-4 pt-6 pb-3">
        <h1 className="text-[22px] font-semibold">
          Bem-vindo(a), <span className="title-neon">{primeiroNome}</span> 👋
        </h1>
        <p className="text-sm text-[color:var(--muted)]">A casa do T Group no seu celular.</p>
      </header>

      {/* Hero com imagem (mantém o degradê e a moldura) */}
      <section className="px-4">
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 card">
          <Image src="/hero.jpg" alt="T Group" fill priority className="object-cover" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.35)' }}
          />
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

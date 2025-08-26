'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Utensils, FilePlus2, MoreHorizontal } from 'lucide-react'
import type { Route } from 'next'   // 👈 utilitário de tipo do Next

// Tipamos os caminhos internos com Route<...> para satisfazer o typedRoutes
type Href = Route<'/' | '/eventos' | '/almoco' | '/nf' | '/mais'>
type NavItem = { href: Href; icon: any; label: string }

const items: readonly NavItem[] = [
  { href: '/',        icon: Home,           label: 'Home' },
  { href: '/eventos', icon: Calendar,       label: 'Eventos' },
  { href: '/almoco',  icon: Utensils,       label: 'Almoço' },
  { href: '/nf',      icon: FilePlus2,      label: 'NF' },
  { href: '/wallpapers', icon: ImageIcon, label: 'Wallpapers' },
  { href: '/mais',    icon: MoreHorizontal, label: 'Mais' },
] as const

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[color:var(--card)]/95 backdrop-blur border-t border-white/10">
      <div className="mx-auto max-w-[480px] grid grid-cols-5">
        {items.map(({ href, icon: Icon, label }) => {
          const active = path === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center py-2 text-xs">
              <Icon size={22} className={active ? 'text-[color:var(--accent2)]' : 'text-[color:var(--muted)]'} />
              <span className={active ? 'text-[color:var(--text)]' : 'text-[color:var(--muted)]'}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

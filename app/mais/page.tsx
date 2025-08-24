import Link from 'next/link'

export default function Page() {
  const links = [
    { href: '/beneficios', label: 'Benefícios', emoji: '🎁' },
    { href: '/capacitar', label: 'Capacitar', emoji: '🎓' },
    { href: '/manuais', label: 'Manuais', emoji: '📚' },
  ]
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold mb-3">Mais</h1>
      <div className="grid grid-cols-2 gap-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card active:scale-95">
            <div className="text-2xl">{l.emoji}</div>
            <div className="mt-2 font-semibold">{l.label}</div>
            <div className="text-xs text-[color:var(--muted)]">Acessar</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

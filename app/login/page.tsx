'use client'

import { useState, useMemo } from 'react'

/** Lê os domínios permitidos do .env e formata para exibição */
function useAllowedDomains() {
  const raw = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS || ''
  return useMemo(
    () =>
      raw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    [raw]
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const domains = useAllowedDomains()
  // placeholder padrão: usa o primeiro domínio permitido; fallback pra @agenciataj.com
  const emailPlaceholder = `nome@${domains[0] || 'agenciataj.com'}`

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Erro ao enviar link')
      } else {
        setSent(true)
        // Guarda localmente para a Home conseguir exibir “Bem-vindo(a), Nome” mais rápido
        if (name) localStorage.setItem('tg_user_name', firstFromFullName(name))
        localStorage.setItem('tg_user_email', email)
      }
    } catch {
      setError('Falha de rede')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <main className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Verifique seu e-mail</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Enviamos um link de acesso para <b>{email}</b>. Abra pelo celular para entrar direto.
        </p>
        <p className="text-xs text-[color:var(--muted)]">O link expira em 15 minutos.</p>
      </main>
    )
  }

  return (
    <main className="p-6 space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Digite seu e-mail corporativo e (opcional) seu nome completo.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">E-mail corporativo</label>
          <input
            required
            type="email"
            inputMode="email"
            placeholder={emailPlaceholder}
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!!domains.length && (
            <p className="text-xs text-[color:var(--muted)]">
              Domínios permitidos: {domains.join(', ')}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm">Nome completo (opcional)</label>
          <input
            type="text"
            placeholder="Ex: Joana Silva"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {error && <div className="text-xs text-red-400">{error}</div>}

        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? 'Enviando...' : 'Receber link de acesso'}
        </button>
      </form>
    </main>
  )
}

/* ------- helpers para formatar o primeiro nome ------- */
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

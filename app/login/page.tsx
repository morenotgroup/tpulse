'use client'

import { useState } from 'react'

export const metadata = { title: 'Login — T Group Intra' }

function firstFromFullName(full: string) {
  const clean = full.toLowerCase().replace(/\s+/g, ' ').trim()
    .split(' ').filter(Boolean).map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
  const blacklist = new Set(['De','Da','Do','Dos','Das','E'])
  const parts = clean.split(' ').filter(Boolean)
  for (const p of parts) if (!blacklist.has(p)) return p
  return parts[0] || 'Colaborador(a)'
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Erro ao enviar link')
      } else {
        setSent(true)
        // opcional, já exibe “Bem-vindo(a), Nome” depois que logar
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
        <p className="text-xs text-[color:var(--muted)]">
          O link expira em 15 minutos.
        </p>
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
            placeholder="nome@tgroup.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-[color:var(--muted)]">Somente @tgroup.com</p>
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

import { NextResponse } from 'next/server'
import { signLoginToken } from '@/lib/jwt'
import { sendMagicLink } from '@/lib/mailer'

function firstFromFullName(full: string) {
  const clean = full.toLowerCase().replace(/\s+/g, ' ').trim()
    .split(' ').filter(Boolean).map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
  const blacklist = new Set(['De','Da','Do','Dos','Das','E'])
  const parts = clean.split(' ').filter(Boolean)
  for (const p of parts) if (!blacklist.has(p)) return p
  return parts[0] || 'Colaborador(a)'
}

function firstFromEmail(email: string) {
  const user = email.split('@')[0] || ''
  const tokens = user.split(/[._-]+/).filter(Boolean)
  return tokens.length ? (tokens[0][0]?.toUpperCase() + tokens[0].slice(1)) : 'Colaborador(a)'
}

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'EMAIL_REQUIRED' }, { status: 400 })
    }
    // (opcional) restringir domínio:
    if (!email.endsWith('@tgroup.com')) {
      return NextResponse.json({ ok: false, error: 'DOMAIN_NOT_ALLOWED' }, { status: 401 })
    }

    const first = name ? firstFromFullName(name) : firstFromEmail(email)
    const token = await signLoginToken({ email, name: first })

    const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || ''
    const origin = base
      ? (base.startsWith('http') ? base : `https://${base}`)
      : 'http://localhost:3000'
    const url = `${origin}/api/auth/callback?token=${encodeURIComponent(token)}`

    await sendMagicLink(email, url)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}

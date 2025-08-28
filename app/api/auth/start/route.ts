// app/api/auth/start/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sign } from '@/lib/jwt'
import { sendMagicLink } from '@/lib/mailer'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
const ALLOWED = (process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean)

function isAllowed(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  return ALLOWED.length === 0 || ALLOWED.includes(domain)
}

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}))
    const email = String(payload?.email || '').trim().toLowerCase()
    const name  = typeof payload?.name === 'string' ? payload.name : undefined

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'E-mail inválido' }, { status: 400 })
    }
    if (!isAllowed(email)) {
      return NextResponse.json({ ok: false, error: 'Domínio não permitido' }, { status: 403 })
    }

    // token de uso único p/ callback
    const token = await sign({ email, name }, { expMinutes: 15 })

    const url = new URL('/api/auth/callback', BASE_URL)
    url.searchParams.set('token', token)

    // envia e-mail (agora com nome opcional)
    await sendMagicLink(email, url.toString(), name)

    // opcional: gravar hint local
    const c = cookies()
    c.set('tg_hint_email', email, { httpOnly: false, path: '/', maxAge: 60 * 60 * 24 * 7 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('start error', e)
    return NextResponse.json({ ok: false, error: 'Falha ao iniciar login' }, { status: 500 })
  }
}

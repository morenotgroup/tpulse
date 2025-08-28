// app/api/auth/start/route.ts
import { NextResponse } from 'next/server'
import { sign } from '@/lib/jwt'
import { sendMagicLink } from '@/lib/mailer'

/**
 * ENV esperadas:
 * - AUTH_ALLOWED_DOMAINS="tgroup.com,agenciataj.com,neoformaturas.com,grupotoy.com.br,wearesinergy.com.br,tvenues.com.br,mood.com.br"
 * - AUTH_BASE_URL="https://tpulse-74ng.vercel.app"  (ou seu domínio)
 * - AUTH_JWT_TTL_SECONDS="900"  (15min; opcional, default abaixo)
 */

const TTL = Number(process.env.AUTH_JWT_TTL_SECONDS || 900)

function isAllowedDomain(email: string) {
  const list = (process.env.AUTH_ALLOWED_DOMAINS || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
  const domain = email.split('@')[1]?.toLowerCase() || ''
  return list.includes(domain)
}

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'E-mail obrigatório' }, { status: 400 })
    }

    if (!isAllowedDomain(email)) {
      return NextResponse.json({ ok: false, error: 'Domínio de e-mail não permitido' }, { status: 403 })
    }

    const payload = { email, name: typeof name === 'string' ? name : undefined }
    const token = await sign(payload, TTL)

    const base = process.env.AUTH_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || ''
    if (!base) {
      return NextResponse.json({ ok: false, error: 'AUTH_BASE_URL não configurada' }, { status: 500 })
    }

    const url = new URL('/api/auth/callback', base)
    url.searchParams.set('token', token)

    // dispara o e-mail
    await sendMagicLink(email, url.toString(), payload.name)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('POST /api/auth/start error', e)
    return NextResponse.json({ ok: false, error: 'Falha ao enviar link' }, { status: 500 })
  }
}

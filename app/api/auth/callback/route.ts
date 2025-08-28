// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify, sign } from '@/lib/jwt'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token') || ''
  const payload = await verify(token)

  if (!payload) {
    const url = new URL('/login', BASE_URL)
    url.searchParams.set('err', 'token')
    return NextResponse.redirect(url)
  }

  // emite um token de sessão (ex: 7 dias)
  const session = await sign({ email: payload.email, name: payload.name }, 60 * 24 * 7) // 60*24*7 min = 7 dias

  const res = NextResponse.redirect(new URL('/', BASE_URL))
  // httpOnly protege a sessão
  res.cookies.set('tg_auth', session, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
  // cookies visíveis para UI (nome/email)
  if (payload.name) res.cookies.set('tg_user_name', payload.name, { httpOnly: false, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 30 })
  if (payload.email) res.cookies.set('tg_user_email', payload.email, { httpOnly: false, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 30 })

  return res
}

// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sign, verify } from '@/lib/jwt'

const COOKIE_NAME = 'tg_session'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    if (!token) {
      return NextResponse.redirect(new URL('/login?e=token', req.url))
    }

    // valida o token recebido por e-mail
    const payload = await verify(token) // { email, name, iat, exp }
    if (!payload?.email) {
      return NextResponse.redirect(new URL('/login?e=payload', req.url))
    }

    // cria um novo JWT de sessão (ex.: 7 dias)
    const sessionToken = await sign(
      { email: payload.email, name: payload.name || '' },
      60 * 24 * 7 // minutos
    )

    // prepara o redirect para Home
    const res = NextResponse.redirect(new URL('/?hi=1', req.url))

    // seta cookie na MESMA resposta do redirect
    res.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
    })

    return res
  } catch (e) {
    return NextResponse.redirect(new URL('/login?e=invalid', req.url))
  }
}

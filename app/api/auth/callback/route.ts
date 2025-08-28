// app/api/auth/callback/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verify, sign } from '@/lib/jwt'

/**
 * Cookie:
 *  - Nome: tg_session
 *  - Conteúdo: JWT com { email, name }
 *  - Expira em 7 dias (configurável via AUTH_SESSION_DAYS)
 */

const SESSION_DAYS = Number(process.env.AUTH_SESSION_DAYS || 7)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', req.url))
  }

  try {
    // valida o token recebido por e-mail
    const data = await verify<{ email: string; name?: string }>(token)
    if (!data?.email) {
      return NextResponse.redirect(new URL('/login?error=invalid_token', req.url))
    }

    // opcional: assinar um novo token de sessão (pra ter TTL diferente do link)
    const session = await sign(
      { email: data.email, name: data.name },
      SESSION_DAYS * 24 * 60 * 60
    )

    const cookieStore = cookies()
    cookieStore.set('tg_session', session, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: SESSION_DAYS * 24 * 60 * 60,
    })

    // redireciona pra home (pode mandar um flagzinho "welcome=1")
    const to = new URL('/', req.url)
    to.searchParams.set('welcome', '1')
    return NextResponse.redirect(to)
  } catch (e) {
    console.error('GET /api/auth/callback error', e)
    return NextResponse.redirect(new URL('/login?error=verify_failed', req.url))
  }
}

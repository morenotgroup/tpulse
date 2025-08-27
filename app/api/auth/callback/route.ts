import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyLoginToken } from '@/lib/jwt'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/login?err=missing', req.url))

  try {
    const payload = await verifyLoginToken(token)
    const { email, name = '' } = payload

    // Cria cookie de sessão (JWT é verificado no middleware quando necessário)
    const session = JSON.stringify({ email, name })
    cookies().set('tg_session', session, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })

    return NextResponse.redirect(new URL('/', req.url))
  } catch (e) {
    return NextResponse.redirect(new URL('/login?err=invalid', req.url))
  }
}

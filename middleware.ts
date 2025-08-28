// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'tg_session'

// Defina aqui o que deve exigir login
const PROTECTED_PREFIXES = ['/_private'] // exemplo; deixe vazio se não for usar agora

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // sempre liberar APIs de auth e a tela de login
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  // se não tem áreas privadas ainda, não force nada na Home
  const requiresAuth = PROTECTED_PREFIXES.some(pref => pathname.startsWith(pref))
  if (!requiresAuth) return NextResponse.next()

  const hasSession = req.cookies.get(COOKIE_NAME)?.value
  if (!hasSession) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

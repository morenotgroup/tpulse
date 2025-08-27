import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // rotas públicas
  const publicPaths = ['/login', '/api/auth/start', '/api/auth/callback', '/_next', '/favicon.ico', '/sw.js', '/manifest.json', '/wallpapers', '/pdfs', '/hero.jpg']
  if (publicPaths.some(p => pathname.startsWith(p))) return NextResponse.next()

  // se não tem sessão, manda pro /login
  const has = req.cookies.get('tg_session')?.value
  if (!has) {
    const url = new URL('/login', req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}

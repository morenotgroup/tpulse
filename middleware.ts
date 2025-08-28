import { NextResponse, NextRequest } from 'next/server'

// rotas públicas SEM sessão
const PUBLIC_PATHS = [
  '/login',
  '/api/auth/start',
  '/api/auth/verify',
  '/api/auth/me',
  '/manifest.webmanifest',
  '/icons',
  '/wallpapers',           // deixo público para download
  '/_next', '/favicon.ico', '/hero.jpg', '/pdfs', '/images', '/public'
]

function isPublic(path: string) {
  return PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + '/'))
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // liberar estáticos, api e login
  if (isPublic(pathname)) return NextResponse.next()

  // se tiver token de sessão, segue o jogo
  const token = req.cookies.get('tg_session')?.value
  if (token) return NextResponse.next()

  // sem sessão? deixa acessar Home para ler o botão "Entrar"
  if (pathname === '/') return NextResponse.next()

  // qualquer outra rota protegida manda pro login
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

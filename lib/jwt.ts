// lib/jwt.ts
import crypto from 'crypto'

const SECRET = (process.env.AUTH_SECRET || '').trim()
if (!SECRET) {
  console.warn('[jwt] AUTH_SECRET ausente — defina em variáveis de ambiente!')
}

function b64url(input: Buffer | string) {
  const base = Buffer.isBuffer(input) ? input.toString('base64') : Buffer.from(input).toString('base64')
  return base.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function b64urlJson(obj: any) {
  return b64url(JSON.stringify(obj))
}

function hmacSHA256(data: string, key: string) {
  return b64url(crypto.createHmac('sha256', key).update(data).digest())
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

export type JwtPayload = {
  exp: number
  [k: string]: any
}

/** Assina um token (HS256). expMinutes = 15 por padrão. */
export async function sign(payload: Record<string, any>, expMinutes = 15): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const exp = now + Math.max(1, Math.floor(expMinutes)) * 60
  const full: JwtPayload = { ...payload, exp }

  const h = b64urlJson(header)
  const p = b64urlJson(full)
  const data = `${h}.${p}`
  const sig = hmacSHA256(data, SECRET || 'dev-secret')
  return `${data}.${sig}`
}

/** Verifica token e retorna o payload se válido (e não expirado). */
export async function verify(token: string): Promise<JwtPayload | null> {
  try {
    const [h, p, s] = token.split('.')
    if (!h || !p || !s) return null
    const expected = hmacSHA256(`${h}.${p}`, SECRET || 'dev-secret')
    if (!safeEqual(expected, s)) return null

    const json = JSON.parse(Buffer.from(p.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
    const exp = Number(json?.exp || 0)
    if (!exp || Math.floor(Date.now() / 1000) > exp) return null
    return json
  } catch {
    return null
  }
}

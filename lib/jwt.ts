// lib/jwt.ts
// JWT HS256 sem dependências externas (Node 18+/20 com WebCrypto)
const ALG = 'HS256'

function b64url(input: Uint8Array | string): string {
  const str = typeof input === 'string' ? input : Buffer.from(input).toString('base64')
  return (typeof input === 'string' ? Buffer.from(input).toString('base64') : str)
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function b64urlJson(obj: unknown): string {
  return b64url(Buffer.from(JSON.stringify(obj)))
}

function fromB64url(input: string): Uint8Array {
  const pad = 4 - (input.length % 4 || 4)
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad)
  return new Uint8Array(Buffer.from(base64, 'base64'))
}

async function getKey() {
  const secret = process.env.AUTH_JWT_SECRET
  if (!secret) throw new Error('Faltou AUTH_JWT_SECRET nas variáveis de ambiente')
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

/**
 * Assina um JWT com HS256.
 * @param payload dados do token (ex.: { email, name })
 * @param ttlSeconds tempo de vida em segundos (default: 15 min)
 * @returns token JWT
 */
export async function sign(payload: Record<string, unknown>, ttlSeconds = 900): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const claims = { ...payload, iat: now, exp: now + ttlSeconds }

  const header = { alg: ALG, typ: 'JWT' }
  const data = `${b64urlJson(header)}.${b64urlJson(claims)}`
  const key = await getKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const token = `${data}.${b64url(new Uint8Array(sig))}`
  return token
}

/**
 * Verifica um JWT HS256 e retorna o payload (lança erro se inválido/expirado).
 */
export async function verify<T = any>(token: string): Promise<T> {
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
    throw new Error('JWT malformado')
  }
  const [h, p, s] = token.split('.')

  // valida header.alg
  const header = JSON.parse(Buffer.from(fromB64url(h)).toString('utf8'))
  if (header?.alg !== ALG) throw new Error('Algoritmo inválido')

  // confere assinatura
  const key = await getKey()
  const ok = await crypto.subtle.verify(
    'HMAC',
    key,
    fromB64url(s),
    new TextEncoder().encode(`${h}.${p}`),
  )
  if (!ok) throw new Error('Assinatura inválida')

  // checa expiração
  const payload = JSON.parse(Buffer.from(fromB64url(p)).toString('utf8'))
  const now = Math.floor(Date.now() / 1000)
  if (payload?.exp && now > payload.exp) throw new Error('Token expirado')

  return payload as T
}

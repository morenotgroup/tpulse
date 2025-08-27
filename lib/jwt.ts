import { SignJWT, jwtVerify } from 'jose'

const ALG = 'HS256'
const enc = () => new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me')

export type LoginTokenPayload = {
  email: string
  name?: string
  iat?: number
  exp?: number
}

export async function signLoginToken(payload: Omit<LoginTokenPayload, 'iat' | 'exp'>) {
  const expSec = 15 * 60 // link mágico expira em 15 min
  return await new SignJWT({ email: payload.email, name: payload.name || '' })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(expSec)
    .sign(enc())
}

export async function verifyLoginToken(token: string) {
  const { payload } = await jwtVerify(token, enc(), { algorithms: [ALG] })
  return payload as LoginTokenPayload
}

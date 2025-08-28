// app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from '@/lib/jwt'

export async function GET() {
  const token = cookies().get('tg_auth')?.value || ''
  const payload = token ? await verify(token) : null
  if (!payload) return NextResponse.json({ user: null })
  const user = { email: String(payload.email || ''), name: String(payload.name || '') }
  return NextResponse.json({ user })
}

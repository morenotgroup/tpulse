// app/api/auth/me/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verify } from '@/lib/jwt'

type User = { email: string; name?: string }

export async function GET() {
  try {
    const cookieStore = cookies()
    const raw = cookieStore.get('tg_session')?.value
    if (!raw) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const data = await verify<User>(raw)
    if (!data?.email) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user: { email: data.email, name: data.name } }, { status: 200 })
  } catch (e) {
    console.error('GET /api/auth/me error', e)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

import { cookies } from 'next/headers'

export async function GET() {
  const raw = cookies().get('tg_session')?.value
  try {
    const data = raw ? JSON.parse(raw) : null
    return Response.json({ ok: true, user: data })
  } catch {
    return Response.json({ ok: true, user: null })
  }
}
